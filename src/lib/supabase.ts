import './local-storage'; // must run before createClient reads localStorage
import { createClient, type User } from '@supabase/supabase-js';
import { AppState } from 'react-native';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) {
  throw new Error('Missing Supabase config: copy .env.example to .env.local and fill it in.');
}

export const supabase = createClient(url, key, {
  auth: {
    storage: globalThis.localStorage, // undefined during web's server render; Supabase then keeps it in memory
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Refresh the session token only while the app is in the foreground.
AppState.addEventListener('change', (state) => {
  if (state === 'active') supabase.auth.startAutoRefresh();
  else supabase.auth.stopAutoRefresh();
});

let signingIn: Promise<User> | null = null;

/**
 * Signs the device in anonymously on first use and reuses the saved session after that.
 * Shared promise so screens loading at the same time don't create two users.
 */
export function ensureSignedIn(): Promise<User> {
  signingIn ??= (async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) return data.session.user;
    const { data: created, error } = await supabase.auth.signInAnonymously();
    if (error || !created.user) throw error ?? new Error('Anonymous sign-in failed.');
    return created.user;
  })().catch((error) => {
    signingIn = null; // let the next call retry
    throw error;
  });
  return signingIn;
}

/** Returns a query's rows or throws its error, so callers can use try/catch. */
export function unwrap<T>({ data, error }: { data: unknown; error: { message: string } | null }): T {
  if (error) throw new Error(error.message);
  return data as T;
}
