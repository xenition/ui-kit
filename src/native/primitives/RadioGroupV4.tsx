import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { useReducedMotion } from './internal/useReducedMotion';
import { FIELD_MOTION, fieldMetrics, haloStyle } from './internal/field-v4';
import type { RadioGroupProps, RadioOption } from './RadioGroup';

export type { RadioGroupProps as RadioGroupV4Props, RadioOption };

/**
 * One choice: the mark, the label, and the whole row as the target.
 *
 * A row rather than a dot, because the label is the part a reader is actually
 * looking at when they decide — making them hit a 24pt circle beside it is
 * asking them to aim at the one part of the choice that carries no meaning
 * (§31, use familiar interactions; a radio row has been tappable since paper
 * forms). It is its own component so each row can own the animated value for
 * its mark without the group hand-rolling an array of them.
 */
function RadioRow({
  option,
  selected,
  onPress,
}: {
  option: RadioOption;
  selected: boolean;
  onPress: () => void;
}): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const metrics = fieldMetrics(theme);
  const reduced = useReducedMotion();
  const [held, setHeld] = React.useState(false);

  // `lg` outer, half of it filled — the proportion a radio has always had,
  // now read off the spacing scale instead of picked.
  const mark = tokens.spacing.lg;
  const inner = tokens.spacing.sm + tokens.spacing.xs;

  const on = React.useRef(new Animated.Value(selected ? 1 : 0)).current;
  const mounted = React.useRef(false);
  React.useEffect(() => {
    const to = selected ? 1 : 0;
    if (reduced || !mounted.current) {
      mounted.current = true;
      on.setValue(to);
      return;
    }
    const anim = Animated.timing(on, {
      toValue: to,
      duration: FIELD_MOTION,
      useNativeDriver: true,
    });
    anim.start();
    return () => anim.stop();
  }, [selected, reduced, on]);

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled: option.disabled }}
      disabled={option.disabled}
      onPress={onPress}
      onPressIn={() => setHeld(true)}
      onPressOut={() => setHeld(false)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.inner + metrics.ring,
        minHeight: metrics.height,
        opacity: option.disabled ? theme.state.disabledContent : 1,
      }}
    >
      <View style={haloStyle(theme, { showing: held, accent: colors.ring, radius: mark / 2 })}>
        <View
          style={{
            width: mark,
            height: mark,
            borderRadius: tokens.radius.full,
            borderWidth: 1,
            borderColor: selected ? colors.primary : colors.border,
            backgroundColor: colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/*
            Always mounted, scaled from nothing — a mark that is added to the
            tree on selection can only appear, never arrive. The scale runs on
            the native driver and is skipped entirely under Reduce Motion.
          */}
          <Animated.View
            style={{
              width: inner,
              height: inner,
              borderRadius: tokens.radius.full,
              backgroundColor: colors.primary,
              opacity: on,
              transform: [{ scale: on }],
            }}
          />
        </View>
      </View>
      {typeof option.label === 'string' ? (
        <Text
          style={{
            flex: 1,
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontFamily: tokens.typography.fontBody,
          }}
        >
          {option.label}
        </Text>
      ) : (
        option.label
      )}
    </Pressable>
  );
}

/**
 * **V4 radio group** — the same props as {@link RadioGroup}, a different
 * design line.
 *
 * Three changes, all of them about the hand rather than the eye:
 *
 * 1. **The row is the target.** Each option is `2xl` tall — the height every
 *    other V4 control takes — and the whole row responds, label included. The
 *    base made you hit a 20pt circle; this makes the choice as big as the
 *    choice is.
 * 2. **The label is read at reading size.** `base`, not `sm`. A radio label is
 *    the sentence someone is deciding between, not a caption on a control
 *    (§10, typography before containers).
 * 3. **The mark arrives.** The inner dot is always mounted and scales up from
 *    nothing in {@link FIELD_MOTION}ms, so the selection moves between options
 *    instead of blinking between them (§36.1). A brand halo lights in the space
 *    the ring already reserves while a row is held, so pressing never shifts
 *    the layout under the finger (§36.11). Both are skipped under Reduce
 *    Motion, where the selection is simply already there (§36.10).
 *
 * §8 bans excessive pill-shaped controls; a radio is round because a radio has
 * always been round, and the shape comes from `radius.full` — so a `sharp`
 * seed still gets the square marks it asked for rather than a capsule the kit
 * insisted on.
 *
 * No gradient, no glass, no shadow: §16 asks that forms stay minimal, and the
 * only thing a list of choices needs is to be easy to read and easy to hit.
 */
export function RadioGroupV4({
  options,
  value,
  onValueChange,
  onChange,
  orientation = 'vertical',
  style,
}: RadioGroupProps): React.ReactElement {
  const theme = useXenitionTheme();
  const metrics = fieldMetrics(theme);
  // Two spellings, one callback: the original wins when both are passed, so a
  // caller who has migrated half a file never gets the change reported twice.
  const emit = onValueChange ?? onChange;

  return (
    <View
      accessibilityRole="radiogroup"
      style={[
        {
          flexDirection: orientation === 'vertical' ? 'column' : 'row',
          flexWrap: orientation === 'horizontal' ? 'wrap' : 'nowrap',
          // Vertical rows already carry their own height, so they need less
          // between them than a wrapping row of them does.
          gap: orientation === 'vertical' ? metrics.ring : metrics.padX,
        },
        style,
      ]}
    >
      {options.map((option) => (
        <RadioRow
          key={option.value}
          option={option}
          selected={option.value === value}
          onPress={() => emit?.(option.value)}
        />
      ))}
    </View>
  );
}
