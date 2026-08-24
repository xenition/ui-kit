import * as React from 'react';
import { type MoneyFormatter } from './internal/format';
export interface AutoPayRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Row heading (default "AutoPay"). */
    label?: string;
    /** Whether autopay is enabled. Controlled via `onToggle`. */
    enabled: boolean;
    /** Fires with the next enabled state when the switch is toggled. */
    onToggle?: (enabled: boolean) => void;
    /** Funding method label shown when enabled (e.g. "Visa ···4242"). */
    method?: string;
    /** Localized next-charge date shown when enabled (e.g. "Aug 15"). */
    nextChargeDate?: string;
    /** Capped charge amount in integer **cents** (shown when enabled). */
    amountCents?: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Override the cents → string formatter (locale control). */
    formatMoney?: MoneyFormatter;
    /** Disable the toggle (e.g. while a mutation is in flight). */
    disabled?: boolean;
}
/**
 * An AutoPay enrollment row: a leading glyph, a title with an on/off status
 * conveyed by **a badge + label** (never the switch color alone), the token-bound
 * `Switch`, and — when enabled — a funding method / next-charge summary. Any
 * amount is integer cents via `formatMoney`. The switch is fully controlled
 * (`enabled` + `onToggle`) and honors `disabled`. Every color traces to a
 * `--xen-*` token. Web parity of the native `AutoPayRow`.
 */
export declare const AutoPayRow: React.ForwardRefExoticComponent<AutoPayRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AutoPayRow.d.ts.map