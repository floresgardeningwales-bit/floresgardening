import Link from 'next/link';
import styles from './MeetHannah.module.css';

export default function MeetHannah() {
  return (
    <section className={`wrap sectionSpace ${styles.section}`} id="about" aria-labelledby="hannah-title">
      <div className={styles.heading}>
        <p className="eyebrow">The gardener behind Flores</p>
        <h2 id="hannah-title">Meet Hannah.</h2>
      </div>
      <div className={styles.grid}>
        <figure className={styles.portrait}>
          <img src="/hannah-flores.webp" alt="Hannah, owner of Flores Gardening, standing among leafy garden plants" width="1200" height="1398" loading="lazy" decoding="async" />
          <figcaption>Hannah · Founder &amp; gardener<br />Cardiff &amp; the Vale of Glamorgan</figcaption>
          <blockquote>“I see gardening as a collaboration between myself, the customer and the garden itself.”</blockquote>
        </figure>
        <div className={styles.bio}>
          <p className={styles.hello}>Hello! I&apos;m Hannah, a gardener based in Cardiff and the Vale of Glamorgan.</p>
          <p>I&apos;ve always felt drawn to nature, finding inspiration in the natural world and a sense of connection in being outdoors. Over time, that connection grew into something I wanted to share with others.</p>
          <p>For me, gardening is about so much more than keeping a garden tidy. It&apos;s about creating spaces that bring joy, giving plants the care they need to thrive, and making room for the wildlife that shares our gardens with us.</p>
          <p>Flores Gardening grew out of a desire to build something of my own, here in the part of Wales I call home. After volunteering on permaculture farms in South America, working in stately homes in Hampshire, and tending to my own gardens in London, I felt it was time to bring my passion back to South Wales. I wanted to help others enjoy their gardens and outdoor spaces, whatever their needs or ambitions for them.</p>
          <p>My approach is ecological and wildlife-friendly wherever possible. I believe our gardens can be beautiful, useful and full of life, whether through thoughtful planting, caring for established borders, encouraging pollinators, or finding a balance between a well-loved garden and the natural world.</p>
          <p>I see gardening as a collaboration between myself, the customer and the garden itself. Every space has its own character, and I love the process of understanding what makes a garden special and helping it flourish in a way that works for both the people who enjoy it and the wildlife that calls it home.</p>
          <p>I&apos;d love to hear about your garden and explore how we can help it flourish together!</p>
          <Link className="textLink" href="/contact">Tell me about your garden <span aria-hidden="true">↗︎</span></Link>
        </div>
      </div>
    </section>
  );
}
