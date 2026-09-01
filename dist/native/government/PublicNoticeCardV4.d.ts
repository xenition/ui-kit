import * as React from 'react';
import type { NoticeCategory, PublicNoticeCardProps } from './PublicNoticeCard';
export interface PublicNoticeCardV4Props extends PublicNoticeCardProps {
    /** Override the seven category words (`'Public hearing'`, `'Roadwork'`, …). */
    categoryLabels?: Partial<Record<NoticeCategory, string>>;
    /** What the unread flag says. Default `'New'`. */
    newLabel?: string;
}
/**
 * **V4 public notice** — same props as {@link PublicNoticeCard} plus
 * `categoryLabels` and `newLabel`.
 *
 * ## Four changes
 *
 * 1. **The date and the venue join the name.** The card announced
 *    `` `${category}: ${title}` `` and stopped, so a hearing notice's date —
 *    the legally operative field, the one that decides whether you can still
 *    object — was pruned, along with the address it concerns.
 * 2. **"New" stops being `danger`.** Unread is not a hazard, and `danger` is
 *    the same tone this module uses for Denied, Rejected and Urgent, so an
 *    unread roadwork notice read visually as a rejection. It is `primary`
 *    emphasis now — the module's tone for open and just-arrived.
 * 3. **The category stops wearing a status colour** at all, badge and disc
 *    alike: `IDENTITY_TONE`, so `warn` keeps meaning "look at this" rather
 *    than "this one is about roads".
 * 4. **The press is a state layer**, not `opacity: 0.85` — an opacity that
 *    fades the card's own content, which is how M3 draws *disabled*. The meta
 *    line is built before it is tested, so a notice whose agency, date and
 *    location are all empty strings renders no empty caption where the web
 *    twin renders none either.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export declare function PublicNoticeCardV4({ category, title, body, agency, date, location, isNew, categoryLabels, newLabel, onPress, style, }: PublicNoticeCardV4Props): React.ReactElement | null;
//# sourceMappingURL=PublicNoticeCardV4.d.ts.map