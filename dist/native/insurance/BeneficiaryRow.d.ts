import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Whether the beneficiary is primary or contingent (secondary). */
export type BeneficiaryKind = 'primary' | 'contingent';
export interface BeneficiaryRowProps {
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
    /** Fires on row press (e.g. edit beneficiary). */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * One beneficiary in a policy's allocation list: avatar (initials fallback),
 * name + relationship, a primary/contingent tag, and a right-aligned
 * allocation percentage. The percentage is clamped to 0–100 and rendered whole
 * (no float drift). Token-bound throughout; becomes a button only when
 * `onPress` is supplied.
 */
export declare function BeneficiaryRow({ name, relationship, allocationPct, kind, avatarUrl, onPress, style, }: BeneficiaryRowProps): React.ReactElement;
//# sourceMappingURL=BeneficiaryRow.d.ts.map