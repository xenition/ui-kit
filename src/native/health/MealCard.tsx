import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type MealVariant = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface MealMacros {
  /** Protein in grams. */
  protein?: number;
  /** Carbohydrates in grams. */
  carbs?: number;
  /** Fat in grams. */
  fat?: number;
}

interface MealMeta {
  glyph: string;
  label: string;
}

const MEAL_META: Record<MealVariant, MealMeta> = {
  breakfast: { glyph: '🍳', label: 'Breakfast' },
  lunch: { glyph: '🥗', label: 'Lunch' },
  dinner: { glyph: '🍽️', label: 'Dinner' },
  snack: { glyph: '🍎', label: 'Snack' },
};

const MACRO_META: { key: keyof MealMacros; label: string; color: keyof SemanticColors }[] = [
  { key: 'protein', label: 'Protein', color: 'primary' },
  { key: 'carbs', label: 'Carbs', color: 'warn' },
  { key: 'fat', label: 'Fat', color: 'accent' },
];

export interface MealCardProps {
  /** Dish / entry name, e.g. "Greek yogurt bowl". */
  name: string;
  /** Which meal slot; drives the icon and tag label. */
  variant: MealVariant;
  /** Total calories. */
  calories?: number;
  /** Macro breakdown in grams. */
  macros?: MealMacros;
  /** Optional time label, e.g. "8:30 AM". */
  time?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A logged-meal card: meal-slot icon + tag, dish name, calories, and a
 * color-coded protein / carbs / fat macro strip. Macros with no value are
 * omitted. Pressable when `onPress` is set. Token-only colors.
 */
export function MealCard({
  name,
  variant,
  calories,
  macros,
  time,
  onPress,
  style,
}: MealCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = MEAL_META[variant];
  const shownMacros = MACRO_META.filter((m) => macros?.[m.key] != null);

  const inner = (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
          {meta.glyph}
        </Text>
        <View style={{ flex: 1, gap: 2 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {meta.label}
            </Text>
            {time ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{time}</Text>
            ) : null}
          </View>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            {name}
          </Text>
        </View>
      </View>

      {calories != null ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
          {calories} <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>kcal</Text>
        </Text>
      ) : null}

      {shownMacros.length ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.lg }}>
          {shownMacros.map((m) => (
            <View key={m.key} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <View style={{ width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: colors[m.color] }} />
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {m.label} {macros?.[m.key]}g
              </Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );

  const a11y = `${meta.label}: ${name}${calories != null ? `, ${calories} calories` : ''}`;
  if (!onPress) {
    return <View accessibilityLabel={a11y}>{inner}</View>;
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11y}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {inner}
    </Pressable>
  );
}
