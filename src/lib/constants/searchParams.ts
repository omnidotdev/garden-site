import { z } from "zod";

export const visualizerSearchSchema = z.object({
  fontSize: z.number().optional().default(14),
  editorExpanded: z.boolean().optional().default(false),
  activeTab: z.string().optional().default("visualize"),
  /** Whether typed connections are shown in the visualizer (shareable). */
  connections: z.boolean().optional().default(false),
});

export type VisualizerSearch = z.infer<typeof visualizerSearchSchema>;
