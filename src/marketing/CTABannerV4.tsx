import * as React from 'react';
import { cn } from '../primitives/cn';
import { AuroraBackground } from './AuroraBackground';
import type { CTABannerProps } from './CTABanner';

/** Drop-in for {@link CTABannerProps} — same props, the V4 "showcase" design. */
export type CTABannerV4Props = CTABannerProps;

/**
 * CTABanner — **V4** "showcase" design (web parity of the native V4). The bold,
 * conversion-forward closing band: a vibrant primary→accent brand gradient
 * ground carrying a big extra-bold near-white headline, a soft supporting line,
 * and a centered call-to-action. The base's `AuroraBackground` is kept as a
 * subtle texture overlay so `variant`/`grain`/`pattern` still apply. Same
 * props/behavior as {@link CTABannerProps}; every color is a `--xen-*` token
 * (`from-primary-500`, `to-accent-500`, `text-primary-50`) — no literals.
 */
export const CTABannerV4 = React.forwardRef<HTMLElement, CTABannerV4Props>(function CTABannerV4(
  { title, subtitle, action, variant = 'radial', grain = false, pattern = 'none', className, children, ...rest },
  ref
) {
  return (
    <section
      ref={ref}
      data-xen-cta=""
      className={cn(
        'relative isolate overflow-hidden rounded-[var(--xen-radius-lg)] shadow-lg',
        'bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 text-primary-50',
        'px-[var(--xen-space-xl)] py-[var(--xen-space-2xl)]',
        className
      )}
      {...rest}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <AuroraBackground variant={variant} grain={grain} pattern={pattern} />
      </div>
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-[var(--xen-space-md)] text-center">
        <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-primary-50 sm:text-4xl">{title}</h2>
        {subtitle !== undefined ? <p className="text-lg text-primary-100">{subtitle}</p> : null}
        {children}
        {action !== undefined ? (
          <div className="mt-[var(--xen-space-sm)] flex flex-wrap justify-center gap-[var(--xen-space-sm)]">{action}</div>
        ) : null}
      </div>
    </section>
  );
});
