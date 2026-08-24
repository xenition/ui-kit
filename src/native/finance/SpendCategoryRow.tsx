import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Icon } from '../primitives';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';
import { usePressScale } from '../primitives/internal/motion';
import { MiniBar } from '../charts';
import { MoneyAmount } from './MoneyAmount';

export interface SpendCategoryRowProps {
  /** Category name (e.g. "Groceries"). */
  category: string;
  /** Amount spent in this category, in integer **cents**. */
  amountCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Share of total spend, `0`–`1`; drives the inline bar width and the `%` chip. */
  share?: number;
  /** Leading glyph/emoji (e.g. `'🛒'`). */
  icon?: string;
  /** Theme color slot for the glyph + bar (default `primary`). */
  color?: keyof SemanticColors;
  /** Fires on row press. */
  onPress?: () => void;
  /**
   * Surface treatment (visual-diversity preset). Defaults to `classic` — the
   * historical borderless row, so this is opt-in only.
   */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

/**
 * A spend-by-category row: tinted glyph, category name over a share bar, and a
 * right-aligned amount + percentage. `share` is a `0–1` fraction (guarded and
 * clamped) that sizes the {@link MiniBar} and prints as a whole-percent chip;
 * the amount is neutral-toned integer cents. Fully token-bound.
 */
export function SpendCategoryRow({
  category,
  amountCents,
  currency = 'USD',
  share,
  icon,
  color = 'primary',
  onPress,
  appearance = 'classic',
  style,
}: SpendCategoryRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const clampedShare =
    typeof share === 'number' && Number.isFinite(share) ? Math.min(Math.max(share, 0), 1) : undefined;

  // Appearance surface FIRST; layout (radius/padding) stays AFTER. Classic → no
  // surface layer, so the historical row is byte-for-byte identical.
  const surface = appearance === 'classic' ? undefined : appearanceStyle(appearance, colors, tokens);

  const body = (
    <View
      style={[
        surface,
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, paddingVertical: tokens.spacing.sm },
        style,
      ]}
    >
      {icon != null ? <Icon glyph={icon} color={color} size="xl" /> : null}
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600', flex: 1 }}
          >
            {category}
          </Text>
          {clampedShare != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {Math.round(clampedShare * 100)}%
            </Text>
          ) : null}
        </View>
        {clampedShare != null ? (
          <MiniBar
            value={clampedShare * 100}
            max={100}
            color={color}
            accessibilityLabel={`${category}, ${Math.round(clampedShare * 100)}% of spend`}
          />
        ) : null}
      </View>
      <MoneyAmount cents={amountCents} currency={currency} tone="neutral" size="sm" />
    </View>
  );

  if (!onPress) return body;
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={category}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
