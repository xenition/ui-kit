import * as React from 'react';
import { ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import {
  clamp,
  conditionGlyph,
  conditionLabel,
  type WeatherCondition,
} from './weather-utils';

export interface HourlyPoint {
  /** Hour label (e.g. `'3 PM'` or `'15:00'`). */
  time: string;
  condition?: WeatherCondition;
  temperature?: number;
  /** Chance of precipitation, 0–100. */
  precip?: number;
}

export interface HourlyRowProps {
  /** Per-hour points, rendered left→right in a horizontal scroll. */
  hours: HourlyPoint[];
  /** Unit suffix appended to temperatures. Default `'°'`. */
  unit?: string;
  /** Show the precip-chance line under each hour. Default `true`. */
  showPrecip?: boolean;
  /** Fired with the tapped hour + its index. */
  onSelectHour?: (hour: HourlyPoint, index: number) => void;
  /** Message shown when `hours` is empty. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Horizontal hour-by-hour timeline: each column shows the time, the condition as
 * a glyph + label, the temperature, and (optionally) precip chance. Purely a
 * `ScrollView` of token-styled columns — the condition is conveyed by glyph and
 * text, never color alone. Renders a muted empty state when `hours` is empty.
 * All colors/sizes come from the compiled theme tokens via `useXenitionTheme()`
 * — no literal colors.
 */
export function HourlyRow({
  hours,
  unit = '°',
  showPrecip = true,
  onSelectHour,
  emptyLabel = 'No hourly data',
  style,
}: HourlyRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (hours.length === 0) {
    return (
      <Card variant="outlined" style={style} accessibilityRole="summary">
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.sm,
            textAlign: 'center',
          }}
        >
          {emptyLabel}
        </Text>
      </Card>
    );
  }

  return (
    <Card variant="outlined" padding="sm" style={style}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: tokens.spacing.md }}
      >
        {hours.map((hour, index) => {
          const label = conditionLabel(hour.condition);
          const glyph = conditionGlyph(hour.condition);
          return (
            <View
              key={`${hour.time}-${index}`}
              accessibilityRole={onSelectHour ? 'button' : 'text'}
              accessibilityLabel={`${hour.time}, ${label}${
                hour.temperature != null ? `, ${hour.temperature}${unit}` : ''
              }`}
              onTouchEnd={onSelectHour ? () => onSelectHour(hour, index) : undefined}
              style={{ alignItems: 'center', gap: tokens.spacing.xs, minWidth: 56 }}
            >
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {hour.time}
              </Text>
              <Icon glyph={glyph} size="lg" accessibilityLabel={label} />
              <Text
                style={{
                  color: colors.onSurface,
                  fontSize: tokens.typography.scale.base,
                  fontWeight: '700',
                }}
              >
                {hour.temperature != null ? `${hour.temperature}${unit}` : '—'}
              </Text>
              {showPrecip && hour.precip != null ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                  💧 {clamp(hour.precip, 0, 100)}%
                </Text>
              ) : null}
            </View>
          );
        })}
      </ScrollView>
    </Card>
  );
}
