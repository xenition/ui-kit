import * as React from 'react';
/**
 * Reserve an item's intrinsic aspect ratio (no layout shift). The ratio is
 * carried on a custom property and consumed by `aspect-ratio: var(...)`, so it
 * survives environments that don't recognize the shorthand while still being
 * fully live in the browser.
 */
export declare function aspectStyle(width?: number, height?: number): React.CSSProperties | undefined;
//# sourceMappingURL=aspect.d.ts.map