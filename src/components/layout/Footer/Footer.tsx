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

      <a
        className="text-muted-foreground text-xs transition-colors hover:text-primary"
        href="https://omni.dev/legal/terms"
        target="_blank"
        rel="noopener noreferrer"
      >
        Terms of Service
      </a>

      <a
        className="text-muted-foreground text-xs transition-colors hover:text-primary"
        href="https://omni.dev/legal/privacy"
        target="_blank"
        rel="noopener noreferrer"
      >
        Privacy Policy
      </a>
    </nav>
  </footer>
);

export default Footer;
