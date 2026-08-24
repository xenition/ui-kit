import * as React from 'react';
import { cn } from '../primitives/cn';
import { ALIGN_CLASSES, JUSTIFY_CLASSES, SPACE_GAP, type Align, type Justify, type SpaceKey } from './_tokens';

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Space between children, from the spacing scale. */
  gap?: SpaceKey;
  align?: Align;
  justify?: Justify;
  wrap?: boolean;
}

/**
 * Horizontal flex row with a token-bound `gap` plus `align`/`justify`/`wrap`
 * controls — the web horizontal stack. Gap traces to the `--xen-space-*`
 * tokens; no literal colors.
 */
export const Row = React.forwardRef<HTMLDivElement, RowProps>(function Row(
  { gap, align = 'center', justify = 'start', wrap = false, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-row',
        wrap ? 'flex-wrap' : 'flex-nowrap',
        ALIGN_CLASSES[align],
        JUSTIFY_CLASSES[justify],
        gap ? SPACE_GAP[gap] : undefined,
        className
      )}
      {...rest}
    />
  );
});
