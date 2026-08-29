import * as React from 'react';
import type { JsonViewerProps } from './JsonViewer';
export type { JsonViewerProps as JsonViewerV4Props };
/**
 * **V4 JSON viewer** — same props as {@link JsonViewer}, a different design
 * line.
 *
 * Three changes:
 *
 * 1. **A calm, recessed ground.** The tree sat on `surface`, the same colour
 *    as the page. It sinks by the same 4% neutral step `CodeBlockV4` and the
 *    V4 tables use, mixed from the two scheme-resolved slots so it inverts
 *    with the scheme — one recessed amount for every monospace surface in the
 *    line.
 * 2. **Depth gets a guide, not just an indent.** Each level draws a hairline
 *    at its left edge. This is the one place a rule earns itself against §9:
 *    an indent with nothing in it stops telling you which parent a row belongs
 *    to as soon as the parent scrolls off the top, and re-finding that is the
 *    entire task a JSON inspector exists for (§33).
 * 3. **A branch row tints when pressed and the caret leaves the accessibility
 *    tree.** The row already announces `expanded`; a screen reader should not
 *    also read "▾".
 *
 * The syntax colours stay exactly as the base has them — every one a `*Text`
 * slot rather than a fill, which is the fix the native twin already carried
 * and its web twin did not. **No gradient and no new palette**: five roles
 * (key, string, number, boolean, null) all drawn from seed tokens is the whole
 * colour system here, and §35.5 would not thank us for a sixth.
 */
export declare function JsonViewerV4({ value, defaultExpandDepth, rootLabel, style, }: JsonViewerProps): React.ReactElement;
//# sourceMappingURL=JsonViewerV4.d.ts.map