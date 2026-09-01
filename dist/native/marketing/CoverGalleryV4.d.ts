import * as React from 'react';
import type { CoverGalleryProps } from './CoverGallery';
/** Drop-in for {@link CoverGalleryProps} — same props, the V4 "showcase" design. */
export type CoverGalleryV4Props = CoverGalleryProps;
/**
 * CoverGallery — **V4** "showcase" design (native mirror of the web V4). An
 * elevated wall of floating rounded plates on the page ground (NO gradient): each
 * plate is a seeded {@link GenerativeCover} (or a real `imageUrl` `Image`) set in
 * an elevated card (`colors.card` + border + soft shadow), captions read as bold
 * tight-tracked headings, and `meta` becomes a soft-primary chip. The web CSS-grid
 * breakpoints become a flex-wrap row of `flexBasis` columns; each tile optionally
 * becomes a `Pressable` (native's `href`). As on the native base, the per-plate
 * web `form`/`ink`/`paper` role overrides are dropped (the native `GenerativeCover`
 * has a simpler seed/label contract). Honors every native base field
 * (`items`/`columns`/`aspect`); token-only colors, no literals.
 */
export declare function CoverGalleryV4({ items, columns, aspect, style, }: CoverGalleryV4Props): React.ReactElement;
//# sourceMappingURL=CoverGalleryV4.d.ts.map