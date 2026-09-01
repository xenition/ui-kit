import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import {
  ProgressCalendar,
  type ProgressCalendarProps,
  type ProgressCalendarDay,
} from './ProgressCalendar';

export type ProgressCalendarV4Props = ProgressCalendarProps;

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;
// Calm heatmap: level 0..3 → primary tint alpha.
const LEVEL_ALPHA = [0, 0.2, 0.45, 0.75] as const;

/**
 * ProgressCalendarV4 — the calm redesign of {@link ProgressCalendar}. Same props,
 * defaults, weekday header, onSelectDay, and empty state. Only the visuals
 * change: completed cells use a soft primary-tint heatmap, text stays
 * onSurface/mutedText, and today's cell gets a primary ring.
 */
export function ProgressCalendarV4({
  title,
  days,
  startWeekday = 0,
  showWeekdays = true,
  onSelectDay,
  emptyLabel = 'No activity this month.',
  style,
}: ProgressCalendarV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const containerStyle: ViewStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.sm,
  };

  if (days.length === 0) {
    return (
      <View accessibilityLabel={emptyLabel} style={[containerStyle, style]}>
        {title ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {title}
          </Text>
        ) : null}
        <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      </View>
    );
  }

  const lead = ((startWeekday % 7) + 7) % 7;
  const cells: (ProgressCalendarDay | null)[] = [
    ...Array.from({ length: lead }, () => null),
    ...days,
  ];

  return (
    <View style={[containerStyle, style]}>
      {title ? (
        <Text
          accessibilityRole="header"
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {title}
        </Text>
      ) : null}

      {showWeekdays ? (
        <View style={{ flexDirection: 'row' }}>
          {WEEKDAYS.map((w, i) => (
            <View key={i} style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                {w}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {cells.map((cell, i) => {
          if (cell == null) {
            return <View key={`blank-${i}`} style={{ width: `${100 / 7}%`, aspectRatio: 1, padding: 2 }} />;
          }
          const level = Math.min(Math.max(cell.level ?? 0, 0), 3) as 0 | 1 | 2 | 3;
          const alpha = LEVEL_ALPHA[level] ?? 0;
          const filled = level > 0;
          const bg = filled ? withAlpha(colors.primary, alpha) : withAlpha(colors.muted, 0.1);
          const fg = level >= 2 ? colors.onSurface : colors.mutedText;
          const label = `Day ${cell.day}, ${
            level === 0 ? 'no activity' : `level ${level}`
          }${cell.today ? ', today' : ''}`;

          const inner = (
            <View
              style={{
                flex: 1,
                borderRadius: tokens.radius.sm,
                backgroundColor: bg,
                borderWidth: cell.today ? 2 : 0,
                borderColor: cell.today ? colors.primary : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text allowFontScaling={false} style={{ color: fg, fontSize: tokens.typography.scale.xs }}>
                {cell.day}
              </Text>
            </View>
          );

          return (
            <View key={`day-${cell.day}-${i}`} style={{ width: `${100 / 7}%`, aspectRatio: 1, padding: 2 }}>
              {onSelectDay ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={label}
                  onPress={() => onSelectDay(cell)}
                  style={({ pressed }) => ({ flex: 1, opacity: pressed ? 0.7 : 1 })}
                >
                  {inner}
                </Pressable>
              ) : (
                <View accessibilityLabel={label} style={{ flex: 1 }}>
                  {inner}
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}
