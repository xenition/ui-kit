import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Rating } from '../primitives/Rating';
import { appearanceStyle } from '../primitives/internal/appearance';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import { clamp, withAlpha } from './internal';
import { type SatisfactionSize, type SatisfactionRatingProps } from './SatisfactionRating';

/** Drop-in alternate design for {@link SatisfactionRating}. Identical contract. */
export type SatisfactionRatingV2Props = SatisfactionRatingProps;

const FACE_GLYPHS = ['😠', '🙁', '😐', '🙂', '😀'];
const THUMB_GLYPHS = ['👎', '👍'];
const SCORE_WORDS = ['Very bad', 'Bad', 'Okay', 'Good', 'Great'];

const CARD_GLYPH_PX: Record<SatisfactionSize, number> = { sm: 32, md: 44, lg: 56 };

/**
 * SatisfactionRating — **V2 (big selector card)**. A raised CSAT card: an
 * optional caption, a large row of tappable stars / emoji faces / thumbs, and a
 * live word readout of the current score. Same `SatisfactionRatingProps` as
 * {@link SatisfactionRating}. The active glyph is emphasized by size + opacity
 * and its numeric a11y label (not color alone); token colors only.
 */
export function SatisfactionRatingV2({
  value = 0,
  max = 5,
  variant = 'faces',
  size = 'lg',
  onRate,
  readOnly = false,
  label,
  style,
}: SatisfactionRatingV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const total = variant === 'thumbs' ? 2 : Math.max(1, Math.floor(max));
  const current = clamp(Math.round(value), 0, total);
  const interactive = !readOnly && typeof onRate === 'function';
  const glyphPx = CARD_GLYPH_PX[size] ?? CARD_GLYPH_PX.lg;
  const enter = useEnter();
  const press = usePressScale();

  const glyphFor = (index: number): string => {
    if (variant === 'faces') return FACE_GLYPHS[index] ?? '🙂';
    if (variant === 'thumbs') return THUMB_GLYPHS[index] ?? '👍';
    return '★';
  };

  const readout =
    current > 0
      ? variant === 'thumbs'
        ? current === 2
          ? 'Positive'
          : 'Negative'
        : (SCORE_WORDS[Math.min(SCORE_WORDS.length - 1, Math.round(((current - 1) / Math.max(1, total - 1)) * (SCORE_WORDS.length - 1)))] ?? `${current} of ${total}`)
      : 'Not yet rated';

  return (
    <Animated.View
      style={[
        { opacity: enter.opacity, transform: enter.transform },
        appearanceStyle('elevated', colors, tokens),
        { borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, alignItems: 'center' },
        style,
      ]}
    >
      {label ? (
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '700',
            marginBottom: tokens.spacing.md,
            textAlign: 'center',
          }}
        >
          {label}
        </Text>
      ) : null}

      {!interactive && variant === 'stars' ? (
        <Rating value={current} max={total} size="lg" showValue />
      ) : (
        <View
          accessibilityRole={interactive ? 'radiogroup' : 'image'}
          accessibilityLabel={interactive ? undefined : `${current} out of ${total}`}
          style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}
        >
          {Array.from({ length: total }, (_, i) => {
            const score = i + 1;
            const selected = score === current || (variant === 'stars' && score <= current);
            const cell = (
              <Text
                style={{
                  fontSize: glyphPx,
                  lineHeight: glyphPx * 1.15,
                  opacity: selected ? 1 : 0.3,
                  color: variant === 'stars' ? (selected ? colors.accentText : colors.muted) : colors.onSurface,
                }}
              >
                {glyphFor(i)}
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
                onPressIn={press.onPressIn}
                onPressOut={press.onPressOut}
                hitSlop={8}
                style={{ padding: 4, borderRadius: tokens.radius.full, backgroundColor: score === current ? withAlpha(colors.primary, 0.1) : 'transparent' }}
              >
                {cell}
              </Pressable>
            );
          })}
        </View>
      )}

      <Text
        style={{
          color: current > 0 ? colors.onSurface : colors.muted,
          fontSize: tokens.typography.scale.sm,
          fontWeight: '600',
          marginTop: tokens.spacing.md,
        }}
      >
        {readout}
      </Text>
    </Animated.View>
  );
}
