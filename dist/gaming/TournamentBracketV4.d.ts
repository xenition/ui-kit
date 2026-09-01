import * as React from 'react';
import type { TournamentBracketProps } from './TournamentBracket';
export interface TournamentBracketV4Props extends TournamentBracketProps {
    /** How the advancing side is said. Default `'Ada advanced'`. */
    advancedLabel?: (name: string) => string;
}
/**
 * **V4 tournament bracket** — same props as {@link TournamentBracket} plus
 * `advancedLabel`.
 *
 * ## Four changes
 *
 * 1. **A reader can learn a score.** The match's name was
 *    `"Ada versus Kite"` — no scores — and it sat on a `role="button"`, which
 *    makes the whole subtree presentational. So the two sides that render the
 *    scores were removed from the accessibility tree by the same element that
 *    failed to mention them, and a screen-reader user could not learn a single
 *    score anywhere in the bracket. The name is built with `spokenLine()` and
 *    carries both sides and both scores.
 * 2. **Opening a match stops claiming to be a toggle.** It announced
 *    `aria-pressed={decided}` — pressed because the match had a *winner*,
 *    which the user cannot change and which has nothing to do with whether
 *    they have pressed anything. It opens a detail view; it is an action.
 * 3. **Who advanced is on the screen.** It lived in a `title` attribute:
 *    invisible on touch, invisible to the keyboard, announced by some readers
 *    and not others, and untranslatable by the app. `advancedLabel` puts it in
 *    the card as text and in the match's name.
 * 4. **The rounds are lists, press is a state layer and scores are tabular.**
 *    Each round was a stack of anonymous `div`s; `hover:opacity-85` dimmed the
 *    match's own content, which is M3's *disabled* signal; and proportional
 *    digits made the score column shift as a live bracket updated.
 */
export declare const TournamentBracketV4: React.ForwardRefExoticComponent<TournamentBracketV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TournamentBracketV4.d.ts.map