import * as React from 'react';
import { cn } from '../primitives/cn';

export interface FeatureGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Column count at the largest breakpoint. */
  columns?: 2 | 3 | 4;
}

const COLUMN_CLASSES: Record<NonNullable<FeatureGridProps['columns']>, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

/** Responsive grid of `FeatureCard`s. */
export const FeatureGrid = React.forwardRef<HTMLDivElement, FeatureGridProps>(
  function FeatureGrid({ columns = 3, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-xen-feature-grid=""
        className={cn('grid grid-cols-1 gap-[var(--xen-space-lg)]', COLUMN_CLASSES[columns], className)}
        {...rest}
      />
    );
  }
);

export interface FeatureCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Icon slot rendered in a tinted square. */
  icon?: React.ReactNode;
  title: React.ReactNode;
  /** Lift + shadow on hover. */
  hoverLift?: boolean;
}

/** One feature: icon slot, title, and body copy (children). */
export const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  function FeatureCard({ icon, title, hoverLift = true, className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-xen-feature-card=""
        className={cn(
          'flex flex-col gap-[var(--xen-space-sm)] border border-border bg-surface text-on-surface',
          'rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]',
          hoverLift && 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg',
          className
        )}
        {...rest}
      >
        {icon !== undefined ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary-100 text-primary-700">
            {icon}
          </div>
        ) : null}
        <h3 className="font-heading text-lg font-semibold">{title}</h3>
        <div className="text-sm text-muted">{children}</div>
      </div>
    );
  }
);
