import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Progress, type ProgressTone } from '../primitives';
import { formatUsage, formatPct, clamp, TEXT_TINT } from './internal/format';
import { utilityKind } from './internal/status';
import type { UsageMeterProps } from './UsageMeter';

/** Same public contract as {@link UsageMeter} — a drop-in alternate design. */
export type UsageMeterV3Props = UsageMeterProps;

/**
 * UsageMeter, redesigned (v3): a **slim inline bar**. A one-line header pairs the
 * utility glyph + label on the left with a right-aligned percent, then a single
 * thin `Progress` track carries the fill; a tiny used / allowance caption sits
 * under it. No card, no ring — the most compact of the three, for stacking many
 * meters in a list. The fill tone escalates by threshold and is echoed in the
 * percent text so status is never color-alone; a zero / absent allowance is
 * guarded. Same props, `formatUsage` quantities, token-pure.
 */
export const UsageMeterV3 = React.forwardRef<HTMLDivElement, UsageMeterV3Props>(function UsageMeterV3(
  { kind, used, allowance = 0, unit, decimals = 0, period, warnAt = 0.8, loading = false, className, ...rest },
  ref
) {
  const kd = utilityKind(kind);
  const u = unit ?? kd.unit;

  if (loading) {
    return (
      <div
        ref={ref}
        aria-busy="true"
        aria-label="Loading usage"
        className={cn('flex flex-col gap-[var(--xen-space-xs)]', className)}
        {...rest}
      >
        <div className="h-3.5 w-2/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        <div className="h-1.5 animate-pulse rounded-full bg-neutral-100" />
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
    <div ref={ref} className={cn('flex flex-col gap-[var(--xen-space-xs)]', className)} {...rest}>
      <div className="flex items-center gap-[var(--xen-space-xs)]">
        <Icon glyph={kd.glyph} size="sm" aria-label={`${kd.label} usage`} />
        <span className="text-sm font-semibold text-on-surface">{kd.label}</span>
        {period != null ? <span className="text-xs text-muted">· {period}</span> : null}
        {hasCap ? (
          <span className={cn('ml-auto text-sm font-bold', TEXT_TINT[tone])}>{formatPct(pct)}</span>
        ) : null}
      </div>
      {hasCap ? (
        <Progress value={Math.min(pct, 100)} max={100} tone={tone} aria-label={`${kd.label}, ${formatPct(pct)} of allowance`} />
      ) : null}
      <span className="text-xs text-muted">
        {hasCap
          ? `${formatUsage(safeUsed, u, decimals)} of ${formatUsage(cap, u, decimals)}`
          : formatUsage(safeUsed, u, decimals)}
      </span>
    </div>
  );
});
