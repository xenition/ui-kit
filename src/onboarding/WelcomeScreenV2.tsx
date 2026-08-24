import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { GetStartedButton } from './GetStartedButton';
import type { WelcomeScreenProps } from './WelcomeScreen';

/** Same public contract as {@link WelcomeScreen} — a drop-in alternate design. */
export type WelcomeScreenV2Props = WelcomeScreenProps;

/**
 * WelcomeScreen, redesigned (v2): a **split hero**. A tall primary-filled top
 * panel carries the brand medallion + headline reversed out in on-primary ink;
 * the subtitle and CTAs sit on the surface below. A bolder, branded first
 * impression vs. v1's flat centered layout. Same props, token-only.
 */
export const WelcomeScreenV2 = React.forwardRef<HTMLDivElement, WelcomeScreenV2Props>(
  function WelcomeScreenV2(
    { title, subtitle, logoGlyph, primaryLabel = 'Get started', onGetStarted, secondaryLabel, onSecondary, loading = false, variant, className, ...rest },
    ref
  ) {
    void variant;
    return (
      <div ref={ref} className={cn('flex min-h-full flex-col bg-surface', className)} {...rest}>
        <div className="flex flex-col items-center gap-4 rounded-b-3xl bg-primary px-6 pb-10 pt-16 text-center">
          {logoGlyph ? (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-on-primary/20">
              <Icon glyph={logoGlyph} size="2xl" color="onPrimary" />
            </div>
          ) : null}
          <h1 className="text-3xl font-bold text-on-primary">{title}</h1>
        </div>
        <div className="flex flex-1 flex-col justify-between gap-6 p-6">
          {subtitle ? <p className="text-lg leading-relaxed text-muted">{subtitle}</p> : null}
          <div className="flex w-full flex-col gap-3">
            <GetStartedButton label={primaryLabel} onClick={onGetStarted} loading={loading} />
            {secondaryLabel && onSecondary ? (
              <button
                type="button"
                aria-label={secondaryLabel}
                onClick={onSecondary}
                className="py-2 text-center text-base font-semibold text-primary"
              >
                {secondaryLabel}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);
