import * as React from 'react';
import { Animated, Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CheckboxV4 } from './CheckboxV4';
import { TextV4 } from './TextV4';
import { FIELD_MOTION } from './internal/field-v4';
import { minTap } from './internal/nav-v4';
import { pressLayer, stateLayer } from './internal/state-v4';
import { useReducedMotion } from './internal/useReducedMotion';
import {
  AUTH_DEFAULT_TERMS_LINKS,
  type AuthTermsCardProps,
  type AuthTermsLink,
} from './AuthCard';

export type { AuthTermsLink };
export { AUTH_DEFAULT_TERMS_LINKS };

/** Where the box sits against copy that runs to more than one line. */
export type AuthTermsCardV4Align = 'center' | 'top';

export interface AuthTermsCardV4Props extends AuthTermsCardProps {
  /**
   * A quiet supporting line under the consent sentence — "You can withdraw
   * consent at any time", a data-retention note, whatever the jurisdiction
   * asks for.
   *
   * Additive and optional: with it absent the card is exactly the one-line
   * consent §9 describes.
   */
  description?: string;
  /**
   * Where the checkbox sits when the copy wraps. `'center'` (the default, and
   * the base's behaviour) keeps a one-line consent optically balanced;
   * `'top'` is right once a `description` or a long sentence pushes the copy
   * to three lines and a vertically centred box starts to look adrift.
   */
  align?: AuthTermsCardV4Align;
  /**
   * Whether pressing the card's copy toggles the box. Default `true`.
   *
   * The whole point of the bordered card is that the consent is one object,
   * so the whole object should be the target — a 20pt square is a cruel thing
   * to ask a thumb to find. The wrapper is deliberately `accessible={false}`:
   * it is a touch convenience, not a second control, and the `CheckboxV4`
   * inside stays the one thing a screen reader announces and toggles.
   */
  pressToToggle?: boolean;
}

/**
 * **V4 terms consent** — the native twin of the web `AuthTermsCardV4`, the same
 * props as {@link AuthTermsCard} plus three additive ones, a different design
 * line.
 *
 * `ONBOARDING-DESIGN-SPEC.md` §9 asks the register screen for a terms
 * "checkbox in a bordered card with the two links inline", with the CTA
 * disabled until the box is ticked. That last part is why this component
 * matters more than its size suggests: it is the one control standing between
 * a user and the end of the funnel, so if it is hard to find, hard to hit, or
 * reads as an error, the sign-up stops there.
 *
 * What the V4 line changes:
 *
 * 1. **It answers.** The base card looked identical ticked and unticked — only
 *    the 20pt box changed, and the user's own thumb was on top of it. V4 moves
 *    the border to `colors.primary` and cross-fades in the M3 `hover` state
 *    layer of the brand behind the copy, so the change is visible from the far
 *    side of the card. It is a tint, not a fill: this is a consent, not a
 *    selected plan, and §7's filled treatment would make it shout. The fade
 *    runs on the native driver in {@link FIELD_MOTION}ms — the same duration
 *    the tick inside it takes — and under Reduce Motion it lands on the final
 *    value on the first frame (§36.10): the state is never something you have
 *    to wait to see.
 * 2. **The whole card is the target.** `pressToToggle` makes the card itself
 *    press, taking the tap area from one small square to the full card.
 * 3. **The links are real targets.** This is the one place the twins diverge
 *    in construction rather than in props. The web can leave an inline
 *    `<button>` in flowing text and expand its hit area with an absolute
 *    `::after`; React Native has no equivalent — a nested `<Text onPress>` is
 *    exactly as tall as its own line, which is about half the platform floor,
 *    and `Text` takes no `hitSlop`. So the sentence is laid out as a
 *    **wrapping row** — the same `flexWrap` §7 insists on for chips — with the
 *    lead-in copy and every link in a box a full `minTap()` tall. It still
 *    reads as one inline sentence; every part of it can now actually be hit.
 *    §46, accessibility before tidiness.
 * 4. **It composes V4 children.** `CheckboxV4` and `TextV4`, never the bases
 *    (§10.5) — so the tick, the press halo and the type scale here are the
 *    ones the rest of the V4 register screen is using.
 *
 * The empty states §12 asks about all hold: `links={[]}` renders the lead-in
 * copy alone with no dangling separator, no `error` renders no message row,
 * and no `description` renders the single-line card the base drew.
 *
 * No gradient, no glass, no shadow. §16 asks that forms stay minimal, and the
 * one thing on this card that should catch the eye is whether the box is
 * ticked.
 */
export function AuthTermsCardV4({
  checked = false,
  onCheckedChange,
  label = 'I agree to the',
  links = AUTH_DEFAULT_TERMS_LINKS,
  onLinkPress,
  separator = 'and',
  description,
  align = 'center',
  pressToToggle = true,
  error,
  disabled = false,
  style,
}: AuthTermsCardV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const reduced = useReducedMotion();
  const invalid = Boolean(error);

  /** The floor for anything incidental a thumb has to find — 44 at the kit's scale. */
  const tap = minTap(tokens.spacing);

  /*
    The card only ever tints in the brand slot, or in `danger` once there is a
    real error to report. It must not read as a warning for the ordinary state
    of being untouched, which is what a red card before submission would say.
  */
  const tint = invalid ? colors.danger : colors.primary;

  const on = React.useRef(new Animated.Value(checked || invalid ? 1 : 0)).current;
  // A card that animates into its initial state is an entrance animation,
  // which §36.1 asks us not to replay; the first pass only records where we
  // already are, so only a real change is worth moving for.
  const mounted = React.useRef(false);
  React.useEffect(() => {
    const to = checked || invalid ? 1 : 0;
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
  }, [checked, invalid, reduced, on]);

  const card: ViewStyle = {
    flexDirection: 'row',
    alignItems: align === 'top' ? 'flex-start' : 'center',
    gap: tokens.spacing.sm,
    padding: tokens.spacing.md,
    borderWidth: 1,
    borderColor: invalid ? colors.danger : checked ? colors.primary : colors.border,
    borderRadius: tokens.radius.lg,
    backgroundColor: colors.surface,
    // The tint is a layer rather than the card's own `backgroundColor` so it
    // can cross-fade on the native driver; clipping keeps it inside the radius.
    overflow: 'hidden',
    opacity: disabled ? theme.state.disabledContent : 1,
  };

  /** One box on the sentence row, all of them the same height so baselines agree. */
  const cell: ViewStyle = { minHeight: tap, justifyContent: 'center' };

  const body = (
    <>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: stateLayer(theme, 'hover', tint), opacity: on },
        ]}
      />
      <CheckboxV4
        checked={checked}
        onCheckedChange={onCheckedChange}
        invalid={invalid}
        disabled={disabled}
        accessibilityLabel={label}
      />
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: tokens.spacing.xs,
          }}
        >
          <View style={cell}>
            <TextV4 size="sm" tone="mutedText">
              {label}
            </TextV4>
          </View>
          {links.map((link, i) => (
            <React.Fragment key={link.id}>
              {/*
                The joining word is its own cell in front of the link it joins
                to, so a card with `links={[]}` ends at the lead-in copy and a
                card with one link never shows a separator at all (§12).
              */}
              {i > 0 ? (
                <View style={cell}>
                  <TextV4 size="sm" tone="mutedText">
                    {separator}
                  </TextV4>
                </View>
              ) : null}
              <Pressable
                accessibilityRole="link"
                accessibilityLabel={link.label}
                disabled={disabled}
                onPress={() => onLinkPress?.(link.id)}
                style={({ pressed }) => ({
                  ...cell,
                  borderRadius: tokens.radius.sm,
                  backgroundColor: pressed ? pressLayer(theme) : 'transparent',
                })}
              >
                <TextV4 size="sm" weight="semibold" tone="primaryText">
                  {link.label}
                </TextV4>
              </Pressable>
            </React.Fragment>
          ))}
        </View>
        {description !== undefined ? (
          <TextV4 size="xs" tone="mutedText">
            {description}
          </TextV4>
        ) : null}
      </View>
    </>
  );

  return (
    <View style={[{ gap: tokens.spacing.xs }, style]}>
      {pressToToggle ? (
        <Pressable
          // A touch convenience, not a second control: the `CheckboxV4` inside
          // is the thing a screen reader announces, and the links stay
          // individually reachable because this wrapper does not merge them.
          accessible={false}
          disabled={disabled}
          onPress={() => onCheckedChange?.(!checked)}
          style={card}
        >
          {body}
        </Pressable>
      ) : (
        <View style={card}>{body}</View>
      )}
      {error ? (
        <TextV4 size="sm" tone="dangerText" accessibilityRole="alert">
          {error}
        </TextV4>
      ) : null}
    </View>
  );
}
