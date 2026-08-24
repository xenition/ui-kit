import * as React from 'react';
import type { ClaimRowProps } from './ClaimRow';
/** Drop-in replacement for {@link ClaimRow} — identical props, distinct design. */
export type ClaimRowV3Props = ClaimRowProps;
/**
 * ClaimRow, alternate design **V3** — a dense one-liner. A small status dot
 * (colored by the claim tone) sits ahead of the status glyph, then the title
 * and claim number share the line, and the amount + date close it on the right.
 * Status is still glyph + text + color (the glyph and label ride beside the
 * dot, never color-alone). Tight vertical rhythm for long lists. Same
 * `ClaimRowProps`; drops in for `ClaimRow`. Token-pure.
 */
export declare function ClaimRowV3({ claimNumber, title, status, amountCents, currency, date, formatMoney: format, onPress, style, }: ClaimRowV3Props): React.ReactElement;
//# sourceMappingURL=ClaimRowV3.d.ts.map