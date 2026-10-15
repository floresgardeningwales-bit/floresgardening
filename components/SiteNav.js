'use client';
import Link from 'next/link';
import BotanicalSprig from './BotanicalSprig';
const links = [['/services','Our services'],['/#about','Meet Hannah'],['/#wildlife','Our approach'],['/#areas','Areas we cover']];
export default function SiteNav({ editorialHome = false }) {
 return <header className={`siteNav ${editorialHome ? 'editorialNav' : ''}`}><a className="skipLink" href="#main">Skip to content</a><Link className="brand" href="/" aria-label="Flores Gardening home"><img src="/logo-mark-96.png" alt="" width="52" height="52" />{!editorialHome && <span className="brandName">Flores<span>Gardening</span></span>}</Link><nav className="navDesktop" aria-label="Main navigation">{editorialHome && <Link href="/" aria-current="page">Home</Link>}{links.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}<Link className="navCta" href="/contact">Get a quote <span aria-hidden="true">↗</span></Link></nav>{editorialHome && <a href="/#areas" className="navLocale">Cardiff &amp; the Vale <BotanicalSprig /></a>}<details className="navMobile"><summary>Menu</summary><nav aria-label="Mobile navigation">{links.map(([href,label])=><Link key={href} href={href} onClick={(e) => e.currentTarget.closest('details')?.removeAttribute('open')}>{label}</Link>)}<Link className="navCta" href="/contact">Get a quote ↗</Link></nav></details></header>;
}
