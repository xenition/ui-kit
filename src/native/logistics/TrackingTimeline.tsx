import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import {
  TRACKING_ORDER,
  TRACKING_META,
  trackingIndex,
  toneColor,
  type TrackingStage,
} from './internal';

export interface TrackingEvent {
  /** Which lifecycle stage this event belongs to. */
  stage: TrackingStage;
  /** Human timestamp (e.g. `Mon 9:14 AM`). */
  time?: string;
  /** Location / note line under the stage title. */
  detail?: string;
}

export interface TrackingTimelineProps {
  /** The current stage reached: picked → in-transit → out-for-delivery → delivered. */
  current: TrackingStage;
  /** Optional per-stage events (timestamps / locations) to annotate the rail. */
  events?: TrackingEvent[];
  /** Muted skeleton rail while the tracking record loads. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Vertical delivery tracking rail over the canonical stages
 * **picked → in-transit → out-for-delivery → delivered**. Reached stages fill
 * with their tone token and are marked with a `✓`/glyph; the current stage is
 * ringed; upcoming stages are muted. Status is carried by glyph + stage word
 * (and a redundant `accessibilityLabel` per node), never color alone. An
 * `exception` current stage recolors the reached head to danger. Empty/loading
 * states supported. No literal colors.
 */
export function TrackingTimeline({
  current,
  events,
  loading = false,
  style,
}: TrackingTimelineProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (loading) {
    return (
      <View accessibilityLabel="Loading tracking" style={[{ gap: tokens.spacing.md }, style]}>
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }}>
            <View style={{ width: 14, height: 14, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200] }} />
            <View style={{ height: 10, flex: 1, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
          </View>
        ))}
      </View>
    );
  }

  const isException = current === 'exception';
  const currentIdx = isException ? -1 : trackingIndex(current);

  const eventFor = (stage: TrackingStage): TrackingEvent | undefined =>
    Array.isArray(events) ? events.find((e) => e.stage === stage) : undefined;

  return (
    <View style={[{ flexDirection: 'column' }, style]}>
      {isException ? (
        <ExceptionHead />
      ) : null}
      {TRACKING_ORDER.map((stage, i) => {
        const meta = TRACKING_META[stage];
        const reached = currentIdx >= 0 && i <= currentIdx;
        const isCurrent = i === currentIdx;
        const last = i === TRACKING_ORDER.length - 1;
        const dotColor = reached ? toneColor(colors, meta.tone) : colors.border;
        const ev = eventFor(stage);

        return (
          <View
            key={stage}
            accessibilityRole="text"
            accessibilityLabel={`${meta.label}: ${reached ? (isCurrent ? 'current' : 'done') : 'upcoming'}`}
            style={{ flexDirection: 'row', gap: tokens.spacing.md, paddingBottom: last ? 0 : tokens.spacing.lg }}
          >
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: tokens.radius.full,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: reached ? dotColor : 'transparent',
                  borderWidth: reached ? 0 : 2,
                  borderColor: isCurrent ? colors.primary : colors.border,
                }}
              >
                <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, color: reached ? colors.surface : colors.muted }}>
                  {reached ? (last ? '✓' : meta.glyph) : i + 1}
                </Text>
              </View>
              {!last ? (
                <View
                  style={{
                    width: 2,
                    flex: 1,
                    marginTop: 2,
                    backgroundColor: currentIdx >= 0 && i < currentIdx ? toneColor(colors, meta.tone) : colors.border,
                  }}
                />
              ) : null}
            </View>

            <View style={{ flex: 1, minWidth: 0, paddingBottom: tokens.spacing.xs }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text
                  style={{
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: isCurrent ? '700' : '600',
                    color: reached ? colors.onSurface : colors.muted,
                  }}
                >
                  {meta.label}
                </Text>
                {ev?.time ? (
                  <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>{ev.time}</Text>
                ) : null}
              </View>
              {ev?.detail ? (
                <Text numberOfLines={2} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
                  {ev.detail}
                </Text>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );

  function ExceptionHead(): React.ReactElement {
    const meta = TRACKING_META.exception;
    return (
      <View
        accessibilityRole="text"
        accessibilityLabel={`${meta.label}: needs attention`}
        style={{ flexDirection: 'row', gap: tokens.spacing.md, paddingBottom: tokens.spacing.lg, alignItems: 'center' }}
      >
        <View
          style={{
            width: 22,
            height: 22,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.danger,
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, color: colors.onDanger }}>
            {meta.glyph}
          </Text>
        </View>
        <Text style={{ fontSize: tokens.typography.scale.sm, fontWeight: '700', color: colors.danger }}>
          {meta.label}
        </Text>
      </View>
    );
  }
}
