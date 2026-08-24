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
export declare const PERMIT_STATUS: Record<PermitStatusValue, StatusDescriptor>;
/** Safe lookup — falls back to `submitted` for an unknown status. */
export declare function permitStatus(status: PermitStatusValue): StatusDescriptor;
/** The ordered happy-path stages a permit passes through. */
export declare const PERMIT_STAGES: PermitStatusValue[];
/** Lifecycle of a submitted civic form / application. */
export type FormStatusValue = 'draft' | 'submitted' | 'processing' | 'action-needed' | 'complete' | 'rejected';
export declare const FORM_STATUS: Record<FormStatusValue, StatusDescriptor>;
/** Safe lookup — falls back to `draft` for an unknown status. */
export declare function formStatus(status: FormStatusValue): StatusDescriptor;
//# sourceMappingURL=status.d.ts.map