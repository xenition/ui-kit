import * as React from 'react';
import { cn } from '../primitives/cn';
import { ALIGN_CLASSES, JUSTIFY_CLASSES, SPACE_GAP, type Align, type Justify, type SpaceKey } from './_tokens';

export interface ClusterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Space between children, from the spacing scale. Defaults to `sm`. */
  gap?: SpaceKey;
  align?: Align;
  justify?: Justify;
  /** Wrap onto new lines when the row overflows. Defaults to `true`. */
  wrap?: boolean;
}

/**
 * A wrapping inline group — tags, chips, button rows — that flows children left
 * to right and wraps by default, with a token-bound `gap`. Gap traces to the
 * `--xen-space-*` tokens; no literal colors.
 */
export const Cluster = React.forwardRef<HTMLDivElement, ClusterProps>(function Cluster(
  { gap = 'sm', align = 'center', justify = 'start', wrap = true, className, ...rest },
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
        SPACE_GAP[gap],
        className
      )}
      {...rest}
    />
  );
});
