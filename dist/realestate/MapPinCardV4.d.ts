import * as React from 'react';
import type { MapPinCardProps } from './MapPinCard';
/** Drop-in for {@link MapPinCardProps} — same props, the V4 "listing" design. */
export type MapPinCardV4Props = MapPinCardProps;
/**
 * MapPinCard — **V4** "listing" design (web parity of the native V4). The
 * image-forward, editorial take on the location preview: a rounded elevated frame
 * with a subtle soft-primary gradient "ground" (no faux grid clutter) and a single
 * primary pill pin marking the spot. STATIC and dependency-free — it imports no map
 * library, so it renders in any environment; wire a real map behind `onClick`. Same
 * props/behavior as {@link MapPinCardProps}: `address` + `caption` in a floating
 * card overlay, `pin` position clamped to the frame. All colors come from the
 * `--xen-*` tokens (no literals); a11y-labelled.
 */
export declare const MapPinCardV4: React.ForwardRefExoticComponent<MapPinCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MapPinCardV4.d.ts.map