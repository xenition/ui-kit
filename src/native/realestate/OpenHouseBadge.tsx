import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { Badge, type BadgeTone } from '../primitives';

/** Timing state of an open house. */
export type OpenHouseStatus = 'upcoming' | 'live' | 'ended';

export interface OpenHouseBadgeProps {
  /** Human date label (e.g. "Sat, Aug 24"). */
  dateLabel: string;
  /** Start time (e.g. "1:00 PM"). */
  startTime?: string;
  /** End time (e.g. "3:00 PM"). */
  endTime?: string;
  /** Timing state — drives tone and prefix (default `upcoming`). */
  status?: OpenHouseStatus;
  style?: StyleProp<ViewStyle>;
}

const STATUS: Record<OpenHouseStatus, { tone: BadgeTone; glyph: string; prefix: string }> = {
  upcoming: { tone: 'primary', glyph: '📅', prefix: 'Open house' },
  live: { tone: 'success', glyph: '🟢', prefix: 'Open now' },
  ended: { tone: 'neutral', glyph: '✓', prefix: 'Ended' },
};

/**
 * A compact open-house indicator — a token-toned {@link Badge} whose color and
 * prefix track the `status` (upcoming / live / ended) followed by the date and
 * time window. Pure presentation: strings in, no callbacks, nothing fetches.
 * The full window is rendered as a single string so it is announced as one
 * phrase. Token-only colors (delegated to `Badge`).
 */
export function OpenHouseBadge({
  dateLabel,
  startTime,
  endTime,
  status = 'upcoming',
  style,
}: OpenHouseBadgeProps): React.ReactElement {
  const { tone, glyph, prefix } = STATUS[status];
  const window = [startTime, endTime].filter(Boolean).join('–');
  const text = `${glyph} ${prefix} · ${dateLabel}${window ? ` ${window}` : ''}`;

  return (
    <Badge tone={tone} style={style}>
      {text}
    </Badge>
  );
}
