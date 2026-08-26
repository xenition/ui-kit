import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { mixToken } from '../../primitives/internal/v4-depth';
import { TINT, TONE_SLOTS } from '../../primitives/internal/feedback-v4';
import { ensureContrast } from '../../theme/color';
import { MIN_CONTRAST } from '../../theme/compile';
import { SpinnerV4 } from './SpinnerV4';
import type { StatusMessageProps, StatusMessageState } from './StatusMessage';

export type { StatusMessageProps as StatusMessageV4Props, StatusMessageState };

const DEFAULTS: Record<StatusMessageState, string> = {
  loading: 'Loading…',
  empty: 'Nothing here yet.',
  error: 'Something went wrong.',
};

/**
 * **V4 status message** — same props as {@link StatusMessage}, a different
 * design line.
 *
 * One component covering three of the states `design.md` §14 says every screen
 * owes the user. V4 treats them as three different jobs rather than three
 * colours of the same centred line of small grey text.
 *
 * ## `loading` — say only what is known
 *
 * `SpinnerV4` replaces the platform `ActivityIndicator`, which meant the base
 * could not honour Reduce Motion (§36.10) no matter what the user had set. The
 * spinner stays indeterminate: §36.7 forbids fabricating precision, and this
 * component has a message and nothing else — no fraction, no stages. A bar
 * here would be inventing a number.
 *
 * ## `empty` — an empty state that whispers is one the eye skips
 *
 * §15 is emphatic that an empty state must help the user progress: what belongs
 * here, why it matters, what to do next. The base rendered that copy in `muted`
 * at the small step — the *quietest* type in the kit for the one screen whose
 * entire purpose is to be read. V4 promotes it to `onSurface` at the base step.
 * Nothing else changes, because nothing else can: **these props carry no
 * action.** When an empty state has a next step, `ResultV4` is the component —
 * it takes `actionLabel`, and §15 is really a demand for a button.
 *
 * ## `error` — a failure needs a body
 *
 * The base drew red text in the middle of a void. Red text alone reads as a
 * caption; §38 asks an error to help recovery and it cannot do that unnoticed.
 * V4 gives it the feedback line's tinted panel — the `danger` tone composited
 * into `surface` at 10%, opaque so it holds its colour on any ground, with the
 * neutral hairline that says "container" (the tint already says which kind).
 * The label is the compiler's contrast-safe `dangerText`, re-measured against
 * that panel rather than against the page.
 */
export function StatusMessageV4({
  state,
  message,
  style,
}: StatusMessageProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const container: StyleProp<ViewStyle> = [
    {
      alignItems: 'center',
      justifyContent: 'center',
      gap: tokens.spacing.sm,
      paddingVertical: tokens.spacing.xl,
    },
    style,
  ];

  if (state === 'loading') {
    return (
      <View
        accessibilityLiveRegion="polite"
        accessibilityLabel={message ?? DEFAULTS.loading}
        style={container}
      >
        {/*
          The block already announces itself as a polite busy region, so the
          spinner is decoration to a screen reader — two "Loading" nodes in one
          live region is one announcement too many.
        */}
        <View importantForAccessibility="no-hide-descendants">
          <SpinnerV4 size="md" />
        </View>
        {message ? (
          <Text
            style={{
              fontFamily: tokens.typography.fontBody,
              fontSize: tokens.typography.scale.sm,
              color: colors.mutedText,
              textAlign: 'center',
            }}
          >
            {message}
          </Text>
        ) : null}
      </View>
    );
  }

  if (state === 'error') {
    const panel = mixToken(colors.surface, colors[TONE_SLOTS.danger.fill], TINT);
    return (
      <View accessibilityRole="alert" accessibilityLiveRegion="assertive" style={container}>
        <View
          style={{
            alignSelf: 'stretch',
            backgroundColor: panel,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.md,
            paddingVertical: tokens.spacing.md,
            paddingHorizontal: tokens.spacing.lg,
          }}
        >
          <Text
            style={{
              fontFamily: tokens.typography.fontBody,
              fontSize: tokens.typography.scale.sm,
              color: ensureContrast(colors[TONE_SLOTS.danger.text], panel, MIN_CONTRAST),
              textAlign: 'center',
            }}
          >
            {message ?? DEFAULTS.error}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={container}>
      {/*
        `onSurface` at the base step, not `muted` at the small one. §15 asks
        this copy to move the user forward; the base set it in the quietest
        type the kit has.
      */}
      <Text
        style={{
          fontFamily: tokens.typography.fontBody,
          fontSize: tokens.typography.scale.base,
          color: colors.onSurface,
          textAlign: 'center',
        }}
      >
        {message ?? DEFAULTS.empty}
      </Text>
    </View>
  );
}
