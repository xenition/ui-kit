import * as React from 'react';
import type { GalleryHeaderProps } from './GalleryHeader';
/** Drop-in for {@link GalleryHeaderProps} — same props, the V4 "studio" design. */
export type GalleryHeaderV4Props = GalleryHeaderProps;
/**
 * GalleryHeader — **V4** "studio" design (web parity of the native V4). The
 * client-gallery masthead, and the **one reserved gradient moment** in the
 * photography studio line. The `hero` variant is image-forward: with a
 * `coverUrl` it lays near-white ink over a full-bleed cover photo darkened by a
 * bottom scrim (`from-neutral-900/70`); with no cover it falls back to the brand
 * gradient ground (`from-primary-500 to-primary-700`). The `compact` variant is
 * a clean studio band (no gradient) — bordered `bg-surface`, a bold title, muted
 * subtitle, and a neutral count pill. The photo-count reads as a frosted
 * `primary-50` pill on the gradient; the title is a semantic `<h2>` inside a
 * `<header>`. Identical props/behavior to {@link GalleryHeaderProps}; all colors
 * from `--xen-*` token classes / brand-ramp utilities (no literals).
 */
export declare const GalleryHeaderV4: React.ForwardRefExoticComponent<GalleryHeaderProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=GalleryHeaderV4.d.ts.map