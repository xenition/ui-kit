import * as React from 'react';
import { cn } from '../primitives/cn';
import { TextV4 } from '../primitives/TextV4';
import { GetStartedButtonV4 } from './GetStartedButtonV4';
import { ProgressDotsV4 } from './ProgressDotsV4';
import {
  FlowFooterV4,
  FlowHeaderV4,
  FlowHeadlineV4,
  FlowHeroV4,
  flowGroundVars,
  flowRegion,
  type OnboardingFlowV4Props,
} from './internal/flow-v4';
import type { OnboardingSlidesProps } from './OnboardingSlides';

export interface OnboardingSlidesV4Props extends OnboardingSlidesProps, OnboardingFlowV4Props {
  /**
   * Let the user swipe between slides. Default `true`.
   *
   * A CSS scroll-snap track, so the gesture is the platform's own — momentum,
   * rubber-banding and trackpad support included — rather than a pointer-event
   * reimplementation of it (§31: use the familiar interaction). Turn it off for
   * a flow that must be walked in order.
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
 * **V4 intro carousel** — the web twin of the native `OnboardingSlidesV4`: the
 * base's props plus `swipeable`, `nextLabel`, `skipLabel`, `emptyMessage` and
 * the line's `ground`/`accent`.
 *
 * ## Five changes
 *
 * 1. **It swipes.** A scroll-snap track drives the same index the buttons do,
 *    in both directions, controlled or uncontrolled. The base's carousel could
 *    only be advanced by clicking "Next".
 * 2. **Each slide gets its own artwork** — `OnboardingSlide.illustration`. The
 *    base took one `illustration` for the whole carousel, so a three-slide
 *    intro showed one picture while the copy changed under it.
 * 3. **The copy is the host's** — `nextLabel`, `skipLabel`, `emptyMessage`
 *    replace three hard-coded English strings.
 * 4. **The footer is the shared one**, so the CTA clears the inset and a skip
 *    action has a place under it rather than only as a ✕ a user may read as
 *    "close the app".
 * 5. **Slides arrive**, and not at all under `prefers-reduced-motion`.
 *
 * An empty `slides` renders the message, not a blank screen.
 */
export const OnboardingSlidesV4 = React.forwardRef<HTMLDivElement, OnboardingSlidesV4Props>(
  function OnboardingSlidesV4(
    {
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
      className,
      style,
      ...rest
    },
    ref
  ) {
    const [internal, setInternal] = React.useState(0);
    const track = React.useRef<HTMLDivElement>(null);
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

    // Keep the track and the index in step whichever moved first: a click on
    // "Next" scrolls the track, and a swipe reports the page it landed on.
    React.useEffect(() => {
      const el = track.current;
      if (!el) return;
      const left = active * el.clientWidth;
      // `scrollTo` is absent in jsdom and in a few older engines, and a
      // carousel is not worth a crash: fall back to setting the offset, which
      // lands in the same place without the smooth interpolation.
      if (typeof el.scrollTo === 'function') el.scrollTo({ left, behavior: 'smooth' });
      else el.scrollLeft = left;
    }, [active]);

    const onScroll = (): void => {
      const el = track.current;
      if (!el || el.clientWidth === 0) return;
      const page = Math.round(el.scrollLeft / el.clientWidth);
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

    const vars = { ...flowGroundVars(ground, accent), ...style };

    if (count === 0) {
      return (
        <div
          ref={ref}
          style={vars}
          className={cn(
            'flex min-h-full flex-col items-center justify-center bg-[var(--flow-page)] p-xl',
            className
          )}
          {...rest}
        >
          <TextV4 size="base" tone="mutedText" align="center">
            {emptyMessage}
          </TextV4>
        </div>
      );
    }

    const showBack = onBack != null || !isFirst;

    return (
      <div
        ref={ref}
        style={vars}
        className={cn('flex min-h-full flex-col bg-[var(--flow-page)]', className)}
        {...rest}
      >
        <FlowHeaderV4
          onBack={showBack ? goBack : undefined}
          onDismiss={showSkip ? onSkip : undefined}
          progress={
            <ProgressDotsV4 variant="bars" accent={accent} count={count} activeIndex={active} />
          }
        />

        <div
          ref={track}
          onScroll={onScroll}
          className={cn(
            'flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden',
            // The scrollbar is the gesture's own affordance on a trackpad and
            // pure noise under a phone's finger; the snap points already say
            // there is more.
            '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
            swipeable ? 'touch-pan-x' : 'overflow-x-hidden'
          )}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              // Only the visible slide animates; the neighbours are already
              // rendered and would otherwise fade in beside the finger.
              {...(i === active ? flowRegion(0) : {})}
              className="flex w-full shrink-0 snap-center flex-col items-center justify-center gap-lg px-lg"
            >
              {variant === 'default' ? (
                <FlowHeroV4
                  illustration={slide.illustration ?? illustration}
                  logoGlyph={slide.icon}
                />
              ) : null}
              <FlowHeadlineV4 title={slide.title} subtitle={slide.description} />
            </div>
          ))}
        </div>

        <FlowFooterV4 secondaryLabel={skipLabel} onSecondary={onSkip}>
          <GetStartedButtonV4
            label={isLast ? finishLabel : nextLabel}
            aria-label={isLast ? finishLabel : `${nextLabel}, slide ${active + 2} of ${count}`}
            onClick={onNext}
          />
        </FlowFooterV4>
      </div>
    );
  }
);
