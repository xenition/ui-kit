import * as React from 'react';
import type { FieldCardProps } from './FieldCard';
/** Same public contract as {@link FieldCard} — a drop-in alternate design. */
export type FieldCardV3Props = FieldCardProps;
/**
 * FieldCard, redesigned (v3): a **dense parcel line**. The glyph leads, the name
 * (+ area) over a status·crop·soil·location subtitle with a status dot — hairline-
 * bordered for a fields list. The opposite of v2's card. Status is dot + word,
 * never color alone. Same props, token-only.
 */
export declare const FieldCardV3: React.ForwardRefExoticComponent<FieldCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FieldCardV3.d.ts.map