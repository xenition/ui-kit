/**
 * Canonical descriptors for insurance domain enums, shared so that every
 * component labels a claim status or a policy line the same way. Status is
 * always conveyed by **text + glyph**, never color alone — the `tone` is a
 * redundant reinforcement, not the sole signal. `tone` values map to
 * `BadgeTone` / `SemanticColors` slots (approved → success, denied → danger).
 */
import type { BadgeTone } from '../../primitives';

/** Lifecycle of an insurance claim. */
export type ClaimStatus = 'filed' | 'review' | 'approved' | 'denied' | 'paid';

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

export const CLAIM_STATUS: Record<ClaimStatus, StatusDescriptor> = {
  filed: { label: 'Filed', glyph: '📝', tone: 'neutral', step: 0 },
  review: { label: 'In review', glyph: '🔍', tone: 'warn', step: 1 },
  approved: { label: 'Approved', glyph: '✓', tone: 'success', step: 2 },
  denied: { label: 'Denied', glyph: '✕', tone: 'danger', step: 2 },
  paid: { label: 'Paid', glyph: '💰', tone: 'primary', step: 3 },
};

/** Safe lookup — falls back to `filed` for an unknown status. */
export function claimStatus(status: ClaimStatus): StatusDescriptor {
  return CLAIM_STATUS[status] ?? CLAIM_STATUS.filed;
}

/** Line of insurance a policy covers. */
export type PolicyVariant = 'auto' | 'home' | 'life' | 'health';

export interface PolicyVariantDescriptor {
  label: string;
  glyph: string;
}

export const POLICY_VARIANT: Record<PolicyVariant, PolicyVariantDescriptor> = {
  auto: { label: 'Auto', glyph: '🚗' },
  home: { label: 'Home', glyph: '🏠' },
  life: { label: 'Life', glyph: '🌳' },
  health: { label: 'Health', glyph: '⚕️' },
};

/** Safe lookup — falls back to `auto` for an unknown variant. */
export function policyVariant(variant: PolicyVariant): PolicyVariantDescriptor {
  return POLICY_VARIANT[variant] ?? POLICY_VARIANT.auto;
}
