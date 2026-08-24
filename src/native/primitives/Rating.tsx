import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export type RatingSize = 'sm' | 'md' | 'lg';

export interface RatingProps {
  /** The rating value; filled glyphs are drawn up to `Math.round(value)`. */
  value: number;
  /** Total number of glyphs (default 5). */
  max?: number;
  /** Glyph size (default `md`). */
  size?: RatingSize;
  /** Render the numeric value after the glyphs. */
  showValue?: boolean;
  /**
   * Custom accessible name. Defaults to `"{value} out of {max} stars"`. The
   * row is announced as one `image`; the glyphs carry no separate a11y text.
   */
  label?: string;
  style?: StyleProp<ViewStyle>;
}

const SIZE_KEY: Record<RatingSize, 'sm' | 'base' | 'xl'> = {
  sm: 'sm',
  md: 'base',
  lg: 'xl',
};

const STAR = '★'; // ★

/**
 * A ★ rating row — the native mirror of the web `Rating`. Draws `max` glyphs:
 * filled (the `accent` token) up to the rounded `value`, empty (the `muted`
 * token) after. The whole row is one accessible `image` with an aria-label
 * (`"{value} out of {max} stars"` or a custom `label`); optional trailing
 * numeric value. Token-only — no literal colors.
 */
export function Rating({
  value,
  max = 5,
  size = 'md',
  showValue = false,
  label,
  style,
}: RatingProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const total = Math.max(0, Math.floor(max));
  const filled = Math.max(0, Math.min(total, Math.round(value)));
  const fontSize = tokens.typography.scale[SIZE_KEY[size]];
  const ariaLabel = label ?? `${value} out of ${total} stars`;

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={ariaLabel}
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row' }}>
        {Array.from({ length: total }, (_, i) => (
          <Text
            key={i}
            style={{
              /*
                `accentText`, not `accent`. A filled star IS the text here — it is
                a glyph, not a fill — and `accent` is a background colour with no
                contrast guarantee against `surface`. Measured at 1.43:1 in light,
                which is a star you cannot see. `accentText` is the same hue pushed
                until it clears AA, and is identical wherever `accent` already did.
              */
              color: i < filled ? colors.accentText : colors.muted,
              fontSize,
              letterSpacing: 1,
            }}
          >
            {STAR}
          </Text>
        ))}
      </View>
      {showValue ? (
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '600',
          }}
        >
          {String(value)}
        </Text>
      ) : null}
    </View>
  );
}
