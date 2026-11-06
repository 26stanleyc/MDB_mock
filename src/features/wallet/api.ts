import type { MyClaim } from '@/lib/claims';

/** Wallet numbers from the user's claims. */
export function summarize(claims: MyClaim[]) {
  const total = claims.reduce((sum, claim) => sum + (claim.settlement.payout_max ?? 0), 0);
  return {
    // Adds the top of each payout range; "Varies" payouts count as $0.
    estimatedPayout: `$${total.toLocaleString('en-US')}`,
    claimed: claims.length,
    notified: claims.filter((claim) => claim.status === 'payment_sent').length,
  };
}

export const isInProgress = (claim: MyClaim) => claim.status === 'pending';
