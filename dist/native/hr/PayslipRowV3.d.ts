import * as React from 'react';
import type { PayslipRowProps } from './PayslipRow';
/** Drop-in alternate design for {@link PayslipRow} — identical Props. */
export type PayslipRowV3Props = PayslipRowProps;
/**
 * PayslipRow, design **V3** — a dense statement line for a payroll list. Period
 * (and pay date) on the left, net pay pinned right with a leading status glyph +
 * word beneath it (never color alone). Money stays integer **cents** through
 * `formatMoney`. Same Props as {@link PayslipRow}; the gross/deductions
 * breakdown is dropped for density. Press-scales on tap; token-pure.
 */
export declare function PayslipRowV3({ period, netCents, currency, status, payDate, onPress, testID, style, }: PayslipRowV3Props): React.ReactElement;
//# sourceMappingURL=PayslipRowV3.d.ts.map