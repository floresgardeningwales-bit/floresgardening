'use client';

import { useState } from 'react';

export default function LeadForm() {
  const [state, setState] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function submit(event) {
    event.preventDefault();
    setState('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        body: new FormData(event.currentTarget),
        headers: { Accept: 'application/json' },
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) {
        setErrorMessage(result.error || 'Something went wrong. Please try again.');
        setState('error');
        return;
      }
      event.currentTarget.reset();
      setState('done');
    } catch {
      setErrorMessage('We couldn’t send that just now. Please check your connection and try again.');
      setState('error');
    }
  }

  return (
    <form className="leadForm" onSubmit={submit} aria-describedby="lead-form-note" noValidate={false}>
      <p id="lead-form-note" className="formIntro">A few details help me understand what your garden needs. Fields marked * are required.</p>
      <div className="formGrid">
        <label>Name *<input name="full_name" autoComplete="name" required minLength={2} maxLength={100} /></label>
        <label>Postcode *<input name="postcode" autoComplete="postal-code" required maxLength={12} placeholder="e.g. CF64 2AB" /></label>
        <label>Email address<input name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@example.com" /></label>
        <label>Phone number<input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="07…" /></label>
        <label>What would you like help with?
          <select name="service_interest" defaultValue="Regular garden maintenance">
            <option>Regular garden maintenance</option><option>Hedge trimming</option><option>Fruit tree pruning</option><option>Planting &amp; beds</option><option>Garden clearance</option><option>Wildlife-friendly gardening</option><option>Something else</option>
          </select>
        </label>
        <label>How often?
          <select name="frequency" defaultValue="Not sure yet"><option>One-off</option><option>Fortnightly</option><option>Monthly</option><option>Seasonal</option><option>Not sure yet</option></select>
        </label>
      </div>
      <label>Tell me a little about your garden<textarea name="message" rows={5} maxLength={3000} placeholder="Garden size, what needs doing, hedges, lawns, borders or anything you’d like to change…" /></label>
      <label className="check"><input type="checkbox" name="ecological_interest" /> I’m interested in wildlife-friendly or ecological gardening</label>
      <div className="formTrap" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="formPrivacy">Please include either an email address or phone number so I can reply. Your details will only be used to respond to your enquiry.</p>
      <button className="button primary" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending enquiry…' : 'Request a garden visit'} <span aria-hidden="true">↗</span></button>
      {state === 'done' && <p className="success" role="status" aria-live="polite">Thanks — your enquiry has been sent. I’ll be in touch about the next step.</p>}
      {state === 'error' && <p className="error" role="alert">{errorMessage}</p>}
    </form>
  );
}
