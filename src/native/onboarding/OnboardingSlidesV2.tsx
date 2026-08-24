import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button, Icon } from '../primitives';
import { ProgressDots } from './ProgressDots';
import { useEnter } from '../primitives/internal/motion';
import { withAlpha } from '../primitives/internal/color';
import type { OnboardingSlidesProps } from './OnboardingSlides';
import type { OnboardingSlide } from './types';

/** Drop-in for {@link OnboardingSlides} — identical props, different design. */
export type OnboardingSlidesV2Props = OnboardingSlidesProps;

/**
 * The hero + copy for a single slide, isolated so a `key={slide.id}` remount
 * re-runs {@link useEnter} and cross-fades on every advance.
 */
function SlideHero({ slide }: { slide: OnboardingSlide }): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 10 });
  return (
    <>
      {/* Full-bleed illustration hero: a large tinted stage filling the top. */}
      <Animated.View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(colors.primary, 0.1),
          opacity: enter.opacity,
        }}
      >
        <View
          style={{
            width: 160,
            height: 160,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(colors.primary, 0.16),
          }}
        >
          <Icon glyph={slide.icon ?? '✦'} size={96} color="primaryText" />
        </View>
      </Animated.View>

      <Animated.View
        style={{
          paddingHorizontal: tokens.spacing.xl,
          paddingTop: tokens.spacing.xl,
          gap: tokens.spacing.sm,
          opacity: enter.opacity,
          transform: enter.transform,
        }}
      >
        <Text
          accessibilityRole="header"
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale['3xl'],
            fontWeight: '800',
            textAlign: 'center',
          }}
        >
          {slide.title}
        </Text>
        {slide.description ? (
          <Text
            style={{
              color: colors.muted,
              fontSize: tokens.typography.scale.lg,
              textAlign: 'center',
              lineHeight: tokens.typography.scale.lg * 1.5,
            }}
          >
            {slide.description}
          </Text>
        ) : null}
      </Animated.View>
    </>
  );
}

/**
 * Onboarding intro — V2. A full-bleed illustration hero fills the top of the
 * screen per slide, with the headline/description below and a pinned footer of
 * {@link ProgressDots} plus a big Next/Done button. Same controlled/uncontrolled
 * indexing and clamping as {@link OnboardingSlides}; empty list guarded. Token-pure.
 */
export function OnboardingSlidesV2({
  slides,
  index,
  onIndexChange,
  onSkip,
  onComplete,
  showSkip = true,
  finishLabel = 'Get started',
  style,
}: OnboardingSlidesV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [internal, setInternal] = React.useState(0);
  const count = slides.length;

  const controlled = index != null;
  const rawActive = controlled ? index : internal;
  const active = count === 0 ? 0 : Math.min(Math.max(0, rawActive), count - 1);
  const isLast = active >= count - 1;

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

  if (count === 0) {
    return (
      <View
        accessibilityRole="summary"
        style={[{ padding: tokens.spacing.xl, alignItems: 'center' }, style]}
      >
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>
          Nothing to show yet.
        </Text>
      </View>
    );
  }

  const slide = slides[active];
  if (!slide) return <></>;

  return (
    <View style={[{ flex: 1, backgroundColor: colors.surface }, style]}>
      {showSkip ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Skip intro"
          onPress={onSkip}
          hitSlop={tokens.spacing.sm}
          style={{
            position: 'absolute',
            top: tokens.spacing.lg,
            right: tokens.spacing.lg,
            zIndex: 1,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.onSurface, 0.06),
          }}
        >
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            Skip
          </Text>
        </Pressable>
      ) : null}

      <SlideHero key={slide.id} slide={slide} />

      <View
        style={{
          paddingHorizontal: tokens.spacing.xl,
          paddingBottom: tokens.spacing.xl,
          paddingTop: tokens.spacing.lg,
          gap: tokens.spacing.lg,
          alignItems: 'center',
        }}
      >
        <ProgressDots count={count} activeIndex={active} onDotPress={goTo} />
        <Button
          variant="primary"
          size="lg"
          onPress={onNext}
          accessibilityLabel={isLast ? finishLabel : 'Next slide'}
          style={{ alignSelf: 'stretch' }}
        >
          {isLast ? finishLabel : 'Next'}
        </Button>
      </View>
    </View>
  );
}
