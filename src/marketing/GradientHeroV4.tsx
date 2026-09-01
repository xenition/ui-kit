import * as React from 'react';
import { cn } from '../primitives/cn';
import { AuroraBackground } from './AuroraBackground';
import type { GradientHeroProps } from './GradientHero';

/** Drop-in for {@link GradientHeroProps} — same props, the V4 "showcase" design. */
export type GradientHeroV4Props = GradientHeroProps;

/**
 * GradientHero — **V4** "showcase" design (web parity of the native V4). The
 * bold, conversion-forward landing moment: a vibrant primary→accent brand
 * gradient ground carrying a soft-primary eyebrow chip, an extra-bold
 * tight-tracked near-white headline, generous whitespace, and a centered (or
 * left-aligned) call-to-action row. The base's `AuroraBackground` is kept as a
 * subtle texture overlay so `variant`/`grain`/`pattern` still apply. Honors
 * every prop of {@link GradientHeroProps} (`eyebrow`/`title`/`subtitle`/
 * `actions`/`media`/`align`); every color is a `--xen-*` token
 * (`from-primary-500`, `to-accent-500`, `text-primary-50`) — no literals.
 */
export const GradientHeroV4 = React.forwardRef<HTMLElement, GradientHeroV4Props>(
  function GradientHeroV4(
    {
      eyebrow,
      title,
      subtitle,
      actions,
      media,
      variant = 'aurora',
      grain = false,
      pattern = 'none',
      align = 'center',
      className,
      children,
      ...rest
    },
    ref
  ) {
    const centered = align === 'center';
    return (
      <section
        ref={ref}
        data-xen-hero=""
        className={cn(
          'relative isolate overflow-hidden rounded-[var(--xen-radius-lg)] shadow-lg',
          'bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 text-primary-50',
          'px-[var(--xen-space-lg)] py-[calc(var(--xen-space-2xl)*2)]',
          className
        )}
        {...rest}
      >
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
          <AuroraBackground variant={variant} grain={grain} pattern={pattern} />
        </div>
        <div
          className={cn(
            'relative mx-auto flex max-w-5xl flex-col gap-[var(--xen-space-lg)]',
            centered ? 'items-center text-center' : 'items-start text-left'
          )}
        >
          {eyebrow !== undefined ? (
            <p className="inline-flex items-center rounded-[var(--xen-radius-full)] bg-primary-50/20 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] font-heading text-sm font-semibold uppercase tracking-widest text-primary-50">
              {eyebrow}
            </p>
          ) : null}
          <h1
            className="font-heading font-extrabold leading-tight tracking-tight text-primary-50"
            style={{ fontSize: 'clamp(var(--xen-text-3xl), 6vw, calc(var(--xen-text-3xl) * 1.9))' }}
          >
            {title}
          </h1>
          {subtitle !== undefined ? (
            <p className="max-w-2xl text-lg text-primary-100">{subtitle}</p>
          ) : null}
          {actions !== undefined ? (
            <div
              className={cn(
                'mt-[var(--xen-space-sm)] flex flex-wrap gap-[var(--xen-space-sm)]',
                centered && 'justify-center'
              )}
            >
              {actions}
            </div>
          ) : null}
          {children}
          {media !== undefined ? (
            <div className="mt-[var(--xen-space-xl)] w-full">{media}</div>
          ) : null}
        </div>
      </section>
    );
  }
);
