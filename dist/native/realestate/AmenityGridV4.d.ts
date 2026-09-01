import * as React from 'react';
import type { AmenityGridProps } from './AmenityGrid';
/** Drop-in for {@link AmenityGridProps} — same props, the V4 "listing" design. */
export type AmenityGridV4Props = AmenityGridProps;
/**
 * AmenityGrid — **V4** "listing" design. The image-forward, editorial take on the
 * amenity grid: each amenity is a soft-primary tinted glyph disc above an airy
 * label, wrapping responsively into a clean grid. ONE accent = primary; unavailable
 * amenities read muted with a struck label and a dashed disc. Same props/behavior
 * as {@link AmenityGridProps}; `columns` sets the layout width and an empty list
 * degrades to the shared `EmptyState`. Token-only colors via `useXenitionTheme()`;
 * each tile carries an a11y label.
 */
export declare function AmenityGridV4({ amenities, columns, emptyLabel, style, }: AmenityGridV4Props): React.ReactElement;
//# sourceMappingURL=AmenityGridV4.d.ts.map