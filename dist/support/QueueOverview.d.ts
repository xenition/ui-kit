import * as React from 'react';
/** Accent tone for a stat tile — one primary accent, plus the semantic set. */
export type QueueOverviewTone = 'primary' | 'success' | 'warn' | 'danger' | 'muted';
/** A single queue metric shown as a calm stat tile. */
export interface QueueStatItem {
    /** Muted caption under the value (e.g. "Open tickets"). */
    label: string;
    /** Headline value — a big numeral (number) or preformatted string (e.g. "1.2k", "98%"). */
    value: string | number;
    /** Accent tone for the value + optional delta emphasis. Defaults to `primary`. */
    tone?: QueueOverviewTone;
    /** Signed change vs. the prior period; colored by sign (▲ success / ▼ danger). */
    delta?: number;
}
export interface QueueOverviewProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The queue metrics to display, left→right, wrapping on small widths. */
    stats: readonly QueueStatItem[];
    /** Optional section heading above the tile strip. */
    title?: string;
}
/**
 * QueueOverview — **V4** "calm console" dashboard strip. A responsive
 * row/grid of elevated stat tiles giving a helpdesk queue its at-a-glance vitals
 * ("Open", "Waiting", "Breached SLA", "CSAT"). Each tile is a big value numeral
 * with a muted caption and an optional signed delta colored by sign (▲ up /
 * ▼ down). One accent = primary; other tones swap in a semantic accent. Tiles
 * wrap onto new rows on narrow widths. Presentational only — shaped data in, no
 * fetching. All colors from `--xen-*` token classes (no literal hex).
 * Dark-mode safe.
 */
export declare const QueueOverview: React.ForwardRefExoticComponent<QueueOverviewProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QueueOverview.d.ts.map