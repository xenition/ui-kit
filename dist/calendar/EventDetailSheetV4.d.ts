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
 * **V4 event detail sheet** — the web twin of the native
 * `EventDetailSheetV4`, same props as {@link EventDetailSheet} plus four copy
 * hooks.
 *
 * ## Four changes
 *
 * 1. **The modal variant is `ModalV4`.** The base hand-rolled an overlay, so
 *    it had no scrim, no focus trap, no Escape and no restore — four things
 *    the primitive already does, and the ones that matter most on the surface
 *    that takes a destructive action.
 * 2. **Delete is not the same weight as edit.** A destructive action drawn as
 *    a peer of a routine one is how people delete things by accident.
 * 3. **The event's tone reaches the sheet** as a leading rail, so the sheet
 *    and the block a user clicked read as the same object.
 * 4. **Every field is a labelled row**, announced as a pair.
 *
 * **Renders nothing without an event** (§4.5).
 */
export declare const EventDetailSheetV4: React.ForwardRefExoticComponent<EventDetailSheetV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EventDetailSheetV4.d.ts.map