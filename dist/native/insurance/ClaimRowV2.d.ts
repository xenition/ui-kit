import * as React from 'react';
import type { ClaimRowProps } from './ClaimRow';
/** Drop-in replacement for {@link ClaimRow} — identical props, distinct design. */
export type ClaimRowV2Props = ClaimRowProps;
/**
 * ClaimRow, alternate design **V2** — an elevated card carrying a compact
 * status **timeline chip**: a row of stage dots (Filed → Review → Approved →
 * Paid) with the reached stages filled and the current one ringed, so progress
 * reads at a glance. A denied claim collapses the timeline to a single danger
 * marker. Status stays glyph + text + color; the amount anchors the top-right.
 * Same `ClaimRowProps`; drops in for `ClaimRow`. Token-pure.
 */
export declare function ClaimRowV2({ claimNumber, title, status, amountCents, currency, date, formatMoney: format, onPress, style, }: ClaimRowV2Props): React.ReactElement;
//# sourceMappingURL=ClaimRowV2.d.ts.map