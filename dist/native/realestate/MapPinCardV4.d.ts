import * as React from 'react';
import type { MapPinCardProps } from './MapPinCard';
/** Drop-in for {@link MapPinCardProps} — same props, the V4 "listing" design. */
export type MapPinCardV4Props = MapPinCardProps;
/**
 * MapPinCard — **V4** "listing" design. The image-forward, editorial take on the
 * location preview: a rounded elevated frame with a subtle soft-primary gradient
 * "ground" (no faux grid clutter) and a single primary pill pin marking the spot.
 * STATIC and dependency-free — it imports no `react-native-maps` / `MapView`, so it
 * renders in any environment; wire a real map behind `onPress`. Same props/behavior
 * as {@link MapPinCardProps}: `address` + `caption` in a floating card overlay,
 * `pin` position clamped to the frame. Token-only colors via `useXenitionTheme()`;
 * a11y-labelled.
 */
export declare function MapPinCardV4({ address, caption, pin, height, onPress, style, }: MapPinCardV4Props): React.ReactElement;
//# sourceMappingURL=MapPinCardV4.d.ts.map