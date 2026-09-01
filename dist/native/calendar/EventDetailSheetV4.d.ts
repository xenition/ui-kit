import * as React from 'react';
import type { EventDetailSheetProps } from './EventDetailSheet';
export interface EventDetailSheetV4Props extends EventDetailSheetProps {
    /** CTA copy. Defaults `'Edit'` / `'Delete'`. */
    editLabel?: string;
    deleteLabel?: string;
    /** Accessible name for the close control. Default `'Close'`. */
    closeLabel?: string;
    /** Announced for an all-day event. Default `'All day'`. */
    allDayLabel?: string;
}
/**
 * **V4 event detail sheet** — same props as {@link EventDetailSheet} plus four
 * copy hooks.
 *
 * ## Four changes
 *
 * 1. **The modal variant is `BottomSheetV4`.** The base hand-rolled an
 *    overlay, so it had no scrim, no focus containment, no safe-area inset and
 *    no drag-to-dismiss — four things the sheet primitive already does.
 * 2. **Delete is not the same weight as edit.** A destructive action drawn as
 *    a peer of a routine one is how people delete things by accident; it is
 *    now the quiet `danger` action, below.
 * 3. **The event's tone reaches the sheet** as a leading rail, so the sheet
 *    and the block a user tapped read as the same object.
 * 4. **Every field is a labelled row**, announced as a pair rather than as a
 *    run of loose lines.
 *
 * **Renders nothing without an event** (§4.5).
 */
export declare function EventDetailSheetV4({ event, description, recurrenceLabel, timezoneLabel, variant, open, editLabel, deleteLabel, closeLabel, allDayLabel, onClose, onEdit, onDelete, style, }: EventDetailSheetV4Props): React.ReactElement | null;
//# sourceMappingURL=EventDetailSheetV4.d.ts.map