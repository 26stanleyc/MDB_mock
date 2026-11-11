import { openSettlements, type Settlement } from '@/lib/settlements';
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

/**
 * Adds up the most one person can get from the open settlements of the brands they picked.
 * Settlements whose payout "varies" have no top amount, so they count toward `count` only.
 */
export async function estimatePayout() {
  const user = await ensureSignedIn();
  const profile = unwrap<{ brands: string[] } | null>(
    await supabase.from('profiles').select('brands').eq('user_id', user.id).maybeSingle(),
  );
  const brands = profile?.brands ?? [];
  if (brands.length === 0) return { total: 0, count: 0 };

  const rows = unwrap<Pick<Settlement, 'payout_max'>[]>(await openSettlements().in('brand', brands));
  return { total: rows.reduce((sum, row) => sum + (row.payout_max ?? 0), 0), count: rows.length };
}
