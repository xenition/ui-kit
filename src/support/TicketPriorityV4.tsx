import * as React from 'react';
import { cn } from '../primitives/cn';
import type { Priority, TicketPriorityProps } from './TicketPriority';

/** Drop-in for {@link TicketPriorityProps} — same props, the V4 "calm console" design. */
export type TicketPriorityV4Props = TicketPriorityProps;

interface LevelSpec {
  glyph: string;
  label: string;
  /** Filled bars out of 4 for the `bars` variant. */
  rank: number;
  /** Soft-tint pill classes (bg + text) — level is never color-only. */
  pill: string;
  /** Text token class + fill token class for the bars variant. */
  textCls: string;
  fillCls: string;
}

// urgent → danger, high → warn, normal → primary, low → muted. Distinct glyph +
// bar count so priority is never conveyed by color alone.
const LEVEL: Record<Priority, LevelSpec> = {
  low: { glyph: '▽', label: 'Low', rank: 1, pill: 'bg-muted/10 text-muted', textCls: 'text-muted', fillCls: 'bg-muted' },
  normal: { glyph: '▷', label: 'Normal', rank: 2, pill: 'bg-primary/10 text-primary', textCls: 'text-primary', fillCls: 'bg-primary' },
  high: { glyph: '△', label: 'High', rank: 3, pill: 'bg-warn/10 text-warn', textCls: 'text-warn', fillCls: 'bg-warn' },
  urgent: { glyph: '⚑', label: 'Urgent', rank: 4, pill: 'bg-danger/10 text-danger', textCls: 'text-danger', fillCls: 'bg-danger' },
};

const TOTAL_BARS = 4;

/**
 * TicketPriority — **V4** "calm console" design (drop-in for
 * {@link TicketPriorityProps}). A refined priority chip: glyph + label inside a
 * soft-tint pill colored by level (`bg-<slot>/10 text-<slot>`) rather than the
 * bordered chip of the base — cleaner and more legible in a busy queue. The
 * `bars` variant is preserved as a four-step signal indicator whose filled count
 * carries the level. Level is encoded by glyph **and** color (never color alone);
 * `size` variants and the `low`/`normal`/`high`/`urgent` mapping are unchanged.
 * All colors from `--xen-*` token classes (no literal hex). Presentational.
 */
export const TicketPriorityV4 = React.forwardRef<HTMLSpanElement, TicketPriorityV4Props>(
  function TicketPriorityV4({ level, variant = 'chip', size = 'md', hideLabel = false, className, ...rest }, ref) {
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
                  i < spec.rank ? spec.fillCls : 'bg-on-surface/15'
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
          'inline-flex items-center gap-1 self-start rounded-full font-semibold',
          size === 'sm' ? 'px-2 py-px' : 'px-2.5 py-0.5',
          textSize,
          spec.pill,
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
