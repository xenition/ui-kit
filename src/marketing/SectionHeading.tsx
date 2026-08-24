import * as React from 'react';
import { cn } from '../primitives/cn';

export interface SectionHeadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Small kicker line above the title. */
  eyebrow?: React.ReactNode;
  /** Section title. */
  title: React.ReactNode;
  /** Supporting paragraph under the title. */
  lede?: React.ReactNode;
  align?: 'left' | 'center';
  /** Heading level for the title element. */
  as?: 'h1' | 'h2' | 'h3';
}

/** Eyebrow + title + lede — the standard section opener. */
export const SectionHeading = React.forwardRef<HTMLDivElement, SectionHeadingProps>(
  function SectionHeading(
    { eyebrow, title, lede, align = 'left', as: Heading = 'h2', className, ...rest },
    ref
  ) {
    return (
      <div
        ref={ref}
        data-xen-section-heading=""
        className={cn(
          'flex max-w-3xl flex-col gap-[var(--xen-space-sm)]',
          align === 'center' && 'mx-auto items-center text-center',
          className
        )}
        {...rest}
      >
        {eyebrow !== undefined ? (
          <p className="font-heading text-sm font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
        ) : null}
        <Heading className="font-heading text-3xl font-bold leading-tight text-on-surface">
          {title}
        </Heading>
        {lede !== undefined ? <p className="text-lg text-muted">{lede}</p> : null}
      </div>
    );
  }
);
