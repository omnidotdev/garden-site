import { createFlagProvider } from "@omnidotdev/providers/flags";

import { FLAGS_API_HOST, FLAGS_CLIENT_KEY } from "@/lib/config/env.config";

/**
 * Server-only feature flag provider. The underlying Unleash client pulls in
 * Node built-ins (node:stream, node:net, createRequire), so this module must
 * never reach the client bundle: import it only via a dynamic import inside a
 * server function handler, which the framework strips from the browser build.
 */
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
