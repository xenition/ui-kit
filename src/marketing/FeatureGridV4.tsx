import * as React from 'react';
import { cn } from '../primitives/cn';
import type { FeatureGridProps, FeatureCardProps } from './FeatureGrid';

/** Drop-in for {@link FeatureGridProps} — same props, the V4 "showcase" design. */
export type FeatureGridV4Props = FeatureGridProps;

/** Drop-in for {@link FeatureCardProps} — same props, the V4 "showcase" design. */
export type FeatureCardV4Props = FeatureCardProps;

const COLUMN_CLASSES: Record<NonNullable<FeatureGridV4Props['columns']>, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

/**
 * FeatureGrid — **V4** "showcase" design (web parity of the native V4). A content
 * section, so NOT a gradient surface: a responsive grid of clean, elevated
 * `FeatureCardV4`s on the page ground, with generous 8-pt gutters. Same
 * props/behavior as {@link FeatureGridProps} (`columns` drives the breakpoint
 * grid); token-only colors, no literals.
 */
export const FeatureGridV4 = React.forwardRef<HTMLDivElement, FeatureGridV4Props>(
  function FeatureGridV4({ columns = 3, className, ...rest }, ref) {
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

/**
 * FeatureCard — **V4** "showcase" design (web parity of the native V4). One
 * feature as an elevated rounded card: an icon in a soft-primary well, an
 * extra-bold tight-tracked title, and muted body copy (children). The base's
 * `hoverLift` prop is honored as a subtle `hover:shadow-md` lift. Same
 * props/behavior as {@link FeatureCardProps}; token-only colors, no literals.
 */
export const FeatureCardV4 = React.forwardRef<HTMLDivElement, FeatureCardV4Props>(
  function FeatureCardV4({ icon, title, hoverLift = true, className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-xen-feature-card=""
        className={cn(
          'flex flex-col gap-[var(--xen-space-sm)] text-on-surface',
          'rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] shadow-sm',
          hoverLift && 'transition-shadow duration-300 hover:shadow-md',
          className
        )}
        {...rest}
      >
        {icon !== undefined ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/10 text-primary">
            {icon}
          </div>
        ) : null}
        <h3 className="font-heading text-lg font-extrabold leading-tight tracking-tight">{title}</h3>
        <div className="text-sm leading-relaxed text-muted">{children}</div>
      </div>
    );
  }
);
