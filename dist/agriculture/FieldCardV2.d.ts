import * as React from 'react';
import type { FieldCardProps } from './FieldCard';
/** Same public contract as {@link FieldCard} — a drop-in alternate design. */
export type FieldCardV2Props = FieldCardProps;
/**
 * FieldCard, redesigned (v2): an **elevated parcel card**. A big field glyph tile
 * leads the name and area; crop·soil·location render as tinted stat chips with a
 * status badge on the header. Distinct from v1. Same props, token-only.
 */
export declare const FieldCardV2: React.ForwardRefExoticComponent<FieldCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FieldCardV2.d.ts.map