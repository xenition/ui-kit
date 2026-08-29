import * as React from 'react';
import {
  Pressable,
  View,
  useWindowDimensions,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Text } from '../primitives';
import { GetStartedButton } from './GetStartedButton';
import { ProgressDots } from './ProgressDots';

export type WelcomeScreenVariant = 'centered' | 'bottomSheet';

export interface WelcomeScreenProps {
  /** Product/brand name shown as the hero headline. */
  title: string;
  /** Supporting value line under the title. */
  subtitle?: string;
  /** Optional emoji/glyph for the brand medallion. */
  logoGlyph?: string;
  /**
   * Artwork for the hero slot (onboarding spec §3) — an `<Image>`, an SVG, a
   * Lottie, whatever the app ships. The kit ships no artwork and must not, so
   * when this is omitted the {@link logoGlyph} medallion is promoted to hero
   * size instead: an empty hero slot still looks composed, never like a hole.
   */
  illustration?: React.ReactNode;
  /** Primary CTA copy. Default `'Get started'`. */
  primaryLabel?: string;
  /** Fires on the primary CTA. */
  onGetStarted?: () => void;
  /** Secondary link copy (e.g. `'I already have an account'`). */
  secondaryLabel?: string;
  /** Fires on the secondary link. Hidden when omitted. */
  onSecondary?: () => void;
  /**
   * Back affordance in the header (spec §1). Omit on the first screen of a
   * flow — there is nothing to go back to and a dead chevron is worse than no
   * chevron.
   */
  onBack?: () => void;
  /**
   * Dismiss affordance in the header (spec §1). Omit in a mandatory flow the
   * user is not allowed to escape.
   */
  onDismiss?: () => void;
  /**
   * Total steps in the surrounding flow. When set, the header carries the
   * segmented progress bars (spec §2). Omit for a standalone welcome.
   */
  stepCount?: number;
  /** Zero-based position within {@link stepCount}. Default `0`. */
  stepIndex?: number;
  /** Show a spinner on the primary CTA while an async step runs. */
  loading?: boolean;
  /** `'bottomSheet'` left-aligns for a sheet presentation. Default `'centered'`. */
  variant?: WelcomeScreenVariant;
  style?: StyleProp<ViewStyle>;
}

/**
 * Header controls keep a 44×44 tap target even though the glyph inside is small
 * (spec §2). Geometric, so §10.1 permits the bare number as a named constant.
 */
const TAP_TARGET = 44;

/** The hero panel is roughly 4:3 (spec §3). */
const HERO_ASPECT = 4 / 3;

/**
 * …and is capped at ~38% of screen height, so the CTA never leaves the fold on
 * a small phone (spec §3).
 */
const HERO_MAX_HEIGHT_RATIO = 0.38;

/** The brand medallion promoted to hero size (spec §3). */
const HERO_MEDALLION = 96;

/**
 * A comfortable measure for the subhead — roughly 60 characters. Without it the
 * value line runs the full width of a tablet and stops being readable (spec §4).
 */
const MEASURE_MAX_WIDTH = 420;

/**
 * First-launch welcome — the screen that establishes the onboarding shell.
 *
 * What shipped before was three things stacked in the middle of a grey page: a
 * medallion, a headline, a button. No hero, no header, no footer, no rhythm.
 * This is the anatomy from §1 of the onboarding spec, top to bottom:
 *
 * 1. **header** — back · segmented progress · dismiss, each optional, each a
 *    44×44 tap target;
 * 2. **hero slot** — the caller's `illustration`, or the `logoGlyph` medallion
 *    at hero size, on a tinted 4:3 panel capped at 38% of the screen;
 * 3. **headline block** — centred, `2xl` bold over a muted value line held to a
 *    readable measure;
 * 4. **sticky footer** — the 56-tall `radius.full` {@link GetStartedButton}
 *    with a trailing arrow, and any secondary action BELOW it as a centred
 *    muted link, never beside it competing for the same weight.
 *
 * Every part is optional and the screen composes without any of them: no
 * illustration, no subtitle, no header controls, no secondary action. The
 * `bottomSheet` variant left-aligns the headline block for a sheet
 * presentation — the one place §4 allows it. Every color/spacing traces to a
 * token. No literal colors.
 */
export function WelcomeScreen({
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
  variant = 'centered',
  style,
}: WelcomeScreenProps): React.ReactElement {
  const { colors, tokens, scheme } = useXenitionTheme();
  const { height } = useWindowDimensions();
  /*
    §3 asks for a `primary[50]` ground under the hero. `tokens.ramps` is not
    scheme-inverted the way the CSS variables are — 50 is the light end of the
    ramp in both schemes — so in dark mode the literal reading of the spec would
    paint a near-white panel on a near-black page. The dark scheme takes the
    other end of the same ramp instead: still a token, still the brand hue,
    still a quiet tint against its own surface.
  */
  const heroGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];
  const centered = variant === 'centered';
  const align = centered ? 'center' : 'left';

  return (
    <View style={[{ flex: 1, backgroundColor: colors.surface }, style]}>
      {/* ── header: back · progress · dismiss (§1) ───────────────────── */}
      <View
        style={{
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
            style={{
              width: TAP_TARGET,
              height: TAP_TARGET,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="chevron-left" size="xl" color="onSurface" />
          </Pressable>
        ) : (
          // A spacer, not a missing element — otherwise the progress bars slide
          // left the moment a back button appears.
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
            style={{
              width: TAP_TARGET,
              height: TAP_TARGET,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="close" size="lg" color="muted" />
          </Pressable>
        ) : (
          <View style={{ width: TAP_TARGET, height: TAP_TARGET }} />
        )}
      </View>

      {/* ── hero slot + headline block (§3, §4) ──────────────────────── */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: centered ? 'center' : 'flex-start',
          paddingHorizontal: tokens.spacing.lg,
          gap: tokens.spacing.lg,
        }}
      >
        <View
          style={{
            alignSelf: 'stretch',
            aspectRatio: HERO_ASPECT,
            maxHeight: height * HERO_MAX_HEIGHT_RATIO,
            borderRadius: tokens.radius.lg,
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

        <View style={{ alignSelf: 'stretch', gap: tokens.spacing.sm }}>
          <Text
            accessibilityRole="header"
            size="2xl"
            weight="bold"
            tone="onSurface"
            align={align}
            numberOfLines={2}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text
              size="base"
              tone="muted"
              align={align}
              numberOfLines={3}
              style={{
                maxWidth: MEASURE_MAX_WIDTH,
                alignSelf: centered ? 'center' : 'flex-start',
              }}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>

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
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: TAP_TARGET,
            }}
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
