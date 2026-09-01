import * as React from 'react';
import type { LocationBlockProps } from './LocationBlock';
/** Drop-in for {@link LocationBlockProps} — same props, the V4 "showcase" design. */
export type LocationBlockV4Props = LocationBlockProps;
/**
 * LocationBlock — **V4** "showcase" design (web parity of the native V4). An
 * elevated contact card: the venue `name`, an `<address>`, an opening-`hours`
 * list and `phone`/`email` links sit in a clean surface card beside the map.
 * When `mapSrc` is present it embeds the interactive map `<iframe>`; otherwise
 * the map slot is a **soft-primary well** placeholder carrying the address and
 * an optional `directionsUrl`. NOT a brand-gradient surface — refined and
 * elevated (`rounded-lg border border-border bg-surface shadow-sm`). Same
 * props/behavior as {@link LocationBlockProps}; every color is a `--xen-*`
 * token — no literals.
 */
export declare const LocationBlockV4: React.ForwardRefExoticComponent<LocationBlockProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=LocationBlockV4.d.ts.map