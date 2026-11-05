import type { Eligibility } from '@/components/ui/eligibility-badge';

// shortcut: mock data copied from Figma until the backend exists.

export type Settlement = {
  id: string;
  amount: string;
  due: string;
  category: string;
  eligibility?: Eligibility;
};

export type FeaturedSettlement = Settlement & {
  claimsFiled: number;
  claimsTotal: number;
};

export const CATEGORIES = ['All', 'Upcoming', 'Privacy', 'False Ads', 'Overbilling'];

export const FEATURED: FeaturedSettlement[] = [
  { id: 'f1', amount: '$20-$50', due: 'Due in 5 days', category: 'Privacy', eligibility: 'noProof', claimsFiled: 1274, claimsTotal: 12000 },
  { id: 'f2', amount: '$20-$50', due: 'Due in 5 days', category: 'False Ads', claimsFiled: 1274, claimsTotal: 12000 },
];

export const SETTLEMENTS: Settlement[] = [
  { id: 's1', amount: '$3000+', due: 'Due in 5 days', category: 'Privacy', eligibility: 'noProof' },
  { id: 's2', amount: '$1000+', due: 'Due in 567 days', category: 'Upcoming', eligibility: 'uncapped' },
  { id: 's3', amount: '$1000+', due: 'Due in 567 days', category: 'False Ads', eligibility: 'uncapped' },
  { id: 's4', amount: '$1000+', due: 'Due in 567 days', category: 'Overbilling', eligibility: 'uncapped' },
];
