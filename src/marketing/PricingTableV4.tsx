import * as React from 'react';
import { cn } from '../primitives/cn';
import type { PricingTableProps, PricingTierProps } from './PricingTable';

/** Drop-in for {@link PricingTableProps} — same props, the V4 "showcase" design. */
export type PricingTableV4Props = PricingTableProps;

/** Drop-in for {@link PricingTierProps} — same props, the V4 "showcase" design. */
export type PricingTierV4Props = PricingTierProps;

const CheckIcon = (): React.ReactElement => (
  <svg
    aria-hidden="true"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mt-0.5 shrink-0 text-primary"
  >
    <path d="M3 8.5l3.5 3.5L13 4.5" />
  </svg>
);

/**
 * PricingTable — **V4** "showcase" design (web parity of the native V4).
 * Responsive row of `PricingTierV4` cards on the clean page ground; composes the
 * tier just like the base. Same props/behavior as {@link PricingTableProps};
 * every color is a `--xen-*` token — no literals.
 */
export const PricingTableV4 = React.forwardRef<HTMLDivElement, PricingTableV4Props>(
  function PricingTableV4({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-xen-pricing=""
        className={cn(
          'grid grid-cols-1 items-stretch gap-[var(--xen-space-lg)] md:grid-cols-2 lg:grid-cols-3',
          className
        )}
        {...rest}
      />
    );
  }
);

/**
 * PricingTier — **V4** "showcase" design (web parity of the native V4). One
 * elevated rounded card: an extra-bold name, a big extra-bold `tabular-nums`
 * price, a soft-primary ✓ feature list, and a prominent CTA. The **featured**
 * tier is the accent moment — a token primary ring, a soft-primary "Popular"
 * chip (never color alone), and a primary CTA (others outline). A token accent,
 * NOT a full brand gradient. Same props/behavior as {@link PricingTierProps};
 * token-only colors, no literals.
 */
export const PricingTierV4 = React.forwardRef<HTMLDivElement, PricingTierV4Props>(
  function PricingTierV4(
    {
      name,
      price,
      period,
      description,
      features = [],
      featured = false,
      featuredLabel = 'Popular',
      action,
      className,
      children,
      ...rest
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        data-xen-pricing-tier=""
        data-featured={featured ? 'true' : 'false'}
        className={cn(
          'relative flex flex-col gap-[var(--xen-space-md)] bg-surface text-on-surface',
          'rounded-[var(--xen-radius-lg)] border border-border p-[var(--xen-space-lg)] shadow-sm',
          featured ? 'ring-2 ring-primary lg:scale-105' : null,
          className
        )}
        {...rest}
      >
        {featured ? (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-[var(--xen-radius-full)] bg-primary-100 px-3 py-0.5 text-xs font-semibold text-primary-700">
            {featuredLabel}
          </span>
        ) : null}
        <h3 className="font-heading text-lg font-extrabold tracking-tight">{name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="font-heading text-4xl font-extrabold tabular-nums tracking-tight">
            {price}
          </span>
          {period !== undefined ? <span className="text-sm text-muted">{period}</span> : null}
        </div>
        {description !== undefined ? <p className="text-sm text-muted">{description}</p> : null}
        {features.length > 0 ? (
          <ul className="flex flex-col gap-[var(--xen-space-xs)] text-sm">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-[var(--xen-space-xs)]">
                <CheckIcon />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {children}
        {action !== undefined ? <div className="mt-auto pt-[var(--xen-space-sm)]">{action}</div> : null}
      </div>
    );
  }
);
