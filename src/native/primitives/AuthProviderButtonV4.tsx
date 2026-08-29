import * as React from 'react';
import { Animated, Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from './IconV4';
import { SpinnerV4 } from './SpinnerV4';
import { TextV4 } from './TextV4';
import type { AuthProviderButtonProps } from './AuthCard';
import { fieldMetrics } from './internal/field-v4';
import { usePressScale } from './internal/motion';
import { pressOver } from './internal/state-v4';

export interface AuthProviderButtonV4Props extends AuthProviderButtonProps {
  /**
   * Social sign-in leaves the app: a redirect, a browser sheet, a native
   * account picker. The gap between the tap and the hand-off is real, and
   * without a pending state a user taps "Continue with Google" twice. Shows a
   * spinner in the logo's place and blocks further presses.
   */
  loading?: boolean;
  /**
   * Logo only, no label — for a row of three or more providers side by side,
   * where full-width rows would push the footer off the fold.
   *
   * The label is not lost: it stays the button's accessibility label, so a
   * screen reader still announces "Continue with Google" and the control keeps
   * a square footprint at the field height.
   */
  compact?: boolean;
  /**
   * Whether the button fills its container. Default `true` — the base's
   * full-width rendering, and what §9's stacked provider list wants. Set
   * `false` to lay several out in a row.
   */
  fullWidth?: boolean;
}

/**
 * **V4 provider button** — one social/SSO action from
 * `ONBOARDING-DESIGN-SPEC.md` §9, in the V4 design line. Native twin of the web
 * `AuthProviderButtonV4`, at prop parity.
 *
 * ## Which control height this takes, and why
 *
 * §9 says "provider buttons at the same 56 height" as the CTA and the fields.
 * The Addendum overrules the number and keeps the sentence: control height is
 * `spacing['2xl']` (48) at `radius.md`, because `InputV4` shipped first at
 * those values and is the anchor every field is measured against, and because
 * 56 is not a step on the spacing scale.
 *
 * The instruction §9 was actually giving is *"the same height as the fields"*.
 * A provider button is stacked directly under the email and password fields
 * and the CTA, and the single biggest quality signal an auth screen can send
 * is that every edge in that stack lines up. So this control reads its metrics
 * from {@link fieldMetrics} — the very table `InputV4`, `SelectV4` and the
 * other nine form controls read — and the whole stack agrees by construction.
 *
 * That is also why there is no named `56` constant in this file: taking the
 * metric off the scale means there is no literal to name. A `sharp` seed gets
 * square provider buttons and a re-scaled seed re-scales the auth stack
 * together, neither of which a hard 56 could do.
 *
 * The base's `radius.full` pill is deliberately not carried over. A pill beside
 * a `radius.md` field reads as a different family, and §9's own point is that
 * the provider row is the *alternative to the form*, not a visitor from
 * another screen.
 *
 * ## The rest of it
 *
 * Outlined, never filled. §5 gives the screen exactly one dominant action and
 * the primary CTA is it; a filled provider button beside a filled CTA makes
 * the user choose between two equally loud options for the same goal. So this
 * is `surface` behind a hairline `border`, with the logo leading the label.
 *
 * Feedback is the M3 state layer ({@link pressOver}) — the press tints the
 * *container* at M3's opacity rather than dimming the control's own content,
 * which is the signal `0.38` is reserved for and which made the base's
 * `opacity: 0.85` press read like a half-disabled button. The layer is
 * flattened against `surface` because this button owns its fill and its label
 * is contrast-checked against it. Disabled is `state.disabledContent`, the same
 * 0.38 `ButtonV4` uses, so the CTA and the provider row grey out together.
 *
 * Motion is `usePressScale`, reduced-motion aware by construction (§36.10):
 * with Reduce Motion on the scale stays at 1 and the state layer carries the
 * feedback alone.
 */
export function AuthProviderButtonV4({
  label,
  glyph,
  name,
  loading = false,
  compact = false,
  fullWidth = true,
  disabled = false,
  onPress,
  style,
}: AuthProviderButtonV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const metrics = fieldMetrics(theme);
  const press = usePressScale();

  const isDisabled = disabled || loading;
  const hasMark = Boolean(glyph) || Boolean(name);

  return (
    <Animated.View
      style={[
        {
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          opacity: isDisabled ? theme.state.disabledContent : 1,
          transform: [{ scale: press.scale }],
        },
        style,
      ]}
    >
      <Pressable
        accessibilityRole="button"
        // The visible label is also the accessible name, and it is the *only*
        // name in `compact`. Set unconditionally so the two forms announce
        // identically.
        accessibilityLabel={label}
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        disabled={isDisabled}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: metrics.inner,
          height: metrics.height,
          minWidth: compact ? metrics.height : undefined,
          paddingHorizontal: compact ? tokens.spacing.md : tokens.spacing.lg,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: metrics.radius,
          backgroundColor:
            pressed && !isDisabled ? pressOver(theme, colors.surface) : colors.surface,
        })}
      >
        {loading ? (
          <View accessibilityElementsHidden>
            <SpinnerV4 size="sm" />
          </View>
        ) : hasMark ? (
          <IconV4 glyph={glyph} name={name} size="base" />
        ) : null}
        {compact ? null : (
          <TextV4 size="base" weight="semibold">
            {label}
          </TextV4>
        )}
      </Pressable>
    </Animated.View>
  );
}
