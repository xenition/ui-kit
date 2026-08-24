import * as React from 'react';
import { type MoneyFormatter } from './internal/format';
import { type ClaimStatus } from './internal/status';
export type { ClaimStatus };
export interface ClaimRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Claim reference / number (e.g. "CLM-20481"). */
    claimNumber: string;
    /** Short description of the claim (e.g. "Windshield replacement"). */
    title: string;
    /** Claim lifecycle status — conveyed by text + glyph + color. */
    status: ClaimStatus;
    /** Claimed / settled amount in integer **cents**. */
    amountCents?: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Localized date string (already formatted by the caller). */
    date?: string;
    /** Override the cents → string formatter (locale control). */
    formatMoney?: MoneyFormatter;
    /** Fires on row click (e.g. open claim detail / continue filing). */
    onClick?: () => void;
}
/**
 * One line in a claims list: a tinted status glyph disc, a title/number stack,
 * a status pill, and an optional right-aligned amount + date. The status is
 * conveyed redundantly (glyph + label + a color that traces to a semantic token
 * slot: approved → success, denied → danger) so it is never color-alone. Amount
 * is integer cents via `formatMoney`. Becomes a keyboard-operable button only
 * when `onClick` is supplied. Web parity of the native `ClaimRow`.
 */
export declare const ClaimRow: React.ForwardRefExoticComponent<ClaimRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ClaimRow.d.ts.map