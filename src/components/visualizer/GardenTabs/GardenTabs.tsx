"use client";

import { Garden, getLayout, listLayouts } from "@omnidotdev/garden";
import { BarChartIcon, CodeIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useIsClient } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SchemaEditor } from "@/components/visualizer";
import { useSearchParams } from "@/lib/hooks";
import { useGardenStore } from "@/lib/hooks/store";

/**
 * Optional layouts this site offers beyond the base bundle (tree, beehive).
 * Each names a dynamic import that registers the layout on first selection, so
 * its heavy dependencies (Three.js for 3D) never enter the initial bundle and
 * only download when a visitor actually picks that view.
 */
const OPTIONAL_LAYOUTS: {
  name: string;
  label: string;
  load: () => Promise<unknown>;
}[] = [
  { name: "3d", label: "3D", load: () => import("@omnidotdev/garden/3d") },
];

/** Picker options: base-bundle layouts plus any optional ones not yet registered. */
const layoutOptions = () => {
  const options = listLayouts().map(({ name, label }) => ({
    name,
    label: label ?? name,
  }));
  const seen = new Set(options.map((option) => option.name));

  for (const { name, label } of OPTIONAL_LAYOUTS) {
    if (!seen.has(name)) options.push({ name, label });
  }

  return options;
};

/**
 * Garden Tabs.
 */
const GardenTabs = () => {
  const isClient = useIsClient();

  const { activeSchema } = useGardenStore();

  const [{ activeTab }, setSearchParams] = useSearchParams();

  const [layout, setLayout] = useState("tree");
  const [loadingLayout, setLoadingLayout] = useState<string | null>(null);

  const options = layoutOptions();

  const selectLayout = async (name: string) => {
    const optional = OPTIONAL_LAYOUTS.find((option) => option.name === name);

    if (optional && !getLayout(name)) {
      setLoadingLayout(name);
      try {
        await optional.load();
      } finally {
        setLoadingLayout(null);
      }
    }

    setLayout(name);
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={() =>
        setSearchParams({
          activeTab: activeTab === "visualize" ? "edit" : "visualize",
        })
      }
      className="flex h-full flex-col"
    >
      <TabsList className="grid w-full grid-cols-2 md:max-w-md">
        <TabsTrigger value="visualize" className="flex items-center gap-2">
          <BarChartIcon size={16} />
          Visualize Garden
        </TabsTrigger>

        <TabsTrigger value="edit" className="flex items-center gap-2">
          <CodeIcon size={16} />
          Edit Garden
        </TabsTrigger>
      </TabsList>

      <TabsContent value="visualize" className="mt-6 flex flex-1 flex-col">
        {options.length > 1 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {options.map(({ name, label }) => (
              <Button
                key={name}
                size="sm"
                variant={name === layout ? "default" : "outline"}
                disabled={loadingLayout !== null}
                onClick={() => selectLayout(name)}
              >
                {loadingLayout === name && (
                  <Loader2Icon className="animate-spin" />
                )}
                {label}
              </Button>
            ))}
          </div>
        )}

        <div className="flex flex-1 items-center justify-center">
          {isClient ? (
            <Garden schema={activeSchema} layout={layout} />
          ) : (
            "Loading visualizer..."
          )}
        </div>
      </TabsContent>

      <TabsContent value="edit" className="mt-6">
        <SchemaEditor />
      </TabsContent>
    </Tabs>
  );
};

export default GardenTabs;
