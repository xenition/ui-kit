import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { TEXT_TONE, type MedicalTone } from './internal';
import type { VitalsPanelProps, VitalReading, VitalStatus } from './VitalsPanel';

/** Drop-in for {@link VitalsPanelProps} — same props, the V4 "clinic" design. */
export type VitalsPanelV4Props = VitalsPanelProps;

const STATUS_META: Record<VitalStatus, { glyph: string; label: string; tone: MedicalTone }> = {
  normal: { glyph: '✓', label: 'Normal', tone: 'success' },
  low: { glyph: '↓', label: 'Low', tone: 'warn' },
  high: { glyph: '↑', label: 'High', tone: 'warn' },
  critical: { glyph: '⚠', label: 'Critical', tone: 'danger' },
};

/**
 * VitalsPanel — **V4** "clinic" design (web parity of the native V4). The calm,
 * clinical take on a vitals dashboard: an elevated rounded surface with a soft
 * shadow holding a responsive grid of reading tiles (heart rate, blood pressure,
 * SpO₂, temperature, …). Each tile shows a big legible **tabular-nums** value +
 * unit; when a reading is abnormal it is flagged by an ↑/↓ (or ⚠) glyph + a text
 * label + a warn/danger token tone, so severity is never color alone. Renders a
 * loading skeleton and an empty state (`EmptyState`). Identical props/behavior to
 * {@link VitalsPanelProps}. All colors from `--xen-*` token classes (no literals).
 * Informational UI only — not a medical device.
 */
export const VitalsPanelV4 = React.forwardRef<HTMLDivElement, VitalsPanelV4Props>(
  function VitalsPanelV4(
    { vitals, title, loading = false, emptyLabel = 'No vitals recorded', className, ...rest },
    ref
  ) {
    const header = title ? <span className="text-sm font-bold text-on-surface">{title}</span> : null;
    const shell =
      'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm p-[var(--xen-space-lg)]';

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
              className="h-20 min-w-[47%] flex-1 rounded-[var(--xen-radius-md)] bg-neutral-100"
            />
          ))}
        </div>
      );
    } else if (vitals.length === 0) {
      body = <EmptyState data-xen-vitals-empty="" title={emptyLabel} />;
    } else {
      body = (
        <div className="flex flex-wrap gap-[var(--xen-space-sm)]">
          {vitals.map((v: VitalReading, i) => {
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
                className="flex min-w-[47%] flex-1 flex-col gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-border bg-surface p-[var(--xen-space-md)]"
              >
                <span className="truncate text-xs text-muted">
                  {v.glyph ? `${v.glyph} ` : ''}
                  {v.label}
                </span>
                <span className={cn('text-2xl font-bold tabular-nums', abnormal ? toneClass : 'text-on-surface')}>
                  {v.value}
                  {v.unit ? <span className="text-xs font-medium"> {v.unit}</span> : null}
                </span>
                {meta ? (
                  <span
                    className={cn(
                      'inline-flex items-center gap-[var(--xen-space-xs)] self-start rounded-full px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold',
                      abnormal ? 'bg-primary/10' : 'bg-neutral-100',
                      toneClass
                    )}
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
      <div ref={ref} data-xen-vitals-panel="" className={cn(shell, className)} {...rest}>
        {header}
        {body}
      </div>
    );
  }
);
