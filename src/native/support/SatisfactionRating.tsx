import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Rating } from '../primitives/Rating';
import { clamp } from './internal';

export type SatisfactionVariant = 'stars' | 'faces' | 'thumbs';
export type SatisfactionSize = 'sm' | 'md' | 'lg';

export interface SatisfactionRatingProps {
  /** Current CSAT value (1..max). `0`/undefined = unrated. */
  value?: number;
  /** Scale ceiling (default 5; forced to 2 for the `thumbs` variant). */
  max?: number;
  /** Interaction style (default `stars`). */
  variant?: SatisfactionVariant;
  /** Size scale (default `md`). */
  size?: SatisfactionSize;
  /** Fires with the chosen 1-based score. Omit to render read-only. */
  onRate?: (value: number) => void;
  /** Force read-only (display) even when `onRate` is provided. */
  readOnly?: boolean;
  /** Optional caption above the control. */
  label?: string;
  style?: StyleProp<ViewStyle>;
}

const FACE_GLYPHS = ['😠', '🙁', '😐', '🙂', '😀'];
const THUMB_GLYPHS = ['👎', '👍'];

const SIZE_PX: Record<SatisfactionSize, number> = { sm: 20, md: 28, lg: 40 };

/**
 * Customer-satisfaction (CSAT) rating input. In read-only mode it reuses the
 * `Rating` primitive for a token-colored star row; when `onRate` is supplied it
 * renders tappable glyphs (`stars` / emoji `faces` / `thumbs`) that each report
 * a 1-based score. The active glyph is emphasized by size/opacity plus text
 * (the numeric a11y label), not color alone. Colors come from tokens only.
 */
export function SatisfactionRating({
  value = 0,
  max = 5,
  variant = 'stars',
  size = 'md',
  onRate,
  readOnly = false,
  label,
  style,
}: SatisfactionRatingProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const total = variant === 'thumbs' ? 2 : Math.max(1, Math.floor(max));
  const current = clamp(Math.round(value), 0, total);
  const interactive = !readOnly && typeof onRate === 'function';
  const glyphPx = SIZE_PX[size] ?? SIZE_PX.md;

  const caption = label ? (
    <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, marginBottom: tokens.spacing.xs }}>
      {label}
    </Text>
  ) : null;

  // Read-only star display delegates to the Rating primitive.
  if (!interactive && variant === 'stars') {
    return (
      <View style={style}>
        {caption}
        <Rating value={current} max={total} size={size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md'} showValue />
      </View>
    );
  }

  const glyphFor = (index: number): string => {
    if (variant === 'faces') return FACE_GLYPHS[index] ?? '🙂';
    if (variant === 'thumbs') return THUMB_GLYPHS[index] ?? '👍';
    return '★';
  };

  return (
    <View style={style}>
      {caption}
      <View
        accessibilityRole={interactive ? 'radiogroup' : 'image'}
        accessibilityLabel={interactive ? undefined : `${current} out of ${total}`}
        style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
      >
        {Array.from({ length: total }, (_, i) => {
          const score = i + 1;
          const selected = score === current || (variant === 'stars' && score <= current);
          const glyph = glyphFor(i);
          const cell = (
            <Text
              style={{
                fontSize: glyphPx,
                lineHeight: glyphPx * 1.15,
                opacity: selected ? 1 : 0.35,
                color: variant === 'stars' ? (selected ? colors.accent : colors.muted) : colors.onSurface,
              }}
            >
              {glyph}
            </Text>
          );
          if (!interactive) {
            return (
              <View key={score} style={{ padding: 2 }}>
                {cell}
              </View>
            );
          }
          return (
            <Pressable
              key={score}
              accessibilityRole="radio"
              accessibilityState={{ selected: score === current }}
              accessibilityLabel={`Rate ${score} of ${total}`}
              onPress={() => onRate?.(score)}
              hitSlop={6}
              style={{ padding: 2 }}
            >
              {cell}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
