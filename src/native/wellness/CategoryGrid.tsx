import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';

export type WellnessCategoryTone = 'primary' | 'accent' | 'success' | 'warn' | 'danger';

export interface WellnessCategory {
  id: string;
  label: string;
  glyph: string;
  tone?: WellnessCategoryTone;
}

export interface CategoryTileProps {
  /** The category this tile represents. */
  category: WellnessCategory;
  /** Fires with the category when the tile is tapped. */
  onSelect?: (category: WellnessCategory) => void;
  style?: StyleProp<ViewStyle>;
}

export interface CategoryGridProps {
  categories: WellnessCategory[];
  onSelect?: (category: WellnessCategory) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * CategoryTile — one browse tile: a soft, color-coded card in its category's
 * tone. A glyph sits in a slightly deeper tint circle over a lighter tinted
 * ground, with the label in `onSurface`. This is the one wellness surface where
 * per-card color is the point — the grid reads as a palette of categories. The
 * tint is `withAlpha(colors[tone], …)`, so every color traces to a token and
 * restyles from the seed, light + dark.
 */
export function CategoryTile({ category, onSelect, style }: CategoryTileProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const tone = colors[category.tone ?? 'primary'];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={category.label}
      onPress={() => onSelect?.(category)}
      style={({ pressed }) => [
        {
          flexGrow: 1,
          flexBasis: 0,
          minWidth: 150,
          backgroundColor: withAlpha(tone, 0.14),
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
          opacity: pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(tone, 0.18),
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
          {category.glyph}
        </Text>
      </View>
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
        {category.label}
      </Text>
    </Pressable>
  );
}

/**
 * CategoryGrid — the browse surface: a flex-wrap grid of color-coded
 * {@link CategoryTile}s. Each tile grows to fill its row (`flexGrow:1,
 * flexBasis:0, minWidth:150`), so the grid auto-fits ~2 per row without the
 * RN percentage-plus-gap rounding bug. Color lives on the tiles (each in its
 * category tone); the grid itself is a plain layout. Token-only colors.
 */
export function CategoryGrid({ categories, onSelect, style }: CategoryGridProps): React.ReactElement {
  const { tokens } = useXenitionTheme();

  return (
    <View
      accessibilityRole="menu"
      style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md }, style]}
    >
      {categories.map((category) => (
        <CategoryTile key={category.id} category={category} onSelect={onSelect} />
      ))}
    </View>
  );
}
