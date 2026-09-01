import * as React from 'react';
import type { EmailThreadRowProps } from './EmailThreadRow';
export interface EmailThreadRowV4Props extends EmailThreadRowProps {
    /** The word an unread thread carries. Default `'Unread'`. */
    unreadLabel?: string;
    /** How the message count is spoken. Default `` `${n} messages` ``. */
    formatMessageCount?: (count: number) => string;
}
/**
 * **V4 email thread row** — the web twin of the native `EmailThreadRowV4`,
 * same props as {@link EmailThreadRow} plus `unreadLabel` and
 * `formatMessageCount`.
 *
 * ## Five changes
 *
 * 1. **Unread bolds the subject.** Both docblocks always said "unread → bold
 *    subject"; both twins bolded the **sender**. The subject is the thing a
 *    user scans an inbox for, and it is what changes weight now.
 * 2. **The unread wash is one colour on both twins.** Web painted
 *    `bg-primary-50` — a ramp step, so a pale band on a dark page — while
 *    native mixed `primary` at 6%. `selected`/`on-selected` is the theme's own
 *    slot for a highlighted or unread row, and it ships with a guaranteed ink.
 * 3. **The message count carries a unit.** `4` on its own says nothing; the
 *    badge still shows the numeral and the reader hears "4 messages".
 * 4. **The row is a `button` only when it is interactive.** The base wrapped
 *    every row in the same activation, so on native a plain, non-tappable row
 *    announced as a **disabled button**.
 * 5. **One accessible name, and a press is a state layer** — the base's
 *    `Unread, Ada: Renewal` dropped the snippet, the timestamp and the count.
 */
export declare const EmailThreadRowV4: React.ForwardRefExoticComponent<EmailThreadRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EmailThreadRowV4.d.ts.map