import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { EmptyState } from '../commerce';
import { GetStartedButton } from './GetStartedButton';
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
}

/** 44×44 header tap targets (spec §2) — `h-11` is 44px. Geometric, per §10.1. */
const TAP_TARGET_CLASS = 'h-11 w-11';

/**
 * The hero panel: roughly 4:3, capped at ~38% of the viewport so the CTA never
 * leaves the fold on a small phone (spec §3). Geometry, not tokens.
 */
const HERO_SHAPE_CLASS = 'aspect-[4/3] max-h-[38vh]';

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
      illustration,
      onBack,
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
        <div className="flex items-center gap-md px-lg pt-lg">
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
            // A spacer, not a missing element — the bars must not jump sideways
            // the moment the back chevron appears on slide two.
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

        {/* ── hero slot + headline block (§3, §4) ────────────────────── */}
        <div className="flex flex-1 flex-col justify-center gap-lg px-lg py-lg text-center">
          {variant === 'default' ? (
            <div
              className={cn(
                'flex w-full items-center justify-center overflow-hidden rounded-lg bg-primary-50',
                HERO_SHAPE_CLASS
              )}
            >
              {illustration ?? (
                <span className="flex h-24 w-24 items-center justify-center rounded-full bg-primary">
                  <Icon glyph={slide.icon ?? '✦'} size="3xl" color="onPrimary" />
                </span>
              )}
            </div>
          ) : null}

          <div className="flex flex-col gap-sm">
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
