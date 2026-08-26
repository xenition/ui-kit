import * as React from 'react';
import type { LabelProps } from './Label';
export type { LabelProps as LabelV4Props };
/**
 * **V4 form label** — same props as {@link Label}, a different design line.
 *
 * A label is the least decorative thing in a kit and the easiest to get
 * quietly wrong, so V4 changes three things and nothing else.
 *
 * 1. **"Required" is announced, not just drawn.** The base label rendered a
 *    red `*` and stopped there — on the web it was even `aria-hidden`, so the
 *    single fact the marker exists to carry never reached a screen reader.
 *    A visual-only requirement is not a requirement (§46); V4 folds it into
 *    the label's accessible name, which is what a screen reader reads out
 *    when the field takes focus.
 * 2. **The marker takes the measured red.** `dangerText` is `danger` walked in
 *    lightness until it clears AA on `surface`. The raw `danger` slot carries
 *    a guarantee about `onDanger`, not about itself as ink — and this glyph is
 *    small, which is precisely where the difference shows.
 * 3. **The face and the offset come from the theme.** The base set no
 *    `fontFamily` at all, so a native label fell through to the system font
 *    while its web twin inherited the seed's body face — the same label in two
 *    typefaces. The marker's offset was a literal `2`; it is now half a step of
 *    the spacing scale.
 *
 * No container, no fill, no gradient. A label is typography, and §10 asks that
 * typography do this work before anything else is reached for.
 */
export declare function LabelV4({ required, style, children, ...rest }: LabelProps): React.ReactElement;
//# sourceMappingURL=LabelV4.d.ts.map