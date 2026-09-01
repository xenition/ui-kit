import * as React from 'react';
import type { InboxHeaderProps } from './InboxHeader';
export interface InboxHeaderV4Props extends InboxHeaderProps {
    /** How the unread count is spoken. Default `` (n) => `${n} unread` ``. */
    formatUnread?: (count: number) => string;
    /** Copy on the sync caption. Default `'Syncing…'`. */
    syncingLabel?: string;
}
/**
 * **V4 inbox header** — same props as {@link InboxHeader} plus `formatUnread`
 * and `syncingLabel`.
 *
 * ## Four changes
 *
 * 1. **The unread count says what it is counting.** A reader heard "Inbox"
 *    and then "42", with nothing anywhere saying 42 of what — the number was a
 *    bare numeral beside a title. The numeral stays on screen and the spoken
 *    form carries the unit.
 * 2. **Syncing is announced.** It was a caption that appeared and vanished
 *    with no role and no live region, so the one state the header exists to
 *    report was invisible to the only users who cannot see it happening.
 * 3. **The action buttons clear 44.** `p-xs` around a glyph is roughly a 28px
 *    target in the corner of the screen, which is where a thumb is least
 *    accurate.
 * 4. **Press is a state layer and the ink is the corrected slot** — the
 *    actions dimmed themselves on hover at M3's *disabled* band, and the count
 *    and caption were drawn in `muted`, a ramp step with no contrast promise.
 */
export declare const InboxHeaderV4: React.ForwardRefExoticComponent<InboxHeaderV4Props & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=InboxHeaderV4.d.ts.map