import * as React from 'react';
/** A bookable tour time slot. */
export interface TourSlot {
    /** Stable identifier. */
    id: string;
    /** Display label (e.g. "10:00 AM"). */
    label: string;
    /** Availability; defaults to `true`. Unavailable slots are disabled. */
    available?: boolean;
}
/** Presentation density for the {@link TourScheduler} slot grid. */
export type TourSchedulerVariant = 'grid' | 'list';
export interface TourSchedulerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Optional heading line above the slots. */
    title?: string;
    /** Human-readable date the slots belong to (e.g. "Sat, Aug 24"). */
    dateLabel?: string;
    /** Selectable time slots. Empty renders the shared `EmptyState`. */
    slots: TourSlot[];
    /** Controlled selected slot id; falls back to internal state. */
    selectedId?: string;
    /** Fires when a slot is tapped. */
    onSelectSlot?: (slot: TourSlot) => void;
    /** Fires when the confirm button is pressed with the chosen slot. */
    onSchedule?: (slot: TourSlot) => void;
    /** Confirm button label (default "Schedule tour"). */
    confirmLabel?: string;
    /** Layout of the slot chips. */
    variant?: TourSchedulerVariant;
    /** Disables the confirm button while a request is in flight. */
    loading?: boolean;
}
/**
 * Web parity of the native `TourScheduler`: a grid (or list) of selectable time
 * slots plus a confirm button. Works controlled (`selectedId`) or uncontrolled;
 * the confirm button stays disabled until an available slot is chosen, then fires
 * `onSchedule` with it. Presentational: slots in, callbacks out, nothing fetches.
 * Empty `slots` degrades to the shared `EmptyState`. Selection is conveyed via
 * `aria-pressed`, not color alone. All colors come from the `--xen-*` tokens —
 * no literal colors.
 */
export declare const TourScheduler: React.ForwardRefExoticComponent<TourSchedulerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TourScheduler.d.ts.map