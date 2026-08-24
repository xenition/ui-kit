import * as React from 'react';
import { ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';

/** One day's forecast. */
export interface WeatherDay {
  /** Short day label, e.g. `'Mon'`. */
  day: string;
  /** Condition glyph/emoji, e.g. `'☀️'`. */
  glyph?: string;
  /** High temperature (already in the display unit). */
  high: number;
  /** Low temperature. */
  low?: number;
  /** Spoken condition, e.g. `'Sunny'` (used in the a11y label). */
  condition?: string;
}

export interface WeatherStripProps {
  /** Days to display, in order. */
  days: readonly WeatherDay[];
  /** Unit suffix appended to temperatures (default `'°'`). */
  unit?: string;
  /** Index of the day to emphasize (e.g. today). */
  highlightIndex?: number;
  /** Horizontal scroll (default `true`); set `false` to wrap in a fixed width. */
  scrollEnabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A horizontal multi-day forecast strip — one token-styled tile per day with a
 * condition glyph and high/low temperatures. The `highlightIndex` day gets a
 * primary-tinted tile and is announced as "today". Renders an empty hint when
 * there are no days. Token-only colors.
 */
export function WeatherStrip({
  days,
  unit = '°',
  highlightIndex,
  scrollEnabled = true,
  style,
}: WeatherStripProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (days.length === 0) {
    return <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No forecast available.</Text>;
  }

  const tiles = days.map((d, i) => {
    const active = i === highlightIndex;
    const bg = active ? colors.primary : colors.surface;
    const fg = active ? colors.onPrimary : colors.onSurface;
    const sub = active ? colors.onPrimary : colors.muted;
    return (
      <View
        key={`${d.day}-${i}`}
        accessible
        accessibilityLabel={`${d.day}${active ? ' today' : ''}, ${d.condition ? `${d.condition}, ` : ''}high ${d.high}${unit}${
          typeof d.low === 'number' ? `, low ${d.low}${unit}` : ''
        }`}
        style={{
          minWidth: 64,
          alignItems: 'center',
          gap: tokens.spacing.xs,
          borderWidth: 1,
          borderColor: active ? colors.primary : colors.border,
          backgroundColor: bg,
          borderRadius: tokens.radius.md,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
        }}
      >
        <Text style={{ color: sub, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{d.day}</Text>
        <Text style={{ fontSize: tokens.typography.scale.lg, color: fg }}>{d.glyph ?? '—'}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
          <Text style={{ color: fg, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {d.high}
            {unit}
          </Text>
          {typeof d.low === 'number' ? (
            <Text style={{ color: sub, fontSize: tokens.typography.scale.xs }}>
              {d.low}
              {unit}
            </Text>
          ) : null}
        </View>
      </View>
    );
  });

  if (!scrollEnabled) {
    return (
      <View style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, style]}>{tiles}</View>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: tokens.spacing.sm }}
      style={style}
    >
      {tiles}
    </ScrollView>
  );
}
