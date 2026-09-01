import * as React from 'react';
import { cn } from '../primitives/cn';
import type { DueDatePillProps, DueDateTone } from './DueDatePill';

/** Drop-in for {@link DueDatePillProps} — same props, the V4 "flow" design. */
export type DueDatePillV4Props = DueDatePillProps;

/**
 * Maps a due tone to its **soft-tint** background + legible foreground token
 * classes: `overdue` escalates to danger, `today` warns, `upcoming` rests on a
 * calm primary wash. Urgency reads by color *and* glyph, never color alone. No
 * literals.
 */
const TONE: Record<DueDateTone, { tint: string; fg: string }> = {
  overdue: { tint: 'bg-danger/[0.12]', fg: 'text-danger' },
  today: { tint: 'bg-warn/[0.12]', fg: 'text-warn' },
  upcoming: { tint: 'bg-primary/[0.10]', fg: 'text-primary' },
};

const GLYPH: Record<DueDateTone, string> = {
  overdue: '⚠',
  today: '●',
  upcoming: '🗓',
};

/**
 * DueDatePill — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a deadline: a rounded **soft-tint** pill with a
 * leading calendar/clock glyph and the date, colored by urgency `tone`. Calm by
 * default (a gentle primary wash), escalating to danger/warn only when the date
 * demands it — and always paired with a glyph so urgency never rides on color
 * alone. Same props/behavior as {@link DueDatePillProps}; every color traces to
 * an `--xen-*` token class (no literals).
 */
export const DueDatePillV4 = React.forwardRef<HTMLSpanElement, DueDatePillV4Props>(function DueDatePillV4(
  { label, tone = 'upcoming', glyph, className, ...rest },
  ref
) {
  const t = TONE[tone] ?? TONE.upcoming;
  return (
    <span
      ref={ref}
      aria-label={`Due ${label}${tone === 'overdue' ? ', overdue' : ''}`}
      className={cn(
        'inline-flex items-center gap-1.5 self-start rounded-full px-2.5 py-1 text-sm font-semibold',
        t.tint,
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
