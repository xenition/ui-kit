import * as React from 'react';
import { type Appearance } from '../primitives/internal/appearance';
import type { Mood, MoodPickerProps } from './MoodPicker';
export type { Mood };
export interface MoodPickerV4Props extends MoodPickerProps {
    /** Wording for each mood. Defaults to `Awful` … `Great`. */
    moodLabels?: Partial<Record<Mood, string>>;
    /** The group's own accessible name. Default `'Mood'`. */
    groupLabel?: string;
    /** Surface treatment. Defaults to `classic`, matching the rest of the module. */
    appearance?: Appearance;
}
/**
 * **V4 mood picker** — same props as {@link MoodPicker} plus `moodLabels`,
 * `groupLabel` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **Choosing "Okay" now does something.** Its tone was `muted`, which is
 *    exactly the unselected treatment, so the middle option of a five-point
 *    scale gave no feedback at all — and with `showLabels={false}` nothing
 *    whatsoever distinguished it. Selection is a filled ground **and** a check
 *    mark now, so it survives a neutral tone, greyscale and CVD.
 * 2. **The unselected faces stop being dimmed.** `opacity: 0.5` on every
 *    option but the chosen one is inside M3's disabled band: picking a mood
 *    made the other four look unavailable rather than unchosen.
 * 3. **A radio announces `checked`.** The base sent `accessibilityState={{
 *    selected }}`, which is not the state a radio carries, so a reader was
 *    never told which mood was chosen.
 * 4. **The group has a name**, and it is explicitly *not* one accessibility
 *    element — an `accessible` radiogroup would swallow its own options.
 * 5. **A face clears 44** and presses with a state layer rather than
 *    `opacity: pressed ? 0.7 : 1`.
 */
export declare function MoodPickerV4({ value, options, showLabels, moodLabels, groupLabel, appearance, onChange, style, }: MoodPickerV4Props): React.ReactElement;
//# sourceMappingURL=MoodPickerV4.d.ts.map