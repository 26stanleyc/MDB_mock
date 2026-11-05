import type { ImageSource } from 'expo-image';

import type { Eligibility } from '@/components/ui/eligibility-badge';

export type SettlementDetails = {
  brand: string;
  logo: ImageSource;
  amount: string;
  eligibility?: Eligibility;
  title: string;
  summary: string;
  due: string;
  description: string;
};

// shortcut: every settlement opens Figma's Instagram example until the backend exists.
export const EXAMPLE_SETTLEMENT: SettlementDetails = {
  brand: 'Instagram',
  logo: require('@/assets/images/wallet/google.png'),
  amount: '$1,000',
  eligibility: 'uncapped',
  title: 'Instagram Social Media Addiction Arbitration Claims',
  summary:
    'You may get a cut of a $1M settlement over potential arbitration claims for harms from instagram’s allegedly addictive design..',
  due: 'Due in 576 days',
  // Figma has the "Description" heading but no text yet.
  description: 'Full details about who qualifies and how to file will appear here.',
};
