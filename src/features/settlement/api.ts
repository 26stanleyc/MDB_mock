import { hasClaimed } from '@/lib/claims';
import type { Settlement } from '@/lib/settlements';
import { ensureSignedIn, supabase, unwrap } from '@/lib/supabase';

/** One settlement plus whether the user already filed a claim on it. */
export async function fetchSettlement(id: string) {
  await ensureSignedIn();
  const [settlement, claimed] = await Promise.all([
    supabase.from('settlements').select('*').eq('id', id).maybeSingle(),
    hasClaimed(id),
  ]);
  return { settlement: unwrap<Settlement | null>(settlement), claimed };
}

/** '$5 - $10' → 'claim $5 - $10', 'Up to $6,000' → 'claim up to $6,000', 'Varies' → 'payout varies'. */
export function payoutHeadline(payout: string) {
  if (!/\d/.test(payout)) return 'payout varies';
  return `claim ${payout.charAt(0).toLowerCase()}${payout.slice(1)}`;
}
