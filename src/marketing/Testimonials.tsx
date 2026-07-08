import * as React from 'react';
import { Marquee } from '../motion/Marquee';
import { cn } from '../primitives/cn';

export interface TestimonialsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `grid` (default) or an infinite `marquee` loop. */
  mode?: 'grid' | 'marquee';
  /** Marquee speed in px/s (marquee mode only). */
  speed?: number;
}

/** Layout container for `Testimonial` cards. */
export const Testimonials = React.forwardRef<HTMLDivElement, TestimonialsProps>(
  function Testimonials({ mode = 'grid', speed, className, children, ...rest }, ref) {
    if (mode === 'marquee') {
      return (
        <div ref={ref} data-xen-testimonials="marquee" className={className} {...rest}>
          <Marquee speed={speed}>{children}</Marquee>
        </div>
      );
    }
    return (
      <div
        ref={ref}
        data-xen-testimonials="grid"
        className={cn(
          'grid grid-cols-1 gap-[var(--xen-space-lg)] sm:grid-cols-2 lg:grid-cols-3',
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export interface TestimonialProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'role'> {
  /** Author name — also the source for the avatar-initials fallback. */
  name: string;
  /** Author role/company line. */
  role?: React.ReactNode;
  /** Avatar slot; when omitted, initials derived from `name` are shown. */
  avatar?: React.ReactNode;
}

/** Derive up to two initials from a display name. */
export function initialsFromName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/** One quote card. The quote itself is `children`. */
export const Testimonial = React.forwardRef<HTMLElement, TestimonialProps>(
  function Testimonial({ name, role, avatar, className, children, ...rest }, ref) {
    return (
      <figure
        ref={ref}
        data-xen-testimonial=""
        className={cn(
          'flex w-72 shrink-0 flex-col gap-[var(--xen-space-md)] border border-border bg-surface text-on-surface sm:w-auto',
          'rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]',
          className
        )}
        {...rest}
      >
        <blockquote className="text-sm leading-relaxed">{children}</blockquote>
        <figcaption className="flex items-center gap-[var(--xen-space-sm)]">
          {avatar !== undefined ? (
            avatar
          ) : (
            <span
              data-xen-avatar-initials=""
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-[var(--xen-radius-full)] bg-primary-100 text-sm font-semibold text-primary-700"
            >
              {initialsFromName(name)}
            </span>
          )}
          <span className="flex flex-col">
            <span className="text-sm font-semibold">{name}</span>
            {role !== undefined ? <span className="text-xs text-muted">{role}</span> : null}
          </span>
        </figcaption>
      </figure>
    );
  }
);
