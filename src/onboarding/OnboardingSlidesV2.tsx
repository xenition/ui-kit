import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { EmptyState } from '../commerce';
import { ProgressDots } from './ProgressDots';
import type { OnboardingSlidesProps } from './OnboardingSlides';

/** Same public contract as {@link OnboardingSlides} — a drop-in alternate design. */
export type OnboardingSlidesV2Props = OnboardingSlidesProps;

/**
 * OnboardingSlides, redesigned (v2): a **full-bleed hero carousel**. Each slide
 * fills a tall primary-tinted panel with a large medallion, headline, and
 * description centered; progress dots sit at the bottom with Skip and a circular
 * Next/Done button. A bolder intro than v1. Same props, token-only.
 */
export const OnboardingSlidesV2 = React.forwardRef<HTMLDivElement, OnboardingSlidesV2Props>(
  function OnboardingSlidesV2(
    { slides, index, onIndexChange, onSkip, onComplete, showSkip = true, finishLabel = 'Get started', variant, className, ...rest },
    ref
  ) {
    void variant;
    const [internal, setInternal] = React.useState(0);
    const active = index ?? internal;
    const clamped = Math.max(0, Math.min(slides.length - 1, active));
    const isLast = clamped >= slides.length - 1;

    if (slides.length === 0) {
      return <EmptyState ref={ref} icon={<span className="text-3xl">👋</span>} title="Nothing to show" className={className} {...rest} />;
    }

    const go = (next: number): void => {
      if (index === undefined) setInternal(next);
      onIndexChange?.(next);
    };
    const advance = (): void => {
      if (isLast) onComplete?.();
      else go(clamped + 1);
    };

    const slide = slides[clamped]!;

    return (
      <div ref={ref} className={cn('flex min-h-full flex-col bg-surface', className)} {...rest}>
        {showSkip && !isLast ? (
          <div className="flex justify-end p-3">
            <button type="button" onClick={onSkip} className="text-sm font-semibold text-muted">
              Skip
            </button>
          </div>
        ) : (
          <div className="h-12" />
        )}
        <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-primary/10 px-6 text-center">
          {slide.icon ? (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-surface shadow-sm">
              <Icon glyph={slide.icon} size="3xl" color="primary" />
            </div>
          ) : null}
          <h2 className="text-2xl font-bold text-on-surface">{slide.title}</h2>
          {slide.description ? <p className="max-w-sm text-base text-muted">{slide.description}</p> : null}
        </div>
        <div className="flex items-center justify-between p-6">
          <ProgressDots count={slides.length} activeIndex={clamped} onDotClick={(i) => go(i)} />
          <button
            type="button"
            aria-label={isLast ? finishLabel : 'Next'}
            onClick={advance}
            className="flex h-12 items-center justify-center gap-1 rounded-full bg-primary px-5 text-sm font-bold text-on-primary"
          >
            {isLast ? finishLabel : '→'}
          </button>
        </div>
      </div>
    );
  }
);
