import * as React from 'react';
/** Run status of an irrigation slot. */
export type IrrigationRunState = 'scheduled' | 'running' | 'done' | 'skipped';
/** A single irrigation slot / zone run. */
export interface IrrigationSlot {
    /** Stable key. */
    id: string;
    /** Zone / valve name (e.g. "Zone 1 · Drip"). */
    zone: string;
    /** Start time (e.g. "06:00"). */
    time?: string;
    /** Duration hint (e.g. "20 min"). */
    duration?: string;
    /** Run state — drives the state chip. Default `'scheduled'`. */
    state?: IrrigationRunState;
    /** Whether the slot is enabled. */
    enabled?: boolean;
}
export interface IrrigationScheduleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Slots in run order. Empty → empty state. Guarded indexing. */
    slots: IrrigationSlot[];
    /** Card title. Default "Irrigation". */
    title?: string;
    /** Fires with the slot id + requested enabled value. */
    onToggle?: (id: string, next: boolean) => void;
    /** Empty-state title. */
    emptyTitle?: string;
}
/**
 * An irrigation schedule — a titled {@link Card} listing zone runs (zone, time,
 * duration) each with a run-state {@link Badge} and an enable {@link Switch}.
 * The enabled state rides the switch's a11y `checked` state (not color), and the
 * run state is stated as text. Toggling fires `onToggle(id, next)`. When `slots`
 * is empty an {@link EmptyState} stands in. Rows are keyed + indexed defensively.
 * Token-bound throughout — no literal colors.
 */
export declare const IrrigationSchedule: React.ForwardRefExoticComponent<IrrigationScheduleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=IrrigationSchedule.d.ts.map