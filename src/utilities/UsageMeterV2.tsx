import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Icon } from '../primitives';
import { ProgressRing } from '../charts';
import { formatUsage, formatPct, clamp, TEXT_TINT } from './internal/format';
import { utilityKind } from './internal/status';
import type { UsageMeterProps } from './UsageMeter';

/** Same public contract as {@link UsageMeter} — a drop-in alternate design. */
export type UsageMeterV2Props = UsageMeterProps;

/**
 * UsageMeter, redesigned (v2): a **big gauge ring**. A large `ProgressRing`
 * centers the period's usage as a percent of allowance, escalating its arc color
 * by threshold (under `warnAt` → primary, over → accent, at/over cap → danger);
 * the utility line and the used / allowance figures stack centered beneath it,
 * with a redundant escalation caption so status is never color-alone. A zero /
 * absent allowance is guarded (no divide-by-zero) and shows the raw usage in the
 * ring instead. Distinct at a glance from v1's inline bar and v3's slim bar. Same
 * props, `formatUsage` quantities, token-pure.
 */
export const UsageMeterV2 = React.forwardRef<HTMLDivElement, UsageMeterV2Props>(function UsageMeterV2(
  { kind, used, allowance = 0, unit, decimals = 0, period, warnAt = 0.8, loading = false, className, ...rest },
  ref
) {
  const kd = utilityKind(kind);
  const u = unit ?? kd.unit;

  if (loading) {
    return (
      <Card ref={ref} className={className} {...rest}>
        <div aria-busy="true" aria-label="Loading usage" className="flex flex-col items-center gap-[var(--xen-space-md)]">
          <div className="h-[140px] w-[140px] animate-pulse rounded-full bg-neutral-100" />
          <div className="h-4 w-1/2 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        </div>
      </Card>
    );
  }

  const safeUsed = Number.isFinite(used) ? Math.max(0, used) : 0;
  const cap = Number.isFinite(allowance) ? Math.max(0, allowance) : 0;
  const hasCap = cap > 0;
  const ratio = hasCap ? clamp(safeUsed / cap, 0, 1.5) : 0;
  const pct = Math.round(ratio * 100);

  const ringColor: 'primary' | 'accent' | 'danger' = !hasCap
    ? 'primary'
    : ratio >= 1
      ? 'danger'
      : ratio >= warnAt
        ? 'accent'
        : 'primary';

  return (
    <Card ref={ref} className={className} {...rest}>
      <div className="flex flex-col items-center gap-[var(--xen-space-md)]">
        <div className="relative inline-flex">
          <ProgressRing
            value={hasCap ? Math.min(pct, 100) : 0}
            max={100}
            size={140}
            thickness={14}
            color={ringColor}
            showValue={false}
            aria-label={
              hasCap
                ? `${kd.label} usage, ${formatPct(pct)} of allowance`
                : `${kd.label} usage, ${formatUsage(safeUsed, u, decimals)}`
            }
          />
          <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-on-surface">
            {hasCap ? formatPct(pct) : formatUsage(safeUsed, u, decimals)}
          </span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-[var(--xen-space-xs)]">
            <Icon glyph={kd.glyph} size="base" aria-label={`${kd.label} usage`} />
            <span className="text-lg font-bold text-on-surface">{kd.label}</span>
          </div>
          {period != null ? <span className="text-xs text-muted">{period}</span> : null}
          <span className="text-sm text-on-surface">
            {formatUsage(safeUsed, u, decimals)}
            {hasCap ? <span className="text-muted"> of {formatUsage(cap, u, decimals)}</span> : null}
          </span>
          {hasCap ? (
            <span className={cn('text-xs font-semibold', TEXT_TINT[ringColor])}>
              {ratio >= 1 ? `Over allowance · ${formatPct(pct)}` : `${formatPct(pct)} of allowance`}
            </span>
          ) : (
            <span className="text-xs text-muted">No allowance set</span>
          )}
        </div>
      </div>
    </Card>
  );
});
