import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { EmptyState } from '../commerce';
import { GetStartedButton } from './GetStartedButton';
import { ProgressDots } from './ProgressDots';
import type { OnboardingSlidesProps } from './OnboardingSlides';

/** Same public contract as {@link OnboardingSlides} — a drop-in alternate design. */
export type OnboardingSlidesV2Props = OnboardingSlidesProps;

/** 44×44 header tap targets (spec §2) — `h-11` is 44px. Geometric, per §10.1. */
const TAP_TARGET_CLASS = 'h-11 w-11';

/**
 * The editorial hero runs to the top edge and takes a little under half the
 * viewport — bigger than the base line's 38% cap because nothing insets it
 * (spec §11, V2).
 */
const HERO_HEIGHT_CLASS = 'h-[46vh]';

/**
 * Onboarding intro — V2, the **editorial** line.
 *
 * Same shell as {@link OnboardingSlides} — header · hero · headline · sticky
 * footer — but the hero is not a panel sitting under the header: it runs
 * full-bleed to the very top edge, the header controls float over it, and a
 * `surface` content sheet lifts up over the bottom of the art.
 *
 * Identical props to {@link OnboardingSlides}, including the §3 `illustration`
 * slot and its medallion fallback. Same controlled/uncontrolled indexing and
 * clamping; an empty list renders the {@link EmptyState}. Token-only.
 */
export const OnboardingSlidesV2 = React.forwardRef<HTMLDivElement, OnboardingSlidesV2Props>(
  function OnboardingSlidesV2(
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
      <div ref={ref} className={cn('relative flex min-h-full flex-col bg-surface', className)} {...rest}>
        {/* ── full-bleed hero, running to the top edge (§3 / §11 V2) ─── */}
        <div
          className={cn(
            'flex w-full shrink-0 items-center justify-center overflow-hidden bg-primary-50',
            HERO_HEIGHT_CLASS
          )}
        >
          {illustration ?? (
            <span className="flex h-28 w-28 items-center justify-center rounded-full bg-primary">
              <Icon glyph={slide.icon ?? '✦'} size="3xl" color="onPrimary" />
            </span>
          )}
        </div>

        {/* ── header floats OVER the art (§1, §2) ────────────────────── */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-md px-lg pt-lg">
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

        {/* ── the content sheet rising over the art (§11 V2) ─────────── */}
        <div className="-mt-xl flex flex-1 flex-col justify-center gap-sm rounded-t-lg bg-surface px-lg pb-lg pt-xl text-center">
          <h2>
            <Text size="2xl" weight="bold" tone="onSurface" numberOfLines={2} className="block">
              {slide.title}
            </Text>
          </h2>
          {slide.description ? (
            <Text size="base" tone="muted" numberOfLines={3} className="mx-auto block max-w-prose">
              {slide.description}
            </Text>
          ) : null}
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
