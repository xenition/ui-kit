import * as React from 'react';
import type { MilestoneCardProps } from './MilestoneCard';
/** Where a milestone stands. Declared identically on both twins. */
export type MilestoneStatus = 'upcoming' | 'achieved' | 'delayed';
export interface MilestoneCardV4Props extends MilestoneCardProps {
    /** Where the milestone stands. Defaults from `achieved`. */
    status?: MilestoneStatus;
    /** A neutral explanation for a delayed milestone. */
    note?: string;
    /** The word each status is printed and announced with. */
    statusLabels?: Partial<Record<MilestoneStatus, string>>;
}
/**
 * **V4 milestone card** — same props as {@link MilestoneCard} plus `status`,
 * `note` and `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **A milestone has three states, not two.** `achieved` was a boolean, so a
 *    milestone a child had not reached at the expected age was indistinguishable
 *    from one whose age band has not arrived yet — the single fact a parent
 *    most needs from this screen. `status` adds `delayed`, and it is `warn`
 *    with a glyph and a word: **never `danger`**, because a child developing on
 *    their own schedule is not a fault and this module does not paint children
 *    in the error colour. `status` defaults from `achieved`, so a caller who
 *    passes neither sees exactly today's card.
 * 2. **A `delayed` milestone can explain itself.** `needsExplanation('delayed')`
 *    is what invites `note`, and the note is an explanation rather than a
 *    verdict.
 * 3. **The card is a card.** It painted `colors.surface` — the *page* colour —
 *    so it never read as raised, and its skeleton painted `colors.border`, the
 *    hairline colour used as a fill.
 * 4. **Press is a state layer**, not `opacity: pressed ? 0.85 : 1`, which sits
 *    inside M3's disabled band and made a pressed card read as unavailable.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export declare function MilestoneCardV4({ title, category, date, ageLabel, description, achieved, loading, status, note, statusLabels, onPress, style, }: MilestoneCardV4Props): React.ReactElement | null;
//# sourceMappingURL=MilestoneCardV4.d.ts.map