import * as React from 'react';
import { cn } from '../primitives/cn';
import { ALIGN_CLASSES, JUSTIFY_CLASSES, SPACE_GAP, type Align, type Justify, type SpaceKey } from './_tokens';

export interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Vertical space between children, from the spacing scale. */
  gap?: SpaceKey;
  align?: Exclude<Align, 'baseline'>;
  justify?: Justify;
}

/**
 * Vertical flex column with a token-bound `gap` plus `align`/`justify`
 * controls — the web vertical stack. Gap traces to the `--xen-space-*` tokens;
 * no literal colors.
 */
export const Column = React.forwardRef<HTMLDivElement, ColumnProps>(function Column(
  { gap, align = 'stretch', justify = 'start', className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col',
        ALIGN_CLASSES[align],
        JUSTIFY_CLASSES[justify],
        gap ? SPACE_GAP[gap] : undefined,
        className
      )}
      {...rest}
    />
  );
});
