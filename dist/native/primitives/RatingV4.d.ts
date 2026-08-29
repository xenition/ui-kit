import * as React from 'react';
import type { RatingProps, RatingSize } from './Rating';
export type { RatingProps as RatingV4Props, RatingSize };
/**
 * **V4 rating** — same props as {@link Rating}, a different design line.
 *
 * ## The row stops rounding the number away
 *
 * The base drew `Math.round(value)` filled stars. A 4.2 and a 4.4 render
 * identically, a 4.4 and a 4.6 render a whole star apart, and every product
 * that has ever shown "4.2 ★" beside the glyphs was showing two different
 * numbers at once. `design.md` §8 bans meaningless charts, and a five-cell bar
 * chart that rounds its input to the nearest cell is one.
 *
 * V4 clips a filled row over an empty one at the exact fraction, so 4.2 of 5 is
 * 84% of the row and the glyphs agree with the label. Nothing about the props
 * changed — this is the same number, drawn honestly.
 *
 * ## The filled star is text, so it takes a text colour
 *
 * `accent` is a FILL token: the compiler guarantees `onAccent` against it and
 * promises nothing about it against `surface`. A filled star is not a fill — it
 * is a glyph, and the base web twin measured at **1.43:1** in light mode, which
 * is a star you cannot see. `accentText` is the same hue walked until it clears
 * AA, and identical wherever `accent` already did. The native base had already
 * fixed this; its web twin had not, and now both agree.
 *
 * A rating is also, deliberately, the one place in this line that uses a BRAND
 * colour rather than a semantic one. §35.4 reserves success-green for success:
 * four stars out of five is not a healthy state, it is a measurement, and
 * painting it green would spend a meaning on something that does not have one.
 *
 * ## One label, no glyph soup
 *
 * The whole row is a single accessible `image` carrying `"{value} out of {max}
 * stars"`. A screen reader hearing "black star, black star, black star" has
 * been told nothing, and the exact value survives even though the visual is a
 * fraction.
 */
export declare function RatingV4({ value, max, size, showValue, label, style, }: RatingProps): React.ReactElement;
//# sourceMappingURL=RatingV4.d.ts.map