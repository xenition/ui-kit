import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives';

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
export const AgentPerformanceCard = React.forwardRef<HTMLDivElement, AgentPerformanceCardProps>(
  function AgentPerformanceCard(
    { agentName, agentAvatar, stats, period = 'This week', className, ...rest },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-[var(--xen-space-lg)] overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-xl)]',
          className
        )}
        {...rest}
      >
        <div className="flex items-center gap-[var(--xen-space-md)]">
          <Avatar size="lg" name={agentName} src={agentAvatar} />
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-xl font-extrabold tracking-tight text-primary-50">{agentName}</span>
            <span className="text-sm font-semibold text-primary-100">{period}</span>
          </span>
        </div>

        {stats.length > 0 ? (
          <dl className="grid grid-cols-3 gap-[var(--xen-space-sm)]">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 p-[var(--xen-space-md)]"
              >
                <dt className="text-xs font-semibold uppercase tracking-wide text-primary-100">{stat.label}</dt>
                <dd className="text-2xl font-extrabold tracking-tight text-primary-50">{stat.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    );
  }
);
