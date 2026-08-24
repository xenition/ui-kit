import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { GetStartedButton } from './GetStartedButton';
import type { WelcomeScreenProps } from './WelcomeScreen';

/** Same public contract as {@link WelcomeScreen} — a drop-in alternate design. */
export type WelcomeScreenV3Props = WelcomeScreenProps;

/**
 * WelcomeScreen, redesigned (v3): a **compact welcome card**. A small inline
 * medallion beside the title, a short subtitle, and the CTAs in a tight row —
 * sized for a bottom sheet or modal rather than a full page. The opposite of v2's
 * split hero. Same props, token-only.
 */
export const WelcomeScreenV3 = React.forwardRef<HTMLDivElement, WelcomeScreenV3Props>(
  function WelcomeScreenV3(
    { title, subtitle, logoGlyph, primaryLabel = 'Get started', onGetStarted, secondaryLabel, onSecondary, loading = false, variant, className, ...rest },
    ref
  ) {
    void variant;
    return (
      <div ref={ref} className={cn('flex flex-col gap-4 rounded-lg bg-surface p-5 shadow-sm', className)} {...rest}>
        <div className="flex items-center gap-3">
          {logoGlyph ? (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Icon glyph={logoGlyph} size="lg" color="primary" />
            </div>
          ) : null}
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-on-surface">{title}</h1>
            {subtitle ? <p className="text-sm text-muted">{subtitle}</p> : null}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <GetStartedButton label={primaryLabel} onClick={onGetStarted} loading={loading} />
          </div>
          {secondaryLabel && onSecondary ? (
            <button
              type="button"
              aria-label={secondaryLabel}
              onClick={onSecondary}
              className="shrink-0 py-2 text-sm font-semibold text-primary"
            >
              {secondaryLabel}
            </button>
          ) : null}
        </div>
      </div>
    );
  }
);
