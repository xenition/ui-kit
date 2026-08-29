import * as React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export type ProgressDotsSize = 'sm' | 'md';

/**
 * How the indicator draws itself.
 *
 * - `'dots'` — a row of dots with the active step widened into a pill. The
 *   slide-position indicator this component has always been.
 * - `'bars'` — the onboarding **step** indicator from the design spec (§2):
 *   one equal-width segment per step, complete and current filled with
 *   `colors.primary`, upcoming in `colors.border`. No numbers, no captions.
 *   This is what replaced the numbered-circle stepper the shipped screens used.
 */
export type ProgressDotsVariant = 'dots' | 'bars';

export interface ProgressDotsProps {
  /** Total number of steps/pages. */
  count: number;
  /** Zero-based index of the active step. */
  activeIndex: number;
  /** Dot scale. Default `'md'`. */
  size?: ProgressDotsSize;
  /**
   * Indicator treatment. Default `'dots'` — the historical rendering, so no
   * existing caller moves. Pass `'bars'` for the header step indicator.
   */
  variant?: ProgressDotsVariant;
  /** When set, dots become pressable and report the tapped index. */
  onDotPress?: (index: number) => void;
  /** Accessible name for the indicator group. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/** Dot diameter per size — geometric, not a spacing token (spec §10.1). */
const DOT: Record<ProgressDotsSize, number> = { sm: 6, md: 8 };

/** Segment thickness for `'bars'` — geometric, same rule as {@link DOT}. */
const BAR: Record<ProgressDotsSize, number> = { sm: 4, md: 6 };

/**
 * Paged-progress indicator — two treatments of the same idea, chosen with
 * `variant`.
 *
 * `'dots'` (the default, and everything that shipped before this prop existed)
 * is a slide-position indicator: a row of token-bound dots where the active
 * step is a widened "pill" in the primary color and the rest are muted.
 *
 * `'bars'` is the onboarding step indicator the design spec calls for (§2):
 * equal-width segments spanning the header, filled up to and including the
 * current step, `radius.full`, `spacing.xs` apart. It carries no numbers and no
 * captions on purpose — the numbered circles it replaces were the single worst
 * offender on the shipped screens, cramped at the top with labels too small to
 * read.
 *
 * Both treatments are decorative unless `onDotPress` is supplied, in which case
 * each step becomes a labelled button. An empty or negative `count` renders an
 * empty row rather than crashing, and a `count` of one renders a single full
 * bar. No literal colors.
 */
export function ProgressDots({
  count,
  activeIndex,
  size = 'md',
  variant = 'dots',
  onDotPress,
  accessibilityLabel,
  style,
}: ProgressDotsProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const total = Math.max(0, Math.floor(count));
  const bars = variant === 'bars';
  const thickness = bars ? BAR[size] : DOT[size];

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: Math.max(0, total - 1), now: activeIndex }}
      accessibilityLabel={
        accessibilityLabel ?? `Step ${Math.min(activeIndex + 1, total)} of ${total}`
      }
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs },
        bars ? { alignSelf: 'stretch' } : null,
        style,
      ]}
    >
      {Array.from({ length: total }, (_, i) => {
        const active = i === activeIndex;
        // In `'bars'` a step already walked past stays filled — the bar reads as
        // "how far through am I", not "which one is selected".
        const filled = bars ? i <= activeIndex : active;
        const segment = (
          <View
            style={{
              // Bars share the row equally; dots keep their fixed diameter and
              // the active one stretches into a pill.
              width: bars ? undefined : active ? thickness * 2.5 : thickness,
              alignSelf: bars ? 'stretch' : undefined,
              height: thickness,
              borderRadius: tokens.radius.full,
              backgroundColor: filled ? colors.primary : colors.border,
            }}
          />
        );
        if (!onDotPress) {
          return bars ? (
            <View key={i} style={{ flex: 1 }}>
              {segment}
            </View>
          ) : (
            <React.Fragment key={i}>{segment}</React.Fragment>
          );
        }
        return (
          <Pressable
            key={i}
            accessibilityRole="button"
            accessibilityLabel={`Go to step ${i + 1}`}
            accessibilityState={{ selected: active }}
            hitSlop={tokens.spacing.sm}
            onPress={() => onDotPress(i)}
            style={bars ? { flex: 1 } : undefined}
          >
            {segment}
          </Pressable>
        );
      })}
    </View>
  );
}
