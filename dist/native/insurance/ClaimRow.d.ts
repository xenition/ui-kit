import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from './internal/format';
import { type ClaimStatus } from './internal/status';
export type { ClaimStatus };
export interface ClaimRowProps {
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
    /** Fires on row press (e.g. open claim detail / continue filing). */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * One line in a claims list: a tinted status glyph disc, a title/number stack,
 * a status pill, and an optional right-aligned amount + date. The status is
 * conveyed redundantly (glyph + label + a color that traces to a
 * `SemanticColors` slot: approved → success, denied → danger) so it is never
 * color-alone. Amount is integer cents via `formatMoney`. Becomes a button only
 * when `onPress` is supplied.
 */
export declare function ClaimRow({ claimNumber, title, status, amountCents, currency, date, formatMoney: format, onPress, style, }: ClaimRowProps): React.ReactElement;
//# sourceMappingURL=ClaimRow.d.ts.map