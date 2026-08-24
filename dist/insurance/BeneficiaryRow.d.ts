import * as React from 'react';
/** Whether the beneficiary is primary or contingent (secondary). */
export type BeneficiaryKind = 'primary' | 'contingent';
export interface BeneficiaryRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Beneficiary full name. */
    name: string;
    /** Relationship to the insured (e.g. "Spouse", "Child"). */
    relationship?: string;
    /** Benefit allocation as a whole percentage (0–100). */
    allocationPct: number;
    /** Primary vs contingent designation (default `primary`). */
    kind?: BeneficiaryKind;
    /** Optional avatar image URL. */
    avatarUrl?: string;
    /** Fires on row click (e.g. edit beneficiary). */
    onClick?: () => void;
}
/**
 * One beneficiary in a policy's allocation list: avatar (initials fallback),
 * name + relationship, a primary/contingent tag, and a right-aligned allocation
 * percentage. The percentage is clamped to 0–100 and rendered whole (no float
 * drift). Token-bound throughout; becomes a keyboard-operable button only when
 * `onClick` is supplied. Web parity of the native `BeneficiaryRow`.
 */
export declare const BeneficiaryRow: React.ForwardRefExoticComponent<BeneficiaryRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BeneficiaryRow.d.ts.map