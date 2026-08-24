import * as React from 'react';
/** Clamp a fraction into the `0`–`1` range (shared by the map/floor-plan placeholders). */
export declare const clamp01: (n: number) => number;
/**
 * DOM props that make a non-button element behave like a button when an
 * `onClick` is supplied: `role`, keyboard activation (Enter / Space), a tab
 * stop, and an accessible label. Returns `undefined` when there is no handler,
 * so callers can spread it unconditionally.
 */
export declare function clickableProps(onClick: React.MouseEventHandler | undefined, label: string): Partial<React.HTMLAttributes<HTMLElement>> | undefined;
//# sourceMappingURL=internal.d.ts.map