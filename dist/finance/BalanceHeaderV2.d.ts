import * as React from 'react';
import type { BalanceHeaderProps } from './BalanceHeader';
/** Same public contract as {@link BalanceHeader} — a drop-in alternate design. */
export type BalanceHeaderV2Props = BalanceHeaderProps;
/**
 * BalanceHeader, redesigned (v2): a **big centered hero** over a full-width
 * sparkline band. Everything is center-aligned — the caption, the oversized
 * figure, and a pill-shaped change chip (tinted with the up/down slot) — then a
 * {@link Sparkline} spans the full width beneath as a trend "floor". Distinct at
 * a glance from the base's left-aligned stack. Same props, integer cents.
 */
export declare const BalanceHeaderV2: React.ForwardRefExoticComponent<BalanceHeaderProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BalanceHeaderV2.d.ts.map