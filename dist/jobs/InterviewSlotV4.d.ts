import * as React from 'react';
import type { InterviewSlotProps } from './InterviewSlot';
import type { InterviewMode } from './types';
/**
 * What has happened to a scheduled interview.
 *
 * New in V4, and the reason it is new: `Interview` has no status field at all,
 * so an interview the employer cancelled could only be expressed by passing
 * `disabled` — which draws a dimmed, unpressable card with no word anywhere
 * saying why. "Dimmed" is not "cancelled", and a candidate looking at their
 * calendar cannot tell the difference between a slot that is gone and a slot
 * that was never bookable.
 *
 * Declared identically in `src/native/jobs/InterviewSlotV4.tsx`. It is not in
 * `hiring-v4.ts` because that module is the two twins' shared *arithmetic* and
 * this is a display union with no maths behind it.
 */
export type InterviewSlotStatus = 'scheduled' | 'confirmed' | 'cancelled' | 'rescheduled';
export interface InterviewSlotV4Props extends InterviewSlotProps {
    /** What has happened to the interview. Omitted renders exactly as the base. */
    status?: InterviewSlotStatus;
    /** Why it was cancelled. Rendered whenever the status is an adverse one. */
    statusReason?: string;
    /** Override any mode's word. An unlisted mode keeps the built-in one. */
    modeLabels?: Partial<Record<InterviewMode, string>>;
    /** Render the date. Default `'Jun 15'`. */
    formatDate?: (iso: string) => string;
    /** Render one clock time. Default `'2:30 PM'`. */
    formatTime?: (iso: string) => string;
}
/**
 * **V4 interview slot** — same props as {@link InterviewSlot} plus `status`,
 * `statusReason`, `modeLabels`, `formatDate` and `formatTime`.
 *
 * ## Six changes
 *
 * 1. **An unparseable instant no longer renders a blank card.** `formatTime`
 *    and `formatShortDate` both return `''` on bad input, and the base
 *    interpolated them anyway — so a slot with a malformed `startsAt` drew an
 *    empty date, an empty time, and an accessible name that was literally
 *    `" , Video"`. A slot with no time is not a slot: it returns `null`.
 * 2. **An unknown mode stops claiming to be a video call.** `MODE[mode] ??
 *    MODE.video` announced "Video" for anything it did not recognise, so a
 *    candidate could be told to expect a video interview for something that is
 *    not one. An unrecognised mode now contributes no glyph and no word rather
 *    than a confident wrong one.
 * 3. **A display-only slot is no longer drawn as disabled.** `disabled={
 *    disabled || !onSelect}` meant that any slot rendered without a handler —
 *    a confirmed interview on a candidate's schedule, the common case — was
 *    dimmed and announced as unavailable, which reads as cancelled. Without
 *    `onSelect` it is now a plain, full-contrast, non-interactive card.
 * 4. **A cancelled interview says so, in a word and with a reason.** See
 *    `status` and `statusReason`. `disabled` no longer has to stand in for
 *    four different things.
 * 5. **The slot is a real tap target and its focus ring is the kit's.** It had
 *    no minimum height and rang itself in `ring-primary`, the raw brand
 *    colour, rather than `ring-ring`, which is that colour already corrected
 *    to 3:1 against the page.
 * 6. **Disabled is M3's 0.38 band and press is a state layer.** The base used
 *    `disabled:opacity-50` — a round number, not a measured one — and
 *    `hover:opacity-95`, which fades the card's own content.
 */
export declare const InterviewSlotV4: React.ForwardRefExoticComponent<InterviewSlotV4Props & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=InterviewSlotV4.d.ts.map