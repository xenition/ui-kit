import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from './internal/format';
/** Urgency of the renewal — an ordered, non-color signal. */
export type RenewalUrgency = 'upcoming' | 'due' | 'overdue';
export interface RenewalBannerProps {
    /** Localized renewal date string (already formatted by the caller). */
    renewalDate: string;
    /** Urgency level — drives glyph + tint + heading (default `due`). */
    urgency?: RenewalUrgency;
    /** Renewal premium in integer **cents** (shown when provided). */
    premiumCents?: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Override the cents → string formatter (locale control). */
    formatMoney?: MoneyFormatter;
    /** Renew button label (default "Renew now"). Hidden when no `onRenew`. */
    renewLabel?: string;
    /** Show a spinner and block the renew button. */
    loading?: boolean;
    /** Fires when the renew action is pressed. */
    onRenew?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A call-to-action banner prompting a policy renewal. Urgency is conveyed by
 * **glyph + heading + a tint that traces to a `SemanticColors` slot**
 * (upcoming → primary, overdue → danger) — never color alone. The optional
 * renewal premium is integer cents via `formatMoney`. The renew `Button` is
 * only rendered when `onRenew` is supplied. Token-bound throughout.
 */
export declare function RenewalBanner({ renewalDate, urgency, premiumCents, currency, formatMoney: format, renewLabel, loading, onRenew, style, }: RenewalBannerProps): React.ReactElement;
//# sourceMappingURL=RenewalBanner.d.ts.map