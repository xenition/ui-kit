import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { withAlpha, clamp } from './internal/format';

export type TouPeriod = 'off-peak' | 'mid-peak' | 'on-peak';

export interface TouBlock {
  /** Block start, hour of day (0–24). */
  startHour: number;
  /** Block end, hour of day (0–24). */
  endHour: number;
  /** Rate period — drives the segment color and legend entry. */
  period: TouPeriod;
}

export interface TimeOfUseScheduleProps {
  /** Card title (default "Time of use"). */
  title?: string;
  /** Rate blocks across the 24h day. */
  blocks: TouBlock[];
  /** Current hour of day (0–24) — draws a thin "now" marker when supplied. */
  nowHour?: number;
  style?: StyleProp<ViewStyle>;
}

const PERIOD_LABEL: Record<TouPeriod, string> = {
  'off-peak': 'Off-peak',
  'mid-peak': 'Mid-peak',
  'on-peak': 'On-peak',
};

const PERIOD_ORDER: TouPeriod[] = ['off-peak', 'mid-peak', 'on-peak'];

const TICKS = [0, 6, 12, 18, 24];

/**
 * A clean-card time-of-use day bar. A 24-hour horizontal track is split into
 * rate blocks, each segment sized by its share of the day and colored by rate
 * period — off-peak → `success`, mid-peak → `warn`, on-peak → `danger` — so the
 * color is meaningful, not decorative. A thin `onSurface` "now" marker locates
 * the current hour, hour ticks anchor the axis, and a legend names each period
 * present with its dot + tone. Purely presentational; every color traces to a
 * token.
 */
export function TimeOfUseSchedule({
  title = 'Time of use',
  blocks,
  nowHour,
  style,
}: TimeOfUseScheduleProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const periodColor = (p: TouPeriod): string => {
    const base = p === 'off-peak' ? colors.success : p === 'mid-peak' ? colors.warn : colors.danger;
    return withAlpha(base, 0.85);
  };

  const card = {
    backgroundColor: colors.card,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  } as const;

  const present = PERIOD_ORDER.filter((p) => blocks.some((b) => b.period === p));
  const nowPct = nowHour != null ? clamp(nowHour, 0, 24) / 24 : null;

  return (
    <View accessibilityLabel={title} style={[card, style]}>
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
        {title}
      </Text>

      <View style={{ marginTop: tokens.spacing.md }}>
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{
            flexDirection: 'row',
            height: 16,
            borderRadius: tokens.radius.full,
            overflow: 'hidden',
            backgroundColor: colors.muted,
          }}
        >
          {blocks.map((b, i) => {
            const span = clamp(b.endHour - b.startHour, 0, 24);
            return (
              <View
                key={`${b.period}-${b.startHour}-${i}`}
                style={{ flex: span, backgroundColor: periodColor(b.period) }}
              />
            );
          })}
        </View>

        {nowPct != null ? (
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{
              position: 'absolute',
              left: `${nowPct * 100}%`,
              top: 0,
              width: 2,
              height: 16,
              backgroundColor: colors.onSurface,
            }}
          />
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: tokens.spacing.xs }}>
        {TICKS.map((t) => (
          <Text key={t} style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
            {t}
          </Text>
        ))}
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md, marginTop: tokens.spacing.md }}>
        {present.map((p) => (
          <View key={p} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: tokens.radius.full,
                backgroundColor: periodColor(p),
              }}
            />
            <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {PERIOD_LABEL[p]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
