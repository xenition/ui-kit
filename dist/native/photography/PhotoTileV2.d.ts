import * as React from 'react';
import type { PhotoTileProps } from './PhotoTile';
/** Drop-in alternate of {@link PhotoTileProps} — identical prop contract. */
export type PhotoTileV2Props = PhotoTileProps;
/**
 * PhotoTile — design variant **V2**: a **large, selection-first tile**. A thick
 * accent ring wraps the whole tile when selected and a big circular check floats
 * top-left; a pill-backed favourite star floats top-right; a stronger caption
 * scrim anchors the foot. Built for cull / proofing sheets where selection and
 * favouriting are the primary gestures. Selection and favourite carry a glyph +
 * a11y state, never colour alone. Same props as {@link PhotoTileProps}; token-only.
 */
export declare function PhotoTileV2({ url, alt, caption, ratio, selected, favorite, loading, onPress, style, }: PhotoTileV2Props): React.ReactElement;
//# sourceMappingURL=PhotoTileV2.d.ts.map