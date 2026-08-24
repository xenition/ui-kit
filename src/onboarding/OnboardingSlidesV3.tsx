import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { EmptyState } from '../commerce';
import type { OnboardingSlidesProps } from './OnboardingSlides';

/** Same public contract as {@link OnboardingSlides} — a drop-in alternate design. */
export type OnboardingSlidesV3Props = OnboardingSlidesProps;

/**
 * OnboardingSlides, redesigned (v3): a **minimal stepped intro**. A slim top
 * progress bar tracks position, the slide title/description sit left-aligned and
 * quiet, and Skip / Next are plain text links. No hero medallion, no dots — the
 * opposite of v2's full-bleed carousel. Same props, token-only.
 */
export const OnboardingSlidesV3 = React.forwardRef<HTMLDivElement, OnboardingSlidesV3Props>(
  function OnboardingSlidesV3(
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
    const pct = Math.round(((clamped + 1) / slides.length) * 100);
    const slide = slides[clamped]!;

    return (
      <div ref={ref} className={cn('flex min-h-full flex-col gap-6 bg-surface p-6', className)} {...rest}>
        <div
          className="h-1 w-full overflow-hidden rounded-full bg-neutral-100"
          role="progressbar"
          aria-valuenow={clamped + 1}
          aria-valuemin={1}
          aria-valuemax={slides.length}
        >
          <div className="h-full rounded-full bg-primary transition-all motion-reduce:transition-none" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-3">
          {slide.icon ? <Icon glyph={slide.icon} size="2xl" color="primary" /> : null}
          <h2 className="text-2xl font-bold text-on-surface">{slide.title}</h2>
          {slide.description ? <p className="text-base leading-relaxed text-muted">{slide.description}</p> : null}
        </div>
        <div className="flex items-center justify-between">
          {showSkip && !isLast ? (
            <button type="button" onClick={onSkip} className="text-sm font-semibold text-muted">
              Skip
            </button>
          ) : (
            <span />
          )}
          <button type="button" aria-label={isLast ? finishLabel : 'Next'} onClick={advance} className="text-sm font-bold text-primary">
            {isLast ? finishLabel : 'Next →'}
          </button>
        </div>
      </div>
    );
  }
);
