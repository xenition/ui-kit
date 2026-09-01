import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { SLABadgeV4 } from './SLABadgeV4';
import type { SLAState } from './SLABadge';
import type { ResolutionTimerProps } from './ResolutionTimer';
import { formatDuration, clamp, withAlpha } from './internal';

/** Drop-in for {@link ResolutionTimerProps} — same props, the V4 "calm console" design. */
export type ResolutionTimerV4Props = ResolutionTimerProps;

function toMs(value: string | number | undefined, fallback: number): number {
  if (value === undefined) return fallback;
  if (typeof value === 'number') return value;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? fallback : parsed;
}

/**
 * ResolutionTimer — **V4** "calm console" design (native twin, drop-in for
 * {@link ResolutionTimerProps}). A calm timer card: a big monospaced-feel
 * numeral (via `formatDuration`, `tabular-nums`) showing time left / overdue, a
 * soft-tint state pill (the V4 {@link SLABadgeV4}), and — when a target is
 * derivable — a subtle token progress hint that fills toward the deadline. State
 * is derived exactly as the base — `breached` once time is up, `at-risk` under
 * the configurable threshold, else `on-track` — and surfaced by glyph + color
 * (never color-only). Same props/behavior as the base; token-only colors via
 * `useXenitionTheme()` — no literal hex. Presentational (no internal ticking).
 */
export function ResolutionTimerV4({
  remainingSeconds,
  dueAt,
  now,
  atRiskThresholdSeconds = 900,
  label = 'Time to resolution',
  state,
  style,
}: ResolutionTimerV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const remaining =
    typeof remainingSeconds === 'number' && Number.isFinite(remainingSeconds)
      ? remainingSeconds
      : (toMs(dueAt, Date.now()) - toMs(now, Date.now())) / 1000;

  const threshold = Math.max(0, atRiskThresholdSeconds);
  const derived: SLAState =
    state ?? (remaining <= 0 ? 'breached' : remaining <= threshold ? 'at-risk' : 'on-track');

  const overdue = remaining < 0;
  const timeText = formatDuration(Math.abs(remaining));
  const prefix = overdue ? '-' : '';
  const hint = overdue ? 'over' : 'left';
  const numeralColor =
    derived === 'breached' ? colors.danger : derived === 'at-risk' ? colors.warn : colors.onSurface;
  const barColor =
    derived === 'breached' ? colors.danger : derived === 'at-risk' ? colors.warn : colors.primary;

  // Subtle progress hint toward the at-risk threshold window: empty when
  // comfortably on-track, filling as the deadline nears, full once breached.
  const progress = overdue ? 1 : threshold > 0 ? clamp(1 - remaining / threshold, 0, 1) : 0;

  return (
    <View
      accessible
      accessibilityRole="timer"
      accessibilityLabel={`${label}: ${overdue ? 'overdue by ' : ''}${timeText} ${overdue ? '' : 'remaining'}`}
      style={[
        {
          gap: tokens.spacing.sm,
          backgroundColor: colors.card,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          padding: tokens.spacing.md,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.06,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
          elevation: 2,
        },
        style,
      ]}
    >
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Text
          style={{
            color: numeralColor,
            fontSize: tokens.typography.scale['3xl'],
            fontWeight: '700',
            fontVariant: ['tabular-nums'],
          }}
        >
          {prefix}
          {timeText}
        </Text>
        <SLABadgeV4 state={derived} hint={hint} size="sm" />
      </View>
      {/* Subtle token progress hint toward the deadline. */}
      <View
        style={{
          height: 6,
          width: '100%',
          borderRadius: tokens.radius.full,
          backgroundColor: withAlpha(colors.onSurface, 0.1),
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            height: '100%',
            width: `${Math.round(progress * 100)}%`,
            borderRadius: tokens.radius.full,
            backgroundColor: barColor,
          }}
        />
      </View>
    </View>
  );
}
