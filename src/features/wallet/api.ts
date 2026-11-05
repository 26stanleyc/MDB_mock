import type { ImageSource } from 'expo-image';

// shortcut: mock data copied from Figma until the backend exists.
// Empty a list to see that section's "No claims" state.

export type Claim = {
  id: string;
  brand: string;
  logo: ImageSource;
  amount: string;
  due: string;
};

const GOOGLE = require('@/assets/images/wallet/google.png');

export const SUMMARY = { estimatedPayout: '$94', claimed: 3, notified: 2 };

export const IN_PROGRESS: Claim[] = [
  { id: 'c1', brand: 'Google', logo: GOOGLE, amount: '$3000', due: 'Due in 49 days' },
  { id: 'c2', brand: 'Google', logo: GOOGLE, amount: '$3000', due: 'Due in 49 days' },
];

export const FINISHED: Claim[] = [
  { id: 'c3', brand: 'Google', logo: GOOGLE, amount: '$3000', due: 'Due in 49 days' },
  { id: 'c4', brand: 'Google', logo: GOOGLE, amount: '$3000', due: 'Due in 49 days' },
];
