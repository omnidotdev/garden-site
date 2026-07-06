import "@omnidotdev/garden/styles.css";

import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { Footer, Header } from "@/components/layout";
import appCss from "@/lib/styles/globals.css?url";
import createMetaTags from "@/lib/util/createMetaTags";
import { ThemeProvider } from "@/providers";
import { getTheme } from "@/server/functions/theme";

import type { QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";

/** Canonical production URL. */
const SITE_URL = "https://garden.omni.dev";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  loader: () => getTheme(),
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "default",
      },
      { name: "mobile-web-app-capable", content: "yes" },
      ...createMetaTags(),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon-16x16.png",
        sizes: "16x16",
      },
      // .ico fallback for surfaces that don't read SVG favicons (link previews, iMessage)
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      { rel: "canonical", href: SITE_URL },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Garden",
          url: SITE_URL,
          description: "Visualize your product, service, and other ecosystems.",
        }),
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const theme = Route.useLoaderData();

  return (
    <html lang="en" className={theme}>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <div className="grid h-dvh w-full grid-rows-[auto_1fr_auto]">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>

        <TanStackDevtools
          plugins={[
            {
              name: "Router",
              render: <TanStackRouterDevtoolsPanel />,
              defaultOpen: true,
            },
            {
              name: "Query",
              render: <ReactQueryDevtoolsPanel />,
            },
          ]}
        />

        <Scripts />
      </body>
    </html>
  );
}
