/**
 * Canonical descriptors for government / civic domain enums, shared so every
 * component labels a permit or form status the same way. Status is always
 * conveyed by **text + glyph**, never color alone — the `tone` is a redundant
 * reinforcement, not the sole signal. `tone` values map to `BadgeTone` /
 * `SemanticColors` slots (approved/issued → success, denied → danger).
 */
import type { BadgeTone } from '../../primitives';

export interface StatusDescriptor {
  /** Human label (the primary, non-color signal). */
  label: string;
  /** Reinforcing glyph (the secondary, non-color signal). */
  glyph: string;
  /** Redundant color reinforcement. */
  tone: BadgeTone;
  /** Ordered stage index in the happy-path tracker (denied is off-path). */
  step: number;
}

/** Lifecycle of a permit / license application. */
export type PermitStatusValue = 'submitted' | 'review' | 'approved' | 'issued' | 'denied';

export const PERMIT_STATUS: Record<PermitStatusValue, StatusDescriptor> = {
  submitted: { label: 'Submitted', glyph: '📨', tone: 'neutral', step: 0 },
  review: { label: 'Under review', glyph: '🔍', tone: 'warn', step: 1 },
  approved: { label: 'Approved', glyph: '✓', tone: 'success', step: 2 },
  issued: { label: 'Issued', glyph: '🏛️', tone: 'success', step: 3 },
  denied: { label: 'Denied', glyph: '✕', tone: 'danger', step: 2 },
};

/** Safe lookup — falls back to `submitted` for an unknown status. */
export function permitStatus(status: PermitStatusValue): StatusDescriptor {
  return PERMIT_STATUS[status] ?? PERMIT_STATUS.submitted;
}

/** The ordered happy-path stages a permit passes through. */
export const PERMIT_STAGES: PermitStatusValue[] = ['submitted', 'review', 'approved', 'issued'];

/** Lifecycle of a submitted civic form / application. */
export type FormStatusValue =
  | 'draft'
  | 'submitted'
  | 'processing'
  | 'action-needed'
  | 'complete'
  | 'rejected';

export const FORM_STATUS: Record<FormStatusValue, StatusDescriptor> = {
  draft: { label: 'Draft', glyph: '✎', tone: 'neutral', step: 0 },
  submitted: { label: 'Submitted', glyph: '📨', tone: 'primary', step: 1 },
  processing: { label: 'Processing', glyph: '⋯', tone: 'warn', step: 2 },
  'action-needed': { label: 'Action needed', glyph: '!', tone: 'danger', step: 2 },
  complete: { label: 'Complete', glyph: '✓', tone: 'success', step: 3 },
  rejected: { label: 'Rejected', glyph: '✕', tone: 'danger', step: 3 },
};

/** Safe lookup — falls back to `draft` for an unknown status. */
export function formStatus(status: FormStatusValue): StatusDescriptor {
  return FORM_STATUS[status] ?? FORM_STATUS.draft;
}
