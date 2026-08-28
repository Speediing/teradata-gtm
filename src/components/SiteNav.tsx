import { BrandLockup } from "./BrandLockup";

export function SiteNav() {
  return (
    <header className="site-header site-header-over">
      <a href="#top" className="nav-brand">
        <BrandLockup size="sm" />
      </a>
      <nav className="header-actions" aria-label="On this page">
        <a className="text-button" href="#jobs">
          Use cases
        </a>
        <a className="text-button" href="#compare">
          Comparison
        </a>
      </nav>
    </header>
  );
}
