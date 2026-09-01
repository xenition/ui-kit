import * as React from 'react';
import type { AmenityGridProps } from './AmenityGrid';
/** Drop-in for {@link AmenityGridProps} — same props, the V4 "listing" design. */
export type AmenityGridV4Props = AmenityGridProps;
/**
 * AmenityGrid — **V4** "listing" design (web parity of the native V4). The
 * image-forward, editorial take on the amenity grid: each amenity is a soft-primary
 * tinted glyph disc above an airy label, wrapping responsively into a clean grid.
 * ONE accent = primary; unavailable amenities read muted with a struck label and a
 * dashed disc. Same props/behavior as {@link AmenityGridProps}; `columns` sets the
 * layout width and an empty list degrades to the shared `EmptyState`. All colors
 * come from the `--xen-*` token classes (no literals); each tile carries an a11y label.
 */
export declare const AmenityGridV4: React.ForwardRefExoticComponent<AmenityGridProps & React.RefAttributes<HTMLUListElement>>;
//# sourceMappingURL=AmenityGridV4.d.ts.map