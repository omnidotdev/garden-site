import { json } from "@codemirror/lang-json";
import { EditorView } from "@codemirror/view";
import { CodeEditor } from "@omnidotdev/thornberry/code-editor";
import { AlertCircleIcon, CheckIcon, CopyIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "@/lib/hooks";
import { useTheme } from "@/providers";

interface Props {
  /** The current JSON schema text being edited. */
  schemaText: string;
  /** Function to update the schema text. */
  setSchemaText: (text: string) => void;
  /** Error message related to the schema. */
  error: string | null;
  /** Function to set or clear the current error message. */
  setError: (error: string | null) => void;
}

/**
 * Text Editor.
 */
const TextEditor = ({ schemaText, setSchemaText, error, setError }: Props) => {
  const [copied, setCopied] = useState(false);

  const [{ fontSize }] = useSearchParams();
  const { theme } = useTheme();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(schemaText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // JSON language extension, built once so the editor is not reconfigured on every render
  const language = useMemo(() => json(), []);

  // soft wrap long lines, mirroring Monaco's `wordWrap: "on"`
  const extensions = useMemo(() => [EditorView.lineWrapping], []);

  // map the app theme and font size onto a CodeMirror theme driven by the app CSS variables
  const editorTheme = useMemo(
    () =>
      EditorView.theme(
        {
          "&": {
            height: "100%",
            fontSize: `${fontSize}px`,
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
          },
          ".cm-content": {
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
            padding: "10px 0",
            caretColor: "var(--foreground)",
          },
          ".cm-scroller": { overflow: "auto" },
          "&.cm-focused": { outline: "none" },
          ".cm-gutters": {
            backgroundColor: "var(--background)",
            color: "var(--muted-foreground)",
            border: "none",
          },
          ".cm-activeLine": { backgroundColor: "var(--muted)" },
          ".cm-activeLineGutter": { backgroundColor: "var(--muted)" },
          ".cm-cursor, .cm-dropCursor": {
            borderLeftColor: "var(--foreground)",
          },
          "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
            { backgroundColor: "var(--accent)" },
        },
        { dark: theme === "dark" },
      ),
    [theme, fontSize],
  );

  return (
    <div className="relative h-full overflow-hidden rounded-md border border-border">
      <CodeEditor
        className="h-full"
        value={schemaText}
        language={language}
        extensions={extensions}
        theme={editorTheme}
        onChange={(value) => {
          if (value) setSchemaText(value);
          setError(null);
        }}
      />

      <div className="absolute top-4 right-6 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          title="Copy to clipboard"
        >
          {copied ? (
            <CheckIcon size={16} color="green" />
          ) : (
            <CopyIcon size={16} />
          )}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon size={16} />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="max-h-32 overflow-auto font-mono text-xs">
              {error}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default TextEditor;
