import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';

export type BoostVariant = 'boost' | 'superboost' | 'premium';

export interface BoostBannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
  /** Which upsell. Drives glyph + accent slot. Defaults to `boost`. */
  variant?: BoostVariant;
  /** Headline. Sensible default per variant. */
  title?: string;
  /** Supporting line. */
  subtitle?: string;
  /** CTA button label. Defaults per variant. */
  ctaLabel?: string;
  /** Fires the CTA (and card click). */
  onClick?: () => void;
  /** Live countdown text (e.g. "Boost active · 22m left"). Switches to active styling. */
  activeLabel?: string;
  /** Dismiss handler; renders a close affordance when provided. */
  onDismiss?: () => void;
}

interface Spec {
  glyph: string;
  /** Token color classes for accent text + border. */
  accentText: string;
  accentBorder: string;
  title: string;
  subtitle: string;
  cta: string;
}

const SPEC: Record<BoostVariant, Spec> = {
  boost: {
    glyph: '⚡',
    accentText: 'text-primary',
    accentBorder: 'border-primary',
    title: 'Be seen first',
    subtitle: 'Boost your profile to the top for 30 minutes.',
    cta: 'Boost me',
  },
  superboost: {
    glyph: '🚀',
    accentText: 'text-accent',
    accentBorder: 'border-accent',
    title: 'Super Boost tonight',
    subtitle: 'Up to 100× more profile views during peak hours.',
    cta: 'Super Boost',
  },
  premium: {
    glyph: '★',
    accentText: 'text-warn',
    accentBorder: 'border-warn',
    title: 'Go Premium',
    subtitle: 'Unlimited likes, see who likes you, and more.',
    cta: 'Upgrade',
  },
};

/**
 * Upsell banner for boosts / premium — the web parity of the native boost banner.
 * Presents a glyph, headline, subtitle, and a CTA, switching to an "active"
 * treatment when an `activeLabel` (countdown) is supplied. The whole card is a
 * keyboard-operable `role="button"` container and the nested CTA/dismiss are real
 * `<button>`s that stop propagation. Token classes only; state is conveyed by
 * text, not color alone.
 */
export const BoostBanner = React.forwardRef<HTMLDivElement, BoostBannerProps>(function BoostBanner(
  { variant = 'boost', title, subtitle, ctaLabel, onClick, activeLabel, onDismiss, className, ...rest },
  ref
) {
  const spec = SPEC[variant];
  const active = activeLabel != null;
  const heading = title ?? spec.title;
  const support = active ? (activeLabel as string) : subtitle ?? spec.subtitle;

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={`${heading}. ${support}`}
      onClick={() => onClick?.()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        'flex cursor-pointer items-center gap-md rounded-[var(--xen-radius-lg)] border bg-surface p-md transition-opacity hover:opacity-90',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        active ? spec.accentBorder : 'border-border',
        className
      )}
      {...rest}
    >
      <span className={cn('flex h-11 w-11 items-center justify-center rounded-full border text-xl', spec.accentBorder)} aria-hidden="true">
        {spec.glyph}
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-base font-bold text-on-surface">{heading}</span>
        <span className={cn('line-clamp-2 text-sm', active ? spec.accentText : 'text-muted')}>{support}</span>
      </div>

      {onDismiss ? (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className="text-lg leading-none text-muted"
        >
          ✕
        </button>
      ) : (
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          {ctaLabel ?? spec.cta}
        </Button>
      )}
    </div>
  );
});
