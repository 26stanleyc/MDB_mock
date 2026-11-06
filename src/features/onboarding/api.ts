import { openSettlements } from '@/lib/settlements';
import { ensureSignedIn, supabase, unwrap } from '@/lib/supabase';

/**
 * Brands that have an open settlement right now, featured first, then soonest deadline.
 * Offering only these means every pick matches at least one settlement on Home.
 */
export async function fetchBrands() {
  await ensureSignedIn();
  const rows = unwrap<{ brand: string; featured: boolean }[]>(await openSettlements());
  const ordered = [...rows.filter((r) => r.featured), ...rows.filter((r) => !r.featured)];
  return [...new Set(ordered.map((r) => r.brand))];
}

/** Saves the picked brands to the user's profile (creates it on first save). */
export async function saveBrands(brands: string[]) {
  const user = await ensureSignedIn();
  unwrap(await supabase.from('profiles').upsert({ user_id: user.id, brands }));
}
