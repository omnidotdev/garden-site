import { AppFooter } from "@omnidotdev/thornberry/app-footer";

/** Garden catalog symbol (mirrors omni-api catalog SSOT `products.ts`). */
const PRODUCT_SYMBOL = "🌱";

/**
 * Layout footer. Renders the shared Omni `<AppFooter>`, which bakes in the
 * "Made with <symbol> by Omni" credit, the omni.dev link, and the legal links so
 * they can't drift. Garden supplies only its catalog symbol and docs link.
 */
const Footer = () => (
  <AppFooter
    appSymbol={PRODUCT_SYMBOL}
    docsUrl="https://docs.omni.dev/garden/overview"
    orgUrl="https://omni.dev"
  />
);

export default Footer;
