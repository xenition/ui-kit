import * as React from 'react';
/** One agent metric shown as a frosted tile (e.g. `{ label: 'Solved', value: '128' }`). */
export interface AgentStat {
    /** Short metric label (e.g. `"Solved"`, `"CSAT"`, `"Avg reply"`). */
    label: string;
    /** Pre-formatted metric value (e.g. `"128"`, `"96%"`, `"4m"`). */
    value: string;
}
export interface AgentPerformanceCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Agent display name — the near-white headline on the gradient. */
    agentName: string;
    /** Optional agent avatar URL. */
    agentAvatar?: string;
    /** Metrics rendered as frosted tiles on the gradient (pre-formatted values). */
    stats: readonly AgentStat[];
    /** Reporting period caption (default `"This week"`). */
    period?: string;
}
/**
 * AgentPerformanceCard — a gradient "console" stats hero for an agent. The agent
 * name and period sit as near-white ink over a `from-primary-500 to-primary-700`
 * ground; each metric renders as a frosted tile (`bg-primary-50/15`,
 * `border-primary-50/30`) with a big value and a soft label. A calm peak-moment
 * surface, dark-mode safe, every color from the brand ramp (token-only, no
 * literals). Presentational — shaped stats only, nothing fetches.
 */
export declare const AgentPerformanceCard: React.ForwardRefExoticComponent<AgentPerformanceCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AgentPerformanceCard.d.ts.map