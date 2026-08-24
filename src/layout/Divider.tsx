import * as React from 'react';
import { cn } from '../primitives/cn';
import { SPACE_MX, SPACE_MY, type SpaceKey } from './_tokens';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  /** Inset the divider from the cross axis by a spacing token. */
  inset?: SpaceKey;
}

/**
 * A one-pixel rule in the theme `border` color, horizontal or vertical, with an
 * optional token-bound `inset`. Rendered as an `<hr>` (implicit `separator`
 * role). Color and inset trace to the theme tokens; no literal colors.
 */
export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(function Divider(
  { orientation = 'horizontal', inset, className, ...rest },
  ref
) {
  const horizontal = orientation === 'horizontal';
  return (
    <hr
      ref={ref}
      aria-orientation={orientation}
      className={cn(
        'border-0 border-solid border-border',
        horizontal ? 'w-full border-t' : 'self-stretch border-l',
        inset ? (horizontal ? SPACE_MX[inset] : SPACE_MY[inset]) : undefined,
        className
      )}
      {...rest}
    />
  );
});
