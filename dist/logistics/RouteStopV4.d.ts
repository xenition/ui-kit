import * as React from 'react';
import type { RouteStopProps } from './RouteStop';
/** V4 layout choices for the "dispatch" design. */
export type RouteStopLayout = 'full' | 'compact';
/** Drop-in for {@link RouteStopProps} — same props, the V4 "dispatch" design. */
export interface RouteStopV4Props extends RouteStopProps {
    /** V4 layout: `full` (card with a numbered marker, default) or `compact` (dense single row). */
    variant?: RouteStopLayout;
}
/**
 * RouteStop — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on a delivery-route stop: an elevated rounded
 * card with a soft shadow, a numbered sequence marker (filled with the status
 * tone once completed), the address + recipient, an ETA/window, a package count,
 * and a labelled glyph + word status badge (never color alone). Clickable when
 * `onClick` is set. Honors the V4 `variant` — `full` (card, default) and
 * `compact` (a dense single row) — identical props/behavior to
 * {@link RouteStopProps}. All colors from `--xen-*` token classes (no literals).
 */
export declare const RouteStopV4: React.ForwardRefExoticComponent<RouteStopV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RouteStopV4.d.ts.map