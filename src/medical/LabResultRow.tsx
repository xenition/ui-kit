import * as React from 'react';
import { cn } from '../primitives/cn';
import { TEXT_TONE, type MedicalTone } from './internal';

export type LabStatus = 'normal' | 'low' | 'high' | 'critical';

const STATUS_META: Record<LabStatus, { glyph: string; label: string; tone: MedicalTone }> = {
  normal: { glyph: '✓', label: 'Normal', tone: 'success' },
  low: { glyph: '▼', label: 'Low', tone: 'warn' },
  high: { glyph: '▲', label: 'High', tone: 'warn' },
  critical: { glyph: '⚠', label: 'Critical', tone: 'danger' },
};

export interface LabResultRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Analyte / test name, e.g. "Hemoglobin". */
  name: string;
  /** Measured value (number or preformatted string). */
  value: React.ReactNode;
  /** Unit, e.g. "g/dL". */
  unit?: string;
  /** Reference range text, e.g. "13.5–17.5". */
  referenceRange?: string;
  /** Flag relative to the reference range. Shown by glyph + label + color. Defaults `normal`. */
  status?: LabStatus;
  /** Collection date/time line. */
  collectedAt?: string;
  /** Fires when the row is activated (e.g. open full result) — web mirror of native `onPress`. */
  onClick?: () => void;
}

/**
 * A single lab-result row — the web mirror of the native `LabResultRow`. Shows
 * the analyte name, measured value + unit, reference range, and a normal / low
 * / high / critical flag. The flag is rendered as a glyph (`✓ ▼ ▲ ⚠`) plus a
 * text label plus a warn/danger token color, so an abnormal result is never
 * signalled by color alone (accessibility + the token contract). When `onClick`
 * is set the row is a keyboard-activatable `role="button"`. Token-only colors.
 * Informational UI only — not a medical device.
 */
export const LabResultRow = React.forwardRef<HTMLDivElement, LabResultRowProps>(
  function LabResultRow(
    { name, value, unit, referenceRange, status = 'normal', collectedAt, onClick, className, ...rest },
    ref
  ) {
    const meta = STATUS_META[status] ?? STATUS_META.normal;
    const toneClass = TEXT_TONE[meta.tone];
    const abnormal = status !== 'normal';
    const interactive = !!onClick;

    const a11y = `${name}: ${String(value)}${unit ? ` ${unit}` : ''}, ${meta.label}${
      referenceRange ? `, reference ${referenceRange}` : ''
    }`;

    return (
      <div
        ref={ref}
        data-xen-lab-result-row=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={a11y}
        onClick={interactive ? () => onClick?.() : undefined}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
        className={cn(
          'flex min-h-[56px] items-center gap-[var(--xen-space-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          interactive && 'cursor-pointer rounded-[var(--xen-radius-md)] transition-opacity hover:opacity-80',
          className
        )}
        {...rest}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-base font-semibold text-on-surface">{name}</span>
          {referenceRange ? (
            <span className="truncate text-xs text-muted">
              Ref {referenceRange}
              {unit ? ` ${unit}` : ''}
            </span>
          ) : null}
          {collectedAt ? <span className="truncate text-xs text-muted">{collectedAt}</span> : null}
        </div>

        <div className="flex flex-col items-end gap-0.5">
          <span className={cn('text-lg font-bold', abnormal ? toneClass : 'text-on-surface')}>
            {value}
            {unit ? <span className="text-xs font-medium"> {unit}</span> : null}
          </span>
          <span className={cn('inline-flex items-center gap-[var(--xen-space-xs)] text-xs font-bold', toneClass)}>
            <span aria-hidden="true">{meta.glyph}</span>
            {meta.label}
          </span>
        </div>
      </div>
    );
  }
);
