import * as React from 'react';
import { cn } from '../primitives/cn';

/** Relative due-date urgency. */
export type DueDateTone = 'overdue' | 'today' | 'upcoming';

export interface DueDatePillProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Pre-formatted date label (e.g. `'Aug 24'`, `'Tomorrow'`). */
  label: string;
  /** Urgency tone; drives the semantic color. */
  tone?: DueDateTone;
  /** Optional leading glyph override (default a calendar/clock per tone). */
  glyph?: string;
}

/**
 * Maps a due tone to its `[background, foreground]` token classes: `overdue`
 * escalates to danger, `today` to warn, `upcoming` stays neutral. No literals.
 */
const TONE: Record<DueDateTone, { bg: string; fg: string }> = {
  overdue: { bg: 'bg-danger', fg: 'text-on-danger' },
  today: { bg: 'bg-warn', fg: 'text-on-warn' },
  upcoming: { bg: 'bg-border', fg: 'text-on-surface' },
};

const GLYPH: Record<DueDateTone, string> = {
  overdue: '⚠',
  today: '●',
  upcoming: '🗓',
};

/**
 * Compact due-date pill — a token-bound background/foreground keyed off the
 * urgency `tone`, with a leading glyph. For deadlines on task rows and cards.
 * Web parity of the native `DueDatePill`. Every color traces to an `--xen-*`
 * token class. No literal colors.
 */
export const DueDatePill = React.forwardRef<HTMLSpanElement, DueDatePillProps>(function DueDatePill(
  { label, tone = 'upcoming', glyph, className, ...rest },
  ref
) {
  const t = TONE[tone] ?? TONE.upcoming;
  return (
    <span
      ref={ref}
      aria-label={`Due ${label}${tone === 'overdue' ? ', overdue' : ''}`}
      className={cn(
        'inline-flex items-center gap-1 self-start rounded-full px-2 py-0.5 text-xs font-semibold',
        t.bg,
        t.fg,
        className
      )}
      {...rest}
    >
      <span aria-hidden>{glyph ?? GLYPH[tone] ?? GLYPH.upcoming}</span>
      {label}
    </span>
  );
});
