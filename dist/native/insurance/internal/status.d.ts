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
export declare const CLAIM_STATUS: Record<ClaimStatus, StatusDescriptor>;
/** Safe lookup — falls back to `filed` for an unknown status. */
export declare function claimStatus(status: ClaimStatus): StatusDescriptor;
/** Line of insurance a policy covers. */
export type PolicyVariant = 'auto' | 'home' | 'life' | 'health';
export interface PolicyVariantDescriptor {
    label: string;
    glyph: string;
}
export declare const POLICY_VARIANT: Record<PolicyVariant, PolicyVariantDescriptor>;
/** Safe lookup — falls back to `auto` for an unknown variant. */
export declare function policyVariant(variant: PolicyVariant): PolicyVariantDescriptor;
//# sourceMappingURL=status.d.ts.map