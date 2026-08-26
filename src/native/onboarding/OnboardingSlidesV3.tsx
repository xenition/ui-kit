import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Text } from '../primitives';
import { GetStartedButton } from './GetStartedButton';
import { ProgressDots } from './ProgressDots';
import type { OnboardingSlidesProps } from './OnboardingSlides';

/** Drop-in for {@link OnboardingSlides} — identical props, different design. */
export type OnboardingSlidesV3Props = OnboardingSlidesProps;

/** 44×44 header tap targets (spec §2). Geometric — §10.1 permits the constant. */
const TAP_TARGET = 44;

/**
 * The compact line has no hero panel; the slide glyph shrinks to a leading
 * badge beside the headline (spec §11, V3), on the same 44 module as the header
 * controls.
 */
const LEADING_BADGE = 44;

/** Comfortable measure for the description, ~60 characters (spec §4). */
const MEASURE_MAX_WIDTH = 420;

/**
 * Onboarding intro — V3, the **compact** line.
 *
 * No hero panel. The slide glyph drops to a small leading badge beside the
 * headline and the screen collapses to header · title row · sticky footer — for
 * a sheet presentation, or a short intro where a 38%-tall illustration would
 * push the CTA off the fold. Same shell, different idea (§11), not a reskin.
 *
 * The "STEP 1 / 3" caption this line used to carry is gone: §2 replaced it with
 * the header's segmented bars, which say the same thing without asking anyone
 * to read 12px of tracking-heavy uppercase.
 *
 * Identical props to {@link OnboardingSlides}. An `illustration` is honoured
 * (§3) — it takes the leading badge rather than a hero panel — and the slide
 * glyph is the fallback. Same indexing/clamping and empty guard. Token-pure.
 */
export function OnboardingSlidesV3({
  slides,
  index,
  onIndexChange,
  onSkip,
  onComplete,
  illustration,
  onBack,
  showSkip = true,
  finishLabel = 'Get started',
  style,
}: OnboardingSlidesV3Props): React.ReactElement {
  const { colors, tokens, scheme } = useXenitionTheme();
  const [internal, setInternal] = React.useState(0);
  const count = slides.length;

  const controlled = index != null;
  const rawActive = controlled ? index : internal;
  const active = count === 0 ? 0 : Math.min(Math.max(0, rawActive), count - 1);
  const isLast = active >= count - 1;
  const isFirst = active <= 0;

  const goTo = (next: number): void => {
    const clamped = Math.min(Math.max(0, next), Math.max(0, count - 1));
    if (!controlled) setInternal(clamped);
    onIndexChange?.(clamped);
  };

  const onNext = (): void => {
    if (isLast) {
      onComplete?.();
      return;
    }
    goTo(active + 1);
  };

  const goBack = (): void => {
    if (onBack) {
      onBack();
      return;
    }
    goTo(active - 1);
  };

  if (count === 0) {
    return (
      <View
        accessibilityRole="summary"
        style={[{ padding: tokens.spacing.xl, alignItems: 'center' }, style]}
      >
        <Text size="base" tone="muted" align="center">
          Nothing to show yet.
        </Text>
      </View>
    );
  }

  const slide = slides[active];
  if (!slide) return <></>;

  /* See {@link OnboardingSlides}: `tokens.ramps` is not scheme-inverted. */
  const badgeGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];
  const showBack = onBack != null || !isFirst;

  return (
    <View style={[{ flex: 1, backgroundColor: colors.surface }, style]}>
      {/* ── header: back · progress bars · dismiss (§1, §2) ──────────── */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.lg,
          paddingTop: tokens.spacing.md,
        }}
      >
        {showBack ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Previous slide"
            onPress={goBack}
            style={{ width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }}
          >
            <Icon name="chevron-left" size="xl" color="onSurface" />
          </Pressable>
        ) : (
          <View style={{ width: TAP_TARGET, height: TAP_TARGET }} />
        )}

        <View style={{ flex: 1 }}>
          <ProgressDots variant="bars" count={count} activeIndex={active} />
        </View>

        {showSkip ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Skip intro"
            onPress={onSkip}
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
            {illustration ?? <Icon glyph={slide.icon ?? '✦'} size="xl" color="onPrimary" />}
          </View>
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            <Text accessibilityRole="header" size="2xl" weight="bold" tone="onSurface" numberOfLines={2}>
              {slide.title}
            </Text>
            {slide.description ? (
              <Text size="base" tone="muted" numberOfLines={3} style={{ maxWidth: MEASURE_MAX_WIDTH }}>
                {slide.description}
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
        }}
      >
        <GetStartedButton
          label={isLast ? finishLabel : 'Next'}
          accessibilityLabel={isLast ? finishLabel : 'Next slide'}
          onPress={onNext}
        />
      </View>
    </View>
  );
}
