import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** One agent metric shown as a frosted tile (e.g. `{ label: 'Solved', value: '128' }`). */
export interface AgentStat {
    /** Short metric label (e.g. `"Solved"`, `"CSAT"`, `"Avg reply"`). */
    label: string;
    /** Pre-formatted metric value (e.g. `"128"`, `"96%"`, `"4m"`). */
    value: string;
}
export interface AgentPerformanceCardProps {
    /** Agent display name — the near-white headline on the gradient. */
    agentName: string;
    /** Optional agent avatar URL. */
    agentAvatar?: string;
    /** Metrics rendered as frosted tiles on the gradient (pre-formatted values). */
    stats: readonly AgentStat[];
    /** Reporting period caption (default `"This week"`). */
    period?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * AgentPerformanceCard — a gradient "console" stats hero for an agent. The agent
 * name and period sit as near-white ink over the console gradient; each metric
 * renders as a frosted tile with a big value and a soft label. A calm
 * peak-moment surface, dark-mode safe, every color from the compiled theme ramps
 * (token-only, no literals). Presentational — shaped stats only, nothing
 * fetches.
 */
export declare function AgentPerformanceCard({ agentName, agentAvatar, stats, period, style, }: AgentPerformanceCardProps): React.ReactElement;
//# sourceMappingURL=AgentPerformanceCard.d.ts.map