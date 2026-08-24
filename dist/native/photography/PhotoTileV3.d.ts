import * as React from 'react';
import type { PhotoTileProps } from './PhotoTile';
/** Drop-in alternate of {@link PhotoTileProps} — identical prop contract. */
export type PhotoTileV3Props = PhotoTileProps;
/**
 * PhotoTile — design variant **V3**: a **compact thumbnail**. A small square-ish
 * chip with a tight radius and no caption chrome — selection is a slim accent
 * ring plus a tiny corner check, favourite a tiny star dot. Made for dense strips
 * and pickers where many thumbs share a row. Selection/favourite keep a glyph +
 * a11y state, never colour alone. Same props as {@link PhotoTileProps}; token-only.
 */
export declare function PhotoTileV3({ url, alt, caption, ratio, selected, favorite, loading, onPress, style, }: PhotoTileV3Props): React.ReactElement;
//# sourceMappingURL=PhotoTileV3.d.ts.map