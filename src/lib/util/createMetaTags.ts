interface Params {
  /** Page-specific title. Suffixed with the app name. */
  title?: string;
  /** Page-specific description. Falls back to the app description. */
  description?: string;
  /** Absolute OpenGraph/Twitter image URL. Falls back to the default OG image. */
  image?: string;
  /** Comma-separated keywords. */
  keywords?: string;
  /** Canonical URL for the page. Falls back to the production URL. */
  url?: string;
}

// App identity defaults (mirrors the canonical values in __root.tsx)
const APP_NAME = "Garden";
const APP_DESCRIPTION =
  "Visualize your product, service, and other ecosystems.";
const APP_URL = "https://garden.omni.dev";
const TWITTER_HANDLE = "@omnidotdev";

/**
 * Create social/SEO meta tags (title, description, OpenGraph, Twitter card).
 * Mirrors the omni template pattern so link previews render consistently across the fleet.
 */
const createMetaTags = ({
  title: _title,
  description: _description,
  url: _url,
  image,
  keywords,
}: Params = {}) => {
  const title = _title ? `${_title} | ${APP_NAME}` : APP_NAME,
    description = _description ?? APP_DESCRIPTION,
    url = _url ?? APP_URL,
    ogImage = image ?? `${APP_URL}/og.png`;

  return [
    { title },
    { name: "description", content: description },
    ...(keywords ? [{ name: "keywords", content: keywords }] : []),
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: TWITTER_HANDLE },
    { name: "twitter:url", content: url },
    { name: "twitter:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
  ];
};

export default createMetaTags;
