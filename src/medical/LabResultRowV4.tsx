import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { TEXT_TONE, type MedicalTone } from './internal';
import type { LabResultRowProps, LabStatus } from './LabResultRow';

/** V4 layout choices for the "clinic" design. */
export type LabResultRowLayout = 'full' | 'compact';

/** Drop-in for {@link LabResultRowProps} — same props, the V4 "clinic" design. */
export interface LabResultRowV4Props extends LabResultRowProps {
  /** V4 layout: `full` (default) or `compact` (denser single line). */
  variant?: LabResultRowLayout;
}

const STATUS_META: Record<LabStatus, { glyph: string; arrow?: string; label: string; tone: MedicalTone }> = {
  normal: { glyph: '✓', label: 'Normal', tone: 'success' },
  low: { glyph: '▼', arrow: '↓', label: 'Low', tone: 'warn' },
  high: { glyph: '▲', arrow: '↑', label: 'High', tone: 'warn' },
  critical: { glyph: '⚠', arrow: '↑', label: 'Critical', tone: 'danger' },
};

/** MedicalTone → BadgeTone (identical members). */
const BADGE_TONE: Record<MedicalTone, BadgeTone> = {
  primary: 'primary',
  muted: 'muted',
  success: 'success',
  warn: 'warn',
  danger: 'danger',
  accent: 'accent',
};

/**
 * LabResultRow — **V4** "clinic" design (web parity of the native V4). The calm,
 * clinical take on a lab result: an elevated rounded row with a soft shadow, the
 * analyte name, a big legible **tabular-nums** value + unit, and a normal / low /
 * high / critical flag. Out-of-range values are colored by tone and marked with
 * an ↑/↓ arrow plus a labelled status Badge, so an abnormal result is never
 * signalled by color alone (accessibility + the token contract). Honors the V4
 * `variant` — `full` (default, shows the reference range) and `compact` (a denser
 * single line that hides the reference-range detail) — identical props/behavior
 * to {@link LabResultRowProps}. All colors from `--xen-*` token classes (no
 * literals). Informational UI only — not a medical device.
 */
export const LabResultRowV4 = React.forwardRef<HTMLDivElement, LabResultRowV4Props>(
  function LabResultRowV4(
    { name, value, unit, referenceRange, status = 'normal', collectedAt, onClick, variant = 'full', className, ...rest },
    ref
  ) {
    const meta = STATUS_META[status] ?? STATUS_META.normal;
    const toneClass = TEXT_TONE[meta.tone];
    const abnormal = status !== 'normal';
    const interactive = !!onClick;
    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';

    const a11y = `${name}: ${String(value)}${unit ? ` ${unit}` : ''}, ${meta.label}${
      referenceRange ? `, reference ${referenceRange}` : ''
    }`;

    const commonProps = {
      ref,
      'data-xen-lab-result-row': '',
      role: interactive ? 'button' : undefined,
      tabIndex: interactive ? 0 : undefined,
      'aria-label': a11y,
      onClick: interactive ? () => onClick?.() : undefined,
      onKeyDown: interactive
        ? (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick?.();
            }
          }
        : undefined,
    } as const;

    const valueNode = (
      <span className={cn('tabular-nums', abnormal ? toneClass : 'text-on-surface')}>
        {abnormal && meta.arrow ? (
          <span aria-hidden="true" className="mr-0.5">
            {meta.arrow}
          </span>
        ) : null}
        {value}
        {unit ? <span className="text-xs font-medium"> {unit}</span> : null}
      </span>
    );

    // ── compact: denser single line ──
    if (variant === 'compact') {
      return (
        <div
          {...commonProps}
          className={cn(
            shell,
            'flex min-h-[44px] items-center gap-[var(--xen-space-sm)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
            interactive && 'cursor-pointer transition-opacity hover:opacity-80',
            className
          )}
          {...rest}
        >
          <span className="truncate text-sm font-semibold text-on-surface">{name}</span>
          <span className="ml-auto text-base font-bold">{valueNode}</span>
          <Badge tone={BADGE_TONE[meta.tone]} variant="soft">
            <span aria-hidden="true">{meta.glyph}</span> {meta.label}
          </Badge>
        </div>
      );
    }

    return (
      <div
        {...commonProps}
        className={cn(
          shell,
          'flex min-h-[56px] items-center gap-[var(--xen-space-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          interactive && 'cursor-pointer transition-opacity hover:opacity-80',
          className
        )}
        {...rest}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-base font-semibold text-on-surface">{name}</span>
          {referenceRange ? (
            <span className="inline-flex w-fit items-center rounded-[var(--xen-radius-sm)] bg-primary/10 px-[var(--xen-space-xs)] text-xs text-muted">
              Ref {referenceRange}
              {unit ? ` ${unit}` : ''}
            </span>
          ) : null}
          {collectedAt ? <span className="truncate text-xs text-muted">{collectedAt}</span> : null}
        </div>

        <div className="flex flex-col items-end gap-0.5">
          <span className="text-2xl font-bold">{valueNode}</span>
          <Badge tone={BADGE_TONE[meta.tone]} variant="soft">
            <span aria-hidden="true">{meta.glyph}</span> {meta.label}
          </Badge>
        </div>
      </div>
    );
  }
);
