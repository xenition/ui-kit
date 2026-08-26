import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { GetStartedButton } from './GetStartedButton';
import { ProgressDots } from './ProgressDots';
import type { WelcomeScreenProps } from './WelcomeScreen';

/** Same public contract as {@link WelcomeScreen} — a drop-in alternate design. */
export type WelcomeScreenV2Props = WelcomeScreenProps;

/** 44×44 header tap targets (spec §2) — `h-11` is 44px. Geometric, per §10.1. */
const TAP_TARGET_CLASS = 'h-11 w-11';

/**
 * The editorial hero runs to the top edge and takes a little under half the
 * viewport — bigger than the base line's 38% cap because nothing insets it
 * (spec §11, V2).
 */
const HERO_HEIGHT_CLASS = 'h-[46vh]';

/**
 * First-launch welcome — V2, the **editorial** line.
 *
 * Where the base line insets the hero into a rounded panel below the header,
 * V2 runs it full-bleed to the very top edge and floats the header controls
 * over it, then lifts a `surface` content sheet up over the bottom of the art.
 * The result reads like a magazine opener rather than a centred stack, which is
 * the whole point of the alternate: §11 asks the three lines to differ in idea,
 * not skin.
 *
 * Identical props to {@link WelcomeScreen}, including the §3 `illustration`
 * slot — with the same medallion fallback, so a screen that ships no artwork
 * still looks composed — and the same §5 sticky footer. Token-only.
 */
export const WelcomeScreenV2 = React.forwardRef<HTMLDivElement, WelcomeScreenV2Props>(
  function WelcomeScreenV2(
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
      variant,
      className,
      ...rest
    },
    ref
  ) {
    void variant;
    return (
      <div
        ref={ref}
        className={cn('relative flex min-h-full flex-col bg-surface', className)}
        {...rest}
      >
        {/* ── full-bleed hero, running to the top edge (§3 / §11 V2) ─── */}
        <div
          className={cn(
            'flex w-full shrink-0 items-center justify-center overflow-hidden bg-primary-50',
            HERO_HEIGHT_CLASS
          )}
        >
          {illustration ?? (
            <span className="flex h-28 w-28 items-center justify-center rounded-full bg-primary">
              <Icon glyph={logoGlyph ?? '✦'} size="3xl" color="onPrimary" />
            </span>
          )}
        </div>

        {/* ── header floats OVER the art rather than sitting above it ── */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-md px-lg pt-lg">
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

        {/* ── the content sheet rising over the art (§11 V2) ─────────── */}
        <div className="-mt-xl flex flex-1 flex-col justify-center gap-sm rounded-t-lg bg-surface px-lg pb-lg pt-xl text-center">
          <h1>
            <Text size="2xl" weight="bold" tone="onSurface" numberOfLines={2} className="block">
              {title}
            </Text>
          </h1>
          {subtitle ? (
            <Text size="base" tone="muted" numberOfLines={3} className="mx-auto block max-w-prose">
              {subtitle}
            </Text>
          ) : null}
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
