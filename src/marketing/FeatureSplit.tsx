import * as React from 'react';
import { cn } from '../primitives/cn';
import { GenerativeCover } from './GenerativeCover';

export interface FeatureSplitProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Small kicker above the title. */
  eyebrow?: React.ReactNode;
  /** Feature headline. */
  title: React.ReactNode;
  /** Supporting copy under the title. */
  description?: React.ReactNode;
  /** Check-marked selling points. */
  bullets?: string[];
  /** Visual slot; omit for a seeded {@link GenerativeCover} placeholder. */
  media?: React.ReactNode;
  /** Flip the column order — media on the opposite side. */
  reverse?: boolean;
  /** Call-to-action slot under the copy. */
  action?: React.ReactNode;
}

/** Alternating image/text feature row — two columns on desktop, stacked on mobile. */
export const FeatureSplit = React.forwardRef<HTMLElement, FeatureSplitProps>(function FeatureSplit(
  { eyebrow, title, description, bullets, media, reverse = false, action, className, ...rest },
  ref
) {
  const seed = typeof title === 'string' ? title : 'feature';
  const mediaNode = media !== undefined ? media : (
    <div className="aspect-video overflow-hidden rounded-[var(--xen-radius-lg)] bg-neutral-100">
      <GenerativeCover seed={seed} className="h-full w-full" />
    </div>
  );

  return (
    <section
      ref={ref}
      data-xen-feature-split=""
      className={cn(
        'grid grid-cols-1 items-center gap-[var(--xen-space-xl)] lg:grid-cols-2',
        className
      )}
      {...rest}
    >
      <div data-xen-feature-split-media="" className={cn(reverse && 'lg:order-2')}>
        {mediaNode}
      </div>
      <div
        data-xen-feature-split-copy=""
        className={cn('flex flex-col gap-[var(--xen-space-sm)]', reverse && 'lg:order-1')}
      >
        {eyebrow !== undefined ? (
          <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-accent">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-heading text-3xl font-bold leading-tight text-on-surface">{title}</h2>
        {description !== undefined ? (
          <p className="text-lg leading-relaxed text-muted">{description}</p>
        ) : null}
        {bullets && bullets.length > 0 ? (
          <ul className="flex flex-col gap-[var(--xen-space-xs)]">
            {bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-[var(--xen-space-sm)] text-on-surface">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M5 10.5l3.5 3.5L15 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {action !== undefined ? (
          <div className="mt-[var(--xen-space-sm)] flex flex-wrap gap-[var(--xen-space-sm)]">
            {action}
          </div>
        ) : null}
      </div>
    </section>
  );
});
