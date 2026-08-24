import * as React from 'react';
import type { RouteStopProps } from './RouteStop';
/** Drop-in for {@link RouteStop}: identical props, a distinct design. */
export type RouteStopV2Props = RouteStopProps;
/**
 * RouteStop, alternate design **V2** — a *numbered node card*. Where the classic
 * is a bare rail row, V2 is a shadowed card: a big tone-filled numbered node
 * hangs on the left edge, the address is the headline, the delivery window sits
 * in its own pill, and a status glyph + word chip plus a package count anchor the
 * footer. `connected` still draws a rail down to the next card. Completed fills
 * the node and marks it `✓`; status is always glyph + word (tone reinforces
 * only). Same props. No literal colors.
 */
export declare const RouteStopV2: React.ForwardRefExoticComponent<RouteStopProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RouteStopV2.d.ts.map