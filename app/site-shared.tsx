import Link from "next/link";

const publicBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nav = [
  ["About", "/about"],
  ["Production", "/production"],
  ["Capabilities", "/products"],
  ["Contact", "/contact"],
] as const;

export function SiteHeader({ theme = "dark" }: { theme?: "dark" | "light" }) {
  return (
    <header className={`nw-nav nw-nav--${theme}`}>
      <Link className="nw-logo" href="/" aria-label="NORDWOOD home">
        <img src={`${publicBase}${theme === "dark" ? "/brand/nordwood-logo-light.svg" : "/brand/nordwood-logo.svg"}`} alt="NORDWOOD" />
      </Link>
      <nav className="nw-desktop-nav" aria-label="Primary navigation">
        {nav.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}
      </nav>
      <div className="nw-nav-end">
        <span className="nw-market">EUROPEAN B2B</span>
        <Link className="nw-nav-cta" href="/contact">Start a project <span>↗</span></Link>
      </div>
      <details className="nw-mobile-menu">
        <summary aria-label="Open menu"><span>Menu</span><b>＋</b></summary>
        <div>
          {nav.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}
          <Link href="/contact">Start a project ↗</Link>
        </div>
      </details>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="nw-footer">
      <div className="nw-footer-top">
        <div>
          <Link className="nw-logo nw-logo--footer" href="/"><img src={`${publicBase}/brand/nordwood-logo-light.svg`} alt="NORDWOOD" /></Link>
          <p>Industrial parquet production in North Macedonia, developed with a clear orientation toward the European market.</p>
        </div>
        <div>
          <span className="nw-footer-label">EXPLORE</span>
          <Link href="/about">About NORDWOOD</Link>
          <Link href="/production">Production</Link>
          <Link href="/products">Capabilities</Link>
          <Link href="/contact">Project planner</Link>
        </div>
        <div>
          <span className="nw-footer-label">COMMERCIAL</span>
          <a href="mailto:sales@nordwood.eu">sales@nordwood.eu</a>
          <span>North Macedonia</span>
          <span>European market</span>
        </div>
        <div>
          <span className="nw-footer-label">CAPABILITIES</span>
          <span>Parquet processing</span>
          <span>Profiling &amp; finishing</span>
          <span>Quality control &amp; storage</span>
          <span>Logistics preparation</span>
        </div>
      </div>
      <div className="nw-footer-bottom"><span>© 2026 NORDWOOD</span><span>Precision at scale.</span><span>North Macedonia → Europe</span></div>
    </footer>
  );
}
