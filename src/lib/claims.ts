import { useEffect, useId } from 'react';

import type { Settlement } from './settlements';
import { ensureSignedIn, supabase, unwrap } from './supabase';
import { useRequest } from './use-request';

export type ClaimStatus = 'pending' | 'payment_sent' | 'case_closed';

/** A row of the `claims` table with its settlement. Wallet shows claims, Forms shows them as forms. */
export type MyClaim = {
  id: string;
  status: ClaimStatus;
  created_at: string;
  settlement: Pick<Settlement, 'id' | 'brand' | 'title' | 'payout' | 'payout_max' | 'deadline' | 'image_url'>;
};

/** The signed-in user's claims, newest first. RLS returns only their own rows. */
export async function fetchMyClaims() {
  await ensureSignedIn();
  return unwrap<MyClaim[]>(
    await supabase
      .from('claims')
      .select('id, status, created_at, settlement:settlements(id, brand, title, payout, payout_max, deadline, image_url)')
      .order('created_at', { ascending: false }),
  );
}

/** fetchMyClaims, refetched whenever one of the user's claims is added or changes status. */
export function useMyClaims() {
  const request = useRequest(fetchMyClaims);
  const { reload } = request;
  const channelId = useId(); // Wallet and Forms are both mounted, so each needs its own channel

  useEffect(() => {
    let cancelled = false;
    let channel: ReturnType<typeof supabase.channel> | undefined;
    ensureSignedIn()
      .then((user) => {
        if (cancelled) return;
        channel = supabase
          .channel(`claims-${channelId}`)
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'claims', filter: `user_id=eq.${user.id}` },
            () => reload(),
          )
          .subscribe();
      })
      .catch(() => {}); // the request above already shows the sign-in error
    return () => {
      cancelled = true;
      if (channel) supabase.removeChannel(channel);
    };
  }, [channelId, reload]);

  return request;
}

/** Whether the user already filed a claim on this settlement. */
export async function hasClaimed(settlementId: string) {
  await ensureSignedIn();
  const rows = unwrap<{ id: string }[]>(
    await supabase.from('claims').select('id').eq('settlement_id', settlementId),
  );
  return rows.length > 0;
}

/**
 * Records a claim. Returns false if the user already had one; the database's
 * unique (user_id, settlement_id) constraint is what actually prevents duplicates.
 */
export async function fileClaim(settlementId: string) {
  await ensureSignedIn();
  const { error } = await supabase.from('claims').insert({ settlement_id: settlementId });
  if (error?.code === '23505') return false; // unique violation
  if (error) throw new Error(error.message);
  return true;
}
