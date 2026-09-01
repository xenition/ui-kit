import * as React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/nav-v4';
import { fieldMetrics } from '../primitives/internal/field-v4';
import { pressOver } from '../primitives/internal/state-v4';
import type { QuantityStepperProps } from './QuantityStepper';

/**
 * How big the two tap targets are.
 *
 * `'md'` is the **44 floor** — HIG's minimum comfortable target, composed as
 * `2xl - xs` and read from the nav line's {@link minTap} so the kit still has
 * exactly one 44. It is the size a stepper takes inside a cart row.
 *
 * `'lg'` is the **V4 control metric**, `2xl` (48) — the height `InputV4`,
 * `SelectV4` and every other field-shaped control takes, read from
 * {@link fieldMetrics}. A stepper standing on a product page beside a quantity
 * field or an add-to-cart button takes this one, so the row of controls has one
 * height instead of two that are nearly the same.
 */
export type QuantityStepperV4Size = 'md' | 'lg';

export interface QuantityStepperV4Props extends QuantityStepperProps {
  /**
   * Tap-target size. Default `'md'` — the 44 floor. `'lg'` is the 48 V4 control
   * metric, for a stepper standing beside fields rather than inside a row.
   */
  size?: QuantityStepperV4Size;
}

export type { QuantityStepperProps };

const clamp = (n: number, min: number, max: number): number => Math.min(max, Math.max(min, n));

/**
 * **V4 quantity stepper** — the native twin of the web `QuantityStepperV4`,
 * same props as {@link QuantityStepper} plus {@link QuantityStepperV4Props.size},
 * a different design line.
 *
 * `COMMERCE-MARKETPLACE-V4-BRIEF.md` §2 names this component's `+` / `−` as
 * "the classic 44 violation — a control a shopper taps repeatedly, drawn at
 * glyph size". The base drew them at 32×32, which is 12 short of the HIG floor
 * on the one control in the module that gets pressed more than once per visit.
 * Four changes:
 *
 * 1. **The 44 floor, painted.** Not `hitSlop` around a 32 box — the target is
 *    the size it looks, because a shopper aiming at a `+` aims at the thing
 *    they can see. `'lg'` opts up to the 48 V4 control metric.
 * 2. **Disabled without changing shape.** At `min` the `−` keeps its box, its
 *    border and its place, and only its content fades to M3's
 *    `state.disabledContent` (0.38). The base faded to a hand-picked `0.4` —
 *    but more importantly, a stepper whose buttons *resize* or *disappear* at
 *    the bounds makes the whole cart row jump on the frame the quantity reaches
 *    1, which is exactly when the shopper is still pointing at it.
 * 3. **The internal rules are gone.** The base drew a hairline either side of
 *    the value, so a three-part control carried four vertical lines. §9 and the
 *    V4 data line both say the same thing: spacing does what a border was
 *    doing. The container keeps its one edge.
 * 4. **The state layer, not an opacity.** `opacity: pressed ? 0.7 : 1` dims the
 *    control's own *content*, which is the signal M3 spends `0.38` on to mean
 *    disabled — so a pressed `+` and a dead `+` looked alike. {@link pressOver}
 *    tints the button's ground from the pair it actually wears and leaves the
 *    glyph at full strength.
 *
 * **The ground is `card`, not `surface`** (brief §1.4): a stepper sits on a
 * card or in a cart row, and painting the page colour is why the base control
 * disappeared into a dark page.
 *
 * Accessibility is unchanged and deliberate: `accessibilityRole="adjustable"`
 * with a live `accessibilityValue`, which is how iOS and Android expect a
 * stepper to announce itself, and the value in a polite live region so the new
 * quantity is spoken rather than having to be hunted for. (The web twin says
 * the same thing with `role="group"` and `aria-live` — there is no `adjustable`
 * role in ARIA, so this is the one place the twins are idiomatic rather than
 * identical, exactly as the base already was.)
 */
export function QuantityStepperV4({
  value,
  min = 1,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  onChange,
  disabled = false,
  label = 'Quantity',
  decrementLabel = 'Decrease quantity',
  incrementLabel = 'Increase quantity',
  size = 'md',
  style,
}: QuantityStepperV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens, state } = theme;

  const box = size === 'lg' ? fieldMetrics(theme).height : minTap(tokens.spacing);
  const atMin = value <= min;
  const atMax = value >= max;

  const emit = (next: number): void => {
    const clamped = clamp(next, min, max);
    if (clamped !== value) onChange?.(clamped);
  };

  // One builder for both buttons: the two halves of a stepper must be
  // indistinguishable apart from their glyph, and writing the box twice is how
  // they stop being.
  const button = (
    kind: 'decrement' | 'increment',
    accessibilityLabel: string,
    isDisabled: boolean,
    onPress: () => void
  ): React.ReactElement => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: isDisabled }}
      testID={`xen-quantity-${kind}`}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }): StyleProp<ViewStyle> => ({
        // The box never changes — only what is drawn inside it. A control that
        // resizes when it disables moves the row out from under the finger.
        width: box,
        height: box,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:
          pressed && !isDisabled ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
        opacity: isDisabled ? state.disabledContent : 1,
      })}
    >
      {/* `remove` / `add` are the monochrome `−` / `＋`, so they take the tint;
          the emoji side of the icon set would ignore `color` outright. */}
      <IconV4 name={kind === 'decrement' ? 'remove' : 'add'} size="base" color="onSurface" />
    </Pressable>
  );

  return (
    <View
      accessibilityRole="adjustable"
      accessibilityLabel={label}
      accessibilityValue={{ now: value, min, max: Number.isFinite(max) ? max : undefined }}
      testID="xen-quantity-stepper"
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: colors.input,
          borderRadius: tokens.radius.md,
          backgroundColor: colors.card,
        },
        style,
      ]}
    >
      {button('decrement', decrementLabel, disabled || atMin, () => emit(value - step))}
      <TextV4
        accessibilityLiveRegion="polite"
        testID="xen-quantity-value"
        size={size === 'lg' ? 'base' : 'sm'}
        weight="medium"
        tone="onCard"
        numeric="tabular"
        align="center"
        // Wide enough that 9 → 10 does not move the `+` out from under the
        // finger holding it down (§36.11), and a minimum so three digits fit.
        style={{ minWidth: box, paddingHorizontal: tokens.spacing.sm }}
      >
        {value}
      </TextV4>
      {button('increment', incrementLabel, disabled || atMax, () => emit(value + step))}
    </View>
  );
}
