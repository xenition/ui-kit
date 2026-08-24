import * as React from 'react';
import { cn } from '../primitives/cn';
import { SPACE_MX_NEG, SPACE_MY_NEG, type SpaceKey } from './_tokens';

export interface BleedProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Uniform negative margin on all sides, from the spacing scale. Defaults to `md`. */
  space?: SpaceKey;
  /** Bleed only horizontally. */
  horizontal?: SpaceKey;
  /** Bleed only vertically. */
  vertical?: SpaceKey;
}

/**
 * The inverse of `Inset`: applies token-bound *negative* margins so content can
 * break out of a padded parent (full-bleed images, edge-to-edge rows). Margins
 * trace to the `--xen-space-*` tokens; no literal colors.
 */
export const Bleed = React.forwardRef<HTMLDivElement, BleedProps>(function Bleed(
  { space = 'md', horizontal, vertical, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(SPACE_MX_NEG[horizontal ?? space], SPACE_MY_NEG[vertical ?? space], className)}
      {...rest}
    />
  );
});
