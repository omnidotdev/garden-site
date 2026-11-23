"use client";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardRoot,
  CardTitle,
} from "@omnidotdev/thornberry/card";
import {
  SheetBackdrop,
  SheetCloseTrigger,
  SheetContent,
  SheetDescription,
  SheetPositioner,
  SheetRoot,
  SheetTitle,
} from "@omnidotdev/thornberry/sheet";
import {
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "@omnidotdev/thornberry/tabs";
import { useEffect, useState } from "react";

import {
  EditorActions,
  EditorControls,
  SchemaHelp,
  TextEditor,
} from "@/components/visualizer";
import { useSearchParams } from "@/lib/hooks";
import { useGardenStore } from "@/lib/hooks/store";

/**
 * Schema Editor.
 */
const SchemaEditor = () => {
  const [schemaText, setSchemaText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [{ editorExpanded }, setSearchParams] = useSearchParams();

  const { activeSchema } = useGardenStore();

  const title = "Garden Editor";
  const description = "Edit the JSON schema for your Garden visualization";

  // update schema text when activeSchema changes
  useEffect(() => {
    setSchemaText(JSON.stringify(activeSchema, null, 2));
  }, [activeSchema]);

  return (
    <CardRoot className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <TabsRoot defaultValue="editor">
          <TabsList>
            <TabsTrigger value="editor">JSON Editor</TabsTrigger>
            <TabsTrigger value="help">Schema Help</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="mt-0 flex flex-col gap-4">
            <EditorControls />

            <SheetRoot
              open={editorExpanded}
              onOpenChange={({ open }) =>
                setSearchParams({ editorExpanded: open })
              }
              lazyMount
              unmountOnExit
            >
              <SheetBackdrop className="data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in" />
              <SheetPositioner>
                <SheetContent
                  className="grid h-11/12 w-full grid-rows-layout gap-4 rounded-2xl p-4 shadow-lg"
                  side="bottom"
                >
                  <div className="flex flex-col items-start gap-1.5 p-4">
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>{description}</SheetDescription>
                  </div>

                  <EditorControls />

                  <TextEditor
                    error={error}
                    schemaText={schemaText}
                    setSchemaText={setSchemaText}
                    setError={setError}
                  />

                  <EditorActions schemaText={schemaText} setError={setError} />

                  <SheetCloseTrigger />
                </SheetContent>
              </SheetPositioner>
            </SheetRoot>

            <div className="h-[400px]">
              <TextEditor
                error={error}
                schemaText={schemaText}
                setSchemaText={setSchemaText}
                setError={setError}
              />
            </div>

            <EditorActions schemaText={schemaText} setError={setError} />
          </TabsContent>

          <TabsContent value="help">
            <SchemaHelp />
          </TabsContent>
        </TabsRoot>
      </CardContent>
    </CardRoot>
  );
};

export default SchemaEditor;
