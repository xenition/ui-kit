import * as React from 'react';
import { cn } from '../primitives/cn';

export interface StickyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Which edge to stick to. Defaults to `top`. */
  side?: 'top' | 'bottom';
  /** Offset in px from the sticky edge. Defaults to 0. */
  offset?: number;
}

/**
 * Wraps its children in a `position: sticky` box pinned to the `top` (or
 * `bottom`) edge of the nearest scrolling ancestor, offset by `offset` px. The
 * offset is a numeric layout literal; no literal colors.
 */
export const Sticky = React.forwardRef<HTMLDivElement, StickyProps>(function Sticky(
  { side = 'top', offset = 0, className, style, ...rest },
  ref
) {
  const edge = side === 'top' ? { top: offset } : { bottom: offset };
  return (
    <div ref={ref} className={cn('sticky z-10', className)} style={{ ...edge, ...style }} {...rest} />
  );
});
