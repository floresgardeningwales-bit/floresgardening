import Link from 'next/link';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import PostcodeCheck from '../components/PostcodeCheck';
import SeasonAlmanac from '../components/SeasonAlmanac';
import { Icon } from '../components/Icons';
import { regularCare, oneOffJobs, practices, process, places } from '../lib/content';

export default function Home() {
  return <>
    <SiteNav />
    <main id="main">
      <section className="hero">
        <div className="heroInner">
          <div className="heroCopy">
            <p className="heroKicker">Female-led garden care in Cardiff and the Vale of Glamorgan</p>
            <h1>Tidy where it matters.<br /><em>Wild where it counts.</em></h1>
            <p className="heroLede">Regular maintenance, pruning, planting and one-off clearances, done with care for the bees, birds and beetles that share your garden.</p>
            <div className="heroActions">
              <Link className="button primary" href="/contact">Let’s talk about your garden <span aria-hidden="true">↗</span></Link>
              <Link className="heroTextLink" href="/services">Explore our services <span aria-hidden="true">→</span></Link>
            </div>
            <p className="heroSmall">A little regular care. A fresh start. Room for nature.</p>
          </div>
          <div className="heroMark">
            <p className="markEyebrow">A little care goes a long way</p>
            <img src="/logo-mark.webp" alt="Flores Gardening logo: a gardener carrying a watering can full of flowers" width="520" height="520" fetchPriority="high" />
            <p className="markCaption">For your patch.<br /><em>And everything that calls it home.</em></p>
          </div>
        </div>
        <div className="heroRibbon wrap" aria-label="Our approach">
          <span><Icon name="seedhead" /> Thoughtful garden care</span>
          <span><Icon name="bee" /> Wildlife welcome</span>
          <a href="#areas">Cardiff &amp; the Vale <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="help wrap" aria-labelledby="help-title">
        <div className="helpHead">
          <div><p className="sectionLabel">A helping hand, however you need it</p><h2 id="help-title">Your garden.<br /><em>In good hands.</em></h2></div>
          <p>Most gardens need a bit of both: steady care through the year, and the odd bigger job when things get ahead of you.</p>
        </div>
        <div className="helpCols">
          <div className="helpCol">
            <span className="serviceNumber">01 / Little and often</span><h3>Regular care</h3>
            <p>Fortnightly, monthly or seasonal visits that keep the garden on track.</p>
            <ul className="tickList">{regularCare.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
          <div className="helpCol">
            <span className="serviceNumber">02 / A fresh start</span><h3>One-off jobs</h3>
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
            <div><p className="sectionLabel">A gentler way to garden</p><h2 id="wild-title">Neat borders.<br /><em>Wilder hearts.</em></h2></div>
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
          <div><p className="sectionLabel">Nature sets the pace</p><h2 id="seasons-title">A year in<br /><em>the garden.</em></h2></div>
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
          <Link className="button blossom" href="/contact">Request a quote</Link>
        </div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
