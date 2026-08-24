import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** One amenity entry. `available: false` renders a struck, muted "not offered" tile. */
export interface Amenity {
    /** Human label (e.g. "In-unit laundry"). */
    label: string;
    /** Optional leading glyph/emoji. */
    glyph?: string;
    /** Availability; defaults to `true`. */
    available?: boolean;
}
export interface AmenityGridProps {
    /** Amenities to display. Empty renders the shared `EmptyState`. */
    amenities: Amenity[];
    /** Number of columns (default 2). */
    columns?: number;
    /** Empty-state headline. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A wrapping grid of property amenities — each a token-styled tile with an
 * optional glyph, a check/dash availability marker, and a struck label when the
 * amenity is not offered. Presentational only (data in, nothing fetches);
 * degrades to the shared `EmptyState` when `amenities` is empty. `columns`
 * controls the layout width. Token-only colors and a11y labels per tile.
 */
export declare function AmenityGrid({ amenities, columns, emptyLabel, style, }: AmenityGridProps): React.ReactElement;
//# sourceMappingURL=AmenityGrid.d.ts.map