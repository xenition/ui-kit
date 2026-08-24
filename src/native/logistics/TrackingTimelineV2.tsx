import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import {
  TRACKING_ORDER,
  TRACKING_META,
  trackingIndex,
  toneColor,
  type TrackingStage,
} from './internal';
import type { TrackingTimelineProps, TrackingEvent } from './TrackingTimeline';

/** Drop-in for {@link TrackingTimeline}: identical props, a distinct design. */
export type TrackingTimelineV2Props = TrackingTimelineProps;

/**
 * TrackingTimeline, alternate design **V2** — a *big vertical rail*. Larger
 * (32px) tone-filled nodes over a thick connector, with each stage's event
 * (time + detail) rendered inside its own tinted card beside the node so the
 * lifecycle **picked → in-transit → out-for-delivery → delivered** reads like a
 * courier tracking screen. Reached stages fill and carry a `✓`/glyph, current
 * is ringed and bold, upcoming are muted — always glyph + word, never color
 * alone (each node carries a redundant a11y label). An `exception` current
 * stage surfaces a danger head card. Empty/loading supported. No literal colors.
 */
export function TrackingTimelineV2({
  current,
  events,
  loading = false,
  style,
}: TrackingTimelineV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (loading) {
    return (
      <View accessibilityLabel="Loading tracking" style={[{ gap: tokens.spacing.lg }, style]}>
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }}>
            <View style={{ width: 32, height: 32, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200] }} />
            <View style={{ height: 40, flex: 1, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] }} />
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
        <View
          accessibilityRole="text"
          accessibilityLabel={`${TRACKING_META.exception.label}: needs attention`}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            padding: tokens.spacing.md,
            marginBottom: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(colors.danger, 0.12),
          }}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: tokens.radius.full,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.danger,
            }}
          >
            <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm, color: colors.onDanger }}>
              {TRACKING_META.exception.glyph}
            </Text>
          </View>
          <Text style={{ fontSize: tokens.typography.scale.base, fontWeight: '700', color: colors.danger }}>
            {TRACKING_META.exception.label}
          </Text>
        </View>
      ) : null}

      {TRACKING_ORDER.map((stage, i) => {
        const meta = TRACKING_META[stage];
        const tone = toneColor(colors, meta.tone);
        const reached = currentIdx >= 0 && i <= currentIdx;
        const isCurrent = i === currentIdx;
        const last = i === TRACKING_ORDER.length - 1;
        const ev = eventFor(stage);
        const connectorFilled = currentIdx >= 0 && i < currentIdx;

        return (
          <View
            key={stage}
            accessibilityRole="text"
            accessibilityLabel={`${meta.label}: ${reached ? (isCurrent ? 'current' : 'done') : 'upcoming'}`}
            style={{ flexDirection: 'row', gap: tokens.spacing.md, paddingBottom: last ? 0 : tokens.spacing.md }}
          >
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: tokens.radius.full,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: reached ? tone : 'transparent',
                  borderWidth: reached ? 0 : 2,
                  borderColor: isCurrent ? colors.primary : colors.border,
                }}
              >
                <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm, color: reached ? colors.surface : colors.muted }}>
                  {reached ? (last ? '✓' : meta.glyph) : i + 1}
                </Text>
              </View>
              {!last ? (
                <View
                  style={{
                    width: 3,
                    flex: 1,
                    marginTop: 2,
                    minHeight: tokens.spacing.lg,
                    borderRadius: tokens.radius.full,
                    backgroundColor: connectorFilled ? tone : colors.border,
                  }}
                />
              ) : null}
            </View>

            {/* Event card beside the node. */}
            <View
              style={{
                flex: 1,
                minWidth: 0,
                marginBottom: tokens.spacing.xs,
                padding: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: reached ? withAlpha(tone, 0.08) : tokens.ramps.neutral[100],
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
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
                <Text numberOfLines={2} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted, marginTop: 2 }}>
                  {ev.detail}
                </Text>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}
