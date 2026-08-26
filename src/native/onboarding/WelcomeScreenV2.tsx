import * as React from 'react';
import { Animated, Pressable, View, useWindowDimensions } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Text } from '../primitives';
import { GetStartedButton } from './GetStartedButton';
import { ProgressDots } from './ProgressDots';
import { useEnter } from '../primitives/internal/motion';
import type { WelcomeScreenProps } from './WelcomeScreen';

/** Drop-in for {@link WelcomeScreen} — identical props, different design. */
export type WelcomeScreenV2Props = WelcomeScreenProps;

/** 44×44 header tap targets (spec §2). Geometric — §10.1 permits the constant. */
const TAP_TARGET = 44;

/**
 * The editorial hero runs to the top edge and takes a little under half the
 * screen. Bigger than the base line's 38% cap because there is no panel inset
 * around it — the art IS the top of the screen (spec §11, V2).
 */
const HERO_HEIGHT_RATIO = 0.46;

/** The brand medallion promoted to hero size (spec §3). */
const HERO_MEDALLION = 104;

/** Comfortable measure for the subhead, ~60 characters (spec §4). */
const MEASURE_MAX_WIDTH = 420;

/**
 * First-launch welcome — V2, the **editorial** line.
 *
 * Where the base line insets the hero into a rounded panel below the header,
 * V2 runs it full-bleed to the very top edge and floats the header controls
 * over it, then lifts a `colors.surface` content sheet up over the bottom of
 * the art. The result reads like a magazine opener rather than a centred stack,
 * which is the whole point of the alternate: §11 asks the three lines to differ
 * in idea, not skin.
 *
 * Identical props to {@link WelcomeScreen}, including the §3 `illustration`
 * slot — with the same medallion fallback, so a screen that ships no artwork
 * still looks composed — and the same §5 sticky footer. Token-pure.
 */
export function WelcomeScreenV2({
  title,
  subtitle,
  logoGlyph,
  illustration,
  primaryLabel = 'Get started',
  onGetStarted,
  secondaryLabel,
  onSecondary,
  onBack,
  onDismiss,
  stepCount,
  stepIndex = 0,
  loading = false,
  style,
}: WelcomeScreenV2Props): React.ReactElement {
  const { colors, tokens, scheme } = useXenitionTheme();
  const { height } = useWindowDimensions();
  const enter = useEnter({ translateY: 14 });
  /*
    §3 asks for a `primary[50]` ground. `tokens.ramps` is not scheme-inverted
    the way the CSS variables are, so in dark mode step 50 would paint a
    near-white panel on a near-black page; the dark scheme takes the far end of
    the same ramp instead. Still a token, still the brand hue.
  */
  const heroGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];

  return (
    <View style={[{ flex: 1, backgroundColor: colors.surface }, style]}>
      {/* ── full-bleed hero, running to the top edge (§3 / §11 V2) ───── */}
      <View
        style={{
          height: height * HERO_HEIGHT_RATIO,
          backgroundColor: heroGround,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {illustration ?? (
          <View
            style={{
              width: HERO_MEDALLION,
              height: HERO_MEDALLION,
              borderRadius: tokens.radius.full,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.primary,
            }}
          >
            <Icon glyph={logoGlyph ?? '✦'} size="3xl" color="onPrimary" />
          </View>
        )}
      </View>

      {/* ── header floats OVER the art rather than sitting above it ──── */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.lg,
          paddingTop: tokens.spacing.lg,
        }}
      >
        {onBack ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={onBack}
            style={{ width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }}
          >
            <Icon name="chevron-left" size="xl" color="onSurface" />
          </Pressable>
        ) : (
          <View style={{ width: TAP_TARGET, height: TAP_TARGET }} />
        )}

        <View style={{ flex: 1 }}>
          {stepCount != null && stepCount > 0 ? (
            <ProgressDots variant="bars" count={stepCount} activeIndex={stepIndex} />
          ) : null}
        </View>

        {onDismiss ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Dismiss"
            onPress={onDismiss}
            style={{ width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }}
          >
            <Icon name="close" size="lg" color="muted" />
          </Pressable>
        ) : (
          <View style={{ width: TAP_TARGET, height: TAP_TARGET }} />
        )}
      </View>

      {/* ── the content sheet rising over the art (§11 V2) ───────────── */}
      <Animated.View
        style={{
          flex: 1,
          marginTop: -tokens.spacing.xl,
          paddingHorizontal: tokens.spacing.lg,
          paddingTop: tokens.spacing.xl,
          gap: tokens.spacing.sm,
          justifyContent: 'center',
          backgroundColor: colors.surface,
          borderTopLeftRadius: tokens.radius.lg,
          borderTopRightRadius: tokens.radius.lg,
          opacity: enter.opacity,
          transform: enter.transform,
        }}
      >
        <Text accessibilityRole="header" size="2xl" weight="bold" tone="onSurface" align="center" numberOfLines={2}>
          {title}
        </Text>
        {subtitle ? (
          <Text
            size="base"
            tone="muted"
            align="center"
            numberOfLines={3}
            style={{ maxWidth: MEASURE_MAX_WIDTH, alignSelf: 'center' }}
          >
            {subtitle}
          </Text>
        ) : null}
      </Animated.View>

      {/* ── sticky footer (§5) ───────────────────────────────────────── */}
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.surface,
          paddingHorizontal: tokens.spacing.lg,
          paddingTop: tokens.spacing.md,
          paddingBottom: tokens.spacing.lg,
          gap: tokens.spacing.sm,
        }}
      >
        <GetStartedButton label={primaryLabel} onPress={onGetStarted} loading={loading} />
        {secondaryLabel && onSecondary ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={secondaryLabel}
            onPress={onSecondary}
            style={{ alignItems: 'center', justifyContent: 'center', minHeight: TAP_TARGET }}
          >
            <Text size="base" weight="medium" tone="muted" align="center">
              {secondaryLabel}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
