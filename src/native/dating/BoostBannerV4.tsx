import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ButtonV4 } from '../primitives/ButtonV4';
import { TextV4 } from '../primitives/TextV4';
import { mixToken } from '../../primitives/internal/v4-depth';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { ACTION_SKIN } from './LikePassButtonsV4';
import { toneInk, type ToneV4 } from './internal/profile-v4';
import type { BoostBannerProps, BoostVariant } from './BoostBanner';

export interface BoostBannerV4Props extends BoostBannerProps {
  /** Name for the dismiss control. Default `'Dismiss'`. */
  dismissLabel?: string;
}

interface BoostSpec {
  glyph: string;
  tone: ToneV4;
  title: string;
  subtitle: string;
  cta: string;
}

/**
 * The three upsells.
 *
 * `premium` was `warn` — a status slot spent on an identity, so "Go Premium"
 * wore the same colour as "your payment failed". Identity is carried by the
 * glyph and the headline; the tone is brand or accent, never a status.
 */
const SPEC: Record<BoostVariant, BoostSpec> = {
  boost: {
    glyph: '⚡',
    tone: 'primary',
    title: 'Be seen first',
    subtitle: 'Boost your profile to the top for 30 minutes.',
    cta: 'Boost me',
  },
  superboost: {
    glyph: '🚀',
    tone: 'accent',
    title: 'Super Boost tonight',
    subtitle: 'Up to 100× more profile views during peak hours.',
    cta: 'Super Boost',
  },
  premium: {
    glyph: '★',
    tone: 'primary',
    title: 'Go Premium',
    subtitle: 'Unlimited likes, see who likes you, and more.',
    cta: 'Upgrade',
  },
};

/**
 * A live boost is the same skin, one step stronger — the countdown has to read
 * as a state the banner is *in*, not as the same offer with different words.
 */
const ACTIVE_TINT = 0.2;

/**
 * **V4 boost banner** — same props as {@link BoostBanner} plus
 * `dismissLabel`.
 *
 * ## Four changes
 *
 * 1. **`onDismiss` no longer deletes the CTA.** The base branched
 *    `onDismiss ? closeButton : ctaButton`, so a banner you could dismiss was
 *    a banner you could not act on — and `ctaLabel` was accepted, documented
 *    and silently discarded. Nothing said the two props were exclusive
 *    because nobody decided that they were. Both render.
 * 2. **The CTA can be pressed.** It was wrapped in `pointerEvents="none"` —
 *    still drawn, still announced as a button, inert to every tap. The whole
 *    card carried the press instead, which is the third change:
 * 3. **The banner is not a button with buttons inside it.** A `role="button"`
 *    container makes its children presentational on some readers and gives a
 *    switch-control user one target where there are two actions. The banner is
 *    a plain surface now; the CTA and the dismiss are the controls.
 * 4. **Dismiss is a real target.** It was a bare ✕ with `hitSlop={8}` — about
 *    18px of drawn control. It clears 44, presses with a state layer rather
 *    than an `opacity: 0.9`, and its tint is composited so the banner is the
 *    same colour on a card as on the page.
 */
export function BoostBannerV4({
  variant = 'boost',
  title,
  subtitle,
  ctaLabel,
  onPress,
  activeLabel,
  onDismiss,
  dismissLabel = 'Dismiss',
  style,
}: BoostBannerV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const spec = SPEC[variant];
  // The same tint-and-ring recipe the deck's action buttons wear, so an upsell
  // and the boost button it sells are visibly one thing.
  const skin = ACTION_SKIN(theme, spec.tone);
  const ink = toneInk(theme, spec.tone);
  const active = activeLabel != null;
  const line = active ? activeLabel : (subtitle ?? spec.subtitle);

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: skin.ring,
          // Composited, not `withAlpha`: an upsell shows up on a card, on the
          // page and inside a sheet, and a wash is a different colour on each.
          backgroundColor: active
            ? mixToken(colors.surface, skin.mix, ACTIVE_TINT)
            : skin.ground,
          padding: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          width: minTap(tokens.spacing),
          height: minTap(tokens.spacing),
          borderRadius: minTap(tokens.spacing) / 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: mixToken(colors.surface, skin.mix, ACTIVE_TINT),
        }}
      >
        <TextV4 size="xl" allowFontScaling={false}>
          {spec.glyph}
        </TextV4>
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <TextV4 accessibilityRole="header" size="base" weight="bold" tone="onSurface">
          {title ?? spec.title}
        </TextV4>
        <TextV4
          size="sm"
          numberOfLines={2}
          // A running countdown changes under the reader; say so politely.
          accessibilityLiveRegion={active ? 'polite' : 'none'}
          style={{ color: active ? ink : colors.mutedText }}
        >
          {line}
        </TextV4>
      </View>

      <ButtonV4 variant="primary" size="sm" onPress={onPress}>
        {ctaLabel ?? spec.cta}
      </ButtonV4>

      {onDismiss ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={dismissLabel}
          onPress={onDismiss}
          style={({ pressed }) => ({
            width: minTap(tokens.spacing),
            height: minTap(tokens.spacing),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: minTap(tokens.spacing) / 2,
            backgroundColor: pressed
              ? pressOver(theme, skin.ground, colors.onSurface)
              : 'transparent',
          })}
        >
          <TextV4 size="lg" tone="mutedText" allowFontScaling={false}>
            ✕
          </TextV4>
        </Pressable>
      ) : null}
    </View>
  );
}
