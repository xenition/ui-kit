import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { EmptyState } from '../commerce';
import { ProgressDots } from './ProgressDots';
import type { OnboardingSlide } from './types';

export type OnboardingSlidesVariant = 'default' | 'minimal';

export interface OnboardingSlidesProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Ordered intro slides. An empty list renders the empty state. */
  slides: OnboardingSlide[];
  /** Controlled active index. Omit to let the component own its position. */
  index?: number;
  /** Fires with the next index whenever the slide changes. */
  onIndexChange?: (index: number) => void;
  /** Fires when the user clicks "Skip". */
  onSkip?: () => void;
  /** Fires when the user advances past the final slide ("Done"). */
  onComplete?: () => void;
  /** Show the "Skip" affordance. Default `true`. */
  showSkip?: boolean;
  /** Label for the final-slide primary action. Default `'Get started'`. */
  finishLabel?: string;
  /** `'minimal'` drops the hero medallion for a text-only intro. */
  variant?: OnboardingSlidesVariant;
}

/**
 * Paged intro carousel — the first-run "here's the value" sequence
 * (design.md §41-42). Renders one {@link OnboardingSlide} at a time with a hero
 * medallion, a {@link ProgressDots} indicator, a "Skip" escape hatch and a
 * Next/Done primary action that walks to `onComplete` on the last slide. Works
 * controlled (`index` + `onIndexChange`) or uncontrolled. All indexing is
 * clamped so an out-of-range `index` can't crash, and an empty `slides` list
 * renders the {@link EmptyState}. No literal colors.
 */
export const OnboardingSlides = React.forwardRef<HTMLDivElement, OnboardingSlidesProps>(
  function OnboardingSlides(
    {
      slides,
      index,
      onIndexChange,
      onSkip,
      onComplete,
      showSkip = true,
      finishLabel = 'Get started',
      variant = 'default',
      className,
      ...rest
    },
    ref
  ) {
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
        <div ref={ref} className={className} {...rest}>
          <EmptyState title="Nothing to show yet." />
        </div>
      );
    }

    const slide = slides[active];
    if (!slide) return <div ref={ref} className={className} {...rest} />;

    return (
      <div
        ref={ref}
        className={cn('flex min-h-full flex-col gap-6 px-6 py-4', className)}
        {...rest}
      >
        {showSkip ? (
          <div className="flex justify-end">
            <button
              type="button"
              aria-label="Skip intro"
              onClick={onSkip}
              className="text-sm font-medium text-muted transition-colors hover:text-on-surface"
            >
              Skip
            </button>
          </div>
        ) : null}

        <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
          {variant === 'default' && slide.icon ? (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary">
              <Icon glyph={slide.icon} size="3xl" color="onPrimary" />
            </div>
          ) : null}

          <h2 className="text-2xl font-bold text-on-surface">{slide.title}</h2>

          {slide.description ? (
            <p className="text-base leading-relaxed text-muted">{slide.description}</p>
          ) : null}
        </div>

        <div className="flex flex-col items-center gap-6">
          <ProgressDots count={count} activeIndex={active} onDotClick={goTo} />
          <Button
            variant="primary"
            size="lg"
            onClick={onNext}
            aria-label={isLast ? finishLabel : 'Next slide'}
            className="w-full"
          >
            {isLast ? finishLabel : 'Next'}
          </Button>
        </div>
      </div>
    );
  }
);
