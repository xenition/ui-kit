import * as React from 'react';
import type { ChildMood, ChildProfileCardProps } from './ChildProfileCard';
export interface ChildProfileCardV4Props extends ChildProfileCardProps {
    /** The word each mood is printed and announced with. */
    moodLabels?: Partial<Record<ChildMood, string>>;
}
/**
 * **V4 child profile card** — same props as {@link ChildProfileCard} plus
 * `moodLabels`.
 *
 * ## Four changes
 *
 * 1. **The card's summary is not silently dropped.** The non-pressable branch
 *    wrapped the card in a bare `View` carrying `accessibilityLabel` and no
 *    `accessible`, which Android ignores outright — so a child's whole profile
 *    read as one name on iOS and as six loose fragments on Android. It is now
 *    explicitly `accessible`, and it carries the birthday and the interests it
 *    used to leave off.
 * 2. **A sad or unwell child is not a system fault, and is not coloured like
 *    one.** Mood is a glyph and a word, on no chip at all — this module does
 *    not grade a child by hue.
 * 3. **The card is a card and its skeleton is a skeleton.** It painted
 *    `colors.surface` — the *page* colour — so it never read as raised and dark
 *    mode went flat; the skeleton painted `colors.border`, the hairline colour
 *    used as a fill, which on a dark seed is very nearly invisible.
 * 4. **Press is a state layer** over a `card` ground rather than
 *    `opacity: pressed ? 0.85 : 1`, which sits inside M3's *disabled* band, and
 *    the pressable region clears the 44 floor.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export declare function ChildProfileCardV4({ name, photoUrl, age, grade, birthday, mood, interests, loading, moodLabels, onPress, style, }: ChildProfileCardV4Props): React.ReactElement | null;
//# sourceMappingURL=ChildProfileCardV4.d.ts.map