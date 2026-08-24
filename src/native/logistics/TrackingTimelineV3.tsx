import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import {
  TRACKING_ORDER,
  TRACKING_META,
  trackingIndex,
  toneColor,
} from './internal';
import type { TrackingTimelineProps } from './TrackingTimeline';

/** Drop-in for {@link TrackingTimeline}: identical props, a distinct design. */
export type TrackingTimelineV3Props = TrackingTimelineProps;

/**
 * TrackingTimeline, alternate design **V3** — a *compact horizontal step bar*.
 * The four lifecycle stages **picked → in-transit → out-for-delivery →
 * delivered** sit left-to-right as small nodes joined by connector segments
 * that fill with tone once passed; each stage's glyph sits in the node and its
 * word sits below, with the current stage bolded — glyph + word, never color
 * alone (each node carries a redundant a11y label). The current stage's event
 * time/detail is summarised in a caption underneath. An `exception` current
 * stage collapses to a danger strip. Empty/loading supported. No literal colors.
 */
export function TrackingTimelineV3({
  current,
  events,
  loading = false,
  style,
}: TrackingTimelineV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (loading) {
    return (
      <View accessibilityLabel="Loading tracking" style={[{ gap: tokens.spacing.sm }, style]}>
        <View style={{ height: 24, width: '100%', borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[100] }} />
        <View style={{ height: 10, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
      </View>
    );
  }

  const isException = current === 'exception';

  if (isException) {
    const meta = TRACKING_META.exception;
    return (
      <View
        accessibilityRole="text"
        accessibilityLabel={`${meta.label}: needs attention`}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: tokens.spacing.sm,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.danger, 0.12),
          },
          style,
        ]}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm, color: colors.danger }}>
          {meta.glyph}
        </Text>
        <Text style={{ fontSize: tokens.typography.scale.sm, fontWeight: '700', color: colors.danger }}>
          {meta.label}
        </Text>
      </View>
    );
  }

  const currentIdx = trackingIndex(current);
  const currentEvent = Array.isArray(events) ? events.find((e) => e.stage === current) : undefined;
  const caption = [currentEvent?.time, currentEvent?.detail].filter(Boolean).join(' · ');

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        {TRACKING_ORDER.map((stage, i) => {
          const meta = TRACKING_META[stage];
          const tone = toneColor(colors, meta.tone);
          const reached = currentIdx >= 0 && i <= currentIdx;
          const isCurrent = i === currentIdx;
          const last = i === TRACKING_ORDER.length - 1;
          const connectorFilled = currentIdx >= 0 && i < currentIdx;

          return (
            <View key={stage} style={{ flex: 1, alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' as `${number}%` }}>
                {/* left half connector (hidden on first) */}
                <View
                  style={{
                    flex: 1,
                    height: 3,
                    borderRadius: tokens.radius.full,
                    backgroundColor: i === 0 ? 'transparent' : reached ? tone : colors.border,
                  }}
                />
                <View
                  accessibilityRole="text"
                  accessibilityLabel={`${meta.label}: ${reached ? (isCurrent ? 'current' : 'done') : 'upcoming'}`}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: reached ? tone : 'transparent',
                    borderWidth: reached ? 0 : 2,
                    borderColor: isCurrent ? colors.primary : colors.border,
                  }}
                >
                  <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, color: reached ? colors.surface : colors.muted }}>
                    {reached ? (last ? '✓' : meta.glyph) : i + 1}
                  </Text>
                </View>
                {/* right half connector (hidden on last) */}
                <View
                  style={{
                    flex: 1,
                    height: 3,
                    borderRadius: tokens.radius.full,
                    backgroundColor: last ? 'transparent' : connectorFilled ? tone : colors.border,
                  }}
                />
              </View>
              <Text
                numberOfLines={2}
                style={{
                  marginTop: tokens.spacing.xs,
                  textAlign: 'center',
                  fontSize: tokens.typography.scale.xs,
                  fontWeight: isCurrent ? '700' : '500',
                  color: reached ? colors.onSurface : colors.muted,
                }}
              >
                {meta.label}
              </Text>
            </View>
          );
        })}
      </View>

      {caption ? (
        <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
          {caption}
        </Text>
      ) : null}
    </View>
  );
}
