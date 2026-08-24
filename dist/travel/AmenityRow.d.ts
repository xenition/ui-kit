import * as React from 'react';
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
export interface AmenityRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Amenities to display. */
    amenities: readonly Amenity[];
    /** `wrap` = inline chips; `list` = one stacked row each with a status glyph. */
    variant?: AmenityRowVariant;
}
/**
 * Web parity of the native `AmenityRow`: a property's amenities — either inline
 * chips (`wrap`) or a stacked list. Unavailable amenities are muted, struck, and
 * carry a `✕` (available carry a `✓`), so availability never depends on color
 * alone. Renders an empty hint when the list is empty. Token-only colors.
 */
export declare const AmenityRow: React.ForwardRefExoticComponent<AmenityRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AmenityRow.d.ts.map