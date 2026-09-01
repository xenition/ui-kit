import * as React from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Gradient } from '../commerce/internal/Gradient';
import { IconV4 } from './IconV4';
import { SpinnerV4 } from './SpinnerV4';
import { TextV4 } from './TextV4';
import { withAlpha } from './internal/color';
import { usePressScale } from './internal/motion';
import { gradientInk } from '../../primitives/internal/v4-depth';
import type { ElevationToken } from '../../theme/types';
import type { ButtonTone } from './Button';
import type { IconName } from '../../primitives/icon-names';

/*
  §10.1 permits the named control heights as bare numbers, and this is the one
  this file is allowed. 56 is §5's CTA height — the number that makes the
  reference screens read as generous instead of cramped. It is a *layout*
  decision, not a theme one: there is no "control height" token, and inventing
  one would push a layout choice into the seed where a brand colour belongs.

  The component below never types `56`. It composes the same 56 out of the
  spacing scale — `2xl` (48) + `sm` (8) — exactly as `FloatButtonV4` does, so a
  re-scaled seed re-scales the CTA with the rest of the product instead of
  leaving one pinned literal behind.
*/
export const AUTH_SUBMIT_HEIGHT_V4 = 56;

/**
 * How much of the button's own ink the busy ring's track carries.
 *
 * `SpinnerV4` mixes a fifth of `primary` into `surface` for its track, so the
 * whole ring stays one object rather than a bright chip orbiting a grey hoop.
 * On a filled CTA that idea has to be said in the button's ink instead: a
 * `primary` ring on a `primary` fill is invisible. Same ratio, different pair.
 */
const BUSY_TRACK_MIX = 0.2;

/**
 * Convert a {@link GradientToken} angle (degrees clockwise from "up") into the
 * `start`/`end` unit points `expo-linear-gradient` wants. Kept here rather than
 * hard-coding `{0,0}→{1,1}` so the compiler stays the single owner of the
 * gradient's direction — the same helper `ButtonV4` and `FloatButtonV4` carry.
 */
function angleToPoints(angle: number): {
  start: { x: number; y: number };
  end: { x: number; y: number };
} {
  const radians = (angle * Math.PI) / 180;
  // Screen space: y grows downwards, so "up" is -cos.
  const dx = Math.sin(radians);
  const dy = -Math.cos(radians);
  return {
    start: { x: 0.5 - dx / 2, y: 0.5 - dy / 2 },
    end: { x: 0.5 + dx / 2, y: 0.5 + dy / 2 },
  };
}

/** RN shadow style from an {@link ElevationToken}. `held` sits it back down. */
function elevationStyle(token: ElevationToken, held: boolean): ViewStyle {
  const k = held ? 0.5 : 1;
  return {
    shadowColor: token.color,
    shadowOpacity: token.opacity * k,
    shadowRadius: token.radius * k,
    shadowOffset: { width: 0, height: token.offsetY * k },
    elevation: Math.round(token.android * k),
  };
}

/** The semantic `on` slot each tone's label and glyph fall back to. */
const ON_SLOT: Record<ButtonTone, keyof SemanticColors> = {
  default: 'onPrimary',
  primary: 'onPrimary',
  danger: 'onDanger',
  success: 'onSuccess',
};

export interface AuthSubmitButtonV4Props {
  /** The action, spelled out. "Sign in", "Create account", "Done". */
  label: string;
  onPress?: () => void;
  /** Swaps the trailing glyph for a spinner and blocks a second press. */
  loading?: boolean;
  disabled?: boolean;
  /** Trailing `→` on a forward action; drop it on a terminal one (§5). Default `true`. */
  trailingArrow?: boolean;
  /**
   * Semantic accent — V4 addition. `default`/`primary` carry the brand
   * gradient; `danger`/`success` stay solid, because a semantic colour is not a
   * brand colour (§35.4) and a destructive CTA wearing the brand sweep reads as
   * a promotion. Default `'default'`.
   */
  tone?: ButtonTone;
  /**
   * Which glyph sits in the trailing slot — V4 addition. Default `'forward'`,
   * §5's `→`. Only consulted when {@link trailingArrow} is on, so the two props
   * cannot disagree about whether there is a trailing glyph at all.
   */
  trailingIcon?: IconName;
  /**
   * The label while {@link loading} — V4 addition. "Signing in…" rather than a
   * frozen "Sign in", so the announced name changes with the state instead of
   * leaving a screen-reader user with a button that says it has not been
   * pressed. Falls back to {@link label}.
   */
  busyLabel?: string;
  /**
   * Announced name — V4 addition, the native spelling of the `aria-label` the
   * web twin already accepts through its DOM props. Defaults to the label on
   * screen.
   */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * **V4 auth submit button** — the same props as `AuthSubmitButton` plus the
 * four additive ones above, a different design line.
 *
 * This is the single most prominent element in the auth and onboarding
 * reference screens: `ONBOARDING-DESIGN-SPEC.md` §5's big, warm, full-width
 * pill with a trailing arrow, sitting confidently at the bottom of the sticky
 * footer. Everything in this file exists to make it read as *generous* and
 * *unmissable*, and to make sure it never changes shape underneath the finger.
 *
 * ## Why this one keeps 56 / `radius.full`
 *
 * The Addendum settled V4 control metrics at `spacing['2xl']` (48) and
 * `radius.md` — but it anchored that ruling on `InputV4`, and it is a ruling
 * about **field-shaped** controls: the things that stack in a form and have to
 * share an edge. The sticky primary CTA is not one of them. It is the one
 * dominant action on the screen (§5), it stands alone under a hairline, and
 * shrinking it to field height would flatten the exact hierarchy the reference
 * screens are built on. So §5's own shape stands: {@link AUTH_SUBMIT_HEIGHT_V4}
 * tall, `radius.full`.
 *
 * ## What V4 changes against the base
 *
 * - **The fill is `gradient.brand`** at the default/primary tone, run through
 *   {@link gradientInk} so the label clears AA against **both** stops rather
 *   than against the one flat colour `onPrimary` was measured on. §35.11 keeps
 *   gradients rare and purposeful; §5's single dominant action is precisely the
 *   place one is earned. A `danger` or `success` tone stays solid — §35.4, a
 *   semantic colour is not a brand colour.
 * - **The lift is `elevation.action`** and the press genuinely depresses
 *   (`usePressScale`, plus a shadow that sits back down), both read off the
 *   theme — so a `depth: 'flat'` seed produces a flat button with no branch in
 *   this file, because the tokens are already inert. `usePressScale` is
 *   reduced-motion aware by construction (§36.10): with Reduce Motion on the
 *   scale stays at 1 and the elevation change carries the feedback alone.
 * - **The busy state lives in the trailing slot.** The base put a spinner
 *   *before* the label, which widens the button the moment it starts working —
 *   the same "it moved" defect §5 forbids for the disabled state. Here the
 *   trailing `→` is simply replaced by the spinner: one slot, one indicator,
 *   no reflow. It is `SpinnerV4` rather than the platform `ActivityIndicator`,
 *   so the busy state can actually stop under Reduce Motion.
 * - **Busy is not disabled.** M3 spends `0.38` to mean *unavailable*, and the
 *   base dimmed the whole button (spinner included) while it was working. This
 *   one blocks the second press but stays at full strength; only a genuinely
 *   disabled button dims.
 *
 * Disabled is the **same shape** at reduced opacity — never a different shape,
 * or the button appears to move when it enables (§5).
 */
export function AuthSubmitButtonV4({
  label,
  onPress,
  loading = false,
  disabled = false,
  trailingArrow = true,
  tone = 'default',
  trailingIcon = 'forward',
  busyLabel,
  accessibilityLabel,
  style,
}: AuthSubmitButtonV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens, gradient, elevation } = theme;
  const press = usePressScale();
  const [held, setHeld] = React.useState(false);

  const spacing = tokens.spacing;
  // 56 from the scale, not from a literal — and comfortably past the 44 a
  // finger needs.
  const height = spacing['2xl'] + spacing.sm;

  const isDisabled = disabled || loading;
  // The one place a gradient is allowed: the brand-toned dominant action.
  const brandAction = tone === 'default' || tone === 'primary';
  const on = ON_SLOT[tone];

  // Legible stops plus the ink that reads on both. Untouched when the
  // compiler's own pair already clears AA, which is the common case.
  const brand = gradientInk(gradient.brand, colors.onPrimary, {
    darkest: tokens.ramps.neutral[950],
    lightest: tokens.ramps.neutral[50],
  });
  const points = angleToPoints(gradient.brand.angle);

  // The near stop doubles as the opaque layer the shadow falls from; on a flat
  // seed it IS the whole fill, because the compiler collapsed both stops.
  const fill = brandAction ? brand.from : colors[tone === 'danger' ? 'danger' : 'success'];
  const ink = brandAction ? brand.ink : colors[on];

  const shown = loading ? (busyLabel ?? label) : label;
  // §12 — the empty state. A label the caller left blank must not become an
  // empty text node with an empty accessible name; the pill keeps its shape
  // and simply has nothing in it.
  const named = shown.trim() !== '';

  const handlePressIn: PressableProps['onPressIn'] = () => {
    setHeld(true);
    press.onPressIn();
  };
  const handlePressOut: PressableProps['onPressOut'] = () => {
    setHeld(false);
    press.onPressOut();
  };

  return (
    <Animated.View
      style={[
        {
          alignSelf: 'stretch',
          borderRadius: tokens.radius.full,
          backgroundColor: fill,
          // Disabled dims; BUSY does not. A working button is not an
          // unavailable one, and 0.38 is M3's word for "unavailable".
          opacity: isDisabled && !loading ? theme.state.disabledContent : 1,
          transform: [{ scale: press.scale }],
        },
        elevationStyle(elevation.action, held),
        style,
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? (named ? shown : undefined)}
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        disabled={isDisabled}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: spacing.sm,
          // Full width: §5's "minus `spacing.lg` each side" is the sticky
          // footer's own padding, not an inset this button carries — so the
          // CTA and the provider buttons beside it share one edge.
          minHeight: height,
          paddingHorizontal: spacing.lg,
          borderRadius: tokens.radius.full,
          overflow: 'hidden',
        }}
      >
        {brandAction ? (
          <Gradient
            colors={[brand.from, brand.to]}
            start={points.start}
            end={points.end}
            style={StyleSheet.absoluteFill}
          />
        ) : null}
        {named ? (
          // `tone` keeps the semantic slot honest; the inline colour is the
          // measured ink, checked against BOTH gradient stops rather than
          // against one flat colour.
          <TextV4 size="lg" weight="semibold" tone={on} style={{ color: ink }}>
            {shown}
          </TextV4>
        ) : null}
        {loading ? (
          <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            <SpinnerV4
              size="sm"
              style={{ borderColor: withAlpha(ink, BUSY_TRACK_MIX), borderTopColor: ink }}
            />
          </View>
        ) : trailingArrow ? (
          <IconV4 name={trailingIcon} size="base" color={on} style={{ color: ink }} />
        ) : null}
      </Pressable>
    </Animated.View>
  );
}
