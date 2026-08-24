import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button, Icon } from '../primitives';
import { ProgressDots } from './ProgressDots';
import type { OnboardingSlide } from './types';

export type OnboardingSlidesVariant = 'default' | 'minimal';

export interface OnboardingSlidesProps {
  /** Ordered intro slides. An empty list renders the empty state. */
  slides: OnboardingSlide[];
  /** Controlled active index. Omit to let the component own its position. */
  index?: number;
  /** Fires with the next index whenever the slide changes. */
  onIndexChange?: (index: number) => void;
  /** Fires when the user taps "Skip". */
  onSkip?: () => void;
  /** Fires when the user advances past the final slide ("Done"). */
  onComplete?: () => void;
  /** Show the "Skip" affordance. Default `true`. */
  showSkip?: boolean;
  /** Label for the final-slide primary action. Default `'Get started'`. */
  finishLabel?: string;
  /** `'minimal'` drops the hero medallion for a text-only intro. */
  variant?: OnboardingSlidesVariant;
  style?: StyleProp<ViewStyle>;
}

/**
 * Paged intro carousel — the first-run "here's the value" sequence
 * (design.md §41-42). Renders one {@link OnboardingSlide} at a time with a
 * hero medallion, a {@link ProgressDots} indicator, a "Skip" escape hatch and a
 * Next/Done primary action that walks to `onComplete` on the last slide. Works
 * controlled (`index` + `onIndexChange`) or uncontrolled. All indexing is
 * clamped so an out-of-range `index` can't crash. No literal colors.
 */
export function OnboardingSlides({
  slides,
  index,
  onIndexChange,
  onSkip,
  onComplete,
  showSkip = true,
  finishLabel = 'Get started',
  variant = 'default',
  style,
}: OnboardingSlidesProps): React.ReactElement {
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
    <View
      accessibilityRole="none"
      style={[{ flex: 1, paddingHorizontal: tokens.spacing.xl, paddingVertical: tokens.spacing.lg }, style]}
    >
      {showSkip ? (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Skip intro"
            onPress={onSkip}
            hitSlop={tokens.spacing.sm}
          >
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '500' }}>
              Skip
            </Text>
          </Pressable>
        </View>
      ) : null}

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.lg }}>
        {variant === 'default' && slide.icon ? (
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: tokens.radius.full,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.accent,
            }}
          >
            <Icon glyph={slide.icon} size="3xl" color="onAccent" />
          </View>
        ) : null}

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
              lineHeight: tokens.typography.scale.base * 1.5,
            }}
          >
            {slide.description}
          </Text>
        ) : null}
      </View>

      <View style={{ gap: tokens.spacing.lg, alignItems: 'center' }}>
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
