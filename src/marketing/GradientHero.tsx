import * as React from 'react';
import { cn } from '../primitives/cn';
import { AuroraBackground, AuroraPattern, AuroraVariant } from './AuroraBackground';

export interface GradientHeroProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Small kicker line above the title. */
  eyebrow?: React.ReactNode;
  /** Main headline (rendered in an `<h1>`). */
  title: React.ReactNode;
  /** Supporting copy under the title. */
  subtitle?: React.ReactNode;
  /** Call-to-action row (buttons/links). */
  actions?: React.ReactNode;
  /** Optional media (screenshot, illustration) below the copy. */
  media?: React.ReactNode;
  /** Aurora composition. */
  variant?: AuroraVariant;
  /** Grain overlay on the aurora. */
  grain?: boolean;
  /** Dot/grid pattern overlay on the aurora. */
  pattern?: AuroraPattern;
  /** Horizontal alignment of the copy block. */
  align?: 'left' | 'center';
}

/**
 * Full-bleed marketing hero over an animated aurora gradient. Everything is
 * token-driven: the aurora reads the primary/accent ramps, text reads the
 * semantic slots — dark mode is just the flipped variables.
 */
export const GradientHero = React.forwardRef<HTMLElement, GradientHeroProps>(
  function GradientHero(
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
          'relative overflow-hidden bg-surface text-on-surface',
          'px-[var(--xen-space-lg)] py-[calc(var(--xen-space-2xl)*2)]',
          className
        )}
        {...rest}
      >
        <AuroraBackground variant={variant} grain={grain} pattern={pattern} />
        <div
          className={cn(
            'relative mx-auto flex max-w-5xl flex-col gap-[var(--xen-space-lg)]',
            centered ? 'items-center text-center' : 'items-start text-left'
          )}
        >
          {eyebrow !== undefined ? (
            <p className="font-heading text-sm font-semibold uppercase tracking-widest text-primary">
              {eyebrow}
            </p>
          ) : null}
          <h1
            className="font-heading font-bold leading-tight"
            style={{ fontSize: 'clamp(var(--xen-text-3xl), 6vw, calc(var(--xen-text-3xl) * 1.9))' }}
          >
            {title}
          </h1>
          {subtitle !== undefined ? (
            <p className="max-w-2xl text-lg text-muted">{subtitle}</p>
          ) : null}
          {actions !== undefined ? (
            <div
              className={cn(
                'flex flex-wrap gap-[var(--xen-space-sm)]',
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
