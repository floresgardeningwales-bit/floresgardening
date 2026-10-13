'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usualOutwardCodes } from '../lib/content';

const UK_POSTCODE = /^([A-Z]{1,2}\d[A-Z\d]?)\s*(\d[A-Z]{2})?$/;

function check(raw) {
  const value = raw.trim().toUpperCase().replace(/\s+/g, ' ');
  const match = value.match(UK_POSTCODE);
  if (!match) return { kind: 'invalid' };
  const outward = match[1];
  if (usualOutwardCodes.includes(outward)) return { kind: 'yes', outward, value };
  if (outward.startsWith('CF')) return { kind: 'maybe', outward, value };
  return { kind: 'far', outward, value };
}

export default function PostcodeCheck({ id = 'postcode-check' }) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  function submit(event) {
    event.preventDefault();
    setResult(input.trim() ? check(input) : { kind: 'empty' });
  }

  const contactHref = result?.value ? `/contact?postcode=${encodeURIComponent(result.value)}` : '/contact';

  return (
    <form className="pcCheck" onSubmit={submit} noValidate>
      <label htmlFor={id}>Do we cover your garden?</label>
      <div className="pcRow">
        <input id={id} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Your postcode, e.g. CF64 2AB" autoComplete="postal-code" maxLength={10} />
        <button type="submit">Check postcode</button>
      </div>
      <div className="pcResult" role="status" aria-live="polite">
        {result?.kind === 'yes' && <p><strong>Yes, {result.outward} is in our usual area.</strong> <Link href={contactHref}>Ask about your garden</Link></p>}
        {result?.kind === 'maybe' && <p><strong>{result.outward} is just outside our usual patch.</strong> Send your details anyway and we’ll tell you honestly. <Link href={contactHref}>Send an enquiry</Link></p>}
        {result?.kind === 'far' && <p><strong>We work around Cardiff and the Vale of Glamorgan,</strong> so {result.outward} is probably too far for regular visits. <Link href={contactHref}>Ask anyway</Link></p>}
        {result?.kind === 'invalid' && <p>That doesn’t look like a UK postcode. Try something like CF64 2AB.</p>}
        {result?.kind === 'empty' && <p>Type your postcode, or just the first part, like CF5.</p>}
      </div>
    </form>
  );
}
