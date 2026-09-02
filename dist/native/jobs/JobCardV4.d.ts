import * as React from 'react';
import type { JobCardProps } from './JobCard';
export interface JobCardV4Props extends JobCardProps {
    /** Name of the save affordance when the job is not saved. Default `'Save job'`. */
    saveLabel?: string;
    /** Name of the save affordance when it is. Default `'Saved — tap to remove'`. */
    savedLabel?: string;
    /** Re-word the posted age. Default `'2d ago'`. */
    formatRelative?: (iso: string) => string;
    /** Name the collapsed skills. Default `'+3'`. */
    overflowLabel?: (count: number) => string;
}
/**
 * **V4 job card** — same props as {@link JobCard} plus `saveLabel`,
 * `savedLabel`, `formatRelative` and `overflowLabel`.
 *
 * ## Six changes
 *
 * 1. **The save star is reachable.** The base nested it inside the card's own
 *    `Pressable`, which is `accessible` by default and flattens everything
 *    under it — so on native the star was not a focus stop at all, and a
 *    VoiceOver user could not save a job. (Its web twin fails differently and
 *    worse: Enter on the star bubbles to the card's keydown handler, which
 *    cancels the star's own activation and opens the detail view instead, so
 *    the keyboard user saves nothing and navigates away.) The fix is
 *    structural: the card is a plain `View`, the activation wraps only the
 *    media-and-text region and carries the card's spoken name, and the star
 *    sits **beside** it with a name and a 44 target of its own.
 * 2. **Employment type stopped wearing a status colour.** `contract → warn`
 *    and `remote → success` spent the two colours that mean "caution" and
 *    "good" on a fact that is neither: a contract role is not a warning.
 *    Identity gets a neutral chip; `success`, `warn` and `danger` stay
 *    reserved for the pipeline, where they actually mean something.
 * 3. **`maxSkills={0}` no longer swallows the skills entirely.** The overflow
 *    row was drawn only when at least one chip was shown, so six skills capped
 *    at zero rendered no chips **and** no "+6" — the count disappeared with
 *    the chips it was counting. The `+N` now stands on its own, and
 *    `overflowLabel` names it.
 * 4. **The skeleton is opaque and shaped like the card.** It was drawn in
 *    `colors.border` — the hairline colour used as a fill — so a loading card
 *    read as a broken table. `skeletonFill` mixes an opaque placeholder
 *    against the card's own ground, and the block is announced politely
 *    instead of sitting there silently.
 * 5. **The card announces the job, not the title.** Location, pay, posted age
 *    and the skills are all inside the activation and are therefore flattened
 *    into it, so they belong in its name — the base announced "Title at
 *    Company, Full-time" and dropped the salary, which is the fact a job
 *    seeker is actually scanning for.
 * 6. **Press is a state layer.** `opacity: 0.9` fades the card's own content;
 *    M3 tints the container instead, and reserves fading for `disabled`.
 *
 * **Renders nothing without a job title** (§4.5).
 */
export declare function JobCardV4({ job, saved, onSave, applyState, onApply, onWithdraw, applyLoading, onPress, loading, maxSkills, saveLabel, savedLabel, formatRelative, overflowLabel, style, }: JobCardV4Props): React.ReactElement | null;
//# sourceMappingURL=JobCardV4.d.ts.map