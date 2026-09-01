import * as React from 'react';
import type { AchievementUnlockProps } from './AchievementUnlock';
export interface AchievementUnlockV4Props extends AchievementUnlockProps {
    /** Overline and spoken state while the trophy is locked. Default `'Locked'`. */
    lockedLabel?: string;
    /** Unit after the point value. Default `'G'` — the base's bare `" G"` suffix. */
    pointsUnit?: string;
}
/**
 * **V4 achievement unlock** — same props as {@link AchievementUnlock} plus
 * `lockedLabel` and `pointsUnit`.
 *
 * ## Five changes
 *
 * 1. **A locked achievement does not fire `onPress`.** The base set
 *    `accessibilityState={{ disabled: !unlocked }}` and left the `Pressable`
 *    live — the state is advisory, `disabled` is what actually blocks the
 *    press — so a locked trophy announced itself as unavailable and then
 *    opened anyway. (The web twin says `aria-disabled` and fires `onClick`,
 *    and its own docstring claims a real disabled `<button>`.) It is now
 *    genuinely disabled, and it dims to M3's 0.38 rather than staying at full
 *    strength.
 * 2. **The card announces its content.** The name was
 *    `` `${label}: ${title}` `` — the criteria and the point value, the two
 *    things that say what the trophy is *for*, were inside a subtree the label
 *    had already collapsed.
 * 3. **A trophy is identity, not a warning.** The medallion, its ring and the
 *    overline were all `warn` — a status slot spent on a decoration — and the
 *    overline used the `warn` *fill* as text. The medallion is the module's
 *    opaque neutral ground with the glyph as its ink, so it reads the same in
 *    both schemes and frees `warn` to mean warn.
 * 4. **`pointsUnit` replaces the bare `" G"`.** A gamerscore suffix is
 *    Xbox-specific copy hard-coded into a design system.
 * 5. **A press is a state layer**, not `opacity: 0.9`.
 */
export declare function AchievementUnlockV4({ achievement, variant, unlocked, label, lockedLabel, pointsUnit, onPress, style, }: AchievementUnlockV4Props): React.ReactElement;
//# sourceMappingURL=AchievementUnlockV4.d.ts.map