import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { Eyebrow } from '../primitives/Eyebrow';
import { OrnamentRule } from './OrnamentRule';
import type { PriceListProps, PriceRowProps } from './PriceList';

/** Drop-in for {@link PriceListProps} — same props, the V4 "showcase" design. */
export type PriceListV4Props = PriceListProps;

/** Drop-in for {@link PriceRowProps} — same props, the V4 "showcase" design. */
export type PriceRowV4Props = PriceRowProps;

/**
 * The dotted leader carries the only color: a soft-primary dotted rule,
 * baseline-aligned via a small negative translate (V4 "showcase" recolors the
 * base accent leader to the primary token accent).
 */
const PRICE_CSS = `
[data-xen-price-leader-v4] {
  flex: 1 1 auto;
  min-width: 2rem;
  margin: 0 0.85rem;
  border-bottom: 1px dotted color-mix(in srgb, var(--xen-primary-400) 40%, transparent);
  transform: translateY(-0.3em);
}
`;

/**
 * PriceList — **V4** "showcase" design (web parity of the native V4). A clean
 * menu-style price group on the page ground: an optional ornamented rule, a
 * small-caps group heading, and dotted-leader rows. Same props/behavior as
 * {@link PriceListProps}; token-only colors, no literals.
 */
export const PriceListV4 = React.forwardRef<HTMLElement, PriceListV4Props>(function PriceListV4(
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
      {heading !== undefined ? <Eyebrow align="center">{heading}</Eyebrow> : null}
      <div className="flex flex-col gap-[var(--xen-space-lg)]">{children}</div>
    </section>
  );
});

/**
 * PriceRow — **V4** "showcase" design (web parity of the native V4). One
 * menu-style row: `name ········ price`, the leading name left, a spaced dotted
 * leader, and an extra-bold `tabular-nums` price right, with an optional
 * description beneath. The leader is `aria-hidden`; screen readers hear "name,
 * price". Same props/behavior as {@link PriceRowProps}; token-only colors, no
 * literals.
 */
export const PriceRowV4 = React.forwardRef<HTMLDivElement, PriceRowV4Props>(function PriceRowV4(
  { name, price, description, as: Heading = 'h3', className, ...rest },
  ref
) {
  injectStyleOnce('xen-price-styles-v4', PRICE_CSS);
  return (
    <div ref={ref} data-xen-price-row="" className={cn('group', className)} {...rest}>
      <div className="flex items-baseline">
        <Heading className="font-heading text-xl font-semibold leading-snug text-on-surface">
          {name}
        </Heading>
        <span data-xen-price-leader-v4="" aria-hidden="true" />
        <span
          data-xen-price=""
          className="whitespace-nowrap font-heading text-lg font-extrabold tabular-nums text-primary"
        >
          {price}
        </span>
      </div>
      {description !== undefined ? (
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
});
