import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** A single amenity. */
export interface Amenity {
    /** Leading glyph/emoji, e.g. `'📶'`. */
    glyph?: string;
    /** Amenity name. */
    label: string;
    /** Whether the property offers it (default `true`). */
    available?: boolean;
}
/** Layout for the amenity list. */
export type AmenityRowVariant = 'wrap' | 'list';
export interface AmenityRowProps {
    /** Amenities to display. */
    amenities: readonly Amenity[];
    /** `wrap` = inline chips; `list` = one stacked row each with a status glyph. */
    variant?: AmenityRowVariant;
    style?: StyleProp<ViewStyle>;
}
/**
 * A property's amenities — either inline chips (`wrap`) or a stacked list.
 * Unavailable amenities are muted, struck, and carry a `✕` (available carry a
 * `✓`), so availability never depends on color alone. Renders an empty hint
 * when the list is empty. Token-only colors.
 */
export declare function AmenityRow({ amenities, variant, style }: AmenityRowProps): React.ReactElement;
//# sourceMappingURL=AmenityRow.d.ts.map