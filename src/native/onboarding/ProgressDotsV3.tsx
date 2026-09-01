import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { ProgressDotsProps } from './ProgressDots';

/** Drop-in for {@link ProgressDots} — identical props, different design. */
export type ProgressDotsV3Props = ProgressDotsProps;

/** §10.1 geometry: the ring's diameter and its stroke. */
const RING = 8;
const STROKE = 2;

/**
 * Paged progress — V3, the compact line: **rings**. Every step is an outlined
 * circle; the ones already walked are filled solid, the current one keeps its
 * outline and gains the brand fill, the rest stay hollow.
 *
 * Where it earns its place: over artwork. The base's filled bars and V2's
 * track both need a quiet ground to read against, and an onboarding whose hero
 * runs to the top edge does not have one — hollow rings with a stroke survive a
 * busy photograph in a way a low-contrast bar does not.
 *
 * Denser than the base at the same count, because a ring reads at a smaller
 * size than a bar does, which is the other half of "compact".
 *
 * `variant` is accepted and ignored: this line has one treatment, and a
 * `'bars'` request here is an app asking for the base line.
 *
 * Same props as {@link ProgressDots}. Token-pure.
 */
export function ProgressDotsV3({
  count,
  activeIndex,
  size = 'md',
  onDotPress,
  accessibilityLabel,
  style,
}: ProgressDotsV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const total = Math.max(0, Math.floor(count));
  const diameter = size === 'sm' ? RING : RING * 1.5;

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{
        min: 1,
        max: Math.max(1, total),
        now: Math.min(activeIndex + 1, total),
      }}
      accessibilityLabel={
        accessibilityLabel ?? `Step ${Math.min(activeIndex + 1, total)} of ${total}`
      }
      style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, style]}
    >
      {Array.from({ length: total }, (_, i) => {
        const walked = i < activeIndex;
        const current = i === activeIndex;
        const ring = (
          <View
            style={{
              width: diameter,
              height: diameter,
              borderRadius: tokens.radius.full,
              borderWidth: STROKE,
              borderColor: walked || current ? colors.primary : colors.border,
              backgroundColor: walked || current ? colors.primary : 'transparent',
              // The current step keeps a hairline of surface inside its fill,
              // so "here" and "done" are distinguishable without colour alone.
              opacity: current ? 1 : walked ? 0.55 : 1,
            }}
          />
        );
        if (!onDotPress) return <React.Fragment key={i}>{ring}</React.Fragment>;
        return (
          <Pressable
            key={i}
            accessibilityRole="button"
            accessibilityLabel={`Go to step ${i + 1}`}
            accessibilityState={{ selected: current }}
            hitSlop={tokens.spacing.md}
            onPress={() => onDotPress(i)}
          >
            {ring}
          </Pressable>
        );
      })}
    </View>
  );
}
