import * as React from 'react';
import { cn } from '../primitives/cn';
import { ALIGN_CLASSES, JUSTIFY_CLASSES, SPACE_GAP, type Align, type Justify, type SpaceKey } from './_tokens';

export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

const DIRECTION_CLASSES: Record<FlexDirection, string> = {
  row: 'flex-row',
  column: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'column-reverse': 'flex-col-reverse',
};

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: FlexDirection;
  /** Space between children, from the spacing scale. */
  gap?: SpaceKey;
  align?: Align;
  justify?: Justify;
  wrap?: boolean;
  /** Flex grow factor for this container. */
  grow?: number;
}

/**
 * General-purpose flex container exposing `direction`/`align`/`justify`/`wrap`
 * plus a token-bound `gap` — the escape hatch when `Row`/`Column` are too
 * opinionated. Gap traces to the `--xen-space-*` tokens; no literal colors.
 */
export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(function Flex(
  { direction = 'row', gap, align = 'stretch', justify = 'start', wrap = false, grow, className, style, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex',
        DIRECTION_CLASSES[direction],
        wrap ? 'flex-wrap' : 'flex-nowrap',
        ALIGN_CLASSES[align],
        JUSTIFY_CLASSES[justify],
        gap ? SPACE_GAP[gap] : undefined,
        className
      )}
      style={grow !== undefined ? { flexGrow: grow, ...style } : style}
      {...rest}
    />
  );
});
