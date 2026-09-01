import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface LocationHeaderProps {
    /** Place name, e.g. `'New York City'`. */
    location: string;
    /** Secondary line under the location, e.g. `'Today, April 21'`. */
    date?: string;
    /** Trailing icon button handler; omit to hide the button. */
    onMenu?: () => void;
    /** Glyph for the trailing button. Default `'☰'`. */
    menuGlyph?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * LocationHeader — a rounded **sky** gradient header card (weather V4 line). A
 * pin glyph and the bold location sit over the gradient with the date beneath in
 * a softer ink; an optional circular translucent button trails on the right.
 * Reuses {@link GradientSurface} with `skyGradient` and the near-white sky inks,
 * exactly like the V4 exemplar, so the whole thing restyles from the seed and
 * never introduces a literal color.
 */
export declare function LocationHeader({ location, date, onMenu, menuGlyph, style, }: LocationHeaderProps): React.ReactElement;
//# sourceMappingURL=LocationHeader.d.ts.map