import * as React from 'react';
import { cn } from '../primitives/cn';
import { AuroraBackground, AuroraPattern, AuroraVariant } from './AuroraBackground';

export interface CTABannerProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Banner headline. */
  title: React.ReactNode;
  /** Supporting copy under the title (children also render here). */
  subtitle?: React.ReactNode;
  /** Call-to-action slot. */
  action?: React.ReactNode;
  /** Aurora composition behind the band. */
  variant?: AuroraVariant;
  grain?: boolean;
  pattern?: AuroraPattern;
}

/**
 * Closing gradient band — the same aurora machinery as `GradientHero` in a
 * compact rounded section with a single call to action.
 */
export const CTABanner = React.forwardRef<HTMLElement, CTABannerProps>(function CTABanner(
  {
    title,
    subtitle,
    action,
    variant = 'radial',
    grain = false,
    pattern = 'none',
    className,
    children,
    ...rest
  },
  ref
) {
  return (
    <section
      ref={ref}
      data-xen-cta=""
      className={cn(
        'relative overflow-hidden bg-surface text-on-surface',
        'rounded-[var(--xen-radius-lg)] border border-border',
        'px-[var(--xen-space-xl)] py-[var(--xen-space-2xl)]',
        className
      )}
      {...rest}
    >
      <AuroraBackground variant={variant} grain={grain} pattern={pattern} />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-[var(--xen-space-md)] text-center">
        <h2 className="font-heading text-3xl font-bold leading-tight">{title}</h2>
        {subtitle !== undefined ? <p className="text-lg text-muted">{subtitle}</p> : null}
        {children}
        {action !== undefined ? (
          <div className="mt-[var(--xen-space-sm)] flex flex-wrap justify-center gap-[var(--xen-space-sm)]">
            {action}
          </div>
        ) : null}
      </div>
    </section>
  );
});
