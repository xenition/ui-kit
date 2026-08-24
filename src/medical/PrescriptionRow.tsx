import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { TEXT_TONE, type MedicalTone } from './internal';

export type PrescriptionStatus = 'active' | 'refill-due' | 'paused' | 'expired';

const STATUS_META: Record<PrescriptionStatus, { glyph: string; label: string; tone: MedicalTone }> = {
  active: { glyph: '●', label: 'Active', tone: 'success' },
  'refill-due': { glyph: '↻', label: 'Refill due', tone: 'warn' },
  paused: { glyph: '⏸', label: 'Paused', tone: 'muted' },
  expired: { glyph: '✕', label: 'Expired', tone: 'danger' },
};

export interface PrescriptionRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Medication name, e.g. "Atorvastatin". */
  name: string;
  /** Strength / dose, e.g. "20 mg". */
  dose?: string;
  /** Directions, e.g. "1 tablet, once daily". */
  frequency?: string;
  /** Refills remaining. */
  refillsLeft?: number;
  /** Dispensing status. Shown by glyph + text, never color alone. Defaults `active`. */
  status?: PrescriptionStatus;
  /** Fires when the refill action is pressed (shown for `refill-due`). */
  onRefill?: () => void;
  /** Fires when the row is activated — web mirror of native `onPress`. */
  onClick?: () => void;
}

/**
 * A medication list row for a prescription / pharmacy screen — the web mirror
 * of the native `PrescriptionRow`. Shows the drug name, dose, directions,
 * refills remaining, and a status marker (active / refill-due / paused /
 * expired) drawn as a glyph + label + token color so it never relies on color
 * alone. A "Refill" action surfaces when a refill is due. When `onClick` is set
 * the row is a keyboard-activatable `role="button"`. Token-only colors.
 * Informational UI only — not a medical device.
 */
export const PrescriptionRow = React.forwardRef<HTMLDivElement, PrescriptionRowProps>(
  function PrescriptionRow(
    { name, dose, frequency, refillsLeft, status = 'active', onRefill, onClick, className, ...rest },
    ref
  ) {
    const meta = STATUS_META[status] ?? STATUS_META.active;
    const toneClass = TEXT_TONE[meta.tone];
    const interactive = !!onClick;

    const detailParts = [
      dose,
      frequency,
      refillsLeft != null ? `${refillsLeft} refill${refillsLeft === 1 ? '' : 's'} left` : undefined,
    ].filter(Boolean) as string[];

    const a11y = `${name}${dose ? `, ${dose}` : ''}${frequency ? `, ${frequency}` : ''}, ${meta.label}`;

    return (
      <div
        ref={ref}
        data-xen-prescription-row=""
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
        <Icon glyph="💊" size="lg" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-base font-semibold text-on-surface">{name}</span>
          {detailParts.length ? (
            <span className="truncate text-sm text-muted">{detailParts.join('  ·  ')}</span>
          ) : null}
          <span className={cn('inline-flex items-center gap-[var(--xen-space-xs)] text-xs font-bold', toneClass)}>
            <span aria-hidden="true">{meta.glyph}</span>
            {meta.label}
          </span>
        </div>
        {status === 'refill-due' && onRefill ? (
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
        ) : null}
      </div>
    );
  }
);
