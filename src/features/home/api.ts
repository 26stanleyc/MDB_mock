import { daysUntil, openSettlements, type Settlement } from '@/lib/settlements';
import { ensureSignedIn, supabase, unwrap } from '@/lib/supabase';

export const CATEGORIES = ['All', 'Upcoming', 'Privacy', 'False Ads', 'Overbilling'];

/** "Upcoming" means the deadline is within this many days; the rest match settlement.category. */
const UPCOMING_DAYS = 30;

export function inCategory(settlement: Settlement, category: string) {
  if (category === 'All') return true;
  if (category === 'Upcoming') {
    return settlement.deadline !== null && daysUntil(settlement.deadline) <= UPCOMING_DAYS;
  }
  return settlement.category === category;
}

/**
 * Featured settlements (picked by classaction.org) plus the open settlements for the
 * brands the user chose in onboarding. A user who picked no brands sees every settlement.
 */
export async function fetchHome() {
  await ensureSignedIn();
  const profile = unwrap<{ brands: string[] } | null>(
    await supabase.from('profiles').select('brands').maybeSingle(),
  );
  const brands = profile?.brands ?? [];

  const [featured, settlements] = await Promise.all([
    openSettlements().eq('featured', true),
    brands.length > 0 ? openSettlements().in('brand', brands) : openSettlements(),
  ]);
  return {
    featured: unwrap<Settlement[]>(featured),
    settlements: unwrap<Settlement[]>(settlements),
  };
}
