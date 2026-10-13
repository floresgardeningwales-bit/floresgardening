'use client';

import { useEffect, useRef, useState } from 'react';
import { enquiryServices, enquiryFrequencies } from '../lib/content';

export default function LeadForm() {
  const [state, setState] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const postcodeRef = useRef(null);

  // Carry a postcode over from the "Do we cover your garden?" checker.
  useEffect(() => {
    const pc = new URLSearchParams(window.location.search).get('postcode');
    if (pc && postcodeRef.current && !postcodeRef.current.value) postcodeRef.current.value = pc.slice(0, 12);
  }, []);

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setState('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) {
        setErrorMessage(result.error || 'Your enquiry wasn’t sent. Check the fields above and try again.');
        setState('error');
        return;
      }
      form.reset();
      setState('done');
    } catch {
      setErrorMessage('Your enquiry wasn’t sent because the connection dropped. Check you’re online and try again.');
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="leadForm formDone" role="status" aria-live="polite">
        <h2>Enquiry sent</h2>
        <p>Thanks. We’ll be in touch about the next step, usually within a couple of working days.</p>
      </div>
    );
  }

  return (
    <form className="leadForm" onSubmit={submit} aria-describedby="lead-form-note">
      <p id="lead-form-note" className="formIntro">Fields marked * are required. Add an email or phone number so we can reply.</p>
      <div className="formGrid">
        <label>Name *<input name="full_name" autoComplete="name" required minLength={2} maxLength={100} /></label>
        <label>Postcode *<input ref={postcodeRef} name="postcode" autoComplete="postal-code" required maxLength={12} placeholder="e.g. CF64 2AB" /></label>
        <label>Email<input name="email" type="email" autoComplete="email" maxLength={254} /></label>
        <label>Phone<input name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
      </div>

      <fieldset className="chips">
        <legend>What would you like help with?</legend>
        {enquiryServices.map((s, i) => (
          <label key={s}><input type="radio" name="service_interest" value={s} defaultChecked={i === 0} /><span>{s}</span></label>
        ))}
      </fieldset>

      <fieldset className="chips">
        <legend>How often?</legend>
        {enquiryFrequencies.map((f) => (
          <label key={f}><input type="radio" name="frequency" value={f} defaultChecked={f === 'Not sure yet'} /><span>{f}</span></label>
        ))}
      </fieldset>

      <label>About your garden<textarea name="message" rows={5} maxLength={3000} placeholder="Rough size, what needs doing, anything you’d like to change…" /></label>
      <label className="check"><input type="checkbox" name="ecological_interest" /> I’d like to hear more about wildlife-friendly options</label>
      <div className="formTrap" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="formPrivacy">We only use your details to reply to this enquiry.</p>
      <button className="button primary" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending enquiry…' : 'Send enquiry'}</button>
      {state === 'error' && <p className="error" role="alert">{errorMessage}</p>}
    </form>
  );
}
