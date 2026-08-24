import * as React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export type ProgressDotsSize = 'sm' | 'md';

export interface ProgressDotsProps {
  /** Total number of steps/pages. */
  count: number;
  /** Zero-based index of the active step. */
  activeIndex: number;
  /** Dot scale. Default `'md'`. */
  size?: ProgressDotsSize;
  /** When set, dots become pressable and report the tapped index. */
  onDotPress?: (index: number) => void;
  /** Accessible name for the indicator group. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const DOT: Record<ProgressDotsSize, number> = { sm: 6, md: 8 };

/**
 * Paged-progress indicator — a row of token-bound dots where the active step is
 * a widened "pill" in the primary color and the rest are muted. Shared by
 * {@link OnboardingSlides}, {@link WelcomeScreen} and the paywall flow so every
 * screen advertises its position identically. Dots are decorative unless
 * `onDotPress` is supplied, in which case each becomes a labelled button. Guards
 * an empty/negative `count`. No literal colors.
 */
export function ProgressDots({
  count,
  activeIndex,
  size = 'md',
  onDotPress,
  accessibilityLabel,
  style,
}: ProgressDotsProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const total = Math.max(0, Math.floor(count));
  const d = DOT[size];

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: Math.max(0, total - 1), now: activeIndex }}
      accessibilityLabel={
        accessibilityLabel ?? `Step ${Math.min(activeIndex + 1, total)} of ${total}`
      }
      style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, style]}
    >
      {Array.from({ length: total }, (_, i) => {
        const active = i === activeIndex;
        const dot = (
          <View
            style={{
              width: active ? d * 2.5 : d,
              height: d,
              borderRadius: tokens.radius.full,
              backgroundColor: active ? colors.primary : colors.border,
            }}
          />
        );
        if (!onDotPress) return <React.Fragment key={i}>{dot}</React.Fragment>;
        return (
          <Pressable
            key={i}
            accessibilityRole="button"
            accessibilityLabel={`Go to step ${i + 1}`}
            accessibilityState={{ selected: active }}
            hitSlop={tokens.spacing.sm}
            onPress={() => onDotPress(i)}
          >
            {dot}
          </Pressable>
        );
      })}
    </View>
  );
}
