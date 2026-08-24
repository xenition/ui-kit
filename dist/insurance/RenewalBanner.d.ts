import * as React from 'react';
import { type MoneyFormatter } from './internal/format';
/** Urgency of the renewal — an ordered, non-color signal. */
export type RenewalUrgency = 'upcoming' | 'due' | 'overdue';
export interface RenewalBannerProps extends React.HTMLAttributes<HTMLDivElement> {
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
}
/**
 * A call-to-action banner prompting a policy renewal. Urgency is conveyed by
 * **glyph + heading + a tint that traces to a semantic token slot** (upcoming →
 * primary, overdue → danger) — never color alone. The optional renewal premium
 * is integer cents via `formatMoney`. The renew `Button` (a real `<button>`) is
 * only rendered when `onRenew` is supplied. Token-bound throughout. Web parity
 * of the native `RenewalBanner` (`loading` shows an inline `Spinner`, since the
 * web `Button` has no `loading` prop).
 */
export declare const RenewalBanner: React.ForwardRefExoticComponent<RenewalBannerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RenewalBanner.d.ts.map