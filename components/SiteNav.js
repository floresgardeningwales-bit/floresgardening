import Link from 'next/link';

const links = [
  ['/services', 'Services'],
  ['/#wildlife', 'Wildlife-friendly'],
  ['/#seasons', 'Through the year'],
  ['/#areas', 'Areas'],
];

export default function SiteNav({ tone = 'pollen' }) {
  return (
    <header className={`siteNav nav-${tone}`}>
      <a className="skipLink" href="#main">Skip to content</a>
      <Link href="/" className="brand" aria-label="Flores Gardening home">
        <img src="/logo-mark-96.png" alt="" width="48" height="48" />
        <span>Flores Gardening</span>
      </Link>
      <nav aria-label="Main navigation" className="navDesktop">
        {links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
        <Link href="/contact" className="navCta">Get a quote</Link>
      </nav>
      <details className="navMobile">
        <summary>Menu</summary>
        <nav aria-label="Mobile navigation">
          {links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
          <Link href="/contact" className="navCta">Get a quote</Link>
        </nav>
      </details>
    </header>
  );
}
