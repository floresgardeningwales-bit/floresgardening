import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="footBrand">
        <img src="/logo-mark.webp" alt="Flores Gardening logo" width="104" height="104" loading="lazy" />
        <p>Female-led, wildlife-friendly garden care in Cardiff and the Vale of Glamorgan.</p>
      </div>
      <nav aria-label="Footer navigation" className="footNav">
        <Link href="/services">Services</Link>
        <Link href="/#wildlife">Wildlife-friendly gardening</Link>
        <Link href="/#seasons">Through the year</Link>
        <Link href="/#areas">Areas we cover</Link>
        <Link href="/contact">Get a quote</Link>
      </nav>
      <p className="footSmall">Garden-scale work only: no large trees or hard landscaping. Green-waste removal is agreed separately when we quote.</p>
      <p className="footSmall">© {new Date().getFullYear()} Flores Gardening</p>
    </footer>
  );
}
