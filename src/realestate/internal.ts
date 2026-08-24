import * as React from 'react';

/** Clamp a fraction into the `0`–`1` range (shared by the map/floor-plan placeholders). */
export const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * DOM props that make a non-button element behave like a button when an
 * `onClick` is supplied: `role`, keyboard activation (Enter / Space), a tab
 * stop, and an accessible label. Returns `undefined` when there is no handler,
 * so callers can spread it unconditionally.
 */
export function clickableProps(
  onClick: React.MouseEventHandler | undefined,
  label: string
): Partial<React.HTMLAttributes<HTMLElement>> | undefined {
  if (!onClick) return undefined;
  return {
    role: 'button',
    tabIndex: 0,
    'aria-label': label,
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        (onClick as unknown as (ev: unknown) => void)(e);
      }
    },
  };
}
