import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { Eyebrow } from '../primitives/Eyebrow';
import { OrnamentRule, OrnamentShape } from './OrnamentRule';

export interface PriceListProps extends React.HTMLAttributes<HTMLElement> {
  /** Group heading (e.g. a menu course, a service tier family). */
  heading?: React.ReactNode;
  /** Ornament drawn above the heading (default `diamond`; `none` hides the rule). */
  ornament?: OrnamentShape;
}

export interface PriceRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Item name (left side of the leader). */
  name: React.ReactNode;
  /** Price, already formatted (right side of the leader — the kit never guesses currency). */
  price: React.ReactNode;
  /** Supporting line under the row. */
  description?: React.ReactNode;
  /** Heading level for the item name (default `h3`). */
  as?: 'h3' | 'h4' | 'p';
}

/**
 * The dotted leader is the only color-bearing rule: an accent-tinted dotted
 * border, baseline-aligned via a small negative translate.
 */
const PRICE_CSS = `
[data-xen-price-leader] {
  flex: 1 1 auto;
  min-width: 2rem;
  margin: 0 0.85rem;
  border-bottom: 1px dotted color-mix(in srgb, var(--xen-accent-400) 40%, transparent);
  transform: translateY(-0.3em);
}
`;

/**
 * Editorial price group generalized from the restaurant menu: an ornamented
 * rule, a small-caps group heading, and dotted-leader rows. Token-colored and
 * static (motion belongs to a wrapping `Reveal`/`Stagger`, by composition).
 */
export const PriceList = React.forwardRef<HTMLElement, PriceListProps>(function PriceList(
  { heading, ornament = 'diamond', className, children, ...rest },
  ref
) {
  return (
    <section
      ref={ref}
      data-xen-price-list=""
      className={cn('flex flex-col gap-[var(--xen-space-lg)]', className)}
      {...rest}
    >
      {ornament !== 'none' ? <OrnamentRule ornament={ornament} aria-hidden="true" /> : null}
      {heading !== undefined ? (
        <Eyebrow align="center">{heading}</Eyebrow>
      ) : null}
      <div className="flex flex-col gap-[var(--xen-space-lg)]">{children}</div>
    </section>
  );
});

/**
 * One dotted-leader row: `name ········ price`, with an optional description
 * beneath. The leader is `aria-hidden`; screen readers hear "name, price".
 */
export const PriceRow = React.forwardRef<HTMLDivElement, PriceRowProps>(function PriceRow(
  { name, price, description, as: Heading = 'h3', className, ...rest },
  ref
) {
  injectStyleOnce('xen-price-styles', PRICE_CSS);
  return (
    <div ref={ref} data-xen-price-row="" className={cn('group', className)} {...rest}>
      <div className="flex items-baseline">
        <Heading className="font-heading text-xl leading-snug text-on-surface">{name}</Heading>
        <span data-xen-price-leader="" aria-hidden="true" />
        <span data-xen-price="" className="whitespace-nowrap font-heading text-lg text-accent">
          {price}
        </span>
      </div>
      {description !== undefined ? (
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
});
