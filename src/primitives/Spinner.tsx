import * as React from 'react';
import { cn } from './cn';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
}

const SIZE: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-[3px]',
};

/** Themed loading spinner (primary ring). Pairs with buttons or inline "busy" states. */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { className, size = 'md', ...rest },
  ref
) {
  return (
    <span
      ref={ref}
      role="status"
      aria-label="Loading"
      className={cn(
        'inline-block animate-spin rounded-full border-neutral-300 border-t-primary',
        SIZE[size],
        className
      )}
      {...rest}
    />
  );
});
