import * as React from 'react';
import { cn } from '../primitives/cn';
import type { SectionHeadingProps } from './SectionHeading';

/** Drop-in for {@link SectionHeadingProps} — same props, the V4 "showcase" design. */
export type SectionHeadingV4Props = SectionHeadingProps;

/**
 * SectionHeading — **V4** "showcase" design (web parity of the native V4). NOT
 * a gradient surface: a clean, refined section opener with a strong soft-primary
 * eyebrow chip, an extra-bold tight-tracked heading, and a muted supporting
 * lede. Honors every prop of {@link SectionHeadingProps}
 * (`eyebrow`/`title`/`lede`/`align`/`as` heading level); token-only colors, no
 * literals.
 */
export const SectionHeadingV4 = React.forwardRef<HTMLDivElement, SectionHeadingV4Props>(
  function SectionHeadingV4(
    { eyebrow, title, lede, align = 'left', as: Heading = 'h2', className, ...rest },
    ref
  ) {
    const centered = align === 'center';
    return (
      <div
        ref={ref}
        data-xen-section-heading=""
        className={cn(
          'flex max-w-3xl flex-col gap-[var(--xen-space-sm)]',
          centered && 'mx-auto items-center text-center',
          className
        )}
        {...rest}
      >
        {eyebrow !== undefined ? (
          <p className="inline-flex items-center rounded-[var(--xen-radius-full)] bg-primary/10 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] font-heading text-sm font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
        ) : null}
        <Heading className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-on-surface">
          {title}
        </Heading>
        {lede !== undefined ? <p className="text-lg text-muted">{lede}</p> : null}
      </div>
    );
  }
);
