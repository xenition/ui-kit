import * as React from 'react';
import type { CoverGalleryProps } from './CoverGallery';
/** Drop-in for {@link CoverGalleryProps} — same props, the V4 "showcase" design. */
export type CoverGalleryV4Props = CoverGalleryProps;
/**
 * CoverGallery — **V4** "showcase" design (web parity of the native V4). An
 * elevated wall of floating rounded {@link GenerativeCover} plates (composing the
 * same seeded artwork the base does — `form`/`ink`/`paper` per plate still apply)
 * on a clean surface (NO brand gradient): each plate lifts on a soft shadow with
 * a hover bloom, captions read as bold tight-tracked headings, and `meta` becomes
 * a soft-primary chip. The base's per-tile `href` still stretches a link across
 * the plate. Honors every base prop (`items`/`columns`/`aspect`); token-only
 * colors, no literals.
 */
export declare const CoverGalleryV4: React.ForwardRefExoticComponent<CoverGalleryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CoverGalleryV4.d.ts.map