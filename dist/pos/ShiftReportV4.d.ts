import * as React from 'react';
import type { ShiftReportProps } from './ShiftReport';
/** Drop-in for {@link ShiftReportProps} — same props, the V4 "register" design. */
export type ShiftReportV4Props = ShiftReportProps;
/**
 * ShiftReport — **V4** "register" design (web parity of the native V4). The
 * tactile end-of-shift Z-report: the headline numbers (gross sales,
 * transactions, cash counted, variance) become a crisp **grid of big-numeral
 * stat tiles** you can read across the counter, gross sales carrying the one
 * accent. Refunds / discounts / tax / net stay as a compact ledger beneath. The
 * variance tile is colored by over/short (icon + word pill, never color alone).
 * Optional per-tender breakdown; a shift with no sales renders an
 * {@link EmptyState}. All money is integer **cents** via `formatMoney`. Same
 * props/behavior as {@link ShiftReportProps}; token-only colors.
 */
export declare const ShiftReportV4: React.ForwardRefExoticComponent<ShiftReportProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ShiftReportV4.d.ts.map