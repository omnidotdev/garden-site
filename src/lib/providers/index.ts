import { createFlagProvider } from "@omnidotdev/providers";
import { createServerFn } from "@tanstack/react-start";

import { FLAGS_API_HOST, FLAGS_CLIENT_KEY } from "@/lib/config/env.config";

export const flags = createFlagProvider(
  FLAGS_API_HOST
    ? {
        provider: "unleash",
        url: FLAGS_API_HOST,
        apiKey: FLAGS_CLIENT_KEY!,
        appName: "garden-site",
      }
    : {},
);

export const FLAGS = {
  MAINTENANCE: "garden-maintenance",
} as const;

/**
 * Fetch the value of the maintenance mode feature flag.
 */
export const fetchMaintenanceMode = createServerFn({ method: "GET" }).handler(
  async () => {
    const isMaintenanceMode = await flags.isEnabled(FLAGS.MAINTENANCE);
    return { isMaintenanceMode };
  },
);
