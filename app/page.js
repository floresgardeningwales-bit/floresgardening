import Link from 'next/link';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import PostcodeCheck from '../components/PostcodeCheck';
import SeasonAlmanac from '../components/SeasonAlmanac';
import { Icon, HedgeEdge } from '../components/Icons';
import { regularCare, oneOffJobs, practices, process, places } from '../lib/content';

export default function Home() {
  return <>
    <SiteNav />
    <main id="main">
      <section className="hero">
        <div className="heroInner">
          <div className="heroCopy">
            <p className="heroKicker">Female-led garden care in Cardiff and the Vale of Glamorgan</p>
            <h1>Tidy where it matters. Wild where it counts.</h1>
            <p className="heroLede">Regular maintenance, pruning, planting and one-off clearances, done with care for the bees, birds and beetles that share your garden.</p>
            <PostcodeCheck id="hero-postcode" />
          </div>
          <div className="heroMark">
            <img src="/logo-mark.webp" alt="Flores Gardening logo: a gardener carrying a watering can full of flowers" width="520" height="520" fetchPriority="high" />
          </div>
        </div>
        <HedgeEdge />
      </section>

      <section className="help wrap" aria-labelledby="help-title">
        <div className="helpHead">
          <h2 id="help-title">Two ways we can help</h2>
          <p>Most gardens need a bit of both: steady care through the year, and the odd bigger job when things get ahead of you.</p>
        </div>
        <div className="helpCols">
          <div className="helpCol">
            <h3>Regular care</h3>
            <p>Fortnightly, monthly or seasonal visits that keep the garden on track.</p>
            <ul className="tickList">{regularCare.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
          <div className="helpCol">
            <h3>One-off jobs</h3>
            <p>A reset for a garden that’s got away from you, or a specialist job done properly.</p>
            <ul className="tickList">{oneOffJobs.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        </div>
        <div className="helpFoot">
          <p>We work at garden scale, so no large trees or hard landscaping. Green-waste removal isn’t included by default; we’ll agree how it’s handled when we quote.</p>
          <Link className="button outline" href="/services">See all services</Link>
        </div>
      </section>

      <section className="wild" id="wildlife" aria-labelledby="wild-title">
        <div className="wrap">
          <div className="wildHead">
            <h2 id="wild-title">Gardening with the wildlife that’s already there</h2>
            <p>A cared-for garden and a wildlife-friendly one aren’t opposites. These are small habits we bring to every visit, and you choose how far to take them.</p>
          </div>
          <ul className="practiceGrid">
            {practices.map((p) => (
              <li key={p.title}>
                <span className="practiceIcon"><Icon name={p.icon} /></span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
          <p className="wildNote">It’s always your garden and your call. We suggest, we don’t insist.</p>
        </div>
      </section>

      <section className="seasons wrap" id="seasons" aria-labelledby="seasons-title">
        <div className="seasonsHead">
          <h2 id="seasons-title">A year in the garden</h2>
          <p>Good garden care follows the seasons. Here’s what we’re usually doing, and when.</p>
        </div>
        <SeasonAlmanac />
      </section>

      <section className="steps wrap" aria-labelledby="steps-title">
        <h2 id="steps-title">How it works</h2>
        <ol className="stepList">
          {process.map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}
        </ol>
      </section>

      <section className="areas" id="areas" aria-labelledby="areas-title">
        <div className="wrap areasInner">
          <div>
            <h2 id="areas-title">Around Cardiff and the Vale</h2>
            <p>We look after home gardens across Cardiff and the Vale of Glamorgan. If you’re near the edge, check your postcode or just ask.</p>
            <PostcodeCheck id="areas-postcode" />
          </div>
          <ul className="placeList">{places.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
      </section>

      <section className="closing">
        <div className="wrap closingInner">
          <h2>Got a garden that needs a hand?</h2>
          <p>Tell us your postcode and what you have in mind. Even “it’s all a bit much” is a good place to start.</p>
          <Link className="button pollen" href="/contact">Request a quote</Link>
        </div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
