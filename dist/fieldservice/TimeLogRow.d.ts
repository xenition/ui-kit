import * as React from 'react';
import { type MoneyFormatter } from './internal/format';
/** Clock state — text + glyph + color (never color-alone). */
export type TimeLogStatus = 'running' | 'stopped' | 'approved' | 'rejected';
export interface TimeLogRowProps {
    /** Activity / task label (e.g. "On-site diagnostics"). */
    label: string;
    /** Elapsed time in whole minutes. */
    minutes: number;
    /** Clock / approval state — text + glyph + color. */
    status: TimeLogStatus;
    /** Localized clock-in–out window (e.g. "8:00–10:15 AM"). */
    window?: string;
    /** Marks the entry as billable, shown as a chip. */
    billable?: boolean;
    /** Billing rate in integer **cents per hour**; when set, shows the line total. */
    rateCentsPerHour?: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
    /** Fires on row click (e.g. edit the entry). */
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * One line in a time-log / timesheet: a tinted status glyph disc, a
 * label/window stack with an optional billable chip, and a right-aligned
 * duration + computed line total. Duration comes from whole minutes via
 * `formatDuration`; the total is `minutes/60 * rate` in integer cents through
 * `formatMoney` (guarded against a missing rate). Status is text + glyph + a
 * color that traces to a semantic token — never color alone. Becomes a
 * `role="button"` surface only when `onClick` is supplied. No literals.
 */
export declare const TimeLogRow: React.ForwardRefExoticComponent<TimeLogRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TimeLogRow.d.ts.map