import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type PayslipStatus } from './internal';
export type PayslipRowVariant = 'default' | 'compact';
export interface PayslipRowProps {
    /** Pay period label (e.g. "Aug 1–15, 2026"). */
    period: string;
    /** Net (take-home) pay in integer **cents**. */
    netCents: number;
    /** Gross pay in integer **cents** (shown on the default variant). */
    grossCents?: number;
    /** Total deductions in integer **cents** (shown on the default variant). */
    deductionsCents?: number;
    /** ISO 4217 currency (default USD). */
    currency?: string;
    /** Payment status — glyph + word pill. */
    status?: PayslipStatus;
    /** Pre-formatted pay date. */
    payDate?: string;
    /** Density. */
    variant?: PayslipRowVariant;
    /** Tap handler (e.g. open the full payslip / download PDF). */
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * One payroll line: pay period, net pay, and optional gross / deductions
 * breakdown. Money is carried as integer **cents** and rendered through the
 * shared `formatMoney` for stable 2-decimal output. Payment status is a glyph +
 * word pill so it never rests on color alone. `compact` shows only period + net.
 * All colors are theme tokens — no literals.
 */
export declare function PayslipRow({ period, netCents, grossCents, deductionsCents, currency, status, payDate, variant, onPress, testID, style, }: PayslipRowProps): React.ReactElement;
//# sourceMappingURL=PayslipRow.d.ts.map