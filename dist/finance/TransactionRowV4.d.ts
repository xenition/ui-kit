import * as React from 'react';
import type { TransactionRowProps } from './TransactionRow';
/** The V4 row takes exactly the base's props. */
export interface TransactionRowV4Props extends TransactionRowProps {
}
/**
 * **V4 transaction row** — the web twin of the native `TransactionRowV4`, same
 * props as {@link TransactionRow}.
 *
 * ## Five changes
 *
 * 1. **The row's name contains the amount.** The base put `aria-label={title}`
 *    on a `role="button"` root, and `button` is children-presentational — so a
 *    reader browsing a statement heard "Whole Foods, button" and never learned
 *    it was −$84.12. The name is now the whole line: merchant, category,
 *    date, then the direction word and the figure.
 * 2. **It is a real `<button>`.** The base used the module's `pressable`
 *    helper — `role="button"` plus `tabIndex` plus a hand-written Enter/Space
 *    handler on a `div`, which is three approximations of what a button
 *    already does, and it made every row a tab stop even before it made one a
 *    button.
 * 3. **Press is a state layer, and focus is the shared ring.** The base had no
 *    press feedback at all and rang itself in `ring-primary-300`, a ramp step
 *    that inverts under `[data-theme="dark"]` while `--xen-ring` is `primary`
 *    already corrected to 3:1 against the page.
 * 4. **It joins the shared row family** — one height, one 44 leading slot, one
 *    set of gutters — with `ListRow`, `NotificationItem` and
 *    `ConversationRow`. The row clears 44 whether or not it has an icon; the
 *    base's height came entirely from the optional avatar, so an iconless feed
 *    drew 32px rows.
 * 5. **The supporting line and the date take `muted-text`**, the
 *    contrast-corrected slot, where the base used `muted` — a ramp step with
 *    no contrast promise — as an ink.
 */
export declare const TransactionRowV4: React.ForwardRefExoticComponent<TransactionRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TransactionRowV4.d.ts.map