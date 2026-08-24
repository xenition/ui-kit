import * as React from 'react';
import { cn } from '../primitives/cn';

/** Task priority levels, low → urgent. */
export type PriorityLevel = 'low' | 'med' | 'high' | 'urgent';

export interface PriorityTagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Priority level to render. */
  level: PriorityLevel;
  /** Custom label; defaults to a capitalized level name. */
  label?: string;
  /** Dot-only mode (no text) — for dense rows. */
  dotOnly?: boolean;
}

/**
 * Maps a priority level to its `[background, foreground]` token classes. Per the
 * token contract: `urgent` → danger, `high` → warn; `med`/`low` de-escalate to
 * primary/neutral. Never a literal color.
 */
const LEVEL: Record<PriorityLevel, { bg: string; fg: string }> = {
  low: { bg: 'bg-border', fg: 'text-on-surface' },
  med: { bg: 'bg-primary', fg: 'text-on-primary' },
  high: { bg: 'bg-warn', fg: 'text-on-warn' },
  urgent: { bg: 'bg-danger', fg: 'text-on-danger' },
};

const DEFAULT_LABEL: Record<PriorityLevel, string> = {
  low: 'Low',
  med: 'Medium',
  high: 'High',
  urgent: 'Urgent',
};

/**
 * Small priority pill — a token-bound background/foreground per level, with a
 * `dotOnly` mode that collapses to a colored dot for dense task rows. Every color
 * traces to an `--xen-*` token class. Web parity of the native `PriorityTag`
 * (`onPress` → n/a). No literal colors.
 */
export const PriorityTag = React.forwardRef<HTMLSpanElement, PriorityTagProps>(function PriorityTag(
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
        className={cn('inline-block h-2.5 w-2.5 rounded-full', tone.bg, className)}
        {...rest}
      />
    );
  }

  return (
    <span
      ref={ref}
      aria-label={`${text} priority`}
      className={cn(
        'inline-flex items-center gap-1 self-start rounded-[var(--xen-radius-sm)] px-2 py-0.5 text-xs font-semibold',
        tone.bg,
        tone.fg,
        className
      )}
      {...rest}
    >
      {text}
    </span>
  );
});
