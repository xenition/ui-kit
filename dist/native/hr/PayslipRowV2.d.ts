import * as React from 'react';
import type { PayslipRowProps } from './PayslipRow';
/** Drop-in alternate design for {@link PayslipRow} — identical Props. */
export type PayslipRowV2Props = PayslipRowProps;
/**
 * PayslipRow, design **V2** — an expanded pay-statement card. A hero net figure
 * sits above a gross → deductions → net breakdown, with a take-home meter
 * showing net as a share of gross. Money stays integer **cents** through
 * `formatMoney`; payment status is a glyph + word pill (never color alone).
 * Same Props as {@link PayslipRow}. Elevated + mount-fade, token-pure.
 */
export declare function PayslipRowV2({ period, netCents, grossCents, deductionsCents, currency, status, payDate, onPress, testID, style, }: PayslipRowV2Props): React.ReactElement;
//# sourceMappingURL=PayslipRowV2.d.ts.map