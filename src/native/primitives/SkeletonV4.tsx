import * as React from 'react';
import { Animated, StyleSheet, View, type DimensionValue } from 'react-native';
import { useXenitionTheme } from '../theme';
import { mixToken } from '../../primitives/internal/v4-depth';
import { BUSY_MOTION } from '../../primitives/internal/feedback-v4';
import { useReducedMotion } from './internal/useReducedMotion';
import type { SkeletonProps } from './Skeleton';

export type { SkeletonProps as SkeletonV4Props };

/**
 * The two ends of the breath, both composited into `surface`.
 *
 * A placeholder has to sit clearly below real content in the hierarchy while
 * still reading as "something will be here". Eight and sixteen percent of
 * `onSurface` is the band that does that in both schemes — dark enough on a
 * light page to look like a filled shape, light enough on a dark one not to
 * look like a mistake.
 */
const REST = 0.08;
const PEAK = 0.16;

/**
 * **V4 skeleton** — same props as {@link Skeleton}, a different design line.
 *
 * ## The animation is not allowed to claim progress
 *
 * `design.md` §36.7 says loading feedback exists to reduce uncertainty and must
 * not fabricate precision. The usual skeleton treatment — a highlight sweeping
 * left to right — fails that quietly: a sweep *travels*, and travel across a
 * placeholder reads as loading moving through the content, which is a claim
 * about a request whose state the skeleton cannot see. V4 deliberately does not
 * add one. What it has is a symmetric fade, which says only "not yet", and that
 * is the entire truth available to this component.
 *
 * Under Reduce Motion the fade stops and the block rests at its brighter end
 * (§36.10) — still obviously a placeholder, just a still one.
 *
 * ## The block is opaque, at both ends of the breath
 *
 * The base animated `opacity` between 0.4 and 1 over a `muted` fill. That makes
 * the placeholder *translucent* for most of every cycle: on a plain page it
 * looks right, and on a filled card or a glass panel it turns into a window
 * showing whatever is behind it, at a different colour every 700ms.
 *
 * V4 fades one opaque colour over another instead — a second block at 16%
 * crossing over a first at 8%, both composited into `surface`. The visible
 * colour is always between two real theme colours, so the skeleton looks the
 * same wherever it lands, and the ground under it never shows through.
 *
 * `muted` was also the wrong token for a different reason: it is the kit's
 * de-emphasised **text** colour, sized for legibility of a word, not for a
 * field of it. A block of it is far heavier than the content it stands in for.
 *
 * ## Matching the layout
 *
 * §36.7 asks for a skeleton "when it matches actual layout", so the text line
 * takes its height from `typography.scale.sm` — the size of the line it is
 * standing in for — rather than from a number that happened to be 14.
 *
 * The whole tree is hidden from assistive technology. A screen reader should
 * hear the region's own busy state, never a list of empty boxes.
 */
export function SkeletonV4({
  variant = 'text',
  width,
  height,
  lines = 1,
  style,
}: SkeletonProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const reduced = useReducedMotion();

  const rest = mixToken(colors.surface, colors.onSurface, REST);
  const peak = mixToken(colors.surface, colors.onSurface, PEAK);

  const breath = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (reduced) {
      breath.setValue(1);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(breath, {
          toValue: 1,
          duration: BUSY_MOTION.pulse,
          useNativeDriver: true,
        }),
        Animated.timing(breath, {
          toValue: 0,
          duration: BUSY_MOTION.pulse,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [breath, reduced]);

  const radius =
    variant === 'circle'
      ? tokens.radius.full
      : variant === 'rect'
        ? tokens.radius.md
        : tokens.radius.sm;

  // The height of the line this block stands in for, not a number that happened
  // to be 14.
  const lineHeight = tokens.typography.scale.sm;
  const blockSize = tokens.spacing.xl + tokens.spacing.sm;

  const block = (key: number, w: DimensionValue, h: DimensionValue): React.ReactElement => (
    <View
      key={key}
      style={{
        width: w,
        height: h,
        borderRadius: radius,
        backgroundColor: rest,
        overflow: 'hidden',
      }}
    >
      {/*
        A second OPAQUE colour crossing over the first. Fading the block itself
        would make it translucent for most of every cycle, and a translucent
        placeholder is a window onto whatever it happens to be sitting on.
      */}
      <Animated.View
        testID="xen-v4-skeleton-peak"
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: peak, opacity: reduced ? 1 : breath },
        ]}
      />
    </View>
  );

  // A screen reader should hear the region's busy state, never a list of boxes.
  const hidden = {
    accessible: false,
    accessibilityElementsHidden: true,
    importantForAccessibility: 'no-hide-descendants' as const,
  };

  if (variant === 'text' && lines > 1) {
    return (
      <View {...hidden} style={[{ gap: tokens.spacing.sm }, style]}>
        {Array.from({ length: lines }, (_, i) =>
          block(i, i === lines - 1 ? '60%' : '100%', height ?? lineHeight)
        )}
      </View>
    );
  }

  return (
    <View {...hidden} style={style}>
      {block(
        0,
        width ?? (variant === 'text' ? '100%' : blockSize),
        height ?? (variant === 'text' ? lineHeight : blockSize)
      )}
    </View>
  );
}
