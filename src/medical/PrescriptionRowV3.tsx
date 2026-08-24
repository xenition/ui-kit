import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import type { PrescriptionRowProps, PrescriptionStatus } from './PrescriptionRow';

/** Same public contract as {@link PrescriptionRow} — a drop-in alternate design. */
export type PrescriptionRowV3Props = PrescriptionRowProps;

const STATUS: Record<PrescriptionStatus, { glyph: string; label: string; text: string }> = {
  active: { glyph: '✓', label: 'Active', text: 'text-success' },
  'refill-due': { glyph: '⏰', label: 'Refill due', text: 'text-warn' },
  paused: { glyph: '⏸', label: 'Paused', text: 'text-muted' },
  expired: { glyph: '✕', label: 'Expired', text: 'text-danger' },
};

/**
 * PrescriptionRow, redesigned (v3): a **dense medication line**. The name + dose
 * share a line over a directions·refills subtitle, a status glyph + word marks
 * state (never color alone), and a quiet Refill link shows when due — a single
 * hairline row for a medication list. The opposite of v2's card. Same props,
 * token-only.
 */
export const PrescriptionRowV3 = React.forwardRef<HTMLDivElement, PrescriptionRowV3Props>(
  function PrescriptionRowV3(
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
    const sub = [
      frequency,
      typeof refillsLeft === 'number' ? `${refillsLeft} refill${refillsLeft === 1 ? '' : 's'} left` : null,
    ].filter((s): s is string => !!s);

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
          'flex items-center gap-3 border-b border-border py-2.5',
          interactive && 'cursor-pointer transition-colors hover:bg-neutral-50',
          className
        )}
        {...rest}
      >
        <span className={cn('text-sm', st.text)} aria-hidden>
          {st.glyph}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-on-surface">
            {name} {dose ? <span className="font-normal text-muted">{dose}</span> : null}
          </p>
          {sub.length > 0 ? <p className="truncate text-xs text-muted">{sub.join(' · ')}</p> : null}
        </div>
        {status === 'refill-due' && onRefill ? (
          <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); onRefill(); }}>
            Refill
          </Button>
        ) : null}
      </div>
    );
  }
);
