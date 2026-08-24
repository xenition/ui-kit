import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import type { PrescriptionRowProps, PrescriptionStatus } from './PrescriptionRow';

/** Same public contract as {@link PrescriptionRow} — a drop-in alternate design. */
export type PrescriptionRowV2Props = PrescriptionRowProps;

const STATUS: Record<PrescriptionStatus, { glyph: string; label: string; text: string; tint: string }> = {
  active: { glyph: '✓', label: 'Active', text: 'text-success', tint: 'bg-success/10' },
  'refill-due': { glyph: '⏰', label: 'Refill due', text: 'text-warn', tint: 'bg-warn/10' },
  paused: { glyph: '⏸', label: 'Paused', text: 'text-muted', tint: 'bg-neutral-100' },
  expired: { glyph: '✕', label: 'Expired', text: 'text-danger', tint: 'bg-danger/10' },
};

/**
 * PrescriptionRow, redesigned (v2): an **elevated medication card**. A pill glyph
 * tile leads, the medication name + dose head the body over a directions line and
 * a refills-left chip, a tinted status pill (glyph + word) sits top-right, and a
 * Refill CTA shows when due. Distinct from v1's flat row. Same props, token-only.
 */
export const PrescriptionRowV2 = React.forwardRef<HTMLDivElement, PrescriptionRowV2Props>(
  function PrescriptionRowV2(
    { name, dose, frequency, refillsLeft, status = 'active', onRefill, onClick, className, ...rest },
    ref
  ) {
    const st = STATUS[status];
    const interactive = typeof onClick === 'function';
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (interactive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.();
      }
    };

    return (
      <div
        ref={ref}
        data-xen-prescription-row=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={`${name}${dose ? ` ${dose}` : ''}, ${st.label}`}
        onClick={interactive ? () => onClick?.() : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        className={cn(
          'flex flex-col gap-2 rounded-lg bg-surface p-md shadow-sm',
          interactive && 'cursor-pointer transition-colors hover:bg-neutral-50',
          className
        )}
        {...rest}
      >
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xl">💊</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-on-surface">
              {name} {dose ? <span className="font-normal text-muted">{dose}</span> : null}
            </p>
            {frequency ? <p className="truncate text-xs text-muted">{frequency}</p> : null}
            {typeof refillsLeft === 'number' ? (
              <span className="mt-1 inline-block rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface">
                {refillsLeft} refill{refillsLeft === 1 ? '' : 's'} left
              </span>
            ) : null}
          </div>
          <span className={cn('rounded-full px-2 py-0.5 text-xs font-semibold', st.tint, st.text)}>
            {st.glyph} {st.label}
          </span>
        </div>
        {status === 'refill-due' && onRefill ? (
          <Button size="sm" variant="primary" className="w-full" onClick={(e) => { e.stopPropagation(); onRefill(); }}>
            Refill
          </Button>
        ) : null}
      </div>
    );
  }
);
