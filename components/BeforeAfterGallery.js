'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import work from './gardenWork.json';
import styles from './BeforeAfterGallery.module.css';

export default function BeforeAfterGallery() {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(0);
  const dialog = useRef(null);
  const item = work[selected];
  function open(index) {
    setSelected(index);
    dialog.current?.showModal();
  }
  return (
    <section className={styles.section} id="garden-work" aria-labelledby="garden-work-title">
      <div className="wrap sectionSpace">
        <div className="sectionHead">
          <div><p className="eyebrow">A little care, in action</p><h2 id="garden-work-title">Before &amp; after.</h2></div>
          <p>From overgrown corners to freshly cared-for borders. Take a look at the difference a little thoughtful care can make.</p>
        </div>
        <div className={styles.grid} id="garden-work-grid">
          {work.map((photo, index) => (
            <figure key={photo.src} hidden={!expanded && index >= 3} className={styles.card}>
              <button type="button" className={styles.imageButton} onClick={() => open(index)} aria-label={`Enlarge before and after: ${photo.title}`} aria-haspopup="dialog">
                <img src={photo.src} width={photo.width} height={photo.height} loading="lazy" decoding="async" alt={`${photo.title}, before and after garden care`} />
                <span className={styles.enlarge} aria-hidden="true">View larger ↗</span>
              </button>
              <figcaption><span>{String(index + 1).padStart(2, '0')}</span><h3>{photo.title}</h3></figcaption>
            </figure>
          ))}
        </div>
        <div className={styles.actions}>
          <button type="button" className="button outline" aria-expanded={expanded} aria-controls="garden-work-grid" onClick={() => setExpanded(!expanded)}>{expanded ? 'Show fewer gardens' : `View all ${work.length} transformations`} <span aria-hidden="true">{expanded ? '−' : '+'}</span></button>
          <Link href="/contact" className="textLink">Let’s talk about your garden <span aria-hidden="true">↗︎</span></Link>
        </div>
      </div>
      <dialog ref={dialog} className={styles.dialog} aria-labelledby="garden-photo-title" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className={styles.viewer}>
          <div className={styles.viewerHead}><h3 id="garden-photo-title">{item.title}</h3><button type="button" onClick={() => dialog.current?.close()} autoFocus aria-label="Close enlarged photo">Close ×</button></div>
          <img className={styles.fullImage} src={item.src} width={item.width} height={item.height} alt={`${item.title}, before and after garden care`} />
          <div className={styles.viewerControls}><button type="button" aria-label="Previous comparison" onClick={() => setSelected((selected + work.length - 1) % work.length)}>← Previous</button><span aria-live="polite">{selected + 1} / {work.length}</span><button type="button" aria-label="Next comparison" onClick={() => setSelected((selected + 1) % work.length)}>Next →</button></div>
        </div>
      </dialog>
    </section>
  );
}
