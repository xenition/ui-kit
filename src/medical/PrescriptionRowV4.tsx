import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { type MedicalTone } from './internal';
import type { PrescriptionRowProps, PrescriptionStatus } from './PrescriptionRow';

/** V4 layout choices for the "clinic" design. */
export type PrescriptionRowLayout = 'full' | 'compact';

/** Drop-in for {@link PrescriptionRowProps} — same props, the V4 "clinic" design. */
export interface PrescriptionRowV4Props extends PrescriptionRowProps {
  /** V4 layout: `full` (default) or `compact` (denser single line). */
  variant?: PrescriptionRowLayout;
}

const STATUS_META: Record<PrescriptionStatus, { glyph: string; label: string; tone: MedicalTone }> = {
  active: { glyph: '●', label: 'Active', tone: 'success' },
  'refill-due': { glyph: '↻', label: 'Refill due', tone: 'warn' },
  paused: { glyph: '⏸', label: 'Paused', tone: 'muted' },
  expired: { glyph: '✕', label: 'Expired', tone: 'danger' },
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
 * PrescriptionRow — **V4** "clinic" design (web parity of the native V4). The
 * calm, clinical take on a medication row: an elevated rounded row with a soft
 * shadow, a pill glyph, the drug name, dose · directions · refills, and a status
 * marker (active / refill-due / paused / expired) drawn as a glyph + labelled
 * Badge + token tone, so it never relies on color alone (accessibility + the
 * token contract). A "Refill" action surfaces when a refill is due. Honors the
 * V4 `variant` — `full` (default) and `compact` (a denser single line that hides
 * the secondary detail line) — identical props/behavior to
 * {@link PrescriptionRowProps}. All colors from `--xen-*` token classes (no
 * literals). Informational UI only — not a medical device.
 */
export const PrescriptionRowV4 = React.forwardRef<HTMLDivElement, PrescriptionRowV4Props>(
  function PrescriptionRowV4(
    { name, dose, frequency, refillsLeft, status = 'active', onRefill, onClick, variant = 'full', className, ...rest },
    ref
  ) {
    const meta = STATUS_META[status] ?? STATUS_META.active;
    const interactive = !!onClick;
    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';

    const detailParts = [
      dose,
      frequency,
      refillsLeft != null ? `${refillsLeft} refill${refillsLeft === 1 ? '' : 's'} left` : undefined,
    ].filter(Boolean) as string[];

    const a11y = `${name}${dose ? `, ${dose}` : ''}${frequency ? `, ${frequency}` : ''}, ${meta.label}`;

    const commonProps = {
      ref,
      'data-xen-prescription-row': '',
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

    const statusBadge = (
      <Badge tone={BADGE_TONE[meta.tone]} variant="soft">
        <span aria-hidden="true">{meta.glyph}</span> {meta.label}
      </Badge>
    );

    const refillBtn =
      status === 'refill-due' && onRefill ? (
        <Button
          size="sm"
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            onRefill();
          }}
        >
          Refill
        </Button>
      ) : null;

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
          <Icon glyph="💊" size="base" />
          <span className="truncate text-sm font-semibold text-on-surface">{name}</span>
          {dose ? <span className="whitespace-nowrap text-xs text-muted">{dose}</span> : null}
          <span className="ml-auto flex items-center gap-[var(--xen-space-sm)]">
            {statusBadge}
            {refillBtn}
          </span>
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
        <Icon glyph="💊" size="lg" />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="truncate text-base font-semibold text-on-surface">{name}</span>
          {detailParts.length ? (
            <span className="inline-flex w-fit items-center rounded-[var(--xen-radius-sm)] bg-primary/10 px-[var(--xen-space-xs)] text-sm text-muted">
              {detailParts.join('  ·  ')}
            </span>
          ) : null}
          {statusBadge}
        </div>
        {refillBtn}
      </div>
    );
  }
);
