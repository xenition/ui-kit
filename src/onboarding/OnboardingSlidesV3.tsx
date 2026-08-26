import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { EmptyState } from '../commerce';
import { GetStartedButton } from './GetStartedButton';
import { ProgressDots } from './ProgressDots';
import type { OnboardingSlidesProps } from './OnboardingSlides';

/** Same public contract as {@link OnboardingSlides} — a drop-in alternate design. */
export type OnboardingSlidesV3Props = OnboardingSlidesProps;

/**
 * 44×44 header tap targets (spec §2) — `h-11` is 44px. The leading badge sits
 * on the same module so header and headline row share one grid. Geometric, per
 * §10.1.
 */
const TAP_TARGET_CLASS = 'h-11 w-11';

/**
 * Onboarding intro — V3, the **compact** line.
 *
 * No hero panel. The slide glyph drops to a small leading badge beside the
 * headline and the screen collapses to header · title row · sticky footer — for
 * a sheet presentation, or a short intro where a 38%-tall illustration would
 * push the CTA off the fold. Same shell, different idea (§11), not a reskin.
 *
 * The "Skip / Next" pair of bare text links this line used to end on is gone:
 * §5 gives every screen in the funnel the same 56-tall CTA, and the escape
 * hatch moves to the header's dismiss control where the rest of the module
 * keeps it.
 *
 * Identical props to {@link OnboardingSlides}. An `illustration` is honoured
 * (§3) — it takes the leading badge rather than a hero panel — and the slide
 * glyph is the fallback. Same indexing/clamping and empty guard. Token-only.
 */
export const OnboardingSlidesV3 = React.forwardRef<HTMLDivElement, OnboardingSlidesV3Props>(
  function OnboardingSlidesV3(
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
      variant,
      className,
      ...rest
    },
    ref
  ) {
    void variant;
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
        <div ref={ref} className={className} {...rest}>
          <EmptyState title="Nothing to show yet." />
        </div>
      );
    }

    const slide = slides[active];
    if (!slide) return <div ref={ref} className={className} {...rest} />;

    const showBack = onBack != null || !isFirst;

    return (
      <div ref={ref} className={cn('flex min-h-full flex-col bg-surface', className)} {...rest}>
        {/* ── header: back · progress bars · dismiss (§1, §2) ────────── */}
        <div className="flex items-center gap-md px-lg pt-md">
          {showBack ? (
            <button
              type="button"
              aria-label="Previous slide"
              onClick={goBack}
              className={cn('inline-flex shrink-0 items-center justify-center rounded-full', TAP_TARGET_CLASS)}
            >
              <Icon name="chevron-left" size="xl" color="onSurface" />
            </button>
          ) : (
            <span aria-hidden="true" className={cn('shrink-0', TAP_TARGET_CLASS)} />
          )}
          <div className="flex-1">
            <ProgressDots variant="bars" count={count} activeIndex={active} />
          </div>
          {showSkip ? (
            <button
              type="button"
              aria-label="Skip intro"
              onClick={onSkip}
              className={cn('inline-flex shrink-0 items-center justify-center rounded-full', TAP_TARGET_CLASS)}
            >
              <Icon name="close" size="lg" color="muted" />
            </button>
          ) : (
            <span aria-hidden="true" className={cn('shrink-0', TAP_TARGET_CLASS)} />
          )}
        </div>

        {/* ── headline row: leading badge beside the copy (§11 V3) ───── */}
        <div className="flex flex-1 flex-col justify-center px-lg py-md">
          <div className="flex items-center gap-md">
            <span
              className={cn(
                'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
                TAP_TARGET_CLASS,
                illustration ? 'bg-primary-50' : 'bg-primary'
              )}
            >
              {illustration ?? <Icon glyph={slide.icon ?? '✦'} size="xl" color="onPrimary" />}
            </span>
            <div className="flex min-w-0 flex-col gap-xs">
              <h2>
                <Text size="2xl" weight="bold" tone="onSurface" numberOfLines={2} className="block">
                  {slide.title}
                </Text>
              </h2>
              {slide.description ? (
                <Text size="base" tone="muted" numberOfLines={3} className="block max-w-prose">
                  {slide.description}
                </Text>
              ) : null}
            </div>
          </div>
        </div>

        {/* ── sticky footer (§5) ─────────────────────────────────────── */}
        <div className="sticky bottom-0 border-t border-border bg-surface px-lg pb-lg pt-md">
          <GetStartedButton
            label={isLast ? finishLabel : 'Next'}
            aria-label={isLast ? finishLabel : 'Next slide'}
            onClick={onNext}
          />
        </div>
      </div>
    );
  }
);
