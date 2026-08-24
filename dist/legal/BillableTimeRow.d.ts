import * as React from 'react';
import { type BillableStatus } from './internal';
export type BillableTimeRowVariant = 'default' | 'compact';
export interface BillableTimeRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Pre-formatted entry date (e.g. "Aug 24"). */
    date: string;
    /** Narrative / description of the work performed. */
    description: string;
    /** Time spent, in decimal hours (e.g. `1.5`). */
    hours: number;
    /** Hourly rate in integer **cents** (drives the computed amount). */
    rateCents?: number;
    /**
     * Amount in integer **cents**. When omitted it is computed from
     * `hours × rateCents`; either way it renders through `formatMoney` for a
     * stable 2-decimal string.
     */
    amountCents?: number;
    /** ISO 4217 currency (default USD). */
    currency?: string;
    /** Timekeeper initials / name. */
    timekeeper?: string;
    /** Billing state — glyph + word pill, never color alone. */
    status?: BillableStatus;
    /** Density. */
    variant?: BillableTimeRowVariant;
    /** Render the "Log time" action (when draft / unbilled). */
    actionable?: boolean;
    /** Commit the time entry (renders "Log time" when actionable + unbilled). */
    onLog?: () => void;
    /** Click handler for the whole row (edit the entry). */
    onClick?: () => void;
    testID?: string;
}
/**
 * One billable time entry: date, narrative, duration, and the computed amount.
 * Money is carried as integer **cents** (computed from `hours × rateCents` when
 * `amountCents` is absent) and rendered through the shared `formatMoney` for a
 * stable 2-decimal string. Billing status is a glyph + word pill so it never
 * rests on color alone. When `actionable` and not yet billed, a "Log time"
 * button fires `onLog`. When `onClick` is set the row is an accessible
 * `role="button"`. All colors are `--xen-*` token classes — no literals.
 */
export declare const BillableTimeRow: React.ForwardRefExoticComponent<BillableTimeRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BillableTimeRow.d.ts.map