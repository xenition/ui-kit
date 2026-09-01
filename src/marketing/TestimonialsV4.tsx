import * as React from 'react';
import { Marquee } from '../motion/Marquee';
import { cn } from '../primitives/cn';
import { initialsFromName, type TestimonialsProps, type TestimonialProps } from './Testimonials';

/** Drop-in for {@link TestimonialsProps} — same props, the V4 "showcase" design. */
export type TestimonialsV4Props = TestimonialsProps;

/** Drop-in for {@link TestimonialProps} — same props, the V4 "showcase" design. */
export type TestimonialV4Props = TestimonialProps;

/**
 * Testimonials — **V4** "showcase" design (web parity of the native V4). A
 * content section, so NOT a gradient surface: the layout container for
 * `TestimonialV4` quote cards. Honors the base's `mode` (`grid` default, or an
 * infinite `marquee` loop) and `speed`. Same props/behavior as
 * {@link TestimonialsProps}; token-only colors, no literals.
 */
export const TestimonialsV4 = React.forwardRef<HTMLDivElement, TestimonialsV4Props>(
  function TestimonialsV4({ mode = 'grid', speed, className, children, ...rest }, ref) {
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

/**
 * Testimonial — **V4** "showcase" design (web parity of the native V4). A clean,
 * elevated quote card: the quote (`children`) over a caption of an avatar (or
 * initials derived from `name`), an extra-bold name, and a muted role line. Same
 * props/behavior as {@link TestimonialProps}; token-only colors, no literals.
 */
export const TestimonialV4 = React.forwardRef<HTMLElement, TestimonialV4Props>(
  function TestimonialV4({ name, role, avatar, className, children, ...rest }, ref) {
    return (
      <figure
        ref={ref}
        data-xen-testimonial=""
        className={cn(
          'flex w-72 shrink-0 flex-col gap-[var(--xen-space-md)] text-on-surface sm:w-auto',
          'rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] shadow-sm',
          'transition-shadow duration-300 hover:shadow-md',
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
              className="flex h-9 w-9 items-center justify-center rounded-[var(--xen-radius-full)] bg-primary/10 text-sm font-semibold text-primary"
            >
              {initialsFromName(name)}
            </span>
          )}
          <span className="flex flex-col">
            <span className="text-sm font-extrabold tracking-tight">{name}</span>
            {role !== undefined ? <span className="text-xs text-muted">{role}</span> : null}
          </span>
        </figcaption>
      </figure>
    );
  }
);
