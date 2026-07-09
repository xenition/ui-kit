import * as React from 'react';

/**
 * Reserve an item's intrinsic aspect ratio (no layout shift). The ratio is
 * carried on a custom property and consumed by `aspect-ratio: var(...)`, so it
 * survives environments that don't recognize the shorthand while still being
 * fully live in the browser.
 */
export function aspectStyle(
  width?: number,
  height?: number
): React.CSSProperties | undefined {
  if (!width || !height) return undefined;
  return {
    ['--xen-aspect' as string]: `${width} / ${height}`,
    aspectRatio: 'var(--xen-aspect)',
  } as React.CSSProperties;
}
