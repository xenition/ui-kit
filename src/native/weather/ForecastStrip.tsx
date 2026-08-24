import * as React from 'react';
import { Pressable, ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import {
  conditionGlyph,
  conditionLabel,
  type WeatherCondition,
} from './weather-utils';

export interface ForecastDay {
  /** Short day label (e.g. `'Mon'`) or a date string. */
  label: string;
  condition?: WeatherCondition;
  high?: number;
  low?: number;
  /** Chance of precipitation, 0–100. */
  precip?: number;
}

/** `scroll` = horizontal strip; `list` = full-width stacked rows. */
export type ForecastStripVariant = 'scroll' | 'list';

export interface ForecastStripProps {
  /** The days to render (7-day is the common case, but any length works). */
  days: ForecastDay[];
  /** Unit suffix appended to temperatures. Default `'°'`. */
  unit?: string;
  /** Index of the currently-selected day (controlled highlight). */
  selectedIndex?: number;
  /** Fired with the tapped day + its index. */
  onSelectDay?: (day: ForecastDay, index: number) => void;
  /** Layout. Default `'scroll'`. */
  variant?: ForecastStripVariant;
  /** Message shown when `days` is empty. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Multi-day forecast (typically 7). Each day is a tappable cell showing its
 * label, the condition as a glyph + short text, and high/low temps; an optional
 * precip chance sits underneath. `variant='scroll'` lays the days out in a
 * horizontal `ScrollView`; `'list'` stacks full-width rows. The selected day is
 * highlighted with a token tint (plus a bold label — never color alone). Renders
 * a muted empty state when `days` is empty. All colors/sizes come from the
 * compiled theme tokens via `useXenitionTheme()` — no literal colors.
 */
export function ForecastStrip({
  days,
  unit = '°',
  selectedIndex,
  onSelectDay,
  variant = 'scroll',
  emptyLabel = 'No forecast available',
  style,
}: ForecastStripProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (days.length === 0) {
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

  const renderCell = (day: ForecastDay, index: number): React.ReactElement => {
    const selected = index === selectedIndex;
    const label = conditionLabel(day.condition);
    const glyph = conditionGlyph(day.condition);
    const isRow = variant === 'list';

    return (
      <Pressable
        key={`${day.label}-${index}`}
        accessibilityRole="button"
        accessibilityState={{ selected }}
        accessibilityLabel={`${day.label}, ${label}${
          day.high != null ? `, high ${day.high}${unit}` : ''
        }${day.low != null ? `, low ${day.low}${unit}` : ''}`}
        onPress={onSelectDay ? () => onSelectDay(day, index) : undefined}
        style={({ pressed }) => [
          {
            alignItems: isRow ? 'stretch' : 'center',
            flexDirection: isRow ? 'row' : 'column',
            gap: tokens.spacing.xs,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            minWidth: isRow ? undefined : 72,
            borderRadius: tokens.radius.md,
            backgroundColor: selected
              ? tokens.ramps.primary[50]
              : pressed
                ? tokens.ramps.neutral[50]
                : 'transparent',
            borderWidth: selected ? 1 : 0,
            borderColor: selected ? colors.primary : 'transparent',
          },
        ]}
      >
        <Text
          style={{
            color: selected ? colors.primary : colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            fontWeight: selected ? '700' : '600',
            flex: isRow ? 1 : undefined,
          }}
        >
          {day.label}
        </Text>
        <Icon glyph={glyph} size="lg" accessibilityLabel={label} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
          }}
        >
          <Text
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale.sm,
              fontWeight: '600',
            }}
          >
            {day.high != null ? `${day.high}${unit}` : '—'}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {day.low != null ? `${day.low}${unit}` : '—'}
          </Text>
        </View>
        {day.precip != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            💧 {day.precip}%
          </Text>
        ) : null}
      </Pressable>
    );
  };

  if (variant === 'list') {
    return (
      <Card variant="outlined" padding="sm" style={style}>
        <View style={{ gap: tokens.spacing.xs }}>{days.map(renderCell)}</View>
      </Card>
    );
  }

  return (
    <Card variant="outlined" padding="sm" style={style}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: tokens.spacing.xs }}
      >
        {days.map(renderCell)}
      </ScrollView>
    </Card>
  );
}
