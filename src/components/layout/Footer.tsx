import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <p className="text-sm text-muted-foreground">
          © 2026 Zap. Links stored locally in your browser.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
