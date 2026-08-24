import * as React from 'react';
import type { ClaimRowProps } from './ClaimRow';
/** Same public contract as {@link ClaimRow} — a drop-in alternate design. */
export type ClaimRowV2Props = ClaimRowProps;
/**
 * ClaimRow, redesigned (**V2**) — an **elevated card** carrying a compact status
 * **timeline chip**: a row of stage dots (Filed → Review → Approved → Paid) with
 * the reached stages filled `bg-primary` and the current one ringed, so progress
 * reads at a glance. A denied claim collapses the timeline to a single danger
 * `Badge`. Status stays glyph + text + color (never color-alone); the amount
 * anchors the top-right. Becomes a keyboard-operable button only when `onClick`
 * is set. Same `ClaimRowProps`; drops in for `ClaimRow`. Token-pure.
 */
export declare const ClaimRowV2: React.ForwardRefExoticComponent<ClaimRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ClaimRowV2.d.ts.map