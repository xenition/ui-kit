import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { RewardStarProps, RewardStarSize } from './RewardStar';

/** Same public contract as {@link RewardStar} — a drop-in alternate design. */
export type RewardStarV3Props = RewardStarProps;

const SIZE_KEY: Record<RewardStarSize, 'sm' | 'base' | 'lg'> = {
  sm: 'sm',
  md: 'base',
  lg: 'lg',
};

/**
 * RewardStar, redesigned (v3): a **tight inline star strip**. The stars pack on
 * one line with a small gap and the caption trails inline to the right rather
 * than wrapping below — a compact meter for lists and headers. Tapping the Nth
 * star fires `onReward(N)`. Filled state reads from the solid vs. outline glyph
 * plus the a11y label (never color alone). Same props.
 */
export function RewardStarV3({
  value,
  max = 5,
  size = 'md',
  label,
  color = 'warn',
  readOnly = false,
  onReward,
  style,
}: RewardStarV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const total = Math.max(0, Math.floor(max));
  const filled = Math.max(0, Math.min(total, Math.floor(value)));
  const fontSize = tokens.typography.scale[SIZE_KEY[size] ?? 'base'];
  const interactive = !readOnly && !!onReward;

  const rowStyle: StyleProp<ViewStyle> = [
    { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs },
    style,
  ];

  return (
    <View
      accessibilityRole={interactive ? 'adjustable' : 'image'}
      accessibilityLabel={`Reward: ${filled} of ${total} stars${label ? `, ${label}` : ''}`}
      accessibilityValue={{ min: 0, max: total, now: filled }}
      style={rowStyle}
    >
      {Array.from({ length: total }).map((_, i) => {
        const isFilled = i < filled;
        const glyph = (
          <Text allowFontScaling={false} style={{ fontSize, color: isFilled ? colors[color] : colors.muted }}>
            {isFilled ? '★' : '☆'}
          </Text>
        );
        if (!interactive) {
          return <View key={i}>{glyph}</View>;
        }
        return (
          <Pressable
            key={i}
            accessibilityRole="button"
            accessibilityLabel={`Give ${i + 1} star${i === 0 ? '' : 's'}`}
            onPress={() => onReward?.(i + 1)}
            hitSlop={4}
            style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
          >
            {glyph}
          </Pressable>
        );
      })}
      {label ? (
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, marginLeft: tokens.spacing.xs }}>
          {label}
        </Text>
      ) : null}
    </View>
  );
}
