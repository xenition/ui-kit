import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type BillableStatus } from './internal';
export type BillableTimeRowVariant = 'default' | 'compact';
export interface BillableTimeRowProps {
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
    /** Tap handler for the whole row (edit the entry). */
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * One billable time entry: date, narrative, duration, and the computed amount.
 * Money is carried as integer **cents** (computed from `hours × rateCents` when
 * `amountCents` is absent) and rendered through the shared `formatMoney` for a
 * stable 2-decimal string. Billing status is a glyph + word pill so it never
 * rests on color alone. When `actionable` and not yet billed, a "Log time"
 * button fires `onLog`. All colors are theme tokens — no literals.
 */
export declare function BillableTimeRow({ date, description, hours, rateCents, amountCents, currency, timekeeper, status, variant, actionable, onLog, onPress, testID, style, }: BillableTimeRowProps): React.ReactElement;
//# sourceMappingURL=BillableTimeRow.d.ts.map