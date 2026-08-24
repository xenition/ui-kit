import * as React from 'react';
import { Text, type StyleProp, type TextStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

type TypeScaleKey = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';

export interface IconProps {
  /** The glyph/emoji to render (e.g. `'✓'`, `'★'`, `'🔔'`). Alias of `name`. */
  glyph?: string;
  /** Alias of `glyph` — the glyph/emoji string to render. */
  name?: string;
  /** Size from the typography scale (`'xs'…'3xl'`) or a raw px number. Default `'lg'`. */
  size?: TypeScaleKey | number;
  /** Semantic color slot. Default `'onSurface'`. */
  color?: keyof SemanticColors;
  /** Announced label. When omitted the icon is treated as decorative (hidden from a11y). */
  accessibilityLabel?: string;
  style?: StyleProp<TextStyle>;
}

/**
 * Themed icon slot — the kit ships no icon font, so `Icon` renders a
 * caller-supplied `glyph`/`name` (emoji or unicode symbol) as a sized, colored
 * `Text`. `size` reads the compiled `typography.scale` (or a raw number) and
 * `color` is a `SemanticColors` key resolved from the active scheme — so every
 * rendered color traces to a token, never a literal. Decorative by default;
 * pass `accessibilityLabel` to expose it as an `image` to screen readers. This
 * is the reusable icon primitive the other mobile components compose.
 */
export function Icon({
  glyph,
  name,
  size = 'lg',
  color = 'onSurface',
  accessibilityLabel,
  style,
}: IconProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const fontSize = typeof size === 'number' ? size : tokens.typography.scale[size];
  const decorative = accessibilityLabel == null;

  return (
    <Text
      accessibilityRole={decorative ? undefined : 'image'}
      accessibilityLabel={accessibilityLabel}
      accessibilityElementsHidden={decorative}
      importantForAccessibility={decorative ? 'no-hide-descendants' : 'yes'}
      allowFontScaling={false}
      style={[{ fontSize, lineHeight: fontSize * 1.1, color: colors[color], textAlign: 'center' }, style]}
    >
      {glyph ?? name ?? ''}
    </Text>
  );
}
