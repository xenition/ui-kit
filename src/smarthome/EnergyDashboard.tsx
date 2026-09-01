import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';

/** Tone key for a breakdown slice — resolved to a token opacity of the near-white ink. */
export type EnergyBreakdownTone = 'primary' | 'accent' | 'warn' | 'success';

export interface EnergyDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Headline usage figure, already formatted (e.g. "24.6 kWh") — the near-white numeral. */
  usageLabel: string;
  /** Optional cost line for the period (e.g. "$4.20 today"). */
  costLabel?: string;
  /** Period the figures cover. Default `'Today'`. */
  period?: string;
  /**
   * Optional change vs the previous period, as a percentage. For energy, **up
   * means worse** (more used); the delta chip reflects that in tone + arrow.
   */
  deltaPct?: number;
  /** Optional solar generation line, already formatted (e.g. "6.1 kWh solar"). */
  solarLabel?: string;
  /**
   * Optional usage breakdown, rendered as a stacked token bar with a frosted
   * legend. `value` is a raw magnitude; slices are normalised to the total.
   */
  breakdown?: readonly { label: string; value: number; tone?: EnergyBreakdownTone }[];
}

/** Token opacity of the near-white ink per tone — keeps the whole bar on the brand ramp. */
const TONE_FILL: Record<EnergyBreakdownTone, string> = {
  primary: 'bg-primary-50',
  accent: 'bg-primary-50/70',
  warn: 'bg-primary-50/45',
  success: 'bg-primary-50/25',
};

/**
 * EnergyDashboard — a whole-home energy **hero** for the smart-home module (web
 * parity of the native twin). A brand-gradient ground carries the big near-white
 * usage numeral, a cost + period line, a delta chip (for energy, up = worse, so
 * a rise reads as a warning arrow), an optional solar line, and an optional
 * stacked usage bar with a frosted legend. The bar is one gradient-safe run of
 * the near-white ink at token opacities — every color derives from the brand
 * ramp (gradient `from-primary-500 to-primary-700`, ink `text-primary-50/100`,
 * frosted tiles `bg-primary-50/15` + `border-primary-50/30`) — token-only, no
 * literals, light + dark. Presentational: shaped data, nothing fetches.
 */
export const EnergyDashboard = React.forwardRef<HTMLDivElement, EnergyDashboardProps>(function EnergyDashboard(
  { usageLabel, costLabel, period = 'Today', deltaPct, solarLabel, breakdown, className, ...rest },
  ref
) {
  const hasDelta = typeof deltaPct === 'number' && Number.isFinite(deltaPct);
  const worse = hasDelta && (deltaPct as number) > 0;
  const total = (breakdown ?? []).reduce((sum, b) => sum + Math.max(0, b.value), 0);

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)] overflow-hidden',
        className
      )}
      {...rest}
    >
      <div className="flex items-start justify-between gap-[var(--xen-space-md)]">
        <p className="text-sm font-semibold text-primary-100">{`${period} usage`}</p>
        {hasDelta ? (
          <span
            role="status"
            aria-label={`${Math.abs(deltaPct as number)}% ${worse ? 'more' : 'less'} than the previous period`}
            className="inline-flex shrink-0 items-center gap-[var(--xen-space-xs)] rounded-full bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-semibold text-primary-50"
          >
            <Icon glyph={worse ? '▲' : '▼'} size="xs" aria-hidden />
            {`${Math.abs(deltaPct as number)}%`}
          </span>
        ) : null}
      </div>

      <p className="mt-[var(--xen-space-xs)] text-3xl font-extrabold tracking-tight text-primary-50">{usageLabel}</p>

      {costLabel || solarLabel ? (
        <div className="mt-[var(--xen-space-xs)] flex flex-wrap items-center gap-[var(--xen-space-sm)]">
          {costLabel ? <span className="text-base font-semibold text-primary-100">{costLabel}</span> : null}
          {solarLabel ? (
            <span className="inline-flex items-center gap-[var(--xen-space-xs)] rounded-full bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-semibold text-primary-50">
              <Icon glyph="☀️" size="xs" aria-hidden />
              {solarLabel}
            </span>
          ) : null}
        </div>
      ) : null}

      {breakdown && breakdown.length > 0 && total > 0 ? (
        <div className="mt-[var(--xen-space-lg)]">
          <div
            role="img"
            aria-label="Usage breakdown"
            className="flex h-3 w-full overflow-hidden rounded-full bg-primary-50/15 border border-primary-50/30"
          >
            {breakdown.map((b) => {
              const pct = (Math.max(0, b.value) / total) * 100;
              if (pct <= 0) return null;
              return (
                <span
                  key={b.label}
                  className={cn('h-full', TONE_FILL[b.tone ?? 'primary'])}
                  style={{ width: `${pct}%` }}
                />
              );
            })}
          </div>
          <div className="mt-[var(--xen-space-sm)] flex flex-wrap gap-[var(--xen-space-sm)]">
            {breakdown.map((b) => {
              const pct = Math.round((Math.max(0, b.value) / total) * 100);
              return (
                <div
                  key={b.label}
                  className="inline-flex items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]"
                >
                  <span className={cn('h-2.5 w-2.5 rounded-full', TONE_FILL[b.tone ?? 'primary'])} aria-hidden />
                  <span className="text-xs font-semibold text-primary-50">{b.label}</span>
                  <span className="text-xs text-primary-100">{`${pct}%`}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
});
