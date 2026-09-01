import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { FeedingScheduleProps, MealType } from './FeedingSchedule';

/** Drop-in for {@link FeedingScheduleProps} — same props, the V4 "companion" design. */
export type FeedingScheduleV4Props = FeedingScheduleProps;

const MEAL_GLYPH: Record<MealType, string> = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🦴',
  treat: '🍬',
};

/**
 * FeedingSchedule — **V4** "companion" design. The warm, friendly take on a daily
 * feeding checklist: an elevated rounded card with a soft shadow, a title +
 * fed/total summary, and one restyled row per meal — the meal-time glyph in a
 * soft-primary tinted well, food + time/portion meta, and a tappable checkbox
 * that toggles served/fed. Same props/behavior as {@link FeedingScheduleProps};
 * every `meal.type` reads via a glyph and fed state via a check glyph + a11y
 * state (never color alone). Token-only colors via `useXenitionTheme()`; rows
 * keep ≥44px tap targets. Web/native parity.
 */
export function FeedingScheduleV4({
  meals,
  title = 'Feeding schedule',
  onToggle,
  emptyLabel = 'No meals scheduled',
  style,
}: FeedingScheduleV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const fedCount = meals.filter((m) => m.fed).length;

  const container: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.lg,
      gap: tokens.spacing.md,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
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
            <View
              style={{
                minHeight: 44,
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: withAlpha(colors.primary, 0.1),
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
              }}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: tokens.radius.full,
                  backgroundColor: colors.surface,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
                  {MEAL_GLYPH[meal.type] ?? '🍽️'}
                </Text>
              </View>
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
                  backgroundColor: fed ? colors.success : colors.surface,
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
