import * as React from 'react';
import { Text, type StyleProp, type TextStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { resolveIconGlyph, type IconName } from '../../primitives/icon-names';

type TypeScaleKey = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';

export interface IconProps {
  /**
   * Escape hatch for a one-off glyph the named set has no name for (e.g.
   * `'🫐'`). Wins over `name` when both are given.
   */
  glyph?: string;
  /**
   * A name from the kit's icon set (`'home'`, `'close'`, `'chevron-right'`, …),
   * resolved through {@link ICON_GLYPHS}. Typed, so a typo is a compile error.
   * An unrecognised string still renders as-is — the pre-named-set behaviour,
   * kept so nothing that works today breaks.
   */
  name?: IconName;
  /** Size from the typography scale (`'xs'…'3xl'`) or a raw px number. Default `'lg'`. */
  size?: TypeScaleKey | number;
  /** Semantic color slot. Default `'onSurface'`. */
  color?: keyof SemanticColors;
  /** Announced label. When omitted the icon is treated as decorative (hidden from a11y). */
  accessibilityLabel?: string;
  style?: StyleProp<TextStyle>;
}

/**
 * Themed icon slot — the native mirror of the web `Icon`.
 *
 * `name` is a **semantic name from the kit's icon set** (`'home'`, `'close'`,
 * `'chevron-right'`, …) resolved through {@link ICON_GLYPHS}; `glyph` is the
 * escape hatch for a one-off the set has no name for. Naming the set is what
 * stops two screens in the same app from using different glyphs for the same
 * idea. An unrecognised `name` falls through and renders as-is, so callers
 * that passed raw emoji through `name` before the set existed still work.
 *
 * **These are unicode symbols and emoji, not a vector icon font.** The kit
 * ships no font: the pixels come from the platform's own emoji/symbol face, so
 * the same name looks different on iOS, Android and the web, and the colour
 * emoji among them ignore `color` entirely. See `icon-names.ts` for the full
 * caveat and which names actually take a tint.
 *
 * `size` reads the compiled `typography.scale` (or a raw number) and `color` is
 * a `SemanticColors` key resolved from the active scheme — so every rendered
 * color traces to a token, never a literal. Decorative by default; pass
 * `accessibilityLabel` to expose it as an `image` to screen readers. This is the
 * reusable icon primitive the other mobile components compose.
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
      {glyph ?? (name != null ? resolveIconGlyph(name) : '')}
    </Text>
  );
}
