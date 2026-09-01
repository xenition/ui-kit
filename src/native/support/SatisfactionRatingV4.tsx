import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { clamp } from './internal';
import type { SatisfactionRatingProps, SatisfactionSize } from './SatisfactionRating';

/** Drop-in for {@link SatisfactionRatingProps} — same props, the V4 "console" design. */
export type SatisfactionRatingV4Props = SatisfactionRatingProps;

const FACE_GLYPHS = ['😠', '🙁', '😐', '🙂', '😀'];
const THUMB_GLYPHS = ['👎', '👍'];

// V4 sizes run a touch larger for the calm, legible console read.
const SIZE_PX: Record<SatisfactionSize, number> = { sm: 24, md: 34, lg: 48 };

/**
 * SatisfactionRating — **V4** "calm console" design. A big, legible CSAT read: a
 * large numeral (`value / total`) paired with a row of glyphs — filled =
 * **primary** (`warn` for the low-score caution), empty = muted, emphasis by
 * size + opacity + the numeric a11y label (never color alone). Interactive
 * glyphs are ≥44px `radio` targets; read-only renders a static image. Same
 * props/behavior as {@link SatisfactionRatingProps}; token-only colors via
 * `useXenitionTheme()`.
 */
export function SatisfactionRatingV4({
  value = 0,
  max = 5,
  variant = 'stars',
  size = 'md',
  onRate,
  readOnly = false,
  label,
  style,
}: SatisfactionRatingV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const total = variant === 'thumbs' ? 2 : Math.max(1, Math.floor(max));
  const current = clamp(Math.round(value), 0, total);
  const interactive = !readOnly && typeof onRate === 'function';
  const glyphPx = SIZE_PX[size] ?? SIZE_PX.md;

  const glyphFor = (index: number): string => {
    if (variant === 'faces') return FACE_GLYPHS[index] ?? '🙂';
    if (variant === 'thumbs') return THUMB_GLYPHS[index] ?? '👍';
    return '★';
  };

  // A low CSAT (bottom half of the scale) leans on the warn slot as a calm
  // caution; otherwise filled reads as primary.
  const filledColor = current > 0 && current <= Math.ceil(total / 2) ? colors.warn : colors.primary;

  const caption = label ? (
    <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, marginBottom: tokens.spacing.xs }}>
      {label}
    </Text>
  ) : null;

  return (
    <View style={style as StyleProp<ViewStyle>}>
      {caption}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        {/* Big legible numeral — the at-a-glance CSAT read. */}
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Text
            style={{
              color: current > 0 ? colors.onSurface : colors.muted,
              fontSize: glyphPx,
              fontWeight: '700',
            }}
          >
            {current}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {' '}/ {total}
          </Text>
        </View>
        <View
          accessibilityRole={interactive ? 'radiogroup' : 'image'}
          accessibilityLabel={interactive ? undefined : `${current} out of ${total}`}
          style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
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
                  color: variant === 'stars' ? (selected ? filledColor : colors.muted) : colors.onSurface,
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
                hitSlop={12}
                style={{ minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' }}
              >
                {cell}
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}
