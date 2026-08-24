import * as React from 'react';
import { type DockStatus, type CarrierCode } from './internal';
export interface DockSlot {
    /** Stable key. */
    id: string;
    /** Time window label (e.g. `08:00–09:00`). */
    window: string;
    /** Slot status — glyph + word, never color alone. */
    status: DockStatus;
    /** Carrier assigned to the slot. */
    carrier?: CarrierCode;
    /** Carrier / appointment reference. */
    reference?: string;
}
export interface DockScheduleProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Dock door identifier (headline, e.g. `Dock 4`). */
    dock: string;
    /** Scheduled slots for the door, drawn top→bottom. */
    slots?: DockSlot[];
    /** Fires with the pressed slot. */
    onSelectSlot?: (slot: DockSlot) => void;
    /** Loading skeleton. */
    loading?: boolean;
}
/**
 * A dock-door appointment board: a door headline over a list of time-window
 * slots, each with a glyph + word status chip and an optional `CarrierBadge`.
 * Empty (no slots) and loading states are handled. Slots are clickable when
 * `onSelectSlot` is set (button role + label). All colors are theme tokens. Web
 * parity of the native `DockSchedule`.
 */
export declare const DockSchedule: React.ForwardRefExoticComponent<DockScheduleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DockSchedule.d.ts.map