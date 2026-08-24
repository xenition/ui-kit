import * as React from 'react';
/** One amenity entry. `available: false` renders a struck, muted "not offered" tile. */
export interface Amenity {
    /** Human label (e.g. "In-unit laundry"). */
    label: string;
    /** Optional leading glyph/emoji. */
    glyph?: string;
    /** Availability; defaults to `true`. */
    available?: boolean;
}
export interface AmenityGridProps extends React.HTMLAttributes<HTMLUListElement> {
    /** Amenities to display. Empty renders the shared `EmptyState`. */
    amenities: Amenity[];
    /** Number of columns (default 2). */
    columns?: number;
    /** Empty-state headline. */
    emptyLabel?: string;
}
/**
 * Web parity of the native `AmenityGrid`: a grid of property amenities — each a
 * token-styled tile with an optional glyph, a check/dash availability marker, and
 * a struck label when the amenity is not offered. Presentational only (data in,
 * nothing fetches); degrades to the shared `EmptyState` when `amenities` is empty.
 * `columns` controls the layout width. All colors come from the `--xen-*` tokens
 * — no literal colors; each tile carries an a11y label.
 */
export declare const AmenityGrid: React.ForwardRefExoticComponent<AmenityGridProps & React.RefAttributes<HTMLUListElement>>;
//# sourceMappingURL=AmenityGrid.d.ts.map