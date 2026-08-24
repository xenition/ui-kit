import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Badge } from '../primitives';
import { appearanceStyle } from '../primitives/internal/appearance';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import { withAlpha } from '../primitives/internal/color';
import type { MealCardProps, MealVariant, MealMacros } from './MealCard';

/** Drop-in for {@link MealCardProps} — same props, a different design. */
export type MealCardV2Props = MealCardProps;

type MacroTone = 'primary' | 'warn' | 'accent';

const MEAL_META: Record<MealVariant, { glyph: string; label: string; tint: keyof SemanticColors }> = {
  breakfast: { glyph: '🍳', label: 'Breakfast', tint: 'warn' },
  lunch: { glyph: '🥗', label: 'Lunch', tint: 'success' },
  dinner: { glyph: '🍽️', label: 'Dinner', tint: 'primary' },
  snack: { glyph: '🍎', label: 'Snack', tint: 'accent' },
};

const MACRO_META: { key: keyof MealMacros; label: string; tone: MacroTone }[] = [
  { key: 'protein', label: 'P', tone: 'primary' },
  { key: 'carbs', label: 'C', tone: 'warn' },
  { key: 'fat', label: 'F', tone: 'accent' },
];

/**
 * MealCard — **image-hero** design (v2). A tall tinted hero banner (standing in
 * for a dish photo) carries the meal glyph large and centered, with the meal
 * tag top-left and a calories chip top-right; macro chips (P/C/F) overlay the
 * bottom of the hero. The dish name sits below. Same props as
 * {@link MealCardProps}; token-only colors.
 */
export function MealCardV2({
  name,
  variant,
  calories,
  macros,
  time,
  onPress,
  appearance = 'classic',
  style,
}: MealCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = MEAL_META[variant];
  const heroTint = colors[meta.tint];
  const shownMacros = MACRO_META.filter((m) => macros?.[m.key] != null);
  const enter = useEnter();
  const press = usePressScale();

  const inner = (
    <View
      style={[
        {
          ...appearanceStyle(appearance, colors, tokens),
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <View
        style={{
          height: 116,
          backgroundColor: withAlpha(heroTint, 0.14),
          alignItems: 'center',
          justifyContent: 'center',
          padding: tokens.spacing.sm,
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: 44 }}>
          {meta.glyph}
        </Text>

        <View style={{ position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }}>
          <Badge tone="neutral" variant="soft" size="sm">
            {meta.label}
          </Badge>
        </View>
        {calories != null ? (
          <View style={{ position: 'absolute', top: tokens.spacing.sm, right: tokens.spacing.sm }}>
            <Badge tone="neutral" variant="solid" size="sm">
              {`${calories} kcal`}
            </Badge>
          </View>
        ) : null}

        {shownMacros.length ? (
          <View
            style={{
              position: 'absolute',
              bottom: tokens.spacing.sm,
              left: tokens.spacing.sm,
              flexDirection: 'row',
              gap: tokens.spacing.xs,
            }}
          >
            {shownMacros.map((m) => (
              <Badge key={m.key} tone={m.tone} variant="soft" size="sm">
                {`${m.label} ${macros?.[m.key]}g`}
              </Badge>
            ))}
          </View>
        ) : null}
      </View>

      <View style={{ padding: tokens.spacing.md, gap: 2 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', flex: 1 }}>
            {name}
          </Text>
          {time ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{time}</Text>
          ) : null}
        </View>
      </View>
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
