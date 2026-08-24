import * as React from 'react';
import { cn } from '../primitives/cn';

/** Ticket priority levels, low → urgent. */
export type Priority = 'low' | 'normal' | 'high' | 'urgent';
/** `chip` = pill with label; `bars` = a compact signal-strength indicator. */
export type TicketPriorityVariant = 'chip' | 'bars';
export type TicketPrioritySize = 'sm' | 'md';

export interface TicketPriorityProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** The priority level. */
  level: Priority;
  /** Visual treatment (default `chip`). */
  variant?: TicketPriorityVariant;
  /** Size scale (default `md`). */
  size?: TicketPrioritySize;
  /** Hide the text label (glyph/bars only). Label still drives a11y. */
  hideLabel?: boolean;
}

interface LevelSpec {
  glyph: string;
  label: string;
  /** Filled bars out of 4 for the `bars` variant. */
  rank: number;
  /** Border + text token classes for the chip. */
  chipCls: string;
  /** Text token class + fill token class for bars. */
  textCls: string;
  fillCls: string;
}

// urgent → danger, high → warn, normal → primary, low → muted. Distinct glyph +
// bar count so priority is never conveyed by color alone.
const LEVEL: Record<Priority, LevelSpec> = {
  low: { glyph: '▽', label: 'Low', rank: 1, chipCls: 'border-border text-muted', textCls: 'text-muted', fillCls: 'bg-muted' },
  normal: { glyph: '▷', label: 'Normal', rank: 2, chipCls: 'border-primary text-primary', textCls: 'text-primary', fillCls: 'bg-primary' },
  high: { glyph: '△', label: 'High', rank: 3, chipCls: 'border-warn text-warn', textCls: 'text-warn', fillCls: 'bg-warn' },
  urgent: { glyph: '⚑', label: 'Urgent', rank: 4, chipCls: 'border-danger text-danger', textCls: 'text-danger', fillCls: 'bg-danger' },
};

const TOTAL_BARS = 4;

/**
 * Ticket priority indicator (`low`/`normal`/`high`/`urgent`). Two variants: a
 * `chip` (glyph + label pill) and `bars` (a four-step signal indicator whose
 * filled count encodes the level). Tone maps to token classes
 * (`text-danger`/`text-warn`/`text-primary`/`text-muted`); the glyph and the bar
 * count carry the level independently of color. No literal hex. Presentational.
 */
export const TicketPriority = React.forwardRef<HTMLSpanElement, TicketPriorityProps>(
  function TicketPriority({ level, variant = 'chip', size = 'md', hideLabel = false, className, ...rest }, ref) {
    const spec = LEVEL[level] ?? LEVEL.normal;
    const textSize = size === 'sm' ? 'text-xs' : 'text-sm';
    const a11y = `Priority ${spec.label}`;

    if (variant === 'bars') {
      const barMax = size === 'sm' ? 10 : 14;
      return (
        <span
          ref={ref}
          role="img"
          aria-label={a11y}
          className={cn('inline-flex items-center gap-1', className)}
          {...rest}
        >
          <span className="inline-flex items-end gap-px" aria-hidden="true">
            {Array.from({ length: TOTAL_BARS }, (_, i) => (
              <span
                key={i}
                className={cn(
                  'inline-block rounded-[1px]',
                  size === 'sm' ? 'w-[3px]' : 'w-1',
                  i < spec.rank ? spec.fillCls : 'bg-neutral-200'
                )}
                style={{ height: Math.round((barMax * (i + 1)) / TOTAL_BARS) }}
              />
            ))}
          </span>
          {hideLabel ? null : (
            <span className={cn('font-semibold', textSize, spec.textCls)}>{spec.label}</span>
          )}
        </span>
      );
    }

    return (
      <span
        ref={ref}
        role="img"
        aria-label={a11y}
        className={cn(
          'inline-flex items-center gap-1 self-start rounded-full border font-semibold',
          size === 'sm' ? 'px-2 py-px' : 'px-2.5 py-0.5',
          textSize,
          spec.chipCls,
          className
        )}
        {...rest}
      >
        <span aria-hidden="true" className="font-normal">
          {spec.glyph}
        </span>
        {hideLabel ? null : <span>{spec.label}</span>}
      </span>
    );
  }
);
