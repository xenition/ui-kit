import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { TEXT_TONE, type MedicalTone } from './internal';

export type VitalStatus = 'normal' | 'low' | 'high' | 'critical';

export interface VitalReading {
  /** Stable key + label, e.g. "Heart rate". */
  label: string;
  /** Measured value (number or preformatted, e.g. "120/80"). */
  value: React.ReactNode;
  /** Unit, e.g. "bpm", "mmHg". */
  unit?: string;
  /** Optional leading glyph. */
  glyph?: string;
  /** Flag vs. expected range. Shown by glyph + text, never color alone. */
  status?: VitalStatus;
}

const STATUS_META: Record<VitalStatus, { glyph: string; label: string; tone: MedicalTone }> = {
  normal: { glyph: '✓', label: 'Normal', tone: 'success' },
  low: { glyph: '▼', label: 'Low', tone: 'warn' },
  high: { glyph: '▲', label: 'High', tone: 'warn' },
  critical: { glyph: '⚠', label: 'Critical', tone: 'danger' },
};

export interface VitalsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The vital readings to tile out. */
  vitals: VitalReading[];
  /** Optional panel heading. */
  title?: string;
  /** Skeleton placeholder while readings load. */
  loading?: boolean;
  /** Message shown when `vitals` is empty. */
  emptyLabel?: string;
}

/**
 * A vitals dashboard panel — the web mirror of the native `VitalsPanel`. A
 * responsive grid of reading tiles (heart rate, blood pressure, SpO₂,
 * temperature, …). Each tile shows value + unit and, when flagged, a normal /
 * low / high / critical marker drawn as a glyph + label + warn/danger token
 * color so it is never color-only. Renders a loading skeleton and an empty
 * state (`EmptyState`). Token-only colors. Informational UI only — not a medical
 * device.
 */
export const VitalsPanel = React.forwardRef<HTMLDivElement, VitalsPanelProps>(
  function VitalsPanel(
    { vitals, title, loading = false, emptyLabel = 'No vitals recorded', className, ...rest },
    ref
  ) {
    const header = title ? <span className="text-sm font-bold text-on-surface">{title}</span> : null;

    let body: React.ReactNode;
    if (loading) {
      body = (
        <div
          aria-label="Loading vitals"
          aria-busy="true"
          className="flex flex-wrap gap-[var(--xen-space-sm)]"
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 min-w-[47%] flex-1 rounded-[var(--xen-radius-md)] bg-neutral-100"
            />
          ))}
        </div>
      );
    } else if (vitals.length === 0) {
      body = <EmptyState data-xen-vitals-empty="" title={emptyLabel} />;
    } else {
      body = (
        <div className="flex flex-wrap gap-[var(--xen-space-sm)]">
          {vitals.map((v, i) => {
            const meta = v.status ? STATUS_META[v.status] : undefined;
            const abnormal = v.status != null && v.status !== 'normal';
            const toneClass = meta ? TEXT_TONE[meta.tone] : 'text-on-surface';
            return (
              <div
                key={`${v.label}-${i}`}
                data-xen-vital-tile=""
                aria-label={`${v.label}: ${String(v.value)}${v.unit ? ` ${v.unit}` : ''}${
                  meta ? `, ${meta.label}` : ''
                }`}
                className="flex min-w-[47%] flex-1 flex-col gap-0.5 rounded-[var(--xen-radius-md)] bg-neutral-100 p-[var(--xen-space-sm)]"
              >
                <span className="truncate text-xs text-muted">
                  {v.glyph ? `${v.glyph} ` : ''}
                  {v.label}
                </span>
                <span className={cn('text-xl font-bold', abnormal ? toneClass : 'text-on-surface')}>
                  {v.value}
                  {v.unit ? <span className="text-xs font-medium"> {v.unit}</span> : null}
                </span>
                {meta ? (
                  <span
                    className={cn('inline-flex items-center gap-[var(--xen-space-xs)] text-xs font-bold', toneClass)}
                  >
                    <span aria-hidden="true">{meta.glyph}</span>
                    {meta.label}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-xen-vitals-panel=""
        className={cn(
          'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]',
          className
        )}
        {...rest}
      >
        {header}
        {body}
      </div>
    );
  }
);
