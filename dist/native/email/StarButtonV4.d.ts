import * as React from 'react';
import type { StarButtonProps } from './StarButton';
export interface StarButtonV4Props extends StarButtonProps {
    /** Action announced while the message is not starred. Default `'Star'`. */
    starLabel?: string;
    /** Action announced while it is. Default `'Remove star'`. */
    unstarLabel?: string;
}
/**
 * **V4 star button** — same props as {@link StarButton} plus `starLabel` and
 * `unstarLabel`.
 *
 * ## Four changes
 *
 * 1. **It is a real target.** The base was a `spacing.xs` box around an `lg`
 *    glyph — about 26 points — propped up by `hitSlop`. A hit slop is an
 *    invisible promise: it does not move with the row it overlaps, it does not
 *    show up in a switch-control's target list, and two of these side by side
 *    overlap each other's slop. The button is now `minTap` square.
 * 2. **It announces the action, not an adjective.** "Starred" describes the
 *    world; "Remove star" says what the button will do, which is what a button
 *    label is for. The current state stays in `accessibilityState.selected` —
 *    the same split the web twin spells as `aria-pressed`, so the two twins
 *    finally say the same thing in the same order.
 * 3. **Press is a state layer.** `opacity: pressed ? 0.6` sat inside M3's
 *    *disabled* band, so a pressed star read as an unavailable one.
 *    `pressLayer` tints the container and leaves the glyph at full strength,
 *    and disabled is 0.38 rather than an invented 0.5.
 * 4. **A star is a flag, not a warning.** The base inked it with `warn` — a
 *    status slot — so a starred message and a failed one wore the same colour
 *    in one list. Starred takes `accentText`, unstarred `mutedText`, and the
 *    filled-vs-hollow glyph carries the state without any colour at all.
 */
export declare function StarButtonV4({ starred, onToggle, size, disabled, starLabel, unstarLabel, style, }: StarButtonV4Props): React.ReactElement;
//# sourceMappingURL=StarButtonV4.d.ts.map