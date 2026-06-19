import { LEGAL_FOOTER_LINKS } from "@omnidotdev/providers/legal";

/**
 * Layout footer.
 */
const Footer = () => (
  <footer className="mt-auto flex w-full shrink-0 flex-col items-center gap-1 border-border border-t p-4 sm:flex-row md:px-6">
    <p className="text-muted-foreground text-xs">
      © {new Date().getFullYear()} Omni
    </p>

    <nav className="flex gap-4 sm:ml-auto sm:gap-6">
      <a
        className="text-muted-foreground text-xs transition-colors hover:text-primary"
        href="https://docs.omni.dev/garden/overview"
        target="_blank"
        rel="noopener noreferrer"
      >
        Docs
      </a>

      {LEGAL_FOOTER_LINKS.map((link) => (
        <a
          key={link.href}
          className="text-muted-foreground text-xs transition-colors hover:text-primary"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      ))}
    </nav>
  </footer>
);

export default Footer;
