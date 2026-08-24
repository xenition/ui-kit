import * as React from 'react';

/** Interaction props that make a non-`<button>` element behave as a button. */
export interface PressableProps {
  role: 'button';
  tabIndex: 0;
  onClick: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}

/**
 * The web analog of a native `Pressable` wrapper: given an optional `onClick`,
 * returns the props that turn a plain element into a keyboard-operable button
 * (click + Enter/Space), or `undefined` when the row is non-interactive. Keeps
 * the DOM root a single element so refs and layout stay stable. Mirrors the
 * finance module's helper.
 */
export function pressableProps(onClick?: () => void): PressableProps | undefined {
  if (!onClick) return undefined;
  return {
    role: 'button',
    tabIndex: 0,
    onClick,
    onKeyDown: (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick();
      }
    },
  };
}
