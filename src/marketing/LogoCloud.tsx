import * as React from 'react';
import { cn } from '../primitives/cn';

export interface LogoCloudProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Small line above the logos ("Trusted by…"). */
  label?: React.ReactNode;
}

/**
 * Row of partner/customer logos, dimmed and desaturated until hovered.
 * Children are arbitrary logo slots (img/svg/text); each is wrapped so the
 * dim/restore treatment is uniform.
 */
export const LogoCloud = React.forwardRef<HTMLDivElement, LogoCloudProps>(function LogoCloud(
  { label, className, children, ...rest },
  ref
) {
  const items = React.Children.toArray(children);
  return (
    <div
      ref={ref}
      data-xen-logo-cloud=""
      className={cn('flex flex-col items-center gap-[var(--xen-space-md)]', className)}
      {...rest}
    >
      {label !== undefined ? (
        <p className="text-sm font-medium uppercase tracking-widest text-muted">{label}</p>
      ) : null}
      <div className="flex flex-wrap items-center justify-center gap-x-[var(--xen-space-xl)] gap-y-[var(--xen-space-md)]">
        {items.map((child, index) => (
          <span
            key={index}
            data-xen-logo=""
            className="opacity-60 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0"
          >
            {child}
          </span>
        ))}
      </div>
    </div>
  );
});
