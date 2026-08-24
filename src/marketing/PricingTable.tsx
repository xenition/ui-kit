import * as React from 'react';
import { cn } from '../primitives/cn';

export type PricingTableProps = React.HTMLAttributes<HTMLDivElement>;

/** Responsive row of `PricingTier` cards. */
export const PricingTable = React.forwardRef<HTMLDivElement, PricingTableProps>(
  function PricingTable({ className, ...rest }, ref) {
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

export interface PricingTierProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tier name ("Starter", "Pro", …). */
  name: React.ReactNode;
  /** Price display ("$19", "Free", …). */
  price: React.ReactNode;
  /** Billing period line (e.g. "/month"). */
  period?: React.ReactNode;
  /** Short description under the price. */
  description?: React.ReactNode;
  /** Checklist entries. */
  features?: readonly React.ReactNode[];
  /** Emphasized tier: token ring, slight scale, badge. */
  featured?: boolean;
  /** Badge text on the featured tier. */
  featuredLabel?: React.ReactNode;
  /** Call-to-action slot (usually a `Button`). */
  action?: React.ReactNode;
}

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
    className="mt-0.5 shrink-0 text-success"
  >
    <path d="M3 8.5l3.5 3.5L13 4.5" />
  </svg>
);

/** One pricing tier card. */
export const PricingTier = React.forwardRef<HTMLDivElement, PricingTierProps>(
  function PricingTier(
    {
      name,
      price,
      period,
      description,
      features = [],
      featured = false,
      featuredLabel = 'Most popular',
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
          'rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]',
          featured
            ? 'border-2 border-primary shadow-lg ring-2 ring-primary-300 lg:scale-105'
            : 'border border-border',
          className
        )}
        {...rest}
      >
        {featured ? (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-[var(--xen-radius-full)] bg-primary px-3 py-0.5 text-xs font-semibold text-on-primary">
            {featuredLabel}
          </span>
        ) : null}
        <h3 className="font-heading text-lg font-semibold">{name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="font-heading text-3xl font-bold">{price}</span>
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
