import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'treat';

const MEAL_GLYPH: Record<MealType, string> = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🦴',
  treat: '🍬',
};

export interface FeedingMeal {
  id?: string | number;
  /** Meal slot; drives the icon. */
  type: MealType;
  /** Scheduled time (already formatted), e.g. "7:30 AM". */
  time: string;
  /** Food name / description. */
  food: string;
  /** Portion label, e.g. "1 cup" or "150 g". */
  amount?: string;
  /** Whether this meal has been fed. */
  fed?: boolean;
}

export interface FeedingScheduleProps {
  /** Meals for the day, in order. */
  meals: FeedingMeal[];
  /** Optional section title. */
  title?: string;
  /** Toggle a meal's fed state. */
  onToggle?: (index: number, next: boolean) => void;
  /** Copy shown when there are no meals scheduled. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A daily feeding checklist: each row is a meal-time icon, food + portion, and a
 * tappable fed/not-fed checkbox. A summary chip counts fed vs. total. Renders an
 * explicit empty state. Fed state is conveyed by a check glyph + a11y state
 * (not color alone). Token-only colors.
 */
export function FeedingSchedule({
  meals,
  title = 'Feeding schedule',
  onToggle,
  emptyLabel = 'No meals scheduled',
  style,
}: FeedingScheduleProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const fedCount = meals.filter((m) => m.fed).length;

  const container: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.lg,
      gap: tokens.spacing.md,
    },
    style,
  ];

  if (meals.length === 0) {
    return (
      <View accessibilityLabel={emptyLabel} style={container}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{title}</Text>
        <View style={{ alignItems: 'center', paddingVertical: tokens.spacing.lg, gap: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
            🍽️
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{title}</Text>
        <Text style={{ color: fedCount === meals.length ? colors.success : colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {fedCount}/{meals.length} fed
        </Text>
      </View>

      <View style={{ gap: tokens.spacing.sm }}>
        {meals.map((meal, i) => {
          const fed = meal.fed ?? false;
          const row = (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
              <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
                {MEAL_GLYPH[meal.type] ?? '🍽️'}
              </Text>
              <View style={{ flex: 1, gap: 2 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: '600',
                    textDecorationLine: fed ? 'line-through' : 'none',
                  }}
                >
                  {meal.food}
                </Text>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                  {meal.time}
                  {meal.amount ? ` · ${meal.amount}` : ''}
                </Text>
              </View>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: tokens.radius.full,
                  borderWidth: 1,
                  borderColor: fed ? colors.success : colors.border,
                  backgroundColor: fed ? colors.success : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {fed ? (
                  <Text allowFontScaling={false} style={{ color: colors.onSuccess, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
                    ✓
                  </Text>
                ) : null}
              </View>
            </View>
          );

          if (!onToggle) {
            return (
              <View key={meal.id ?? i} accessibilityLabel={`${meal.food}, ${meal.time}, ${fed ? 'fed' : 'not fed'}`}>
                {row}
              </View>
            );
          }
          return (
            <Pressable
              key={meal.id ?? i}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: fed }}
              accessibilityLabel={`${meal.food}, ${meal.time}, ${fed ? 'fed' : 'not fed'}`}
              onPress={() => onToggle(i, !fed)}
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
              {row}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
