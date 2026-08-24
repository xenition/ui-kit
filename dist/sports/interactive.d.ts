/**
 * Internal helpers shared by the web sports blocks (not part of the public
 * barrel). They centralise the "make a `div` behave like a button" pattern the
 * module reuses: a keyboard activator (Enter / Space) plus the prop set that
 * turns any element into an accessible, focusable control.
 */
import * as React from 'react';
/** Enter / Space → invoke `handler` (with `preventDefault` so Space never scrolls). */
export declare function activateOnKey(handler: () => void): (e: React.KeyboardEvent) => void;
/**
 * Props that upgrade a plain `div` into a `role="button"` control: focusable,
 * click + keyboard activated, with a `focus-visible` ring from the token ramp.
 * Returns `{}` when there is no handler, so the element stays presentational.
 */
export declare function tappableProps(onClick: (() => void) | undefined, label?: string): React.HTMLAttributes<HTMLElement> & {
    tabIndex?: number;
};
/** Focus-ring classes for interactive sports surfaces (token ramp only). */
export declare const FOCUS_RING = "cursor-pointer outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary-300";
//# sourceMappingURL=interactive.d.ts.map