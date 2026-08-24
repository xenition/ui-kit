import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Rating } from '../primitives/Rating';
import { clamp } from './internal';
import { type SatisfactionRatingProps } from './SatisfactionRating';

/** Drop-in alternate design for {@link SatisfactionRating}. Identical contract. */
export type SatisfactionRatingV3Props = SatisfactionRatingProps;

const FACE_GLYPHS = ['😠', '🙁', '😐', '🙂', '😀'];
const THUMB_GLYPHS = ['👎', '👍'];

/**
 * SatisfactionRating — **V3 (compact inline)**. A tight inline control: for
 * read-only stars it delegates to the small `Rating` primitive; otherwise a
 * short row of small tappable stars / faces / thumbs with an optional inline
 * caption. Same `SatisfactionRatingProps` as {@link SatisfactionRating}. The
 * active glyph is carried by size/opacity + numeric a11y label, not color
 * alone; token colors only.
 */
export function SatisfactionRatingV3({
  value = 0,
  max = 5,
  variant = 'stars',
  onRate,
  readOnly = false,
  label,
  style,
}: SatisfactionRatingV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const total = variant === 'thumbs' ? 2 : Math.max(1, Math.floor(max));
  const current = clamp(Math.round(value), 0, total);
  const interactive = !readOnly && typeof onRate === 'function';
  const glyphPx = 18;

  const caption = label ? (
    <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, marginRight: tokens.spacing.xs }}>
      {label}
    </Text>
  ) : null;

  if (!interactive && variant === 'stars') {
    return (
      <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
        {caption}
        <Rating value={current} max={total} size="sm" showValue />
      </View>
    );
  }

  const glyphFor = (index: number): string => {
    if (variant === 'faces') return FACE_GLYPHS[index] ?? '🙂';
    if (variant === 'thumbs') return THUMB_GLYPHS[index] ?? '👍';
    return '★';
  };

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
      {caption}
      <View
        accessibilityRole={interactive ? 'radiogroup' : 'image'}
        accessibilityLabel={interactive ? undefined : `${current} out of ${total}`}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}
      >
        {Array.from({ length: total }, (_, i) => {
          const score = i + 1;
          const selected = score === current || (variant === 'stars' && score <= current);
          const cell = (
            <Text
              style={{
                fontSize: glyphPx,
                lineHeight: glyphPx * 1.15,
                opacity: selected ? 1 : 0.35,
                color: variant === 'stars' ? (selected ? colors.accentText : colors.muted) : colors.onSurface,
              }}
            >
              {glyphFor(i)}
            </Text>
          );
          if (!interactive) {
            return (
              <View key={score} style={{ padding: 1 }}>
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
              style={{ padding: 1 }}
            >
              {cell}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
