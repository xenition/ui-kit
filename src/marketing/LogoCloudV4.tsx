import * as React from 'react';
import { cn } from '../primitives/cn';
import type { LogoCloudProps } from './LogoCloud';

/** Drop-in for {@link LogoCloudProps} — same props, the V4 "showcase" design. */
export type LogoCloudV4Props = LogoCloudProps;

/**
 * LogoCloud — **V4** "showcase" design (web parity of the native V4). A tidy,
 * refined logo strip: an optional muted "Trusted by…" `label` above a soft,
 * evenly-spaced row of `children` logo slots rendered in a muted, desaturated
 * tone that lifts to full color on hover/focus. An optional continuous marquee
 * drift keeps a long strip alive; it is a decorative flourish, so it is dropped
 * under `prefers-reduced-motion: reduce` (the strip simply wraps and centers).
 * NOT a brand-gradient surface — clean and understated. Same props/behavior as
 * {@link LogoCloudProps}; every color is a `--xen-*` token (`text-muted`) — no
 * literals.
 */
export const LogoCloudV4 = React.forwardRef<HTMLDivElement, LogoCloudV4Props>(function LogoCloudV4(
  { label, className, children, ...rest },
  ref
) {
  const items = React.Children.toArray(children);
  return (
    <div
      ref={ref}
      data-xen-logo-cloud=""
      className={cn('flex flex-col items-center gap-[var(--xen-space-lg)]', className)}
      {...rest}
    >
      {label !== undefined ? (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">{label}</p>
      ) : null}
      <div
        className={cn(
          'flex flex-wrap items-center justify-center',
          'gap-x-[var(--xen-space-2xl)] gap-y-[var(--xen-space-lg)]',
          'motion-safe:sm:animate-[xen-logocloud-drift_28s_linear_infinite] motion-safe:sm:flex-nowrap motion-safe:sm:[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]'
        )}
      >
        {items.map((child, index) => (
          <span
            key={index}
            data-xen-logo=""
            className={cn(
              'inline-flex shrink-0 items-center justify-center text-muted opacity-70 grayscale',
              'transition-all duration-200 hover:text-on-surface hover:opacity-100 hover:grayscale-0',
              'focus-within:text-on-surface focus-within:opacity-100 focus-within:grayscale-0'
            )}
          >
            {child}
          </span>
        ))}
      </div>
      <style>{XEN_LOGOCLOUD_CSS}</style>
    </div>
  );
});

/**
 * Marquee keyframes live in an injected sheet so the geometry carries no color.
 * Gated at the class level by Tailwind's `motion-safe:` variant, so
 * `prefers-reduced-motion: reduce` never starts the drift.
 */
const XEN_LOGOCLOUD_CSS = `
@keyframes xen-logocloud-drift {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}
`;
