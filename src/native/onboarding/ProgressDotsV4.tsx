import * as React from 'react';
import { Animated, Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';
import { EASING_STANDARD } from '../primitives/internal/motion-v4';
import { stateMix } from '../../primitives/internal/v4-state';
import { V4_MOTION } from '../../primitives/internal/v4-motion';
import { flowGrounds, type OnboardingAccentV4 } from './internal/flow-v4';
import type { ProgressDotsProps, ProgressDotsSize } from './ProgressDots';

export interface ProgressDotsV4Props extends ProgressDotsProps {
  /** Which brand slot the filled segments answer in. Default `'primary'`. */
  accent?: OnboardingAccentV4;
  /**
   * Animate the active segment's arrival. Default `true`; `useReducedMotion()`
   * overrides it to `false` regardless.
   */
  animated?: boolean;
}

/**
 * How thick a segment is, as a fraction of the spacing step it is derived
 * from. The base pinned `6` and `8`; those are the right numbers on the
 * default scale and wrong on any other, and a progress bar that stays 6pt
 * while every control around it grows is how a header stops looking designed.
 */
const THICKNESS: Record<ProgressDotsSize, (xs: number) => number> = {
  sm: (xs) => xs,
  md: (xs) => xs * 1.5,
};

/** How much wider the active dot grows in `'dots'`. Geometric. */
const ACTIVE_DOT_STRETCH = 2.5;

/**
 * **V4 paged-progress indicator** — same props as {@link ProgressDots} plus
 * `accent` and `animated`, both optional.
 *
 * ## Four changes
 *
 * 1. **The track is a surface, not a hairline.** The base filled upcoming
 *    segments with `colors.border` — a *divider* colour asked to act as a
 *    *fill*. On a dark seed that is a near-invisible rail; on a high-contrast
 *    one it is a row of hard black bars competing with the filled steps. The
 *    track is now an M3 state mix of `onSurface` over `surface`, which is a
 *    quiet neutral in both schemes by construction.
 * 2. **Thickness comes off the scale** (see {@link THICKNESS}).
 * 3. **The active segment animates in.** On the `standard` duration, which is
 *    what a state change between two positions takes. It fades rather than
 *    slides: a bar that slides implies the *content* slid, and in a stepped
 *    flow it did not. Collapses to nothing under `useReducedMotion()`.
 * 4. **The accessible value counts steps, not indices.** The base reported
 *    `{min: 0, max: total - 1, now: activeIndex}` — a screen reader on step
 *    one of three announced "0 of 2". It now reports 1-based positions, which
 *    is what the visible label says.
 *
 * A `count` of zero renders an empty row rather than crashing; a `count` of one
 * renders a single full bar. Both treatments stay decorative unless
 * `onDotPress` is supplied, in which case each step becomes a labelled button.
 */
export function ProgressDotsV4({
  count,
  activeIndex,
  size = 'md',
  variant = 'dots',
  accent = 'primary',
  animated = true,
  onDotPress,
  accessibilityLabel,
  style,
}: ProgressDotsV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens, state } = theme;
  const reduced = useReducedMotion();
  const grounds = flowGrounds(theme, 'plain', accent);

  const total = Math.max(0, Math.floor(count));
  const bars = variant === 'bars';
  const thickness = THICKNESS[size](tokens.spacing.xs) * (bars ? 1 : 1.35);
  const track = stateMix(colors.surface, colors.onSurface, 'focus', state);

  // One driver for the whole row: every segment reads the same progress value,
  // so a step change is one animation rather than `count` of them.
  const moving = animated && !reduced;
  const progress = React.useRef(new Animated.Value(activeIndex)).current;
  React.useEffect(() => {
    if (!moving) {
      progress.setValue(activeIndex);
      return;
    }
    const animation = Animated.timing(progress, {
      toValue: activeIndex,
      duration: V4_MOTION.standard,
      easing: EASING_STANDARD,
      // Colour is not a native-driver property.
      useNativeDriver: false,
    });
    animation.start();
    return () => animation.stop();
  }, [progress, activeIndex, moving]);

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 1, max: Math.max(1, total), now: Math.min(activeIndex + 1, total) }}
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
        // In `'bars'` a step already walked past stays filled — the bar reads
        // as "how far through am I", not "which one is selected".
        const filled = bars ? i <= activeIndex : active;

        const fill = moving
          ? progress.interpolate({
              // The segment crosses from track to fill as the active index
              // passes it. Clamped, so segments far from the change do not
              // interpolate at all.
              inputRange: bars ? [i - 1, i] : [i - 0.5, i, i + 0.5],
              outputRange: bars ? [track, grounds.fill] : [track, grounds.fill, track],
              extrapolate: 'clamp',
            })
          : filled
            ? grounds.fill
            : track;

        const segment = (
          <Animated.View
            style={{
              // Bars share the row equally; dots keep their diameter and the
              // active one stretches into a pill.
              width: bars ? undefined : active ? thickness * ACTIVE_DOT_STRETCH : thickness,
              alignSelf: bars ? 'stretch' : undefined,
              height: thickness,
              borderRadius: tokens.radius.full,
              backgroundColor: fill,
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
