import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { GetStartedButton } from './GetStartedButton';
import { ProgressDots } from './ProgressDots';
import type { WelcomeScreenProps } from './WelcomeScreen';

/** Same public contract as {@link WelcomeScreen} — a drop-in alternate design. */
export type WelcomeScreenV3Props = WelcomeScreenProps;

/**
 * 44×44 header tap targets (spec §2) — `h-11` is 44px. The leading badge sits
 * on the same module so header and headline row share one grid. Geometric, per
 * §10.1.
 */
const TAP_TARGET_CLASS = 'h-11 w-11';

/**
 * First-launch welcome — V3, the **compact** line.
 *
 * No hero panel at all. The brand mark drops to a small leading badge beside
 * the headline and the whole screen collapses to header · title row · sticky
 * footer, for a bottom-sheet presentation or a short screen where a 38%-tall
 * illustration would push the CTA off the fold. That is the §11 idea: the three
 * lines differ in what they *are*, not in how they are painted.
 *
 * Identical props to {@link WelcomeScreen}. An `illustration` is still honoured
 * (§3) — it just occupies the leading badge rather than a hero panel, clipped
 * to the badge's circle — and the medallion is the fallback when there is none,
 * so an empty hero slot still reads as composed. Token-only.
 */
export const WelcomeScreenV3 = React.forwardRef<HTMLDivElement, WelcomeScreenV3Props>(
  function WelcomeScreenV3(
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
      <div ref={ref} className={cn('flex min-h-full flex-col bg-surface', className)} {...rest}>
        {/* ── header: back · progress · dismiss (§1) ─────────────────── */}
        <div className="flex items-center gap-md px-lg pt-md">
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
              {illustration ?? <Icon glyph={logoGlyph ?? '✦'} size="xl" color="onPrimary" />}
            </span>
            <div className="flex min-w-0 flex-col gap-xs">
              <h1>
                <Text size="2xl" weight="bold" tone="onSurface" numberOfLines={2} className="block">
                  {title}
                </Text>
              </h1>
              {subtitle ? (
                <Text size="base" tone="muted" numberOfLines={3} className="block max-w-prose">
                  {subtitle}
                </Text>
              ) : null}
            </div>
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
