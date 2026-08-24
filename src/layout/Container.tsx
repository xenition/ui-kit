import * as React from 'react';
import { cn } from '../primitives/cn';
import { SPACE_PX, type SpaceKey } from './_tokens';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max content width in px; content is centered within it. Defaults to 480. */
  maxWidth?: number;
  /** Horizontal padding token. Defaults to `lg`. */
  padding?: SpaceKey;
}

/**
 * Centered content column with a token-bound horizontal padding and a numeric
 * `maxWidth` cap — the web page container. Padding traces to the `--xen-space-*`
 * tokens; only the numeric `maxWidth` is a layout literal (no literal colors).
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { maxWidth = 480, padding = 'lg', className, style, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('w-full mx-auto', SPACE_PX[padding], className)}
      style={{ maxWidth, ...style }}
      {...rest}
    />
  );
});
