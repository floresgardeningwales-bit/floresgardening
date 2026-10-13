import { NextResponse } from 'next/server';
import { getAdminDb } from '../../../lib/supabase';

export const runtime = 'nodejs';

const SERVICES = new Set([
  'Regular garden maintenance',
  'Hedge trimming',
  'Fruit tree pruning',
  'Planting & beds',
  'Garden clearance',
  'Wildlife-friendly gardening',
  'Something else',
]);
const FREQUENCIES = new Set(['One-off', 'Fortnightly', 'Monthly', 'Seasonal', 'Not sure yet']);
const clean = (value, max) => String(value ?? '').trim().slice(0, max);

export async function POST(request) {
  try {
    const form = await request.formData();

    // Quietly accept honeypot submissions without storing them or revealing the check.
    if (clean(form.get('website'), 200)) return NextResponse.json({ ok: true });

    const full_name = clean(form.get('full_name'), 100);
    const emailValue = clean(form.get('email'), 254).toLowerCase();
    const phoneValue = clean(form.get('phone'), 40);
    const postcodeValue = clean(form.get('postcode'), 12).toUpperCase().replace(/\s+/g, ' ');
    const serviceValue = clean(form.get('service_interest'), 80);
    const frequencyValue = clean(form.get('frequency'), 40);
    const messageValue = clean(form.get('message'), 3000);

    if (full_name.length < 2 || !postcodeValue) {
      return NextResponse.json({ error: 'Please add your name and postcode.' }, { status: 400 });
    }
    if (!emailValue && !phoneValue) {
      return NextResponse.json({ error: 'Please add an email address or phone number so we can reply.' }, { status: 400 });
    }
    if (emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      return NextResponse.json({ error: 'Please check your email address.' }, { status: 400 });
    }
    if (!/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(postcodeValue)) {
      return NextResponse.json({ error: 'Please enter a valid UK postcode.' }, { status: 400 });
    }

    const payload = {
      full_name,
      email: emailValue || null,
      phone: phoneValue || null,
      postcode: postcodeValue,
      service_interest: SERVICES.has(serviceValue) ? serviceValue : 'Something else',
      frequency: FREQUENCIES.has(frequencyValue) ? frequencyValue : 'Not sure yet',
      ecological_interest: form.get('ecological_interest') === 'on',
      message: messageValue || null,
      source: 'website',
    };

    const { error } = await getAdminDb().from('leads').insert(payload);
    if (error) {
      console.error('Lead insert failed:', error.message);
      return NextResponse.json({ error: 'Unable to save your enquiry right now. Please try again shortly.' }, { status: 503 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Lead endpoint error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Unable to save your enquiry right now. Please try again shortly.' }, { status: 503 });
  }
}
