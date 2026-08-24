import * as React from 'react';
export type RatingSize = 'sm' | 'md' | 'lg';
export interface RatingProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
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
     * glyphs themselves are decorative (`aria-hidden`); this label carries the
     * meaning.
     */
    label?: string;
}
/**
 * A ★ rating row — the "Stars" widget the templates hand-rolled, promoted to a
 * token-only primitive. Draws `max` glyphs: filled (the `accent` slot) up to
 * the rounded `value`, empty (the `muted` slot) after. Announced as one
 * `role="img"` with an aria-label (`"{value} out of {max} stars"` or a custom
 * `label`); the glyphs are decorative. An optional trailing numeric value.
 */
export declare const Rating: React.ForwardRefExoticComponent<RatingProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=Rating.d.ts.map