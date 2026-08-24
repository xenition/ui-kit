import * as React from 'react';
import { cn } from '../primitives/cn';
import { SPACE_PX, SPACE_PY, type SpaceKey } from './_tokens';

export interface InsetProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Uniform padding on all sides, from the spacing scale. Defaults to `md`. */
  space?: SpaceKey;
  /** Override horizontal padding independently. */
  horizontal?: SpaceKey;
  /** Override vertical padding independently. */
  vertical?: SpaceKey;
}

/**
 * Pads its children inward by a token-bound amount — uniform via `space`, or
 * per-axis via `horizontal`/`vertical`. All padding traces to the `--xen-space-*`
 * tokens; no literal colors.
 */
export const Inset = React.forwardRef<HTMLDivElement, InsetProps>(function Inset(
  { space = 'md', horizontal, vertical, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(SPACE_PX[horizontal ?? space], SPACE_PY[vertical ?? space], className)}
      {...rest}
    />
  );
});
