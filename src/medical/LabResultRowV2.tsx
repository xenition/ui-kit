import * as React from 'react';
import { cn } from '../primitives/cn';
import type { LabResultRowProps, LabStatus } from './LabResultRow';

/** Same public contract as {@link LabResultRow} — a drop-in alternate design. */
export type LabResultRowV2Props = LabResultRowProps;

const STATUS: Record<LabStatus, { glyph: string; label: string; text: string; tint: string }> = {
  normal: { glyph: '✓', label: 'Normal', text: 'text-success', tint: 'bg-success/10' },
  low: { glyph: '↓', label: 'Low', text: 'text-warn', tint: 'bg-warn/10' },
  high: { glyph: '↑', label: 'High', text: 'text-warn', tint: 'bg-warn/10' },
  critical: { glyph: '‼', label: 'Critical', text: 'text-danger', tint: 'bg-danger/10' },
};

/**
 * LabResultRow, redesigned (v2): an **elevated result card**. The analyte name
 * leads; the measured value is a large figure colored by status with the unit
 * beside it and the reference range beneath; a tinted status pill (glyph + word)
 * anchors the right. Distinct from v1's flat line. Same props, token-only.
 */
export const LabResultRowV2 = React.forwardRef<HTMLDivElement, LabResultRowV2Props>(
  function LabResultRowV2(
    { name, value, unit, referenceRange, status = 'normal', collectedAt, onClick, className, ...rest },
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
        data-xen-lab-result-row=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={`${name}, ${st.label}`}
        onClick={interactive ? () => onClick?.() : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        className={cn(
          'flex items-center gap-3 rounded-lg bg-surface p-md shadow-sm',
          interactive && 'cursor-pointer transition-colors hover:bg-neutral-50',
          className
        )}
        {...rest}
      >
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-on-surface">{name}</p>
          <p className="flex items-baseline gap-1">
            <span className={cn('text-2xl font-bold', st.text)}>{value}</span>
            {unit ? <span className="text-xs text-muted">{unit}</span> : null}
          </p>
          {referenceRange ? <p className="text-xs text-muted">Ref: {referenceRange}</p> : null}
          {collectedAt ? <p className="text-xs text-muted">{collectedAt}</p> : null}
        </div>
        <span className={cn('rounded-full px-2.5 py-1 text-xs font-semibold', st.tint, st.text)}>
          {st.glyph} {st.label}
        </span>
      </div>
    );
  }
);
