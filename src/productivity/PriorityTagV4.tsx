import * as React from 'react';
import { cn } from '../primitives/cn';
import type { PriorityLevel, PriorityTagProps } from './PriorityTag';

/** Drop-in for {@link PriorityTagProps} — same props, the V4 "flow" design. */
export type PriorityTagV4Props = PriorityTagProps;

/**
 * Per level, its `[soft-tint background, text color, glyph]`. Per the token
 * contract, priority is carried by color **and** a leading glyph — never color
 * alone: `urgent` → danger, `high` → warn, `med` → primary, `low` →
 * neutral/muted. Every color traces to an `--xen-*` token class.
 */
const LEVEL: Record<PriorityLevel, { bg: string; fg: string; dot: string; glyph: string }> = {
  low: { bg: 'bg-border/[0.4]', fg: 'text-muted-text', dot: 'bg-muted-text', glyph: '▾' },
  med: { bg: 'bg-primary/[0.14]', fg: 'text-primary-text', dot: 'bg-primary', glyph: '◆' },
  high: { bg: 'bg-warn/[0.16]', fg: 'text-warn-text', dot: 'bg-warn', glyph: '▲' },
  urgent: { bg: 'bg-danger/[0.16]', fg: 'text-danger-text', dot: 'bg-danger', glyph: '⚑' },
};

const DEFAULT_LABEL: Record<PriorityLevel, string> = {
  low: 'Low',
  med: 'Medium',
  high: 'High',
  urgent: 'Urgent',
};

/**
 * PriorityTag — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a priority chip: a **soft-tint pill** colored by
 * level with a leading glyph so urgency reads by shape as well as color, keeping
 * the base levels and the `dotOnly` dense mode. Same props/behavior as
 * {@link PriorityTagProps}; all colors from `--xen-*` token classes (no literals).
 */
export const PriorityTagV4 = React.forwardRef<HTMLSpanElement, PriorityTagV4Props>(function PriorityTagV4(
  { level, label, dotOnly = false, className, ...rest },
  ref
) {
  const tone = LEVEL[level] ?? LEVEL.low;
  const text = label ?? DEFAULT_LABEL[level] ?? 'Low';

  if (dotOnly) {
    return (
      <span
        ref={ref}
        role="img"
        aria-label={`${text} priority`}
        className={cn('inline-block h-2.5 w-2.5 rounded-full', tone.dot, className)}
        {...rest}
      />
    );
  }

  return (
    <span
      ref={ref}
      aria-label={`${text} priority`}
      className={cn(
        'inline-flex items-center gap-1 self-start rounded-[var(--xen-radius-full)] px-2.5 py-1 text-xs font-semibold',
        tone.bg,
        tone.fg,
        className
      )}
      {...rest}
    >
      <span aria-hidden className="text-[0.85em] leading-none">
        {tone.glyph}
      </span>
      {text}
    </span>
  );
});
