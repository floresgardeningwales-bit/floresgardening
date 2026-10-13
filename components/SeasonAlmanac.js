'use client';

import { useEffect, useState } from 'react';
import { seasons } from '../lib/content';

function seasonForMonth(month) {
  return seasons.find((s) => s.months_idx.includes(month))?.id ?? 'spring';
}

export default function SeasonAlmanac() {
  const [current, setCurrent] = useState(null);
  const [active, setActive] = useState('autumn');

  useEffect(() => {
    const now = seasonForMonth(new Date().getMonth());
    setCurrent(now);
    setActive(now);
  }, []);

  function onKey(event, index) {
    const dir = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    event.preventDefault();
    const next = seasons[(index + dir + seasons.length) % seasons.length];
    setActive(next.id);
    document.getElementById(`season-tab-${next.id}`)?.focus();
  }

  const season = seasons.find((s) => s.id === active);

  return (
    <div className={`almanac season-${active}`}>
      <div className="almanacTabs" role="tablist" aria-label="Seasons">
        {seasons.map((s, i) => (
          <button
            key={s.id}
            id={`season-tab-${s.id}`}
            role="tab"
            type="button"
            aria-selected={active === s.id}
            aria-controls="season-panel"
            tabIndex={active === s.id ? 0 : -1}
            onClick={() => setActive(s.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={`tab-${s.id}`}
          >
            {s.name}
            {current === s.id && <span className="nowBadge">Now</span>}
          </button>
        ))}
      </div>
      <div id="season-panel" role="tabpanel" aria-labelledby={`season-tab-${active}`} className="almanacPanel" key={active}>
        <div className="almanacLead">
          <p className="almanacMonths">{season.months}</p>
          <p className="almanacNote">{season.note}</p>
        </div>
        <ul className="almanacJobs">
          {season.jobs.map(([title, text]) => (
            <li key={title}><strong>{title}</strong><span>{text}</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
