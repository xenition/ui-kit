import * as React from 'react';
import { cn } from '../primitives/cn';
import { GenerativeCover } from './GenerativeCover';
import type { FeatureSplitProps } from './FeatureSplit';

/** Drop-in for {@link FeatureSplitProps} — same props, the V4 "showcase" design. */
export type FeatureSplitV4Props = FeatureSplitProps;

/**
 * FeatureSplit — **V4** "showcase" design (web parity of the native V4). A
 * content section, so NOT a gradient surface: a two-column feature row — bold
 * copy on one side, an elevated media slot on the other. Honors every base prop
 * (`eyebrow`/`title`/`description`/`bullets`/`media`/`reverse`/`action`); the
 * headline is extra-bold and tight-tracked, bullets carry a soft-primary check,
 * and `reverse` flips the column order. Same props/behavior as
 * {@link FeatureSplitProps}; token-only colors, no literals.
 */
export const FeatureSplitV4 = React.forwardRef<HTMLElement, FeatureSplitV4Props>(function FeatureSplitV4(
  { eyebrow, title, description, bullets, media, reverse = false, action, className, ...rest },
  ref
) {
  const seed = typeof title === 'string' ? title : 'feature';
  const mediaNode =
    media !== undefined ? (
      media
    ) : (
      <div className="aspect-video overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-neutral-100 shadow-sm">
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
        <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-on-surface sm:text-4xl">
          {title}
        </h2>
        {description !== undefined ? (
          <p className="text-lg leading-relaxed text-muted">{description}</p>
        ) : null}
        {bullets && bullets.length > 0 ? (
          <ul className="flex flex-col gap-[var(--xen-space-xs)]">
            {bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-[var(--xen-space-sm)] text-on-surface">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[var(--xen-radius-full)] bg-primary/10 text-primary">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path d="M5 10.5l3.5 3.5L15 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
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
