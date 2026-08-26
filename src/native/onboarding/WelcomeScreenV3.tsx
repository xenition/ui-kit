import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Text } from '../primitives';
import { GetStartedButton } from './GetStartedButton';
import { ProgressDots } from './ProgressDots';
import type { WelcomeScreenProps } from './WelcomeScreen';

/** Drop-in for {@link WelcomeScreen} — identical props, different design. */
export type WelcomeScreenV3Props = WelcomeScreenProps;

/** 44×44 header tap targets (spec §2). Geometric — §10.1 permits the constant. */
const TAP_TARGET = 44;

/**
 * The compact line has no hero panel; the brand mark shrinks to a leading badge
 * beside the headline (spec §11, V3). 44 is the same tap-target module the
 * header controls use, so the three sit on one grid.
 */
const LEADING_BADGE = 44;

/** Comfortable measure for the subhead, ~60 characters (spec §4). */
const MEASURE_MAX_WIDTH = 420;

/**
 * First-launch welcome — V3, the **compact** line.
 *
 * No hero panel at all. The brand mark drops to a small leading badge beside
 * the headline and the whole screen collapses to header · title row · sticky
 * footer, for a bottom-sheet presentation or a short screen where a 38%-tall
 * illustration would push the CTA off the fold. That is the §11 idea: the three
 * lines differ in what they *are*, not in how they are painted.
 *
 * Identical props to {@link WelcomeScreen}. An `illustration` is still honoured
 * (§3) — it just occupies the leading badge rather than a hero panel, clipped
 * to the badge's circle — and the medallion is the fallback when there is none,
 * so an empty hero slot still reads as composed. Token-pure.
 */
export function WelcomeScreenV3({
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
}: WelcomeScreenV3Props): React.ReactElement {
  const { colors, tokens, scheme } = useXenitionTheme();
  /*
    §3's `primary[50]` ground, read for the dark scheme too: `tokens.ramps` is
    not scheme-inverted, so 50 would be near-white on a near-black page.
  */
  const badgeGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];

  return (
    <View style={[{ flex: 1, backgroundColor: colors.surface }, style]}>
      {/* ── header: back · progress · dismiss (§1) ───────────────────── */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.lg,
          paddingTop: tokens.spacing.md,
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

      {/* ── headline row: leading badge beside the copy (§11 V3) ─────── */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: tokens.spacing.lg,
          paddingVertical: tokens.spacing.md,
          gap: tokens.spacing.md,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          <View
            style={{
              width: LEADING_BADGE,
              height: LEADING_BADGE,
              borderRadius: tokens.radius.full,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              backgroundColor: illustration ? badgeGround : colors.primary,
            }}
          >
            {illustration ?? <Icon glyph={logoGlyph ?? '✦'} size="xl" color="onPrimary" />}
          </View>
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            <Text accessibilityRole="header" size="2xl" weight="bold" tone="onSurface" numberOfLines={2}>
              {title}
            </Text>
            {subtitle ? (
              <Text size="base" tone="muted" numberOfLines={3} style={{ maxWidth: MEASURE_MAX_WIDTH }}>
                {subtitle}
              </Text>
            ) : null}
          </View>
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
