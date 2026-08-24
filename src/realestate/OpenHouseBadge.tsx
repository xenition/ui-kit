import * as React from 'react';
import { Badge, type BadgeTone } from '../primitives';

/** Timing state of an open house. */
export type OpenHouseStatus = 'upcoming' | 'live' | 'ended';

export interface OpenHouseBadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Human date label (e.g. "Sat, Aug 24"). */
  dateLabel: string;
  /** Start time (e.g. "1:00 PM"). */
  startTime?: string;
  /** End time (e.g. "3:00 PM"). */
  endTime?: string;
  /** Timing state — drives tone and prefix (default `upcoming`). */
  status?: OpenHouseStatus;
}

const STATUS: Record<OpenHouseStatus, { tone: BadgeTone; glyph: string; prefix: string }> = {
  upcoming: { tone: 'primary', glyph: '📅', prefix: 'Open house' },
  live: { tone: 'success', glyph: '🟢', prefix: 'Open now' },
  ended: { tone: 'neutral', glyph: '✓', prefix: 'Ended' },
};

/**
 * Web parity of the native `OpenHouseBadge`: a compact open-house indicator — a
 * token-toned {@link Badge} whose color and prefix track the `status` (upcoming /
 * live / ended) followed by the date and time window. Pure presentation: strings
 * in, no callbacks, nothing fetches. The full window is rendered as one string so
 * it is announced as a single phrase. All colors come from the `--xen-*` tokens
 * (delegated to `Badge`) — no literal colors.
 */
export const OpenHouseBadge = React.forwardRef<HTMLSpanElement, OpenHouseBadgeProps>(
  function OpenHouseBadge({ dateLabel, startTime, endTime, status = 'upcoming', ...rest }, ref) {
    const { tone, glyph, prefix } = STATUS[status];
    const window = [startTime, endTime].filter(Boolean).join('–');
    const text = `${glyph} ${prefix} · ${dateLabel}${window ? ` ${window}` : ''}`;

    return (
      <Badge ref={ref} tone={tone} {...rest}>
        {text}
      </Badge>
    );
  }
);
