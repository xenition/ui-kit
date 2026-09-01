import * as React from 'react';
import type { MatchCelebrationProps } from './MatchCelebration';
export interface MatchCelebrationV4Props extends MatchCelebrationProps {
    /** Name for the close control. Default `'Close'`. */
    closeLabel?: string;
}
/**
 * **V4 match celebration** — same props as {@link MatchCelebration} plus
 * `closeLabel`.
 *
 * ## Five changes
 *
 * 1. **It can be dismissed.** The backdrop was a plain `View`, so on iOS —
 *    where there is no hardware back button to reach `onRequestClose` — a
 *    caller who left `onKeepSwiping` unset had built a celebration with no way
 *    out of it. The backdrop is a `Pressable` now **and** there is an explicit
 *    ✕ in the corner, because tapping outside a dialog is a convention, not an
 *    affordance: nothing on screen says it is there.
 * 2. **The backdrop is dark in a dark theme.** It was
 *    `withAlpha(colors.onSurface, 0.6)` — the ink slot, which is *light* on a
 *    dark scheme, so the overlay meant to push the app back washed it white
 *    instead. `scrimColor` builds it from the elevation colour, which does not
 *    invert, because a shadow does not.
 * 3. **It is a dialog, not an alert.** `role="alert"` interrupts whatever a
 *    screen reader was saying, which is for the genuinely urgent; a match is
 *    delightful, not urgent. It is `role="dialog"` with
 *    `accessibilityViewIsModal`, and the headline is a real heading.
 * 4. **A match is not an error, and a super like looks like one.** The heart
 *    disc was `danger` — the error slot on the happiest moment in the product.
 *    It takes the action's identity tone now, and `variant="superlike"` gets
 *    its own mark and its own tone rather than only different words.
 * 5. **It fits the device.** The modal pays the safe-area insets, the close
 *    control clears 44 with a state layer rather than an opacity, and under
 *    Reduce Motion the fade is dropped instead of played.
 */
export declare function MatchCelebrationV4({ visible, you, match, variant, title, onMessage, onKeepSwiping, onClose, messageLabel, keepSwipingLabel, closeLabel, }: MatchCelebrationV4Props): React.ReactElement | null;
//# sourceMappingURL=MatchCelebrationV4.d.ts.map