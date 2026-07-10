import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type RatingSize = 'sm' | 'md' | 'lg';
export interface RatingProps {
    /** The rating value; filled glyphs are drawn up to `Math.round(value)`. */
    value: number;
    /** Total number of glyphs (default 5). */
    max?: number;
    /** Glyph size (default `md`). */
    size?: RatingSize;
    /** Render the numeric value after the glyphs. */
    showValue?: boolean;
    /**
     * Custom accessible name. Defaults to `"{value} out of {max} stars"`. The
     * row is announced as one `image`; the glyphs carry no separate a11y text.
     */
    label?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A ★ rating row — the native mirror of the web `Rating`. Draws `max` glyphs:
 * filled (the `accent` token) up to the rounded `value`, empty (the `muted`
 * token) after. The whole row is one accessible `image` with an aria-label
 * (`"{value} out of {max} stars"` or a custom `label`); optional trailing
 * numeric value. Token-only — no literal colors.
 */
export declare function Rating({ value, max, size, showValue, label, style, }: RatingProps): React.ReactElement;
//# sourceMappingURL=Rating.d.ts.map