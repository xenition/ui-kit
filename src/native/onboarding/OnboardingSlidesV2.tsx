import * as React from 'react';
import { Animated, Pressable, View, useWindowDimensions } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Text } from '../primitives';
import { GetStartedButton } from './GetStartedButton';
import { ProgressDots } from './ProgressDots';
import { useEnter } from '../primitives/internal/motion';
import type { OnboardingSlidesProps } from './OnboardingSlides';
import type { OnboardingSlide } from './types';

/** Drop-in for {@link OnboardingSlides} — identical props, different design. */
export type OnboardingSlidesV2Props = OnboardingSlidesProps;

/** 44×44 header tap targets (spec §2). Geometric — §10.1 permits the constant. */
const TAP_TARGET = 44;

/**
 * The editorial hero runs to the top edge and takes a little under half the
 * screen — bigger than the base line's 38% cap because nothing insets it
 * (spec §11, V2).
 */
const HERO_HEIGHT_RATIO = 0.46;

/** The slide glyph promoted to hero size (spec §3). */
const HERO_MEDALLION = 104;

/** Comfortable measure for the description, ~60 characters (spec §4). */
const MEASURE_MAX_WIDTH = 420;

/**
 * The hero + copy for a single slide, isolated so a `key={slide.id}` remount
 * re-runs {@link useEnter} and cross-fades on every advance.
 */
function SlideBody({
  slide,
  illustration,
  heroHeight,
  heroGround,
}: {
  slide: OnboardingSlide;
  illustration?: React.ReactNode;
  heroHeight: number;
  heroGround: string;
}): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 10 });

  return (
    <>
      {/* Full-bleed art running to the top edge — the header floats over it. */}
      <Animated.View
        style={{
          height: heroHeight,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: heroGround,
          overflow: 'hidden',
          opacity: enter.opacity,
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
            <Icon glyph={slide.icon ?? '✦'} size="3xl" color="onPrimary" />
          </View>
        )}
      </Animated.View>

      {/* The content sheet rising over the bottom of the art. */}
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
          {slide.title}
        </Text>
        {slide.description ? (
          <Text
            size="base"
            tone="muted"
            align="center"
            numberOfLines={3}
            style={{ maxWidth: MEASURE_MAX_WIDTH, alignSelf: 'center' }}
          >
            {slide.description}
          </Text>
        ) : null}
      </Animated.View>
    </>
  );
}

/**
 * Onboarding intro — V2, the **editorial** line.
 *
 * Same shell as {@link OnboardingSlides} — header · hero · headline · sticky
 * footer — but the hero is not a panel sitting under the header: it runs
 * full-bleed to the very top edge, the header controls float over it, and a
 * `colors.surface` content sheet lifts up over the bottom of the art. Each
 * advance remounts the body so the art and copy cross-fade in together.
 *
 * Identical props to {@link OnboardingSlides}, including the §3 `illustration`
 * slot and its medallion fallback. Same controlled/uncontrolled indexing and
 * clamping; an empty list is guarded. Token-pure.
 */
export function OnboardingSlidesV2({
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
}: OnboardingSlidesV2Props): React.ReactElement {
  const { colors, tokens, scheme } = useXenitionTheme();
  const { height } = useWindowDimensions();
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
  const heroGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];
  const showBack = onBack != null || !isFirst;

  return (
    <View style={[{ flex: 1, backgroundColor: colors.surface }, style]}>
      <SlideBody
        key={slide.id}
        slide={slide}
        illustration={illustration}
        heroHeight={height * HERO_HEIGHT_RATIO}
        heroGround={heroGround}
      />

      {/* ── header floats OVER the art (§1, §2) ──────────────────────── */}
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
