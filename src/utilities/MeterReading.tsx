import * as React from 'react';
import { Card, Icon } from '../primitives';
import { formatUsage } from './internal/format';
import { utilityKind, type UtilityKind } from './internal/status';

export type { UtilityKind };

export interface MeterReadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Utility line — drives the leading glyph, label, and default unit. */
  kind: UtilityKind;
  /** Prior reading value (in `unit`s). */
  previous: number;
  /** Current reading value (in `unit`s). */
  current: number;
  /** Metered unit override (defaults to the utility's canonical unit). */
  unit?: string;
  /** Decimal places for the printed quantities (default `0`). */
  decimals?: number;
  /** Localized reading date (e.g. "Read Aug 1"). */
  date?: string;
  /** How the reading was captured. */
  source?: 'estimated' | 'actual' | 'customer';
}

const SOURCE_LABEL: Record<NonNullable<MeterReadingProps['source']>, string> = {
  estimated: 'Estimated',
  actual: 'Actual read',
  customer: 'Self-reported',
};

/**
 * A meter reading entry: previous and current dial values with the derived
 * consumption between them. Consumption is `current − previous`, guarded to
 * never render negative (a rollover / correction clamps to 0) and always printed
 * via `formatUsage` (fixed decimals, no `NaN` leak). A "source" tag distinguishes
 * an estimated read from an actual one. Every color traces to a `--xen-*` token.
 * Web parity of the native `MeterReading`.
 */
export const MeterReading = React.forwardRef<HTMLDivElement, MeterReadingProps>(function MeterReading(
  { kind, previous, current, unit, decimals = 0, date, source, className, ...rest },
  ref
) {
  const kd = utilityKind(kind);
  const u = unit ?? kd.unit;
  const prev = Number.isFinite(previous) ? previous : 0;
  const curr = Number.isFinite(current) ? current : 0;
  const consumption = Math.max(0, curr - prev);

  const caption = date != null ? (source != null ? `${date} · ${SOURCE_LABEL[source]}` : date) : source != null ? SOURCE_LABEL[source] : null;

  return (
    <Card ref={ref} className={className} {...rest}>
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <Icon glyph={kd.glyph} size="lg" aria-label={`${kd.label} meter`} />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-base font-bold text-on-surface">{kd.label} meter</span>
          {caption != null ? <span className="text-xs text-muted">{caption}</span> : null}
        </div>
      </div>

      <div className="mt-[var(--xen-space-md)] flex items-center justify-between">
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
    </Card>
  );
});
