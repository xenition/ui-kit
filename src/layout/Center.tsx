import * as React from 'react';
import { cn } from '../primitives/cn';

export interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Fill the parent (`flex-1`) so children center within all available space. */
  fill?: boolean;
}

/**
 * Centers its children on both axes. Optionally fills the parent so the
 * centering happens across all available space. Pure layout — no theme colors.
 */
export const Center = React.forwardRef<HTMLDivElement, CenterProps>(function Center(
  { fill = false, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('flex items-center justify-center', fill ? 'flex-1' : undefined, className)}
      {...rest}
    />
  );
});
