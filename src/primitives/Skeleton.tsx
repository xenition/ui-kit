import * as React from 'react';
import { cn } from './cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shape of the placeholder. */
  variant?: 'text' | 'rect' | 'circle';
  /** CSS width (e.g. '100%', 200). */
  width?: number | string;
  /** CSS height (e.g. '1rem', 40). */
  height?: number | string;
  /** For `text`: render N stacked lines (last one shorter). */
  lines?: number;
}

/** Shimmering loading placeholder bound to the theme tokens. */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { className, variant = 'text', width, height, lines = 1, style, ...rest },
  ref
) {
  const base = 'animate-pulse bg-neutral-200';
  const shape =
    variant === 'circle'
      ? 'rounded-full'
      : variant === 'rect'
        ? 'rounded-[var(--xen-radius-md)]'
        : 'rounded';

  if (variant === 'text' && lines > 1) {
    return (
      <div ref={ref} className={cn('flex flex-col gap-2', className)} {...rest}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(base, shape, 'h-3.5')}
            style={{ width: i === lines - 1 ? '60%' : '100%' }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(base, shape, variant === 'text' && 'h-3.5', className)}
      style={{ width, height, ...style }}
      {...rest}
    />
  );
});
