import * as React from 'react';
import type { TournamentBracketProps } from './TournamentBracket';
export interface TournamentBracketV4Props extends TournamentBracketProps {
    /** How the advancing side is announced. Default `` (name) => `${name} advanced` ``. */
    advancedLabel?: (name: string) => string;
}
/**
 * **V4 tournament bracket** — same props as {@link TournamentBracket} plus
 * `advancedLabel`.
 *
 * ## Four changes
 *
 * 1. **The scores are announced.** The match's name was
 *    `` `${home} versus ${away}` `` on a `Pressable` that is `accessible` by
 *    default, so the two `Side`s that render the numbers were pruned with the
 *    rest of the subtree — a reader could not learn a single score anywhere in
 *    the bracket. The name now carries both sides *and* both scores, and the
 *    dash for an unplayed match survives as a spoken "–".
 * 2. **A match is not a toggle.** It announced
 *    `accessibilityState={{ selected: decided }}` (`aria-pressed={decided}` on
 *    web), so a reader was told the control was pressed because the match had
 *    a winner. Pressing it opens a detail view and can never change that.
 * 3. **The winner stops living in a hint.** It was an `accessibilityHint` here
 *    and a `title` attribute on web — a tooltip, which never reaches a touch
 *    user or a keyboard user. `advancedLabel` puts it in the name, on both
 *    twins.
 * 4. **The winning side uses `primaryText`**, the contrast-corrected ink,
 *    rather than the `primary` fill as text; a match card clears 44, and the
 *    press is a state layer instead of `opacity: 0.85`.
 */
export declare function TournamentBracketV4({ rounds, emptyLabel, advancedLabel, onMatchPress, style, }: TournamentBracketV4Props): React.ReactElement;
//# sourceMappingURL=TournamentBracketV4.d.ts.map