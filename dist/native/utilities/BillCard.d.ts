import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from './internal/format';
import { type UtilityKind, type BillStatus } from './internal/status';
export type { UtilityKind, BillStatus };
export interface BillCardProps {
    /** Utility line — drives the leading glyph disc and label. */
    kind: UtilityKind;
    /** Account / provider name (e.g. "City Power & Light"). */
    provider: string;
    /** Account identifier (e.g. "ACCT-4821-93"). */
    accountNumber: string;
    /** Amount owed in integer **cents**. */
    amountCents: number;
    /** Localized due-date string (already formatted by the caller). */
    dueDate?: string;
    /** Bill lifecycle status — conveyed by text + glyph + color (default `due`). */
    status?: BillStatus;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Override the cents → string formatter (locale control). */
    formatMoney?: MoneyFormatter;
    /** Pay-now button label (default "Pay now"). Hidden when no `onPay`. */
    payLabel?: string;
    /** Fires when the pay action is pressed; the button shows only when supplied. */
    onPay?: () => void;
    /** Show a spinner and block the pay button. */
    paying?: boolean;
    /** Fires on card press (e.g. open bill detail); becomes a button when supplied. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A summary card for a single utility bill. The `kind` (electric/water/gas/…)
 * picks a tinted leading glyph disc; a status pill conveys the bill lifecycle by
 * **text + glyph + color** (paid → success, overdue → danger) — never color
 * alone. The amount is integer cents funnelled through `formatMoney`, so printed
 * values never drift. An optional pay `Button` renders only when `onPay` is
 * supplied, and the whole card becomes pressable when `onPress` is supplied.
 * Every color traces to a `SemanticColors` slot or a `ramps`-derived tint — no
 * literals.
 */
export declare function BillCard({ kind, provider, accountNumber, amountCents, dueDate, status, currency, formatMoney: format, payLabel, onPay, paying, onPress, style, }: BillCardProps): React.ReactElement;
//# sourceMappingURL=BillCard.d.ts.map