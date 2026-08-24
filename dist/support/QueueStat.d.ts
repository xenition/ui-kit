import * as React from 'react';
import { type StatisticTrend } from '../primitives/Statistic';
/** Accent tone for the stat tile's icon chip / emphasis. */
export type QueueStatTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';
export interface QueueStatProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Caption (e.g. "Open tickets"). */
    label: string;
    /** Headline value (number or preformatted string). */
    value: React.ReactNode;
    /** Optional change indicator (see `Statistic`). */
    delta?: string | number;
    /** Explicit delta trend; otherwise inferred from a numeric delta. */
    trend?: StatisticTrend;
    /** Optional unit suffix (e.g. `%`, `min`). */
    suffix?: React.ReactNode;
    /** Accent tone for the leading glyph chip (default `neutral`). */
    tone?: QueueStatTone;
    /** Optional glyph shown in a tinted chip. */
    glyph?: string;
    /** Render a loading placeholder. */
    loading?: boolean;
    /** Wrap in a card surface (default true). */
    card?: boolean;
}
/**
 * A single queue KPI tile — a leading tinted glyph chip plus a `Statistic`
 * (caption, big value, optional delta/suffix). Built for helpdesk dashboards
 * ("Open", "Waiting", "Breached SLA", "CSAT"). The chip tone maps to token
 * classes; the delta arrow/tone comes from the underlying `Statistic`. Supports
 * a `loading` placeholder. No literal hex.
 */
export declare const QueueStat: React.ForwardRefExoticComponent<QueueStatProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QueueStat.d.ts.map