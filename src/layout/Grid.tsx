import * as React from 'react';
import { cn } from '../primitives/cn';
import { SPACE_GAP, type SpaceKey } from './_tokens';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of equal-width columns. Defaults to 2. */
  columns?: number;
  /** Gutter between cells, from the spacing scale. Defaults to `md`. */
  gap?: SpaceKey;
}

/**
 * Fixed-column CSS grid: children flow into `columns` equal-width tracks with a
 * token-bound `gap`. Column count is a numeric layout literal; the gap traces to
 * the `--xen-space-*` tokens (no literal colors).
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(function Grid(
  { columns = 2, gap = 'md', className, style, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('grid', SPACE_GAP[gap], className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, ...style }}
      {...rest}
    />
  );
});
