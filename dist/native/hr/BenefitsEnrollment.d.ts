import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type BenefitStatus, type BenefitType } from './internal';
export type BenefitsEnrollmentVariant = 'default' | 'compact';
export interface BenefitsEnrollmentProps {
    /** Plan display name (e.g. "PPO Gold"). */
    planName: string;
    /** Kind of benefit — glyph + word chip. */
    type: BenefitType;
    /** Enrollment state — glyph + word pill. */
    status: BenefitStatus;
    /** Coverage tier / description (e.g. "Employee + Family"). */
    coverage?: string;
    /** Employee's per-period cost in integer **cents**. */
    costCents?: number;
    /** Cost period label (default "/mo"). */
    costPeriod?: string;
    /** ISO 4217 currency (default USD). */
    currency?: string;
    /** Open-enrollment deadline, pre-formatted. */
    enrollBy?: string;
    /** Show the enroll / change action (meaningful when `eligible`/`pending`). */
    actionable?: boolean;
    /** Density. */
    variant?: BenefitsEnrollmentVariant;
    onEnroll?: () => void;
    /** Tap handler for the whole card. */
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A benefits-plan enrollment card: plan name, benefit type, coverage tier, and
 * per-period cost (integer **cents** via `formatMoney`). Enrollment status is a
 * glyph + word pill (enrolled → success, eligible → primary, never color alone).
 * When `actionable` and not already enrolled, an enroll / change action renders.
 * `compact` drops coverage + deadline. All colors are theme tokens — no
 * literals.
 */
export declare function BenefitsEnrollment({ planName, type, status, coverage, costCents, costPeriod, currency, enrollBy, actionable, variant, onEnroll, onPress, testID, style, }: BenefitsEnrollmentProps): React.ReactElement;
//# sourceMappingURL=BenefitsEnrollment.d.ts.map