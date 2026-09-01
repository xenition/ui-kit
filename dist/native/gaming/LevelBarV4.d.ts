import * as React from 'react';
import type { LevelBarProps } from './LevelBar';
export type LevelBarV4Props = LevelBarProps;
/**
 * **V4 level bar** — the same props as {@link LevelBar}.
 *
 * ## Four changes
 *
 * 1. **The XP fraction is actually announced.** The base's docstring says "the
 *    bar carries an `accessibilityValue` so the fraction is announced" — and
 *    it does not. The `Progress` primitive supplies the value correctly, and
 *    then the wrapping `View` sets `accessible` with its own label, which
 *    collapses the subtree and drops the `progressbar` with it. A reader heard
 *    "Level 7, 40% to next level" and could never reach the meter. The bar is
 *    now the labelled `progressbar` itself, so the level, the XP and the value
 *    arrive together, in one stop, from the element that owns them.
 * 2. **`warn` means `warn`.** The base `Progress` routes a `warn` bar to the
 *    `accent` token — a brand colour standing in for a semantic one — with the
 *    comment that there is no warning slot. There is one, and the tone table
 *    hands it over.
 * 3. **The track is an opaque placeholder, not the `border` hairline used as a
 *    fill.** A rule between rows and the unfilled half of a meter are not the
 *    same object and should not share a token.
 * 4. **The readout is drawn, not read twice.** `12.3K / 20K XP` and `62%` sat
 *    beside a bar that says the same thing, as two more stops; they are hidden
 *    from the reader and the numerals are tabular so the percentage does not
 *    jitter as it climbs. The chip and the bar's geometry come off the spacing
 *    scale.
 */
export declare function LevelBarV4({ level, xp, xpMax, variant, tone, style, }: LevelBarV4Props): React.ReactElement;
//# sourceMappingURL=LevelBarV4.d.ts.map