import Link from 'next/link';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import { serviceGroups } from '../../lib/content';

export const metadata = {
  title: 'Garden services',
  description: 'Regular garden maintenance, hedges, pruning, planting, fruit-tree work and one-off clearances across Cardiff and the Vale of Glamorgan.',
};

export default function Services() {
  return <>
    <SiteNav tone="paper" />
    <main id="main">
      <header className="pageHead wrap">
        <p className="eyebrow">Gardening services · Cardiff &amp; the Vale</p><h1>The care your garden needs.</h1>
        <p className="pageLede">From keeping on top of the everyday jobs to bringing an overgrown space back into use. Find the right help for your garden, with seasonal care and wildlife in mind.</p>
        <nav className="jumpLinks" aria-label="Service groups">
          {serviceGroups.map((g) => <a key={g.id} href={`#${g.id}`}>{g.title}</a>)}
        </nav>
      </header>

      {serviceGroups.map((group) => (
        <section key={group.id} id={group.id} className={`serviceGroup group-${group.id}`} aria-labelledby={`${group.id}-title`}>
          <div className="wrap serviceGroupInner">
            <div className="serviceGroupHead">
              <h2 id={`${group.id}-title`}>{group.title}</h2>
              <p>{group.intro}</p><Link className="textLink" href="/contact">Enquire about this service <span aria-hidden="true">↗</span></Link>
            </div>
            <dl className="serviceRows">
              {group.services.map(([name, text]) => (
                <div key={name}><dt>{name}</dt><dd>{text}</dd></div>
              ))}
            </dl>
          </div>
        </section>
      ))}

      <section className="wrap goodToKnow" aria-labelledby="know-title">
        <h2 id="know-title">Good to know before you ask</h2>
        <div className="knowGrid">
          <div>
            <h3>How quotes work</h3>
            <p>We’ll look at the garden, or photos of it, and send a clear quote that says what’s included and how often. Nothing starts until you’ve agreed it.</p>
          </div>
          <div>
            <h3>Green waste</h3>
            <p>Removal isn’t included by default. Clippings can be left neatly on site or go in your own garden-waste arrangement, or we can quote for taking it away.</p>
          </div>
          <div>
            <h3>What we don’t do</h3>
            <p>Large trees, tree surgery and hard landscaping like patios or walls. If that’s what you need, we’ll say so straight away.</p>
          </div>
        </div>
        <Link className="button primary" href="/contact">Request a quote</Link>
      </section>
    </main>
    <SiteFooter />
  </>;
}
