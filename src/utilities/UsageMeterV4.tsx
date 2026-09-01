import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Progress, type ProgressTone } from '../primitives';
import { formatUsage, formatPct, clamp, TEXT_TINT } from './internal/format';
import { utilityKind } from './internal/status';
import type { UsageMeterProps } from './UsageMeter';

/** Drop-in for {@link UsageMeterProps} — same props, a different design. */
export type UsageMeterV4Props = UsageMeterProps;

/**
 * UsageMeter — **V4** design. The clean, trust-first consumption gauge: an
 * elevated rounded surface, the utility-kind glyph in a small brand-gradient disc
 * (the signature V4 touch), and the token-bound `Progress` bar below. The fill
 * tone still escalates by threshold (under `warnAt` → primary, over → warn,
 * at/over cap → danger) and the same escalation is echoed in a text percentage,
 * so status is never color-alone. Quantities run through `formatUsage`/`formatPct`
 * and a zero/absent allowance is guarded. Same props and loading behavior as
 * {@link UsageMeterProps}; token-only colors.
 */
export const UsageMeterV4 = React.forwardRef<HTMLDivElement, UsageMeterV4Props>(function UsageMeterV4(
  {
    kind,
    used,
    allowance = 0,
    unit,
    decimals = 0,
    period,
    warnAt = 0.8,
    loading = false,
    className,
    ...rest
  },
  ref
) {
  const kd = utilityKind(kind);
  const u = unit ?? kd.unit;

  const card = 'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5';

  if (loading) {
    return (
      <div ref={ref} className={cn(card, className)} {...rest}>
        <div aria-busy="true" aria-label="Loading usage" className="flex flex-col gap-[var(--xen-space-sm)]">
          <div className="h-4 w-3/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" />
          <div className="h-2.5 animate-pulse rounded-full bg-neutral-100" />
        </div>
      </div>
    );
  }

  const safeUsed = Number.isFinite(used) ? Math.max(0, used) : 0;
  const cap = Number.isFinite(allowance) ? Math.max(0, allowance) : 0;
  const hasCap = cap > 0;
  const ratio = hasCap ? clamp(safeUsed / cap, 0, 1.5) : 0;
  const pct = Math.round(ratio * 100);

  const tone: ProgressTone = !hasCap ? 'primary' : ratio >= 1 ? 'danger' : ratio >= warnAt ? 'warn' : 'primary';

  return (
    <div ref={ref} className={cn(card, className)} {...rest}>
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700">
          <Icon glyph={kd.glyph} size="xl" color="onPrimary" aria-label={`${kd.label} usage`} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-base font-semibold text-on-surface">{kd.label}</span>
          {period != null ? <span className="text-xs text-muted">{period}</span> : null}
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-lg font-bold text-on-surface">{formatUsage(safeUsed, u, decimals)}</span>
          {hasCap ? <span className="text-xs text-muted">of {formatUsage(cap, u, decimals)}</span> : null}
        </div>
      </div>

      {hasCap ? (
        <div className="mt-[var(--xen-space-md)] flex flex-col gap-[var(--xen-space-xs)]">
          <Progress
            value={Math.min(pct, 100)}
            max={100}
            tone={tone}
            aria-label={`${kd.label} usage, ${formatPct(pct)} of allowance`}
          />
          <span className={cn('text-xs font-semibold', TEXT_TINT[tone])}>
            {ratio >= 1 ? `Over allowance · ${formatPct(pct)}` : `${formatPct(pct)} of allowance`}
          </span>
        </div>
      ) : null}
    </div>
  );
});
