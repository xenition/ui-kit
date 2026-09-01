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
 * **V4 quick replies** — the web twin of the native `QuickRepliesV4`, same
 * props as {@link QuickReplies} plus `wrap` and `groupLabel`.
 *
 * ## Three changes
 *
 * 1. **The chips wrap.** See `wrap`.
 * 2. **Every chip clears 44** and hovers with the shared state layer.
 * 3. **The set is a real list with a name**, so a reader hears "Quick
 *    replies, 3 items" instead of three unrelated buttons.
 *
 * **Renders nothing for an empty list** (§4.5).
 */
export declare const QuickRepliesV4: React.ForwardRefExoticComponent<QuickRepliesV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QuickRepliesV4.d.ts.map