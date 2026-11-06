import type { ClaimStatus, MyClaim } from '@/lib/claims';
import { formatDate, shortTitle } from '@/lib/settlements';

export type FormStatus = 'Pending' | 'Payment Sent' | 'Case Closed';

export type SavedForm = {
  id: string;
  name: string;
  submitted: string;
  status: FormStatus;
};

export const STATUS_FILTERS = ['All', 'Pending', 'Payment Sent', 'Case Closed'];

const STATUS_LABELS: Record<ClaimStatus, FormStatus> = {
  pending: 'Pending',
  payment_sent: 'Payment Sent',
  case_closed: 'Case Closed',
};

/** Each claim is shown as the claim form the user started for it. */
export function toForm(claim: MyClaim): SavedForm {
  return {
    id: claim.id,
    name: shortTitle(claim.settlement),
    submitted: formatDate(claim.created_at),
    status: STATUS_LABELS[claim.status],
  };
}
