import * as React from 'react';
import type { ScoreBoardProps } from './ScoreBoard';
export interface ScoreBoardV4Props extends ScoreBoardProps {
    /** The unit a score is announced in. Default `'points'`. */
    scoreUnit?: string;
}
/**
 * **V4 scoreboard** — same props as {@link ScoreBoard} plus `scoreUnit`.
 *
 * ## Four changes
 *
 * 1. **Every row's name lands.** The board built a good one — "Rank 2, Kite,
 *    980 points" — and hung it on a bare `<div>`, twice: once per standings
 *    row and once per versus side. ARIA forbids naming a generic element, so
 *    the browser threw all of them away and a reader got the rank, the name
 *    and the score as three unrelated fragments, in a container with no
 *    structure to hold them together. Meanwhile the native twin sets
 *    `accessible` and does announce it — the same component telling two
 *    platforms two different things.
 * 2. **The standings are a list.** They were flex `div`s: no count, no
 *    position, nothing to say "4 of 8" with, and no way to move by item. An
 *    `<ol>` says the order is the meaning, which for a ranked board it is.
 * 3. **A score is a number with a unit and tabular figures.** `950` alone is
 *    not a fact, and proportional digits mean the score column jiggles left
 *    and right as a live match ticks — the one column a viewer is watching.
 * 4. **The crest placeholder stops inverting.** `bg-neutral-200` is a step on
 *    the web ramp, which mirrors under `[data-theme="dark"]` while the crest
 *    loading over it does not.
 */
export declare const ScoreBoardV4: React.ForwardRefExoticComponent<ScoreBoardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ScoreBoardV4.d.ts.map