import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { SLABadge, type SLAState } from './SLABadge';
import { formatDuration } from './internal';

export interface ResolutionTimerProps {
  /**
   * Signed seconds remaining until the SLA due time — positive = time left,
   * negative = overdue. Provide this **or** `dueAt`.
   */
  remainingSeconds?: number;
  /** SLA due instant (ISO-8601). Used with `now` when `remainingSeconds` is absent. */
  dueAt?: string;
  /** Reference "now" (ISO-8601 or ms). Defaults to `Date.now()`. Enables deterministic tests. */
  now?: string | number;
  /** Seconds-remaining threshold below which the state becomes `at-risk` (default 900 = 15m). */
  atRiskThresholdSeconds?: number;
  /** Caption above the timer (default "Time to resolution"). */
  label?: string;
  /** Force a specific SLA state instead of deriving it (rarely needed). */
  state?: SLAState;
  style?: StyleProp<ViewStyle>;
}

function toMs(value: string | number | undefined, fallback: number): number {
  if (value === undefined) return fallback;
  if (typeof value === 'number') return value;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? fallback : parsed;
}

/**
 * A resolution/SLA countdown. Given a signed `remainingSeconds` (or a `dueAt` +
 * `now` pair) it renders the formatted time left / overdue and derives the SLA
 * state — `breached` once time is up, `at-risk` under the configurable
 * threshold, else `on-track` — surfaced through the glyph+text `SLABadge` so the
 * state is never color-only. Pure/presentational (no internal ticking); the app
 * re-renders with a fresh value. Token colors only.
 */
export function ResolutionTimer({
  remainingSeconds,
  dueAt,
  now,
  atRiskThresholdSeconds = 900,
  label = 'Time to resolution',
  state,
  style,
}: ResolutionTimerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const remaining =
    typeof remainingSeconds === 'number' && Number.isFinite(remainingSeconds)
      ? remainingSeconds
      : (toMs(dueAt, Date.now()) - toMs(now, Date.now())) / 1000;

  const derived: SLAState =
    state ??
    (remaining <= 0 ? 'breached' : remaining <= Math.max(0, atRiskThresholdSeconds) ? 'at-risk' : 'on-track');

  const overdue = remaining < 0;
  const timeText = formatDuration(Math.abs(remaining));
  const prefix = overdue ? '-' : '';
  const hint = overdue ? 'over' : 'left';

  return (
    <View
      accessible
      accessibilityRole="timer"
      accessibilityLabel={`${label}: ${overdue ? 'overdue by ' : ''}${timeText} ${overdue ? '' : 'remaining'}`}
      style={[{ gap: tokens.spacing.xs }, style]}
    >
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Text
          style={{
            color: derived === 'breached' ? colors.danger : derived === 'at-risk' ? colors.warn : colors.onSurface,
            fontSize: tokens.typography.scale['2xl'],
            fontWeight: '700',
            fontVariant: ['tabular-nums'],
          }}
        >
          {prefix}
          {timeText}
        </Text>
        <SLABadge state={derived} hint={hint} size="sm" />
      </View>
    </View>
  );
}
