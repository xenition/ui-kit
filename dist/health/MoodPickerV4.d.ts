import * as React from 'react';
import type { Mood, MoodPickerProps } from './MoodPicker';
import { type Appearance } from './internal/tone-v4';
export interface MoodPickerV4Props extends MoodPickerProps {
    /** Override the five mood words. */
    moodLabels?: Partial<Record<Mood, string>>;
    /** The group's accessible name. Default `'Mood'`. */
    groupLabel?: string;
    /** Surface preset, matching the native twin. Default `'classic'`. */
    appearance?: Appearance;
}
/**
 * **V4 mood picker** — same props as {@link MoodPicker} plus `moodLabels`,
 * `groupLabel` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **Choosing "Okay" produced no selected state at all.** Selection was drawn
 *    as a border in the mood's own colour, and "Okay"'s colour is `muted` —
 *    which is exactly the unselected treatment. With `showLabels={false}`
 *    nothing whatsoever distinguished the chosen face from the other four, so
 *    the middle of a five-point scale was unpickable. Selection is now carried
 *    by the ground, the border and the weight, none of which depends on which
 *    mood was picked.
 * 2. **The unpicked faces were dimmed to 0.38-ish.** `opacity-50` on the
 *    alternatives is M3's *disabled* band, so four perfectly available choices
 *    looked unavailable. They are simply not selected now.
 * 3. **The radiogroup behaves like one.** No roving `tabIndex`, no arrow keys
 *    and no name on the group: a keyboard user tabbed through five separate
 *    stops into an unnamed collection. Arrow keys and Home/End move and select,
 *    one stop carries the tab, and the group has a name.
 * 4. **The faces clear 44** and press is a state layer, not `hover:opacity-70`
 *    — see change 2 for why dimming cannot mean two things at once.
 * 5. **The read-only branch stopped naming bare `<span>`s.** Role `generic`
 *    cannot be named; the five labels were dropped by the browser. It is a
 *    list now, and the chosen mood says that it is chosen in words.
 */
export declare const MoodPickerV4: React.ForwardRefExoticComponent<MoodPickerV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MoodPickerV4.d.ts.map