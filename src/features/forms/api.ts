// shortcut: mock data copied from Figma until the backend exists.
// Empty the list to see the "No saved forms" state.

export type FormStatus = 'Pending' | 'Payment Sent' | 'Case Closed';

export type SavedForm = {
  id: string;
  name: string;
  submitted: string;
  status: FormStatus;
};

export const STATUS_FILTERS = ['All', 'Pending', 'Payment Sent', 'Case Closed'];

export const FORMS: SavedForm[] = [
  { id: 'f1', name: 'Apple Data Breach', submitted: 'Feb 14, 2026', status: 'Pending' },
  { id: 'f2', name: 'Facebook Retail', submitted: 'Jan 12, 2025', status: 'Payment Sent' },
  { id: 'f3', name: 'Tesla Emissions', submitted: 'Jan 12, 2025', status: 'Case Closed' },
];
