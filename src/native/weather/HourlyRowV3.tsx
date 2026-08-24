import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { clamp, conditionGlyph, conditionLabel } from './weather-utils';
import type { HourlyRowProps } from './HourlyRow';

/** Drop-in for {@link HourlyRowProps} — same props, a different design. */
export type HourlyRowV3Props = HourlyRowProps;

/**
 * HourlyRow — **dense compact strip** design (v3). A tight horizontal scroll of
 * narrow columns: a small time caption, a small condition glyph, the temperature,
 * and (optionally) a minimal precip figure. Sized for cramming many hours into a
 * single dashboard line. The condition is a glyph AND its text label (exposed to
 * screen readers) — never color alone. Renders a muted empty state when `hours`
 * is empty. Same props as {@link HourlyRowProps}; token-only colors.
 */
export function HourlyRowV3({
  hours,
  unit = '°',
  showPrecip = true,
  onSelectHour,
  emptyLabel = 'No hourly data',
  style,
}: HourlyRowV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (hours.length === 0) {
    return (
      <Card variant="outlined" style={style} accessibilityRole="summary">
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}>
          {emptyLabel}
        </Text>
      </Card>
    );
  }

  return (
    <Card variant="outlined" padding="sm" style={style}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: tokens.spacing.sm }}>
        {hours.map((hour, index) => {
          const label = conditionLabel(hour.condition);
          const glyph = conditionGlyph(hour.condition);
          const precip = hour.precip != null ? clamp(hour.precip, 0, 100) : null;
          const a11y = `${hour.time}, ${label}${hour.temperature != null ? `, ${hour.temperature}${unit}` : ''}`;
          return (
            <View
              key={`${hour.time}-${index}`}
              accessibilityRole={onSelectHour ? 'button' : 'text'}
              accessibilityLabel={a11y}
              onTouchEnd={onSelectHour ? () => onSelectHour(hour, index) : undefined}
              style={{ alignItems: 'center', gap: 2, minWidth: 40 }}
            >
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{hour.time}</Text>
              <Icon glyph={glyph} size="sm" accessibilityLabel={label} />
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
                {hour.temperature != null ? `${hour.temperature}${unit}` : '—'}
              </Text>
              {showPrecip && precip != null ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{precip}%</Text>
              ) : null}
            </View>
          );
        })}
      </ScrollView>
    </Card>
  );
}
