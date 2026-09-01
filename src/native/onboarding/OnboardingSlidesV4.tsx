import * as React from 'react';
import {
  Animated,
  ScrollView,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { GetStartedButtonV4 } from './GetStartedButtonV4';
import { ProgressDotsV4 } from './ProgressDotsV4';
import {
  FlowFooterV4,
  FlowHeaderV4,
  FlowHeadlineV4,
  FlowHeroV4,
  flowGrounds,
  useFlowEntrance,
  type OnboardingFlowV4Props,
} from './internal/flow-v4';
import type { OnboardingSlidesProps } from './OnboardingSlides';

export interface OnboardingSlidesV4Props extends OnboardingSlidesProps, OnboardingFlowV4Props {
  /**
   * Let the user swipe between slides. Default `true`.
   *
   * The base had no gesture at all: a carousel that only advances from a
   * button is not a carousel, it is a wizard wearing dots, and a swipe is the
   * first thing anyone tries on one (§31 — use the familiar interaction).
   * Turn it off for a flow that must be walked in order.
   */
  swipeable?: boolean;
  /** CTA copy on every slide but the last. Default `'Next'`. */
  nextLabel?: string;
  /** Text skip action under the CTA. The header ✕ stays either way. */
  skipLabel?: string;
  /** Copy for the empty state. Default `'Nothing to show yet.'`. */
  emptyMessage?: string;
}

/**
 * **V4 intro carousel** — the base's props plus `swipeable`, `nextLabel`,
 * `skipLabel`, `emptyMessage` and the line's `ground`/`accent`.
 *
 * ## Five changes
 *
 * 1. **It swipes.** A paged `ScrollView` drives the same index the buttons do,
 *    in both directions, controlled or uncontrolled. This is the change: the
 *    base's carousel could only be advanced by tapping "Next".
 * 2. **Each slide gets its own artwork.** `OnboardingSlide.illustration`.
 *    The base took one `illustration` for the whole carousel, so a three-slide
 *    intro showed one picture while the copy changed under it. The
 *    carousel-wide prop still works as the fallback.
 * 3. **The copy is the host's.** `nextLabel`, `skipLabel` and `emptyMessage`
 *    replace three hard-coded English strings in a module whose whole contract
 *    is that copy is caller-supplied.
 * 4. **The footer is the shared one**, so the CTA clears the home indicator
 *    and a skip action has a place under it rather than only as a ✕ a user may
 *    read as "close the app".
 * 5. **Slides arrive.** The staggered entrance, replayed as the index changes,
 *    and collapsed under `useReducedMotion()`.
 *
 * The header ✕ is still the skip affordance when `showSkip` is on, so nothing
 * existing moves. An empty `slides` renders the message, not a blank screen.
 */
export function OnboardingSlidesV4({
  slides,
  index,
  onIndexChange,
  onSkip,
  onComplete,
  illustration,
  onBack,
  showSkip = true,
  finishLabel = 'Get started',
  nextLabel = 'Next',
  skipLabel,
  emptyMessage = 'Nothing to show yet.',
  swipeable = true,
  variant = 'default',
  ground = 'plain',
  accent = 'primary',
  style,
}: OnboardingSlidesV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  const { width } = useWindowDimensions();
  const grounds = flowGrounds(theme, ground, accent);

  const [internal, setInternal] = React.useState(0);
  const pager = React.useRef<ScrollView>(null);
  const count = slides?.length ?? 0;

  const controlled = index != null;
  const rawActive = controlled ? index : internal;
  const active = count === 0 ? 0 : Math.min(Math.max(0, rawActive), count - 1);
  const isLast = active >= count - 1;
  const isFirst = active <= 0;

  const goTo = React.useCallback(
    (next: number): void => {
      const clamped = Math.min(Math.max(0, next), Math.max(0, count - 1));
      if (!controlled) setInternal(clamped);
      onIndexChange?.(clamped);
    },
    [controlled, count, onIndexChange]
  );

  // Keep the pager and the index in step whichever moved first: a tap on
  // "Next" scrolls the pager, and a swipe reports the page it landed on.
  React.useEffect(() => {
    pager.current?.scrollTo({ x: active * width, animated: true });
  }, [active, width]);

  const onMomentumEnd = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const page = Math.round(event.nativeEvent.contentOffset.x / Math.max(1, width));
    if (page !== active) goTo(page);
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

  // The entrance is keyed on the slide, so it replays as the carousel moves —
  // this is the one component in the line where that is right, because a new
  // slide really is new content rather than the same screen redrawn.
  const body = useFlowEntrance(0);

  if (count === 0) {
    return (
      <View
        accessibilityRole="summary"
        style={[
          { flex: 1, backgroundColor: grounds.page, padding: tokens.spacing.xl, alignItems: 'center', justifyContent: 'center' },
          style,
        ]}
      >
        <TextV4 size="base" tone="mutedText" align="center">
          {emptyMessage}
        </TextV4>
      </View>
    );
  }

  const showBack = onBack != null || !isFirst;

  return (
    <View style={[{ flex: 1, backgroundColor: grounds.page }, style]}>
      <FlowHeaderV4
        onBack={showBack ? goBack : undefined}
        onDismiss={showSkip ? onSkip : undefined}
        progress={
          <ProgressDotsV4 variant="bars" accent={accent} count={count} activeIndex={active} />
        }
      />

      <ScrollView
        ref={pager}
        horizontal
        pagingEnabled
        scrollEnabled={swipeable}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumEnd}
        style={{ flex: 1 }}
        // A pager's pages are laid out by width, not by content, so the
        // container must not grow — `flexGrow` here would collapse paging.
        contentContainerStyle={{ alignItems: 'stretch' }}
      >
        {slides.map((slide, i) => (
          <Animated.View
            key={slide.id}
            // Only the visible slide animates; the neighbours are already
            // rendered and would otherwise fade in behind the finger.
            style={[
              {
                width,
                justifyContent: 'center',
                alignItems: 'center',
                gap: tokens.spacing.lg,
                paddingHorizontal: tokens.spacing.lg,
              },
              i === active ? body : null,
            ]}
          >
            {variant === 'default' ? (
              <FlowHeroV4
                illustration={slide.illustration ?? illustration}
                logoGlyph={slide.icon}
                grounds={grounds}
              />
            ) : null}
            <FlowHeadlineV4 title={slide.title} subtitle={slide.description} />
          </Animated.View>
        ))}
      </ScrollView>

      <FlowFooterV4
        secondaryLabel={skipLabel}
        onSecondary={onSkip}
      >
        <GetStartedButtonV4
          label={isLast ? finishLabel : nextLabel}
          accessibilityLabel={isLast ? finishLabel : `${nextLabel}, slide ${active + 2} of ${count}`}
          onPress={onNext}
        />
      </FlowFooterV4>
    </View>
  );
}
