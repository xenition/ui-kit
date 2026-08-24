import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';

export interface ProgressCalendarDay {
  /** Day-of-month, 1–31. */
  day: number;
  /**
   * Completion intensity 0–3 (0 = none, 3 = fully met). Higher levels get a
   * denser accent tint, giving a heatmap-style month view.
   */
  level?: 0 | 1 | 2 | 3;
  /** Mark today's cell with a ring. */
  today?: boolean;
}

export type ProgressCalendarTone = 'primary' | 'accent' | 'success';

const TONE_KEY: Record<ProgressCalendarTone, keyof SemanticColors> = {
  primary: 'primary',
  accent: 'accent',
  success: 'success',
};

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;
const LEVEL_ALPHA = [0, 0.28, 0.6, 1] as const;

export interface ProgressCalendarProps {
  /** Month title, e.g. "August". */
  title?: string;
  /**
   * The days to render, in order. `startWeekday` positions the first day
   * (0 = Sunday). Missing days are simply omitted.
   */
  days: ProgressCalendarDay[];
  /** Weekday index (0=Sun…6=Sat) the first day falls on. Default 0. */
  startWeekday?: number;
  /** Accent tone for completed cells. Default `'primary'`. */
  tone?: ProgressCalendarTone;
  /** Show the weekday header row. Default true. */
  showWeekdays?: boolean;
  /** Fires with the tapped day. */
  onSelectDay?: (day: ProgressCalendarDay) => void;
  /** Note shown when `days` is empty. Default "No activity this month.". */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A month completion calendar: a weekday header and a 7-column grid of day
 * cells tinted by a 0–3 completion `level` (a soft heatmap), with today's cell
 * ringed. Completion is conveyed by fill density plus the a11y label, never
 * color alone; leading blanks come from `startWeekday`. Empty `days` shows a
 * note. Token-only colors (semantic slots + a `withAlpha` tint).
 */
export function ProgressCalendar({
  title,
  days,
  startWeekday = 0,
  tone = 'primary',
  showWeekdays = true,
  onSelectDay,
  emptyLabel = 'No activity this month.',
  style,
}: ProgressCalendarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const accent = colors[TONE_KEY[tone] ?? 'primary'];

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
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      </View>
    );
  }

  // Build a flat cell list: leading blanks, then one cell per day.
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
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{w}</Text>
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
          const bg = filled ? withAlpha(accent, alpha) : withAlpha(colors.muted, 0.1);
          const fg = level >= 2 ? colors.onPrimary : colors.onSurface;
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
                borderColor: cell.today ? accent : 'transparent',
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
