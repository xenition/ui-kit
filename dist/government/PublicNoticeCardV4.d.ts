import * as React from 'react';
import type { NoticeCategory, PublicNoticeCardProps } from './PublicNoticeCard';
export interface PublicNoticeCardV4Props extends PublicNoticeCardProps {
    /** Override the seven category words — `'Public hearing'`, `'Roadwork'`, … */
    categoryLabels?: Partial<Record<NoticeCategory, string>>;
    /** What the unread flag is called. Default `'New'`. */
    newLabel?: string;
}
/**
 * **V4 public notice** — the web twin of the native `PublicNoticeCardV4`, same
 * props as {@link PublicNoticeCard} plus `categoryLabels` and `newLabel`.
 *
 * ## Four changes
 *
 * 1. **The date and the venue are in the name.** A hearing notice's date is the
 *    legally operative field — miss it and you have lost the right to be heard
 *    — and the card's fixed `` `${category}: ${title}` `` name pruned it, along
 *    with the agency and the location, because `role="button"` renders its own
 *    subtree presentational. All of it joins the name now.
 * 2. **"New" stops being `danger`.** Unread is not a hazard, and `danger` is
 *    the same tone this module spends on Denied, Rejected and Urgent — so an
 *    unread roadwork notice read, at a glance, as a rejection. It takes
 *    `primary` — the module's tone for open and just-arrived, and not one of
 *    the three status colours the rule protects — with a dot and a word beside
 *    it, so unread still stands out against the neutral category chip.
 * 3. **A category is not a status either.** Roadwork wore `warn` and four more
 *    wore the brand colour; the leading disc was `bg-neutral-100` or a `-50`
 *    ramp step, both of which mirror under `[data-theme="dark"]`. Category
 *    takes the neutral identity tint and its glyph, and the tint's own
 *    contrast-corrected ink rather than a fill token used as one.
 * 4. **An interactive card is a real `<button>`** that clears 44 and answers
 *    with a state layer, not a `div` with `role="button"`, a hand-written
 *    Enter/Space handler, `hover:opacity-90` — M3's *disabled* signal — and a
 *    `primary-300` focus ring off the neutral ramp.
 */
export declare const PublicNoticeCardV4: React.ForwardRefExoticComponent<PublicNoticeCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PublicNoticeCardV4.d.ts.map