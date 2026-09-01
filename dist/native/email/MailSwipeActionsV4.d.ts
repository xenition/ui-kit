import * as React from 'react';
import type { MailSwipeActionsProps } from './MailSwipeActions';
export interface MailSwipeActionsV4Props extends MailSwipeActionsProps {
    /**
     * Ids that destroy something. An action listed here takes **two** presses:
     * the first arms it and repaints the panel with `confirmLabel`, the second
     * fires `onPress`. Empty by default, so nothing changes for a caller who
     * says nothing.
     */
    destructiveIds?: string[];
    /** The armed panel's word. Default `` `Confirm ${label}` ``. */
    confirmLabel?: (label: string) => string;
    /** The rail's accessible name. Default `'Message actions'`. */
    toolbarLabel?: string;
}
/**
 * **V4 mail swipe rail** — same props as {@link MailSwipeActions} plus
 * `destructiveIds`, `confirmLabel` and `toolbarLabel`.
 *
 * ## Five changes
 *
 * 1. **A destructive action asks first.** Delete fired on a single tap, with
 *    no confirmation, no undo, and no prop through which a caller could ask
 *    for either — on a rail that is often the only route to it. An id in
 *    `destructiveIds` arms on the first press and fires on the second, and the
 *    armed state is a **word** ("Confirm Delete"), not a colour, so it survives
 *    a colour-blind user and a screen reader alike. Arming one action disarms
 *    any other.
 * 2. **The reading order matches the painted order.** `side="trailing"` was
 *    drawn with `flexDirection: 'row-reverse'`, which reverses the paint and
 *    leaves traversal running the other way — on a rail whose last item is
 *    typically Delete. V4 reverses the *array* and lays it out in `row`, so
 *    the picture is identical and a switch-control walks it left to right.
 * 3. **The rail has a name.** An unnamed `toolbar` announces as a container
 *    with nothing in it worth saying.
 * 4. **The glyph and its label are the same colour**, and it is the panel
 *    fill's guaranteed pair. See {@link TONE_SLOTS}.
 * 5. **Press is a state layer and the panel clears 44.** `opacity: 0.85`
 *    dimmed the content, which is M3's language for *disabled*.
 */
export declare function MailSwipeActionsV4({ actions, side, destructiveIds, confirmLabel, toolbarLabel, style, }: MailSwipeActionsV4Props): React.ReactElement | null;
//# sourceMappingURL=MailSwipeActionsV4.d.ts.map