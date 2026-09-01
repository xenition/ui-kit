import * as React from 'react';
import type { ReadUnreadToggleProps } from './ReadUnreadToggle';
export interface ReadUnreadToggleV4Props extends ReadUnreadToggleProps {
    /** Action announced while the message is unread. Default `'Mark as read'`. */
    readLabel?: string;
    /** Action announced while it is read. Default `'Mark as unread'`. */
    unreadLabel?: string;
}
/**
 * **V4 read / unread toggle** — same props as {@link ReadUnreadToggle} plus
 * `readLabel` and `unreadLabel`.
 *
 * ## Four changes
 *
 * 1. **The zero-size `View` is gone.** The base shipped a `0 × 0` element
 *    carrying the comment "current state exposed as plain text for AT" — with
 *    no text in it, `accessibilityElementsHidden`, and
 *    `importantForAccessibility="no"`. It provided exactly nothing, and the
 *    comment is worse than the omission because it stops anyone looking again.
 * 2. **The state is actually announced.** `accessibilityState.selected` says
 *    whether the message is read; the label stays the *action*. That is the
 *    same pair the web twin spells as `aria-pressed` plus the action label, so
 *    the two twins say the same thing.
 * 3. **It clears 44.** The base was two `spacing.xs` paddings around a `base`
 *    glyph — roughly 24 points — with a `hitSlop` of 6 standing in for the
 *    rest.
 * 4. **The chip ground is opaque and press is a state layer.**
 *    `withAlpha(colors.primary, 0.1)` borrowed whatever was behind it, so the
 *    same toggle was a different colour on a card and on the page; and
 *    `opacity: pressed ? 0.7` dimmed the content instead of tinting the
 *    container. Disabled is 0.38, not 0.5.
 */
export declare function ReadUnreadToggleV4({ read, onToggle, iconOnly, disabled, readLabel, unreadLabel, style, }: ReadUnreadToggleV4Props): React.ReactElement;
//# sourceMappingURL=ReadUnreadToggleV4.d.ts.map