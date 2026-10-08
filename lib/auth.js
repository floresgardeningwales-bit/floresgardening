import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAdminDb } from './supabase';

export async function getAuthClient() {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Missing Supabase public environment variables');
  return createServerClient(url, key, {
    cookies: {
      getAll() { return cookieStore.getAll(); },
      setAll(items) { try { items.forEach(({name,value,options}) => cookieStore.set(name,value,options)); } catch {} }
    }
  });
}

export async function getOwnerContext() {
  const auth = await getAuthClient();
  const { data: { user } } = await auth.auth.getUser();
  if (!user) return null;
  const { data: profile } = await getAdminDb().from('staff_profiles').select('*').eq('user_id', user.id).eq('active', true).maybeSingle();
  if (!profile || profile.role !== 'owner') return null;
  return { user, profile };
}

export async function requireOwner() {
  const ctx = await getOwnerContext();
  if (!ctx) redirect('/owner/login');
  return ctx;
}
