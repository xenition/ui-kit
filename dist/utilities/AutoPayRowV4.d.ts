import * as React from 'react';
import type { AutoPayRowProps } from './AutoPayRow';
/** Drop-in for {@link AutoPayRowProps} — same props, a different design. */
export type AutoPayRowV4Props = AutoPayRowProps;
/**
 * AutoPayRow — **V4** design. An elevated card row: the AutoPay glyph in the
 * signature brand-gradient disc, a title with an on/off status conveyed by a
 * badge + label (never the switch color alone), the token-bound controlled
 * `Switch`, and — when enabled — a funding method / next-charge summary (amounts
 * integer cents via `formatMoney`). Honors `disabled`. Same props/behavior as
 * {@link AutoPayRowProps}; token-only colors.
 */
export declare const AutoPayRowV4: React.ForwardRefExoticComponent<AutoPayRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AutoPayRowV4.d.ts.map