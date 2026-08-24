import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { OnboardingSlidesProps } from './OnboardingSlides';

/** Drop-in for {@link OnboardingSlides} — identical props, different design. */
export type OnboardingSlidesV3Props = OnboardingSlidesProps;

/**
 * Onboarding intro — V3. A minimal, text-forward take: a slim top progress bar
 * (fraction of slides completed) with a "Skip" link, centered headline/body, and
 * a Back / Next(Done) control pair at the base. No hero medallion — quieter and
 * faster to read. Same indexing/clamping and empty guard as
 * {@link OnboardingSlides}. Token-pure.
 */
export function OnboardingSlidesV3({
  slides,
  index,
  onIndexChange,
  onSkip,
  onComplete,
  showSkip = true,
  finishLabel = 'Get started',
  style,
}: OnboardingSlidesV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
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

  const filled = active + 1;
  const remaining = Math.max(0, count - filled);

  return (
    <View
      style={[
        { flex: 1, paddingHorizontal: tokens.spacing.xl, paddingVertical: tokens.spacing.lg, backgroundColor: colors.surface },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <View
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: count, now: filled }}
          style={{
            flex: 1,
            flexDirection: 'row',
            height: 4,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.primary, 0.14),
            overflow: 'hidden',
          }}
        >
          <View style={{ flex: filled, height: 4, borderRadius: tokens.radius.full, backgroundColor: colors.primary }} />
          {remaining > 0 ? <View style={{ flex: remaining }} /> : null}
        </View>
        {showSkip ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Skip intro"
            onPress={onSkip}
            hitSlop={tokens.spacing.sm}
          >
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              Skip
            </Text>
          </Pressable>
        ) : null}
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.md }}>
        <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '700', letterSpacing: 1 }}>
          {`STEP ${active + 1} / ${count}`}
        </Text>
        <Text
          accessibilityRole="header"
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale['2xl'],
            fontWeight: '700',
            textAlign: 'center',
          }}
        >
          {slide.title}
        </Text>
        {slide.description ? (
          <Text
            style={{
              color: colors.muted,
              fontSize: tokens.typography.scale.base,
              textAlign: 'center',
              lineHeight: tokens.typography.scale.base * 1.6,
            }}
          >
            {slide.description}
          </Text>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <Button
          variant="ghost"
          size="lg"
          onPress={() => goTo(active - 1)}
          disabled={isFirst}
          accessibilityLabel="Previous slide"
          style={{ flex: 1 }}
        >
          Back
        </Button>
        <Button
          variant="primary"
          size="lg"
          onPress={onNext}
          accessibilityLabel={isLast ? finishLabel : 'Next slide'}
          style={{ flex: 1 }}
        >
          {isLast ? finishLabel : 'Next'}
        </Button>
      </View>
    </View>
  );
}
