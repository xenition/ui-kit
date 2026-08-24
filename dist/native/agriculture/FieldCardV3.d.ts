import * as React from 'react';
import type { FieldCardProps } from './FieldCard';
/** Drop-in alternate of {@link FieldCardProps} — identical prop contract. */
export type FieldCardV3Props = FieldCardProps;
/**
 * FieldCard — design variant **V3**: a **compact row** — glyph, name, an inline
 * muted area figure, and a glyph + text status flush right. No card chrome; a
 * hairline underline separates rows in a list. Same props as
 * {@link FieldCardProps}; only the layout differs. Token-only.
 */
export declare function FieldCardV3({ name, area, areaUnit, status, icon, onPress, style, }: FieldCardV3Props): React.ReactElement;
//# sourceMappingURL=FieldCardV3.d.ts.map