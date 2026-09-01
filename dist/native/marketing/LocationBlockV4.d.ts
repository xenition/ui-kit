import * as React from 'react';
import type { LocationBlockProps } from './LocationBlock';
/** Drop-in for {@link LocationBlockProps} — same props, the V4 "showcase" design. */
export type LocationBlockV4Props = LocationBlockProps;
/**
 * LocationBlock — **V4** "showcase" design (native mirror of the web V4). An
 * elevated contact card: the venue `name`, `address`, an opening-`hours` list,
 * and `phone`/`email` lines seated in a clean `colors.card` surface with a soft
 * border and a subtle shadow, above the map slot. The map is a **static
 * `mapImageUri` image** when provided, otherwise a **soft-primary well**
 * placeholder carrying the address (native has no interactive `<iframe>`). NOT a
 * brand-gradient surface — refined and elevated. Same props/behavior as
 * {@link LocationBlockProps}; token-only colors via `useXenitionTheme()`,
 * dark-mode safe.
 */
export declare function LocationBlockV4({ name, address, hours, phone, email, mapImageUri, style, }: LocationBlockV4Props): React.ReactElement;
//# sourceMappingURL=LocationBlockV4.d.ts.map