import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { usePressScale } from '../primitives/internal/motion';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import type { RewardStarProps } from './RewardStar';

/** Same public contract as {@link RewardStar} — a drop-in alternate design. */
export type RewardStarV2Props = RewardStarProps;

/**
 * RewardStar, redesigned (v2): a **big star-burst tile**. One oversized filled
 * star sits in a tinted circular burst, with the count set large as "value / max"
 * beneath it and the optional caption below. Tapping the tile awards the next
 * star — `onReward(value + 1)`, wrapping back to 1 once full — the reward gesture
 * as a single celebratory press. Distinct from v1's small inline star row. Same
 * props.
 */
export function RewardStarV2({
  value,
  max = 5,
  label,
  color = 'warn',
  readOnly = false,
  onReward,
  style,
}: RewardStarV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const total = Math.max(0, Math.floor(max));
  const filled = Math.max(0, Math.min(total, Math.floor(value)));
  const interactive = !readOnly && !!onReward;
  const press = usePressScale();

  const next = filled >= total ? 1 : filled + 1;

  const body = (
    <Animated.View
      style={[
        {
          alignItems: 'center',
          gap: tokens.spacing.xs,
          backgroundColor: colors.surface,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          transform: [{ scale: press.scale }],
          ...shadow('sm', tokens),
        },
        style,
      ]}
    >
      <View
        style={{
          width: 88,
          height: 88,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(colors[color], 0.14),
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['3xl'], color: colors[color] }}>
          {filled > 0 ? '★' : '☆'}
        </Text>
      </View>
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
        {`${filled} / ${total}`}
      </Text>
      {label ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{label}</Text>
      ) : null}
    </Animated.View>
  );

  const a11y = `Reward: ${filled} of ${total} stars${label ? `, ${label}` : ''}`;
  if (!interactive) {
    return (
      <View accessibilityRole="image" accessibilityLabel={a11y}>
        {body}
      </View>
    );
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Give a star, ${a11y}`}
      onPress={() => onReward?.(next)}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {body}
    </Pressable>
  );
}
