import * as React from 'react';
import type { AutoPayRowProps } from './AutoPayRow';
/** Drop-in for {@link AutoPayRowProps} — same props, a different design. */
export type AutoPayRowV4Props = AutoPayRowProps;
/**
 * AutoPayRow — **V4** design. An elevated row: the AutoPay glyph in the
 * signature brand-gradient disc, a title with an on/off status conveyed by a
 * badge + label (never the switch color alone), the token-bound controlled
 * `Switch`, and — when enabled — a funding method / next-charge summary (amounts
 * integer cents via `formatMoney`). Honors `disabled`. Same props as
 * {@link AutoPayRowProps}; token-only colors.
 */
export declare function AutoPayRowV4({ label, enabled, onToggle, method, nextChargeDate, amountCents, currency, formatMoney: format, disabled, style, }: AutoPayRowV4Props): React.ReactElement;
//# sourceMappingURL=AutoPayRowV4.d.ts.map