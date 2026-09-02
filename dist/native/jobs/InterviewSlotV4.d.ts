import * as React from 'react';
import type { InterviewMode } from './types';
import type { InterviewSlotProps } from './InterviewSlot';
/**
 * What has happened to a slot.
 *
 * New in V4, and the reason it is new is a defect: `Interview` carried no
 * status field at all, so an interview the employer cancelled could only be
 * expressed by passing `disabled` — which draws "unavailable, dimmed" with no
 * word explaining why, and reads identically to a slot that is merely display
 * only.
 */
export type InterviewSlotStatus = 'scheduled' | 'confirmed' | 'cancelled' | 'rescheduled';
export interface InterviewSlotV4Props extends InterviewSlotProps {
    /** What has happened to this slot. Default `undefined` — nothing claimed. */
    status?: InterviewSlotStatus;
    /** Why, for an adverse `status`. Drawn and announced. */
    statusReason?: string;
    /** Re-word the interview channel. Defaults to On-site / Video / Phone. */
    modeLabels?: Partial<Record<InterviewMode, string>>;
    /** Render the date. Default a localized short date, e.g. `'Jun 15'`. */
    formatDate?: (iso: string) => string;
    /** Render a time. Default a localized `h:mm a`. */
    formatTime?: (iso: string) => string;
}
/**
 * **V4 interview slot** — same props as {@link InterviewSlot} plus `status`,
 * `statusReason`, `modeLabels`, `formatDate` and `formatTime`.
 *
 * ## Five changes
 *
 * 1. **A slot that cannot be read is not drawn.** An unparseable `startsAt`
 *    produced a blank date and a blank time whose accessible name was
 *    literally `" , Video"` — a control announcing a comma. A slot with no
 *    time is not a slot, so it renders nothing (§4.5).
 * 2. **An unknown mode is not called a video call.** `MODE[mode] ?? MODE.video`
 *    fell back to Video for any value outside the union, announcing a video
 *    interview for something that is not one — a candidate could turn up in
 *    the wrong place. An unrecognised mode now claims nothing: no glyph, no
 *    word.
 * 3. **Display-only is no longer drawn as unavailable.** A slot with no
 *    `onSelect` was rendered `disabled` — dimmed, and announced as
 *    unavailable, which for an interview reads as *cancelled*. It is now a
 *    plain announced element at full strength, and the actual adverse case has
 *    a `status` of its own to say so in a word, with `statusReason` for why.
 *    `disabled` still means what it says, and still dims — to M3's 0.38, not
 *    the base's picked 0.5.
 * 4. **Selected is the compiler's own slot.** The base filled the whole card
 *    with `primary` and inked everything `onPrimary`, which left no readable
 *    pair for a status badge sitting on top of it. `selected`/`onSelected`
 *    exist precisely for "the chosen one" and ship as a guaranteed pair.
 * 5. **44, and a state layer.** The base's press was `opacity: 0.9` — M3
 *    spends opacity on *disabled* — and a compact slot chip could fall well
 *    under the tap floor.
 */
export declare function InterviewSlotV4({ interview, selected, disabled, onSelect, status, statusReason, modeLabels, formatDate, formatTime, style, }: InterviewSlotV4Props): React.ReactElement | null;
//# sourceMappingURL=InterviewSlotV4.d.ts.map