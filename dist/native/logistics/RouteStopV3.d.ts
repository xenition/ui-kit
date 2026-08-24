import * as React from 'react';
import type { RouteStopProps } from './RouteStop';
/** Drop-in for {@link RouteStop}: identical props, a distinct design. */
export type RouteStopV3Props = RouteStopProps;
/**
 * RouteStop, alternate design **V3** — a *dense single line*. A small
 * tone-outlined sequence chip, the address (with a muted recipient/pkg meta
 * segment beneath), then the status glyph + word and the window right-aligned —
 * one compact row with a bottom divider, tuned for a long manifest list. No
 * rail, no card: the inverse of V2's node card. Completed marks the chip `✓`;
 * status stays glyph + word (tone reinforces). Same props. No literal colors.
 */
export declare function RouteStopV3({ sequence, address, recipient, status, eta, packages, connected: _connected, onPress, testID, style, }: RouteStopV3Props): React.ReactElement;
//# sourceMappingURL=RouteStopV3.d.ts.map