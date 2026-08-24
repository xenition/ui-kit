import * as React from 'react';
import type { BalanceHeaderProps } from './BalanceHeader';
/** Same public contract as {@link BalanceHeader} — a drop-in alternate design. */
export type BalanceHeaderV3Props = BalanceHeaderProps;
/**
 * BalanceHeader, redesigned (v3): a **left-aligned compact** row. The caption
 * sits small above, then the figure and an inline soft change chip share one
 * baseline-aligned row — no sparkline, no oversized type. Built to sit tight in
 * a card header or toolbar. Distinct at a glance from v1's stacked hero and v2's
 * centered hero. Same props, integer-cents money, token-pure.
 */
export declare function BalanceHeaderV3({ label, balanceCents, currency, changeCents, changePct, formatMoney: format, loading, style, }: BalanceHeaderV3Props): React.ReactElement;
//# sourceMappingURL=BalanceHeaderV3.d.ts.map