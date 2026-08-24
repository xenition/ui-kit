import * as React from 'react';
import type { FieldCardProps } from './FieldCard';
/** Drop-in alternate of {@link FieldCardProps} — identical prop contract. */
export type FieldCardV2Props = FieldCardProps;
/**
 * FieldCard — design variant **V2**: an elevated card built around a prominent
 * **area block** (large figure + unit on a tinted panel) with a glyph + text
 * status badge, then a labeled crop / soil / location stat grid. Where V1 puts
 * area as a small subtitle, V2 makes it the hero. Same props as
 * {@link FieldCardProps}; only the layout differs. Token-only.
 */
export declare function FieldCardV2({ name, area, areaUnit, crop, soilType, location, status, icon, onPress, style, }: FieldCardV2Props): React.ReactElement;
//# sourceMappingURL=FieldCardV2.d.ts.map