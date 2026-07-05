import { createServerFn } from "@tanstack/react-start";

export const FLAGS = {
  MAINTENANCE: "garden-maintenance",
} as const;

/**
 * Fetch the value of the maintenance mode feature flag.
 *
 * The flag provider is imported lazily inside the handler (never at module top
 * level) so its Node-only dependencies stay out of the client bundle. See
 * `./flags`.
 */
export const fetchMaintenanceMode = createServerFn({ method: "GET" }).handler(
  async () => {
    const { flags } = await import("./flags");
    const isMaintenanceMode = await flags.isEnabled(FLAGS.MAINTENANCE);
    return { isMaintenanceMode };
  },
);
