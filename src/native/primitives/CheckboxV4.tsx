import * as React from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { usePressScale } from './internal/motion';
import { useReducedMotion } from './internal/useReducedMotion';
import {
  FIELD_MOTION,
  fieldAccent,
  fieldMetrics,
  haloStyle,
} from './internal/field-v4';
import type { CheckboxProps } from './Checkbox';

export type { CheckboxProps as CheckboxV4Props };

/**
 * **V4 checkbox** — the same props as {@link Checkbox}, a different design line.
 *
 * Three things separate it from a 20pt square that changes colour:
 *
 * 1. **A target you can actually hit.** The box itself stays small — a
 *    checkbox that grows to a button is a checkbox nobody recognises (§31,
 *    use familiar interactions) — but its `hitSlop` opens the touch area out
 *    to the same `2xl` every other V4 control is tall. The visible mark and
 *    the thing you press are allowed to be different sizes; only one of them
 *    has to clear 44pt.
 * 2. **A fill that crosses rather than cuts.** Checking it fades a
 *    `colors.primary` layer up behind the tick instead of swapping a
 *    background, so the state change is legible as a change — §36.1 names "a
 *    checkbox smoothly changes to completed state" as functional motion. It
 *    runs on the native driver in {@link FIELD_MOTION}ms, and under Reduce
 *    Motion it lands on the final value on the first frame (§36.10): the tick
 *    is never information you have to wait for.
 * 3. **Press feedback that respects the reader.** `usePressScale` is
 *    reduced-motion aware by construction, and a brand halo lights up in the
 *    space the focus ring already reserves — so pressing never moves the
 *    control out from under the finger (§36.11).
 *
 * `invalid` answers in `danger` on the border, exactly as `InputV4` does. The
 * recovery copy is deliberately not here: a primitive cannot invent the
 * sentence that tells someone what to fix (§38), so the message belongs to the
 * `Field` that wraps this control and owns the label too.
 *
 * No gradient, no glass, no shadow — §16 asks that forms stay minimal, and a
 * checkbox is the smallest thing on the page to spend depth on.
 */
export function CheckboxV4({
  checked = false,
  onCheckedChange,
  invalid = false,
  disabled = false,
  accessibilityLabel,
  style,
}: CheckboxProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const metrics = fieldMetrics(theme);
  const press = usePressScale();
  const reduced = useReducedMotion();
  const [held, setHeld] = React.useState(false);

  const accent = fieldAccent(theme, invalid);

  // The mark's own size: `lg` off the spacing scale. Small enough to still
  // read as a checkbox, large enough that the tick inside it is not a speck.
  const box = tokens.spacing.lg;
  // Opens the touch area out to the height every other V4 control takes.
  const slop = Math.max(0, (metrics.height - box) / 2);

  const on = React.useRef(new Animated.Value(checked ? 1 : 0)).current;
  // A control that animates into its initial state is an entrance animation,
  // which §36.1 asks us not to replay; the first pass only records where we
  // already are, so only a real change is worth moving for.
  const mounted = React.useRef(false);
  React.useEffect(() => {
    const to = checked ? 1 : 0;
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
  }, [checked, reduced, on]);

  return (
    <Animated.View style={{ alignSelf: 'flex-start', transform: [{ scale: press.scale }] }}>
      <View style={haloStyle(theme, { showing: held, accent, radius: tokens.radius.sm })}>
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked, disabled }}
          accessibilityLabel={accessibilityLabel}
          disabled={disabled}
          hitSlop={slop}
          onPress={() => onCheckedChange?.(!checked)}
          onPressIn={() => {
            setHeld(true);
            press.onPressIn();
          }}
          onPressOut={() => {
            setHeld(false);
            press.onPressOut();
          }}
          style={[
            {
              width: box,
              height: box,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              borderRadius: tokens.radius.sm,
              borderWidth: 1,
              borderColor: invalid ? colors.danger : checked ? colors.primary : colors.border,
              backgroundColor: colors.surface,
              opacity: disabled ? theme.state.disabledContent : 1,
            },
            style,
          ]}
        >
          {/*
            The fill is its own layer rather than the box's `backgroundColor`
            so it can cross-fade on the native driver. Under `depth: 'flat'`
            nothing here changes — there was never a gradient to flatten.
          */}
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: invalid ? colors.danger : colors.primary, opacity: on },
            ]}
          />
          <Animated.Text
            style={{
              color: invalid ? colors.onDanger : colors.onPrimary,
              fontSize: tokens.typography.scale.sm,
              fontFamily: tokens.typography.fontBody,
              fontWeight: '700',
              opacity: on,
            }}
          >
            ✓
          </Animated.Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}
