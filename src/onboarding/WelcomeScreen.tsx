import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { GetStartedButton } from './GetStartedButton';
import { ProgressDots } from './ProgressDots';

export type WelcomeScreenVariant = 'centered' | 'bottomSheet';

export interface WelcomeScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Product/brand name shown as the hero headline. */
  title: string;
  /** Supporting value line under the title. */
  subtitle?: string;
  /** Optional emoji/glyph for the brand medallion. */
  logoGlyph?: string;
  /**
   * Artwork for the hero slot (onboarding spec §3) — an `<img>`, an inline SVG,
   * a Lottie, whatever the app ships. The kit ships no artwork and must not, so
   * when this is omitted the {@link logoGlyph} medallion is promoted to hero
   * size instead: an empty hero slot still looks composed, never like a hole.
   */
  illustration?: React.ReactNode;
  /** Primary CTA copy. Default `'Get started'`. */
  primaryLabel?: string;
  /** Fires on the primary CTA. */
  onGetStarted?: () => void;
  /** Secondary link copy (e.g. `'I already have an account'`). */
  secondaryLabel?: string;
  /** Fires on the secondary link. Hidden when omitted. */
  onSecondary?: () => void;
  /**
   * Back affordance in the header (spec §1). Omit on the first screen of a
   * flow — there is nothing to go back to and a dead chevron is worse than no
   * chevron.
   */
  onBack?: () => void;
  /**
   * Dismiss affordance in the header (spec §1). Omit in a mandatory flow the
   * user is not allowed to escape.
   */
  onDismiss?: () => void;
  /**
   * Total steps in the surrounding flow. When set, the header carries the
   * segmented progress bars (spec §2). Omit for a standalone welcome.
   */
  stepCount?: number;
  /** Zero-based position within {@link stepCount}. Default `0`. */
  stepIndex?: number;
  /** Show a spinner on the primary CTA while an async step runs. */
  loading?: boolean;
  /** `'bottomSheet'` left-aligns for a sheet presentation. Default `'centered'`. */
  variant?: WelcomeScreenVariant;
}

/**
 * Header controls keep a 44×44 tap target even though the glyph inside is small
 * (spec §2) — `h-11` is 44px. Geometric, so §10.1 permits it.
 */
const TAP_TARGET_CLASS = 'h-11 w-11';

/**
 * The hero panel: roughly 4:3, capped at ~38% of the viewport so the CTA never
 * leaves the fold on a small phone (spec §3). Both are geometry, not tokens.
 */
const HERO_SHAPE_CLASS = 'aspect-[4/3] max-h-[38vh]';

/**
 * First-launch welcome — the screen that establishes the onboarding shell.
 *
 * What shipped before was three things stacked in the middle of a grey page: a
 * medallion, a headline, a button. No hero, no header, no footer, no rhythm.
 * This is the anatomy from §1 of the onboarding spec, top to bottom:
 *
 * 1. **header** — back · segmented progress · dismiss, each optional, each a
 *    44×44 tap target;
 * 2. **hero slot** — the caller's `illustration`, or the `logoGlyph` medallion
 *    at hero size, on a tinted 4:3 panel capped at 38% of the viewport;
 * 3. **headline block** — centred, `2xl` bold over a muted value line held to a
 *    readable measure;
 * 4. **sticky footer** — the 56-tall fully-rounded {@link GetStartedButton}
 *    with a trailing arrow, and any secondary action BELOW it as a centred
 *    muted link, never beside it competing for the same weight.
 *
 * Every part is optional and the screen composes without any of them: no
 * illustration, no subtitle, no header controls, no secondary action. The
 * `bottomSheet` variant left-aligns the headline block for a sheet
 * presentation — the one place §4 allows it. Every color traces to a token.
 * No literal colors.
 */
export const WelcomeScreen = React.forwardRef<HTMLDivElement, WelcomeScreenProps>(
  function WelcomeScreen(
    {
      title,
      subtitle,
      logoGlyph,
      illustration,
      primaryLabel = 'Get started',
      onGetStarted,
      secondaryLabel,
      onSecondary,
      onBack,
      onDismiss,
      stepCount,
      stepIndex = 0,
      loading = false,
      variant = 'centered',
      className,
      ...rest
    },
    ref
  ) {
    const centered = variant === 'centered';

    return (
      <div
        ref={ref}
        className={cn('flex min-h-full flex-col bg-surface', className)}
        {...rest}
      >
        {/* ── header: back · progress · dismiss (§1) ─────────────────── */}
        <div className="flex items-center gap-md px-lg pt-lg">
          {onBack ? (
            <button
              type="button"
              aria-label="Go back"
              onClick={onBack}
              className={cn('inline-flex shrink-0 items-center justify-center rounded-full', TAP_TARGET_CLASS)}
            >
              <Icon name="chevron-left" size="xl" color="onSurface" />
            </button>
          ) : (
            // A spacer, not a missing element — otherwise the progress bars
            // slide left the moment a back button appears.
            <span aria-hidden="true" className={cn('shrink-0', TAP_TARGET_CLASS)} />
          )}

          <div className="flex-1">
            {stepCount != null && stepCount > 0 ? (
              <ProgressDots variant="bars" count={stepCount} activeIndex={stepIndex} />
            ) : null}
          </div>

          {onDismiss ? (
            <button
              type="button"
              aria-label="Dismiss"
              onClick={onDismiss}
              className={cn('inline-flex shrink-0 items-center justify-center rounded-full', TAP_TARGET_CLASS)}
            >
              <Icon name="close" size="lg" color="muted" />
            </button>
          ) : (
            <span aria-hidden="true" className={cn('shrink-0', TAP_TARGET_CLASS)} />
          )}
        </div>

        {/* ── hero slot + headline block (§3, §4) ────────────────────── */}
        <div
          className={cn(
            'flex flex-1 flex-col justify-center gap-lg px-lg py-lg',
            centered ? 'text-center' : 'text-left'
          )}
        >
          <div
            className={cn(
              'flex w-full items-center justify-center overflow-hidden rounded-lg bg-primary-50',
              HERO_SHAPE_CLASS
            )}
          >
            {illustration ?? (
              <span className="flex h-24 w-24 items-center justify-center rounded-full bg-primary">
                <Icon glyph={logoGlyph ?? '✦'} size="3xl" color="onPrimary" />
              </span>
            )}
          </div>

          <div className="flex flex-col gap-sm">
            {/* The heading element carries the semantics; `Text` carries the
                type scale and the token colour. */}
            <h1>
              <Text size="2xl" weight="bold" tone="onSurface" numberOfLines={2} className="block">
                {title}
              </Text>
            </h1>
            {subtitle ? (
              <Text
                size="base"
                tone="muted"
                numberOfLines={3}
                className={cn('block max-w-prose', centered && 'mx-auto')}
              >
                {subtitle}
              </Text>
            ) : null}
          </div>
        </div>

        {/* ── sticky footer (§5) ─────────────────────────────────────── */}
        <div className="sticky bottom-0 flex flex-col gap-sm border-t border-border bg-surface px-lg pb-lg pt-md">
          <GetStartedButton label={primaryLabel} onClick={onGetStarted} loading={loading} />
          {secondaryLabel && onSecondary ? (
            <button
              type="button"
              aria-label={secondaryLabel}
              onClick={onSecondary}
              className="inline-flex min-h-11 items-center justify-center"
            >
              <Text size="base" weight="medium" tone="muted">
                {secondaryLabel}
              </Text>
            </button>
          ) : null}
        </div>
      </div>
    );
  }
);
