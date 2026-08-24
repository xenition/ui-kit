import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type RewardStarSize = 'sm' | 'md' | 'lg';

const SIZE_KEY: Record<RewardStarSize, 'lg' | 'xl' | '2xl'> = {
  sm: 'lg',
  md: 'xl',
  lg: '2xl',
};

export interface RewardStarProps {
  /** Number of filled stars. */
  value: number;
  /** Total stars. */
  max?: number;
  /** Star glyph size from the type scale. */
  size?: RewardStarSize;
  /** Optional caption below the stars, e.g. "Great job!". */
  label?: string;
  /** Theme color slot for filled stars. */
  color?: keyof SemanticColors;
  /** When true the stars are display-only (no press handling). */
  readOnly?: boolean;
  /** Fires with the new star count (1..max) when a star is tapped. */
  onReward?: (next: number) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A tappable star-reward control: a row of star glyphs where the first `value`
 * are filled. Tapping the Nth star fires `onReward(N)` — the reward gesture.
 * Filled state is conveyed by a solid vs. outline glyph plus the a11y label
 * (never color alone). Filled color is a `SemanticColors` slot; no literals.
 */
export function RewardStar({
  value,
  max = 5,
  size = 'md',
  label,
  color = 'warn',
  readOnly = false,
  onReward,
  style,
}: RewardStarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const total = Math.max(0, Math.floor(max));
  const filled = Math.max(0, Math.min(total, Math.floor(value)));
  const fontSize = tokens.typography.scale[SIZE_KEY[size] ?? 'xl'];
  const interactive = !readOnly && !!onReward;

  return (
    <View
      accessibilityRole={interactive ? 'adjustable' : 'image'}
      accessibilityLabel={`Reward: ${filled} of ${total} stars${label ? `, ${label}` : ''}`}
      accessibilityValue={{ min: 0, max: total, now: filled }}
      style={[{ gap: tokens.spacing.xs, alignItems: 'flex-start' }, style]}
    >
      <View style={{ flexDirection: 'row', gap: tokens.spacing.xs }}>
        {Array.from({ length: total }).map((_, i) => {
          const isFilled = i < filled;
          const glyph = (
            <Text
              allowFontScaling={false}
              style={{ fontSize, color: isFilled ? colors[color] : colors.muted }}
            >
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
              hitSlop={6}
              style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
            >
              {glyph}
            </Pressable>
          );
        })}
      </View>
      {label ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{label}</Text>
      ) : null}
    </View>
  );
}
