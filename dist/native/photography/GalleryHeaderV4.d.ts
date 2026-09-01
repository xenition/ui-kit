import * as React from 'react';
import type { GalleryHeaderProps } from './GalleryHeader';
/** Drop-in for {@link GalleryHeaderProps} — same props, the V4 "studio" design. */
export type GalleryHeaderV4Props = GalleryHeaderProps;
/**
 * GalleryHeader — **V4** "studio" design (native parity of the web V4). The
 * client-gallery masthead, and the **one reserved gradient moment** in the
 * photography studio line. The `hero` variant is image-forward: with a
 * `coverUrl` it lays near-white `studioInk` over a full-bleed cover photo
 * darkened by a bottom `studioScrim`; with no cover it falls back to the brand
 * `studioGradient` ground. The `compact` variant is a clean studio band (no
 * gradient) — bordered `surface`, a bold title, muted subtitle, and a neutral
 * count pill. The photo-count reads as a frosted `studioTile`/`studioBorder`
 * pill on the gradient; the title carries an accessibility `header` role.
 * Identical props/behavior to {@link GalleryHeaderProps}; token-only colors via
 * `useXenitionTheme()` + the studio ramp helpers, no literals.
 */
export declare function GalleryHeaderV4({ title, subtitle, photoCount, coverUrl, variant, actions, countLabel, style, }: GalleryHeaderV4Props): React.ReactElement;
//# sourceMappingURL=GalleryHeaderV4.d.ts.map