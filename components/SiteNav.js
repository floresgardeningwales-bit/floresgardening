import Link from 'next/link';
export default function SiteNav(){return <header className="siteNav"><Link href="/" className="brand"><img src="/logo.jpg" alt="Flores"/><span>FLORES</span></Link><nav><Link href="/services">Services</Link><a href="#areas">Areas</a><a href="#approach">Approach</a><Link href="/contact" className="navCta">Request a garden visit</Link></nav></header>}
