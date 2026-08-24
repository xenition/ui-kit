import * as React from 'react';
import type { BalanceHeaderProps } from './BalanceHeader';
/** Same public contract as {@link BalanceHeader} — a drop-in alternate design. */
export type BalanceHeaderV2Props = BalanceHeaderProps;
/**
 * BalanceHeader, redesigned (v2): a **big centered hero** over a full-width
 * sparkline band. Everything is center-aligned — the caption, the oversized
 * figure, and a pill-shaped change chip (tinted with the up/down text slot) —
 * then a {@link Sparkline} spans the full width beneath as a trend "floor".
 * Distinct at a glance from v1's left-aligned stack. Same props, integer cents.
 */
export declare function BalanceHeaderV2({ label, balanceCents, currency, changeCents, changePct, trend, formatMoney: format, loading, style, }: BalanceHeaderV2Props): React.ReactElement;
//# sourceMappingURL=BalanceHeaderV2.d.ts.map