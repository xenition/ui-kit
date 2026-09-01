import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from './internal/format';
import { type BillStatus } from './internal/status';
export type { BillStatus };
export interface StatementRowProps {
    /** Localized statement period (e.g. "March 2026"). */
    period: string;
    /** Statement total in integer **cents**. */
    amountCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Optional bill lifecycle — renders a status `Badge` when supplied. */
    status?: BillStatus;
    /** Override the cents → string formatter (locale control). */
    formatMoney?: MoneyFormatter;
    /** Fires when the download action is pressed; the icon button renders only then. */
    onDownload?: () => void;
    /** Fires on row press (e.g. open statement); becomes a button when supplied. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * One line in a statement history — the clean V4 look: a brand-gradient disc with
 * a document glyph (the signature touch), the period with an optional status pill
 * carrying text + glyph + color, and the total in integer cents via `formatMoney`.
 * An optional download icon button renders only when `onDownload` is supplied, and
 * the whole row becomes a button when `onPress` is set. Token-only colors.
 */
export declare function StatementRow({ period, amountCents, currency, status, formatMoney: format, onDownload, onPress, style, }: StatementRowProps): React.ReactElement;
//# sourceMappingURL=StatementRow.d.ts.map