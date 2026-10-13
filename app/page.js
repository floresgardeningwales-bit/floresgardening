import Link from 'next/link';
import SiteNav from '../components/SiteNav';

const highlights = [
  { number: '01', title: 'Regular garden care', text: 'Weeding, lawns, borders, pruning and seasonal cutbacks to keep your garden feeling loved and looked after.' },
  { number: '02', title: 'Thoughtful planting', text: 'Planting and fruit-tree care that help your garden thrive through the seasons, not just look good for a week.' },
  { number: '03', title: 'Wildlife in mind', text: 'A lighter-touch approach that makes room for pollinators, birds and the small wild things that make a garden feel alive.' },
];

export default function Home() {
  return <>
    <SiteNav />
    <main>
      <section className="hero">
        <div className="heroCopy">
          <p className="eyebrow"><span className="eyebrowDot" /> FEMALE-LED · ECOLOGICAL GARDENING</p>
          <h1>A little more wild.<br /><em>A lot more cared for.</em></h1>
          <p className="lede">Friendly, thoughtful garden care for homes across Cardiff and the Vale of Glamorgan. From regular maintenance to wildlife-friendly planting, we help your garden flourish in its own way.</p>
          <div className="heroActions">
            <Link className="button primary" href="/contact">Let’s talk about your garden <span aria-hidden="true">↗</span></Link>
            <Link className="textLink" href="/services">Explore services <span aria-hidden="true">→</span></Link>
          </div>
          <div className="trustLine"><span><b>✓</b> Reliable regular visits</span><span><b>✓</b> Seasonal, considered care</span><span><b>✓</b> Wildlife-friendly thinking</span></div>
        </div>
        <div className="heroArt">
          <div className="artHalo" />
          <img src="/logo.jpg" alt="Flores Gardening’s hand-drawn illustration of a gardener with flowers and a watering can" />
          <p className="artNote">Good gardens grow<br /><em>with a little care.</em></p>
        </div>
      </section>

      <section className="welcomeBand" id="approach">
        <div className="welcomeMark" aria-hidden="true">✳</div>
        <div><p className="eyebrow">A GENTLER KIND OF GARDENING</p><h2>Care for your garden.<br /><em>Make space for nature.</em></h2></div>
        <p>Not every garden needs to be perfectly polished. We focus on what helps your space look cared for, grow well and support the wildlife around it — with practical advice and a friendly face along the way.</p>
      </section>

      <section className="offerSection section">
        <div className="sectionHeading"><div><p className="eyebrow">HOW FLORES CAN HELP</p><h2>Good things grow<br /><em>with the right care.</em></h2></div><p>Whether you need a regular helping hand or a fresh start for an overgrown space, we’ll find an approach that suits your garden.</p></div>
        <div className="offerGrid">{highlights.map((item) => <article className="offerCard" key={item.number}><span className="offerNumber">{item.number}</span><div className="offerLeaf" aria-hidden="true">✳</div><h3>{item.title}</h3><p>{item.text}</p><Link href="/services">Find out more <span aria-hidden="true">→</span></Link></article>)}</div>
        <div className="centerAction"><Link className="button ghost" href="/services">View all services</Link></div>
      </section>

      <section className="localBand" id="areas"><div className="localCopy"><p className="eyebrow">ROOTED IN SOUTH WALES</p><h2>Local gardens.<br /><em>Thoughtful care.</em></h2><p>Flores Gardening is based around Cardiff and the Vale of Glamorgan, with a focus on established home gardens and the people who love them.</p><p className="localPlaces">Cardiff <span>✳</span> Penarth <span>✳</span> Cowbridge <span>✳</span> The Vale</p></div><div className="localCard"><span className="localCardIcon" aria-hidden="true">✿</span><h3>Not sure if we cover your area?</h3><p>Send your postcode and a little about your garden. We’ll let you know if we can help.</p><Link className="button lightButton" href="/contact">Check your area <span aria-hidden="true">↗</span></Link></div></section>

      <section className="closingCta"><p className="eyebrow">YOUR GARDEN, YOUR WAY</p><h2>Let’s help your garden<br /><em>find its feet.</em></h2><p>Tell us what you have in mind — even if it’s just a garden that needs a bit of love.</p><Link className="button primary" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link></section>
    </main>
    <footer className="siteFooter"><Link href="/" className="footerBrand">FLORES <span>GARDENING</span></Link><span>Garden maintenance · pruning · planting · wildlife-friendly care</span><Link href="/contact">Get in touch ↗</Link></footer>
  </>;
}
