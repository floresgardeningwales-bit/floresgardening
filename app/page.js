import Link from 'next/link';
import SiteNav from '../components/SiteNav';
import MeetHannah from '../components/MeetHannah';
import BeforeAfterGallery from '../components/BeforeAfterGallery';
import CompletedGardens from '../components/CompletedGardens';
import BotanicalSprig from '../components/BotanicalSprig';
import SiteFooter from '../components/SiteFooter';
import PostcodeCheck from '../components/PostcodeCheck';
import SeasonAlmanac from '../components/SeasonAlmanac';
import { practices, places } from '../lib/content';

const services = [
  ['01', 'Regular garden care', 'A garden that stays manageable, with the everyday jobs taken care of.', 'Mowing, edging, weeding, border care and seasonal tidying.', '/services#regular'],
  ['02', 'Pruning & hedge care', 'The right cut, at the right time, to keep plants healthy and in shape.', 'Garden hedges, shrubs, climbers and fruit trees.', '/services#pruning'],
  ['03', 'Planting & borders', 'Bring life to an empty corner or give an established border a fresh start.', 'New planting, border refreshes and flowers for pollinators.', '/services#planting'],
  ['04', 'One-off garden resets', 'When the garden has got ahead of you, we help you find your way back in.', 'Overgrowth, brambles, seasonal clearances and neglected beds.', '/services#one-off'],
];
const questions = [
  ['Can I book a one-off visit?', 'Yes. We can help with a specific job or an overgrown garden, as well as regular fortnightly, monthly or seasonal care. Tell us what needs doing and we’ll suggest a sensible starting point.'],
  ['How much will it cost?', 'Every garden needs something different. We’ll discuss the work and arrange a look at the garden where needed, then give you a quote with the scope and any extras clearly set out.'],
  ['Do you take away the green waste?', 'Green-waste arrangements are agreed as part of your quote. Removal is not automatically included; we’ll discuss what can stay on site and what needs to be taken away.'],
  ['Does wildlife-friendly mean leaving everything wild?', 'No. A garden can have clear paths, neat edges and space for nature. We’ll discuss where you want a tidy finish and where a few seedheads, flowers or a sheltered corner could help wildlife.'],
];

export default function Home() {
  return <>
    <SiteNav editorialHome />
    <main id="main">
      <section className="editorialHero" aria-labelledby="flores-title">
        <div className="editorialMasthead">
          <h1 id="flores-title">FLORES<span>GARDENING</span></h1>
          <BotanicalSprig className="mastheadBotanical botanicalLeft" />
          <BotanicalSprig className="mastheadBotanical botanicalRight" variant="rose" />
        </div>
        <div className="editorialTriptych" aria-label="Garden photography">
          <img className="triptychStructure" src="/flores-garden-structure.jpg" alt="Layered flowering borders and leafy trees around a curved stone garden structure" width="1200" height="1600" fetchPriority="high" />
          <img className="triptychLawn" src="/flores-lawn-borders.jpg" alt="A neatly mown lawn with blue delphiniums and colourful borders" width="1200" height="1600" fetchPriority="high" />
          <img className="triptychFlowers" src="/flores-flower-detail.jpg" alt="Pink cosmos and warm orange flowers among fine green foliage" width="1200" height="1600" fetchPriority="high" />
        </div>
        <div className="editorialStatement">
          <h2>A little care. A lot of life.</h2>
          <p>Female-led garden care in Cardiff &amp; the Vale.</p>
          <Link className="textLink" href="/services">Find your garden care <span aria-hidden="true">↗︎</span></Link>
        </div>
        <div className="editorialServices">
          {[
            ['01 / CARE', 'Regular garden maintenance', 'Thoughtful, seasonal care to keep your garden healthy and looking its best.', '/services#regular'],
            ['02 / PLANT', 'Pruning, planting & borders', 'The right care and planting for a garden that keeps on growing.', '/services#planting'],
            ['03 / RENEW', 'Garden clearances & wildlife-friendly care', 'A fresh start for your space, with room for the life within it.', '/services#one-off'],
          ].map(([label,title,text,href]) => <Link href={href} className="editorialService" key={label}><span className="editorialServiceLabel">{label}</span><div><BotanicalSprig className="serviceSprig" variant={label.startsWith('02') ? 'flower' : label.startsWith('03') ? 'bee' : 'leaf'} /><div><h3>{title}</h3><p>{text}</p></div></div></Link>)}
        </div>
      </section>

      <MeetHannah />

      <section className="servicesSection wrap sectionSpace" id="services" aria-labelledby="services-title">
        <div className="sectionHead"><div><p className="eyebrow">How we can help</p><h2 id="services-title">A little help.<br />A lasting difference.</h2></div><p>From the jobs that come round every fortnight to the ones you’ve been putting off. Choose the care your garden needs.</p></div>
        <div className="serviceIndex">{services.map(([number,title,description,detail,href])=><Link key={number} className="serviceItem" href={href}><span className="serviceNumber">{number}</span><h3>{title}</h3><div><p>{description}</p><span className="serviceDetail">{detail}</span></div><span className="serviceArrow" aria-hidden="true">↗︎</span></Link>)}</div>
        <p className="serviceScope">Home gardens, cared for properly. For large trees, tree surgery or hard landscaping, you’ll need a different specialist.</p>
      </section>

      <CompletedGardens />

      <BeforeAfterGallery />

      <section className="natureSection" id="wildlife" aria-labelledby="nature-title">
        <div className="wrap natureGrid">
          <figure className="naturePhoto"><img src="/flores-garden-structure.jpg" width="1200" height="1600" loading="lazy" alt="A planted garden border with flowers, trees and a curved stone structure" /><figcaption>Planting, texture and space for nature.</figcaption></figure>
          <div className="natureCopy"><p className="eyebrow">Our approach</p><h2 id="nature-title">Well cared for.<br />Full of life.</h2><p>A lovely garden has more going on than meets the eye. We make room for the birds, bees and other small lives that help it thrive.</p><ul className="natureList">{practices.map(p=><li key={p.title}><h3>{p.title}</h3><p>{p.text}</p></li>)}</ul><p className="natureNote">How wild you go is always up to you.</p></div>
        </div>
      </section>

      <section className="seasons wrap sectionSpace" id="seasons" aria-labelledby="seasons-title"><div className="sectionHead"><div><p className="eyebrow">Care through the year</p><h2 id="seasons-title">Every season has its jobs.</h2></div><p>We plan the work around what your garden needs now, and what will help it in the months ahead.</p></div><SeasonAlmanac /></section>

      <section className="steps wrap sectionSpace" aria-labelledby="steps-title"><div className="sectionHead"><div><p className="eyebrow">Getting started</p><h2 id="steps-title">Let’s take it from here.</h2></div><Link className="textLink" href="/contact">Request a quote <span aria-hidden="true">↗︎</span></Link></div><ol className="stepList"><li><span>01</span><h3>Tell us what you need</h3><p>Your postcode, a little about the garden and the jobs you have in mind. You don’t need to know all the plant names.</p></li><li><span>02</span><h3>Agree the work</h3><p>We’ll discuss the garden, arrange a visit where needed and put together a clear quote, including the green-waste arrangements.</p></li><li><span>03</span><h3>Make room to enjoy it</h3><p>Choose regular visits or a one-off job. We get to work on the plan you’ve agreed, with care for your garden and its wildlife.</p></li></ol></section>

      <section className="areas" id="areas" aria-labelledby="areas-title"><div className="wrap areasInner"><div><p className="eyebrow">Our local patch</p><h2 id="areas-title">Cardiff.<br />The Vale.<br />Your garden.</h2><p>From city gardens to quieter village plots. Check your postcode to see whether you’re in our usual area.</p></div><div><ul className="placeList">{places.map(p=><li key={p}>{p}</li>)}</ul><PostcodeCheck id="areas-postcode" /></div></div></section>

      <section className="faqSection wrap sectionSpace" aria-labelledby="faq-title"><div><p className="eyebrow">A few practical details</p><h2 id="faq-title">Before we get growing.</h2></div><div className="faqList">{questions.map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>

      <section className="closing"><div className="wrap closingInner"><div><p className="eyebrow">Start with a conversation</p><h2>What would you love<br />from your garden?</h2></div><div><p>A tidier space, healthier plants, or simply one less thing on your list. Tell us what you have in mind.</p><Link className="button light" href="/contact">Request a garden quote <span aria-hidden="true">↗︎</span></Link></div></div></section>
    </main><SiteFooter />
  </>;
}
