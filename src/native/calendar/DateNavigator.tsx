import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Segmented } from '../primitives/Segmented';
import type { CalendarViewMode } from './types';

export interface DateNavigatorProps {
  /** The period label to show between the chevrons (e.g. "August 2026"). */
  title: string;
  /** Fires when the previous chevron is tapped. */
  onPrev?: () => void;
  /** Fires when the next chevron is tapped. */
  onNext?: () => void;
  /** Shows a "Today" reset button when provided. */
  onToday?: () => void;
  /** Active view; renders a month/week/day segmented control when set. */
  view?: CalendarViewMode;
  /** Fires when a different view segment is picked. */
  onViewChange?: (view: CalendarViewMode) => void;
  /** Restrict which view segments appear (defaults to all three). */
  views?: CalendarViewMode[];
  style?: StyleProp<ViewStyle>;
}

const VIEW_LABEL: Record<CalendarViewMode, string> = {
  month: 'Month',
  week: 'Week',
  day: 'Day',
};

/**
 * The header control strip for any scheduling surface: prev/next chevrons
 * around a period `title`, an optional "Today" reset, and an optional
 * month/week/day `Segmented`. Purely presentational — the host owns the dates
 * and recomputes `title` on each change. Token colors only.
 */
export function DateNavigator({
  title,
  onPrev,
  onNext,
  onToday,
  view,
  onViewChange,
  views = ['month', 'week', 'day'],
  style,
}: DateNavigatorProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const chevron = (label: string, symbol: string, onPress?: () => void): React.ReactElement => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={onPress == null}
      onPress={onPress}
      style={({ pressed }) => ({
        width: tokens.spacing.xl,
        height: tokens.spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: tokens.radius.sm,
        borderWidth: 1,
        borderColor: colors.border,
        opacity: onPress == null ? 0.4 : pressed ? 0.7 : 1,
      })}
    >
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg }}>{symbol}</Text>
    </Pressable>
  );

  return (
    <View
      accessibilityRole="toolbar"
      style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexShrink: 1 }}>
        {chevron('Previous', '‹', onPrev)}
        {chevron('Next', '›', onNext)}
        <Text
          numberOfLines={1}
          style={{
            marginLeft: tokens.spacing.xs,
            color: colors.onSurface,
            fontSize: tokens.typography.scale.lg,
            fontWeight: '700',
            flexShrink: 1,
          }}
        >
          {title}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {onToday ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go to today"
            onPress={onToday}
            style={({ pressed }) => ({
              paddingHorizontal: tokens.spacing.sm,
              paddingVertical: tokens.spacing.xs,
              borderRadius: tokens.radius.sm,
              borderWidth: 1,
              borderColor: colors.border,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              Today
            </Text>
          </Pressable>
        ) : null}
        {view != null && onViewChange != null ? (
          <Segmented
            value={view}
            onChange={(v) => onViewChange(v as CalendarViewMode)}
            options={views.map((v) => ({ value: v, label: VIEW_LABEL[v] }))}
          />
        ) : null}
      </View>
    </View>
  );
}
