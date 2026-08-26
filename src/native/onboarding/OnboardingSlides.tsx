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
  /**
   * Artwork for the hero slot (onboarding spec §3). When omitted the slide's
   * own `icon` is promoted to a hero-sized medallion, so a slide with no art
   * still looks composed. Drive it per slide by running the carousel
   * controlled — swap `illustration` as `index` changes.
   */
  illustration?: React.ReactNode;
  /**
   * Back affordance in the header (spec §1). Defaults to stepping one slide
   * back; the chevron is hidden on the first slide, where there is nothing to
   * go back to.
   */
  onBack?: () => void;
  /** Show the "Skip" affordance. Default `true`. */
  showSkip?: boolean;
  /** Label for the final-slide primary action. Default `'Get started'`. */
  finishLabel?: string;
  /** `'minimal'` drops the hero panel for a text-only intro. */
  variant?: OnboardingSlidesVariant;
  style?: StyleProp<ViewStyle>;
}

/** 44×44 header tap targets (spec §2). Geometric — §10.1 permits the constant. */
const TAP_TARGET = 44;

/** The hero panel is roughly 4:3 (spec §3). */
const HERO_ASPECT = 4 / 3;

/** …capped at ~38% of screen height so the CTA never leaves the fold (spec §3). */
const HERO_MAX_HEIGHT_RATIO = 0.38;

/** The slide glyph promoted to hero size (spec §3). */
const HERO_MEDALLION = 96;

/** Comfortable measure for the description, ~60 characters (spec §4). */
const MEASURE_MAX_WIDTH = 420;

/**
 * Paged intro carousel — the first-run "here's the value" sequence, rebuilt on
 * the shell from §1 of the onboarding spec.
 *
 * The version this replaces put a "Skip" link alone at the top, a medallion and
 * two lines of text in the middle, and dots above a button at the bottom. The
 * shell gives it structure instead: a **header** carrying back · segmented
 * progress · dismiss (§1–2), a **hero slot** that takes the caller's
 * `illustration` or falls back to the slide's glyph at hero size (§3), a
 * **centred headline block** on a readable measure (§4), and the **sticky
 * footer CTA** every other screen in the funnel ends on (§5). The numbered
 * position captions are gone: the bars say where you are without them.
 *
 * Works controlled (`index` + `onIndexChange`) or uncontrolled. All indexing is
 * clamped so an out-of-range `index` can't crash, and an empty `slides` list
 * renders the empty state rather than a blank screen. No literal colors.
 */
export function OnboardingSlides({
  slides,
  index,
  onIndexChange,
  onSkip,
  onComplete,
  illustration,
  onBack,
  showSkip = true,
  finishLabel = 'Get started',
  variant = 'default',
  style,
}: OnboardingSlidesProps): React.ReactElement {
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

  /*
    §3's `primary[50]` ground, read for the dark scheme too: `tokens.ramps` is
    not scheme-inverted, so step 50 would be near-white on a near-black page.
  */
  const heroGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];
  const showBack = onBack != null || !isFirst;

  return (
    <View accessibilityRole="none" style={[{ flex: 1, backgroundColor: colors.surface }, style]}>
      {/* ── header: back · progress bars · dismiss (§1, §2) ──────────── */}
      <View
        style={{
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
          // A spacer, not a missing element — the bars must not jump sideways
          // the moment the back chevron appears on slide two.
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

      {/* ── hero slot + headline block (§3, §4) ──────────────────────── */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: tokens.spacing.lg,
          gap: tokens.spacing.lg,
        }}
      >
        {variant === 'default' ? (
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
                <Icon glyph={slide.icon ?? '✦'} size="3xl" color="onPrimary" />
              </View>
            )}
          </View>
        ) : null}

        <View style={{ alignSelf: 'stretch', gap: tokens.spacing.sm }}>
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
