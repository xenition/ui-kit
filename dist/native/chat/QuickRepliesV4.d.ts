import * as React from 'react';
import type { QuickRepliesProps } from './QuickReplies';
export interface QuickRepliesV4Props extends QuickRepliesProps {
    /**
     * Wrap the chips instead of scrolling them. Default `true`.
     *
     * §7 is explicit: chips wrap and are never clipped, because a user cannot
     * choose what they cannot see. The base scrolled them horizontally, so the
     * last reply was off-screen with nothing saying so.
     */
    wrap?: boolean;
    /** Accessible name for the group. Default `'Quick replies'`. */
    groupLabel?: string;
}
/**
 * **V4 quick replies** — same props as {@link QuickReplies} plus `wrap` and
 * `groupLabel`.
 *
 * ## Three changes
 *
 * 1. **The chips wrap.** See `wrap` — the base scrolled them, so the last
 *    reply was off-screen with no affordance saying it existed.
 * 2. **Every chip clears 44** and presses with a state layer over its own
 *    fill, not an opacity on its label.
 * 3. **The set is announced as one group**, so a reader hears "Quick replies,
 *    3 items" instead of three unrelated buttons.
 *
 * **Renders nothing for an empty list** (§4.5).
 */
export declare function QuickRepliesV4({ replies, wrap, groupLabel, onSelect, style, }: QuickRepliesV4Props): React.ReactElement | null;
//# sourceMappingURL=QuickRepliesV4.d.ts.map