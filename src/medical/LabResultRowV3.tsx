import * as React from 'react';
import { cn } from '../primitives/cn';
import type { LabResultRowProps, LabStatus } from './LabResultRow';

/** Same public contract as {@link LabResultRow} — a drop-in alternate design. */
export type LabResultRowV3Props = LabResultRowProps;

const STATUS: Record<LabStatus, { glyph: string; label: string; text: string }> = {
  normal: { glyph: '✓', label: 'Normal', text: 'text-success' },
  low: { glyph: '↓', label: 'Low', text: 'text-warn' },
  high: { glyph: '↑', label: 'High', text: 'text-warn' },
  critical: { glyph: '‼', label: 'Critical', text: 'text-danger' },
};

/**
 * LabResultRow, redesigned (v3): a **dense panel line**. A status glyph leads,
 * the analyte name + reference range stack tight, and the value·unit pin right —
 * hairline-bordered so a full lab panel reads as a compact table. The opposite of
 * v2's card. Status is glyph + text, never color alone. Same props, token-only.
 */
export const LabResultRowV3 = React.forwardRef<HTMLDivElement, LabResultRowV3Props>(
  function LabResultRowV3(
    { name, value, unit, referenceRange, status = 'normal', collectedAt, onClick, className, ...rest },
    ref
  ) {
    void collectedAt;
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
        data-xen-lab-result-row=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={`${name}, ${st.label}`}
        onClick={interactive ? () => onClick?.() : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        className={cn(
          'flex items-center gap-3 border-b border-border py-2',
          interactive && 'cursor-pointer transition-colors hover:bg-neutral-50',
          className
        )}
        {...rest}
      >
        <span className={cn('text-sm', st.text)} aria-hidden>
          {st.glyph}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-on-surface">{name}</p>
          {referenceRange ? <p className="truncate text-xs text-muted">Ref {referenceRange}</p> : null}
        </div>
        <p className="text-right">
          <span className={cn('text-sm font-semibold', st.text)}>{value}</span>
          {unit ? <span className="text-xs text-muted"> {unit}</span> : null}
        </p>
      </div>
    );
  }
);
