import * as React from 'react';
import type { BillCardProps } from './BillCard';
/** Same public contract as {@link BillCard} — a drop-in alternate design. */
export type BillCardV3Props = BillCardProps;
/**
 * BillCard, redesigned (v3): a **dense scan line**. A small state dot leads, the
 * provider and a middot-joined `status · line · due · account` caption share the
 * flexible middle, and the amount hugs the right with an optional compact pay
 * button beneath it. No card, no glyph tile — tuned for long bill lists. Distinct
 * at a glance from v1/v2. Same props; status is dot + glyph + label text (never
 * color alone); integer cents; token-pure.
 */
export declare const BillCardV3: React.ForwardRefExoticComponent<BillCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BillCardV3.d.ts.map