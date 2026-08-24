import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { appearanceStyle } from '../primitives/internal/appearance';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import type { MealCardProps, MealVariant, MealMacros } from './MealCard';

/** Drop-in for {@link MealCardProps} — same props, a different design. */
export type MealCardV3Props = MealCardProps;

type MacroTone = 'primary' | 'warn' | 'accent';

const MEAL_META: Record<MealVariant, { glyph: string; label: string }> = {
  breakfast: { glyph: '🍳', label: 'Breakfast' },
  lunch: { glyph: '🥗', label: 'Lunch' },
  dinner: { glyph: '🍽️', label: 'Dinner' },
  snack: { glyph: '🍎', label: 'Snack' },
};

const MACRO_META: { key: keyof MealMacros; label: string; tone: MacroTone }[] = [
  { key: 'protein', label: 'Protein', tone: 'primary' },
  { key: 'carbs', label: 'Carbs', tone: 'warn' },
  { key: 'fat', label: 'Fat', tone: 'accent' },
];

/** Resolve a fill semantic key to its contrast-safe `*Text` sibling when one exists. */
function textTone(colors: SemanticColors, key: keyof SemanticColors): string {
  return (colors as unknown as Record<string, string>)[`${key}Text`] ?? colors[key];
}

/**
 * MealCard — **dense macro-bar line** design (v3). A tight two-row entry: glyph,
 * dish name, and calories value-first on the top line; a single stacked
 * proportional macro bar (protein / carbs / fat, by grams) with `Ng` counts
 * beneath. Ideal for long food logs. Same props as {@link MealCardProps};
 * token-only colors.
 */
export function MealCardV3({
  name,
  variant,
  calories,
  macros,
  time,
  onPress,
  appearance = 'classic',
  style,
}: MealCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = MEAL_META[variant];
  const shownMacros = MACRO_META.filter((m) => macros?.[m.key] != null);
  const total = shownMacros.reduce((sum, m) => sum + Math.max(macros?.[m.key] ?? 0, 0), 0);
  const enter = useEnter();
  const press = usePressScale();

  const inner = (
    <View
      style={[
        {
          ...(appearance !== 'classic'
            ? { ...appearanceStyle(appearance, colors, tokens), borderRadius: tokens.radius.md }
            : null),
          gap: tokens.spacing.xs,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>
          {meta.glyph}
        </Text>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600', flex: 1 }}>
          {name}
        </Text>
        {calories != null ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
            {calories}
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '400' }}> kcal</Text>
          </Text>
        ) : time ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{time}</Text>
        ) : null}
      </View>

      {shownMacros.length && total > 0 ? (
        <>
          <View
            accessibilityRole="image"
            accessibilityLabel={`Macros: ${shownMacros.map((m) => `${m.label} ${macros?.[m.key]}g`).join(', ')}`}
            style={{
              flexDirection: 'row',
              height: 6,
              borderRadius: tokens.radius.full,
              overflow: 'hidden',
              backgroundColor: colors.border,
            }}
          >
            {shownMacros.map((m) => {
              const grams = Math.max(macros?.[m.key] ?? 0, 0);
              return (
                <View
                  key={m.key}
                  style={{ flex: grams / total, backgroundColor: colors[m.tone] }}
                />
              );
            })}
          </View>
          <View style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
            {shownMacros.map((m) => (
              <Text key={m.key} style={{ color: textTone(colors, m.tone), fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                {m.label} {macros?.[m.key]}g
              </Text>
            ))}
          </View>
        </>
      ) : null}
    </View>
  );

  const a11y = `${meta.label}: ${name}${calories != null ? `, ${calories} calories` : ''}`;
  if (!onPress) {
    return (
      <Animated.View accessibilityLabel={a11y} style={{ opacity: enter.opacity, transform: enter.transform }}>
        {inner}
      </Animated.View>
    );
  }
  return (
    <Animated.View style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11y}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
      >
        {inner}
      </Pressable>
    </Animated.View>
  );
}
