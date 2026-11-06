import type { Eligibility } from '@/components/ui/eligibility-badge';

import { supabase } from './supabase';

/** A row of the `settlements` table, filled by backend/scrape.mjs. */
export type Settlement = {
  id: string;
  brand: string;
  title: string;
  payout: string;
  payout_max: number | null;
  deadline: string | null; // 'YYYY-MM-DD'
  proof_required: boolean | null;
  category: string;
  featured: boolean;
  description: string;
  claim_url: string;
  image_url: string | null;
  claim_count: number;
  first_seen_at: string;
};

/** Settlements whose deadline hasn't passed (or isn't known), soonest first. */
export function openSettlements() {
  return supabase
    .from('settlements')
    .select('*')
    .or(`deadline.is.null,deadline.gte.${toDateString(new Date())}`)
    .order('deadline', { ascending: true, nullsFirst: false });
}

export function eligibilityOf(settlement: Settlement): Eligibility | undefined {
  if (settlement.proof_required === false) return 'noProof';
  if (/uncapped|no cap/i.test(settlement.payout)) return 'uncapped';
  return undefined;
}

/** '2026-11-16' → 'Due in 11 days'. */
export function dueLabel(deadline: string | null) {
  if (!deadline) return 'Deadline varies';
  const days = daysUntil(deadline);
  if (days <= 0) return 'Due today';
  return `Due in ${days} ${days === 1 ? 'day' : 'days'}`;
}

export function daysUntil(deadline: string) {
  const [year, month, day] = deadline.split('-').map(Number);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((new Date(year, month - 1, day).getTime() - today.getTime()) / 86_400_000);
}

/** '2026-11-16' or an ISO timestamp → 'Nov 16, 2026'. */
export function formatDate(value: string) {
  // Date-only strings would otherwise parse as UTC midnight and show the previous day in the US.
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T00:00:00`) : new Date(value);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/** 'CVS - Data Privacy Class Action Settlement' → 'CVS - Data Privacy'. */
export function shortTitle(settlement: Pick<Settlement, 'title'>) {
  return settlement.title.replace(/ Class Action Settlement$/, '');
}

function toDateString(date: Date) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
