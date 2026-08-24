import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from './internal/format';
import { type PolicyVariant } from './internal/status';
export type { PolicyVariant };
/** Coverage lifecycle of the policy itself (distinct from a claim status). */
export type PolicyStatus = 'active' | 'pending' | 'lapsed' | 'cancelled';
/** Premium billing cadence. */
export type PremiumCadence = 'monthly' | 'quarterly' | 'annual';
export interface PolicyCardProps {
    /** Line of insurance — drives the leading glyph and label. */
    variant: PolicyVariant;
    /** Product / plan name (e.g. "Premier Auto"). */
    name: string;
    /** Policy identifier (e.g. "AUTO-4821-93"). */
    policyNumber: string;
    /** Total coverage / benefit amount in integer **cents**. */
    coverageCents: number;
    /** Recurring premium in integer **cents**. */
    premiumCents?: number;
    /** Premium billing cadence (default `monthly`). */
    cadence?: PremiumCadence;
    /** Policy lifecycle status (default `active`). */
    status?: PolicyStatus;
    /** Named insured / holder shown as a secondary line. */
    holder?: string;
    /** Localized renewal date string (already formatted by the caller). */
    renewalDate?: string;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Override the cents → string formatter (locale control). */
    formatMoney?: MoneyFormatter;
    /** Fires on card press; the card is only a button when supplied. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A summary card for a single insurance policy. The `variant` (auto/home/life/
 * health) picks a tinted leading glyph disc; a status pill conveys the policy
 * lifecycle by **text + glyph + color** (never color alone). Coverage and
 * premium are integer cents funnelled through `formatMoney`, so printed values
 * never drift. Becomes a pressable button only when `onPress` is supplied.
 * Every color traces to a `SemanticColors` slot or a `ramps`-derived tint — no
 * literals.
 */
export declare function PolicyCard({ variant, name, policyNumber, coverageCents, premiumCents, cadence, status, holder, renewalDate, currency, formatMoney: format, onPress, style, }: PolicyCardProps): React.ReactElement;
//# sourceMappingURL=PolicyCard.d.ts.map