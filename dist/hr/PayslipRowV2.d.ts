import * as React from 'react';
import type { PayslipRowProps } from './PayslipRow';
/** Drop-in alternate design for {@link PayslipRow} — identical Props. */
export type PayslipRowV2Props = PayslipRowProps;
/**
 * PayslipRow, design **V2** — an expanded pay-statement card. A hero net figure
 * sits above a gross → deductions → net breakdown, with a take-home meter
 * showing net as a share of gross. Money stays integer **cents** through
 * `formatMoney`; payment status is a glyph + word pill (never color alone).
 * Same Props as {@link PayslipRow}. Elevated with a subtle hover lift;
 * token-pure (no literals).
 */
export declare const PayslipRowV2: React.ForwardRefExoticComponent<PayslipRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PayslipRowV2.d.ts.map