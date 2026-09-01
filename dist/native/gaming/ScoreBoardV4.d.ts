import * as React from 'react';
import type { ScoreBoardProps } from './ScoreBoard';
export interface ScoreBoardV4Props extends ScoreBoardProps {
    /** What a score is counted in. Default `'points'`. */
    scoreUnit?: string;
}
/**
 * **V4 scoreboard** — same props as {@link ScoreBoard} plus `scoreUnit`.
 *
 * ## Five changes
 *
 * 1. **A standings table is a list.** The rows were flex `View`s in a card
 *    with no list context at all, so a reader was never told how many
 *    competitors there were or where in the order it had landed. The ranked
 *    board is an `accessibilityRole="list"` whose rows are its items.
 * 2. **A score carries its unit.** "Rank 1, Nova, 4200" leaves the reader to
 *    guess what 4200 counts; `scoreUnit` says, and the same prop exists on the
 *    web twin, where the row's whole accessible name is currently thrown away
 *    (an `aria-label` on a role-less `<div>` is discarded by ARIA).
 * 3. **The figures are tabular.** A column of proportional numerals in a
 *    ranked list wanders left and right as it descends, which is the one thing
 *    a scoreboard's alignment is for.
 * 4. **The leader's rank and the winning side use `primaryText`,** the
 *    contrast-corrected ink, rather than the `primary` *fill* drawn as text —
 *    measured as low as 1.32:1 on a pale seed. The lead is still carried by
 *    weight and by the word "leading" as well as by colour.
 * 5. **A crest with no image loads on the module's placeholder ground**, not
 *    on `border` — the hairline token used as a fill — and the empty board is
 *    the V4 empty state.
 */
export declare function ScoreBoardV4({ entries, variant, title, emptyLabel, scoreUnit, style, }: ScoreBoardV4Props): React.ReactElement;
//# sourceMappingURL=ScoreBoardV4.d.ts.map