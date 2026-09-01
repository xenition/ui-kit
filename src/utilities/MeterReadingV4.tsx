import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { formatUsage } from './internal/format';
import { utilityKind } from './internal/status';
import type { MeterReadingProps } from './MeterReading';

/** Drop-in for {@link MeterReadingProps} — same props, a different design. */
export type MeterReadingV4Props = MeterReadingProps;

const SOURCE_LABEL: Record<NonNullable<MeterReadingProps['source']>, string> = {
  estimated: 'Estimated',
  actual: 'Actual read',
  customer: 'Self-reported',
};

/**
 * MeterReading — **V4** design. The clean, trust-first meter card: an elevated
 * rounded surface with the utility-kind glyph in a small brand-gradient disc (the
 * signature V4 touch). Keeps the previous → current → used reading trio, the
 * derived consumption (`current − previous`, clamped to `0`) printed via
 * `formatUsage`, the date, and the source tag. Restraint by design — only the disc
 * is gradient. Same props/behavior as {@link MeterReadingProps}; token-only colors.
 */
export const MeterReadingV4 = React.forwardRef<HTMLDivElement, MeterReadingV4Props>(function MeterReadingV4(
  { kind, previous, current, unit, decimals = 0, date, source, className, ...rest },
  ref
) {
  const kd = utilityKind(kind);
  const u = unit ?? kd.unit;
  const prev = Number.isFinite(previous) ? previous : 0;
  const curr = Number.isFinite(current) ? current : 0;
  const consumption = Math.max(0, curr - prev);

  const caption =
    date != null
      ? source != null
        ? `${date} · ${SOURCE_LABEL[source]}`
        : date
      : source != null
        ? SOURCE_LABEL[source]
        : null;

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5',
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700">
          <Icon glyph={kd.glyph} size="xl" color="onPrimary" aria-label={`${kd.label} meter`} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-base font-bold text-on-surface">{kd.label} meter</span>
          {caption != null ? <span className="text-xs text-muted">{caption}</span> : null}
        </div>
      </div>

      <div className="mt-[var(--xen-space-md)] flex items-center justify-between border-t border-border pt-[var(--xen-space-md)]">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-muted">Previous</span>
          <span className="text-base font-semibold text-on-surface">{formatUsage(prev, u, decimals)}</span>
        </div>
        <Icon glyph="→" color="muted" aria-label="to" />
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-xs text-muted">Current</span>
          <span className="text-base font-semibold text-on-surface">{formatUsage(curr, u, decimals)}</span>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-xs text-muted">Used</span>
          <span className="text-lg font-bold text-primary">{formatUsage(consumption, u, decimals)}</span>
        </div>
      </div>
    </div>
  );
});
