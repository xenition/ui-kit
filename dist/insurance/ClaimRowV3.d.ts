import * as React from 'react';
import type { ClaimRowProps } from './ClaimRow';
/** Same public contract as {@link ClaimRow} — a drop-in alternate design. */
export type ClaimRowV3Props = ClaimRowProps;
/**
 * ClaimRow, redesigned (**V3**) — a **dense one-liner**. A small status dot
 * (colored by the claim tone) sits ahead of the status glyph + label, then the
 * title and claim number share the line, and the amount + date close it on the
 * right. Status is still glyph + text + color (never color-alone). Tight
 * vertical rhythm packs long claims lists. Becomes a keyboard-operable button
 * only when `onClick` is set. Same `ClaimRowProps`; drops in for `ClaimRow`.
 * Token-pure.
 */
export declare const ClaimRowV3: React.ForwardRefExoticComponent<ClaimRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ClaimRowV3.d.ts.map