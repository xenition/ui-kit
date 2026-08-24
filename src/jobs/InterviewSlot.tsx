import * as React from 'react';
import { cn } from '../primitives/cn';
import type { Interview, InterviewMode } from './types';
import { formatShortDate, formatTime } from './format';

/** Mode → [glyph, label] — a non-color signal for the interview channel. */
const MODE: Record<InterviewMode, [string, string]> = {
  onsite: ['📍', 'On-site'],
  video: ['🎥', 'Video'],
  phone: ['📞', 'Phone'],
};

export interface InterviewSlotProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> {
  /** The interview (or proposed slot) to render. */
  interview: Interview;
  /** Marks this slot as the chosen one. */
  selected?: boolean;
  /** Disables selection (e.g. slot no longer available). */
  disabled?: boolean;
  /** Fired when a bookable slot is pressed. */
  onSelect?: (interview: Interview) => void;
}

/**
 * A selectable interview slot chip/card: date + time range, a mode marker
 * (on-site / video / phone — glyph + label, not color alone), and the
 * interviewer. Selected state is announced via `aria-pressed` and a token
 * outline; disabled slots never fire `onSelect`. Tokens only.
 */
export const InterviewSlot = React.forwardRef<HTMLButtonElement, InterviewSlotProps>(
  function InterviewSlot({ interview, selected = false, disabled = false, onSelect, className, ...rest }, ref) {
    const [glyph, modeLabel] = MODE[interview.mode] ?? MODE.video;

    const start = formatTime(interview.startsAt);
    const end = interview.endsAt ? formatTime(interview.endsAt) : '';
    const timeRange = end ? `${start} – ${end}` : start;
    const dateLabel = formatShortDate(interview.startsAt);
    const a11y = `${dateLabel} ${timeRange}, ${modeLabel}${
      interview.interviewer ? `, with ${interview.interviewer}` : ''
    }`;

    return (
      <button
        ref={ref}
        type="button"
        data-xen-interview-slot=""
        aria-label={a11y}
        aria-pressed={selected}
        disabled={disabled || !onSelect}
        onClick={onSelect ? () => onSelect(interview) : undefined}
        className={cn(
          'flex flex-col gap-xs rounded-md p-md text-left',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          'disabled:cursor-not-allowed disabled:opacity-50',
          selected
            ? 'border-2 border-primary bg-primary text-on-primary'
            : 'border border-border bg-surface text-on-surface hover:opacity-95',
          className
        )}
        {...rest}
      >
        <span className="flex items-center gap-xs">
          <span aria-hidden="true" className="text-sm">
            {glyph}
          </span>
          <span className={cn('text-xs font-semibold', selected ? 'text-on-primary' : 'text-muted')}>
            {dateLabel}
            {'  ·  '}
            {modeLabel}
          </span>
        </span>
        <span className={cn('text-base font-semibold', selected ? 'text-on-primary' : 'text-on-surface')}>
          {timeRange}
        </span>
        {interview.interviewer ? (
          <span className={cn('truncate text-xs', selected ? 'text-on-primary' : 'text-muted')}>
            {interview.interviewer}
          </span>
        ) : null}
      </button>
    );
  }
);
