import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { GetStartedButton } from './GetStartedButton';

export type WelcomeScreenVariant = 'centered' | 'bottomSheet';

export interface WelcomeScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Product/brand name shown as the hero headline. */
  title: string;
  /** Supporting value line under the title. */
  subtitle?: string;
  /** Optional emoji/glyph for the brand medallion. */
  logoGlyph?: string;
  /** Primary CTA copy. Default `'Get started'`. */
  primaryLabel?: string;
  /** Fires on the primary CTA. */
  onGetStarted?: () => void;
  /** Secondary link copy (e.g. `'I already have an account'`). */
  secondaryLabel?: string;
  /** Fires on the secondary link. Hidden when omitted. */
  onSecondary?: () => void;
  /** Show a spinner on the primary CTA while an async step runs. */
  loading?: boolean;
  /** `'bottomSheet'` left-aligns for a sheet presentation. Default `'centered'`. */
  variant?: WelcomeScreenVariant;
}

/**
 * First-launch welcome — a brand medallion, headline, one value line and the
 * primary {@link GetStartedButton}, with an optional "already have an account"
 * secondary link (design.md §42). The `bottomSheet` variant left-aligns for use
 * inside a sheet. Every color traces to a token. No literal colors.
 */
export const WelcomeScreen = React.forwardRef<HTMLDivElement, WelcomeScreenProps>(
  function WelcomeScreen(
    {
      title,
      subtitle,
      logoGlyph,
      primaryLabel = 'Get started',
      onGetStarted,
      secondaryLabel,
      onSecondary,
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
        className={cn(
          'flex min-h-full flex-col justify-center gap-6 bg-surface p-6',
          centered ? 'items-center text-center' : 'items-start text-left',
          className
        )}
        {...rest}
      >
        {logoGlyph ? (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
            <Icon glyph={logoGlyph} size="2xl" color="onPrimary" />
          </div>
        ) : null}

        <h1 className="text-3xl font-bold text-on-surface">{title}</h1>

        {subtitle ? (
          <p className="text-lg leading-relaxed text-muted">{subtitle}</p>
        ) : null}

        <div className="mt-2 flex w-full flex-col gap-3">
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
    );
  }
);
