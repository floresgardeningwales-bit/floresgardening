'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import work from './completedGardens.json';
import styles from './CompletedGardens.module.css';

export default function CompletedGardens() {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(0);
  const dialog = useRef(null);
  const item = work[selected];
  function open(index) {
    setSelected(index);
    dialog.current?.showModal();
  }
  return (
    <section className={styles.section} id="completed-gardens" aria-labelledby="completed-gardens-title">
      <div className="wrap sectionSpace">
        <div className="sectionHead">
          <div><p className="eyebrow">From Hannah’s gardening journal</p><h2 id="completed-gardens-title">Gardens I’ve cared for.</h2></div>
          <p>A selection of gardens, borders and seasonal planting from my work over the years. Each with its own character, each cared for with attention.</p>
        </div>
        <div className={styles.grid} id="completed-gardens-grid">
          {work.map((photo, index) => (
            <figure key={photo.src} hidden={!expanded && index >= 6} className={styles.card}>
              <button type="button" className={styles.imageButton} onClick={() => open(index)} aria-label={`Enlarge garden photograph: ${photo.title}`} aria-haspopup="dialog">
                <img src={photo.src} width={photo.width} height={photo.height} loading="lazy" decoding="async" alt={photo.title} />
                <span className={styles.enlarge} aria-hidden="true">View larger ↗</span>
              </button>
              <figcaption><span>{String(photo.number).padStart(2, '0')}</span><h3>{photo.title}</h3></figcaption>
            </figure>
          ))}
        </div>
        <div className={styles.actions}>
          <button type="button" className="button outline" aria-expanded={expanded} aria-controls="completed-gardens-grid" onClick={() => setExpanded(!expanded)}>{expanded ? 'Show fewer gardens' : `View all ${work.length} photographs`} <span aria-hidden="true">{expanded ? '−' : '+'}</span></button>
          <Link href="#garden-work" className="textLink">See the before & afters <span aria-hidden="true">↗︎</span></Link>
        </div>
      </div>
      <dialog ref={dialog} className={styles.dialog} aria-labelledby="completed-photo-title" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className={styles.viewer}>
          <div className={styles.viewerHead}><h3 id="completed-photo-title">{item.title}</h3><button type="button" onClick={() => dialog.current?.close()} autoFocus aria-label="Close enlarged photo">Close ×</button></div>
          <img className={styles.fullImage} src={item.src} width={item.width} height={item.height} alt={item.title} />
          <div className={styles.viewerControls}><button type="button" aria-label="Previous photograph" onClick={() => setSelected((selected + work.length - 1) % work.length)}>← Previous</button><span aria-live="polite">{selected + 1} / {work.length}</span><button type="button" aria-label="Next photograph" onClick={() => setSelected((selected + 1) % work.length)}>Next →</button></div>
        </div>
      </dialog>
    </section>
  );
}
