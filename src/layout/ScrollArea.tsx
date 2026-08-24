import * as React from 'react';
import { cn } from '../primitives/cn';
import { SPACE_P, type SpaceKey } from './_tokens';

export type ScrollAxis = 'vertical' | 'horizontal' | 'both';

const OVERFLOW_CLASSES: Record<ScrollAxis, string> = {
  vertical: 'overflow-y-auto overflow-x-hidden',
  horizontal: 'overflow-x-auto overflow-y-hidden',
  both: 'overflow-auto',
};

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Which axis scrolls. Defaults to `vertical`. */
  axis?: ScrollAxis;
  /** Inner content padding, from the spacing scale. Defaults to `lg`. */
  padding?: SpaceKey;
  /** Fill the theme surface color behind the content. */
  filled?: boolean;
}

/**
 * Themed scroll container with token-bound content padding and an optional
 * theme `surface` background — the web scroll region. Padding and color trace to
 * the theme tokens; no literal colors.
 */
export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(function ScrollArea(
  { axis = 'vertical', padding = 'lg', filled = false, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        OVERFLOW_CLASSES[axis],
        SPACE_P[padding],
        filled ? 'bg-surface text-on-surface' : undefined,
        className
      )}
      {...rest}
    />
  );
});
