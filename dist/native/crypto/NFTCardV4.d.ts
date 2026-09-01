import * as React from 'react';
import type { NFTCardProps } from './NFTCard';
export interface NFTCardV4Props extends NFTCardProps {
    /** Announced while the artwork loads. Default `'Loading artwork'`. */
    loadingLabel?: string;
    /** Caption over the floor price. Default `'Floor'`. */
    floorLabel?: string;
}
/**
 * **V4 collectible tile** — same props as {@link NFTCard} plus `loadingLabel`
 * and `floorLabel`.
 *
 * ## Four changes
 *
 * 1. **The skeleton is visible.** The base painted `colors.border` at 50%
 *    opacity inside a `ramps.neutral[100]` well — two near-identical greys, so
 *    the only thing separating "loading" from "loaded, no image" was the pulse.
 *    It is now the shared opaque skeleton mix against the well's own ground.
 * 2. **A floor price never prints without its unit.** `floorSymbol` is
 *    optional and had no fallback, so a tile could show a bare `0.5` — a
 *    number a user has to guess the denomination of on a screen that exists to
 *    compare prices. With no symbol the floor is omitted rather than
 *    misreported.
 * 3. **The tile announces itself once, with the price in it.** The base's name
 *    was `"Punk #4231, CryptoPunks"` — the collection and nothing else. The
 *    chain and the floor now join it.
 * 4. **A press is a state layer**, not `opacity: 0.85`, and the card takes the
 *    same `outlined` variant its web twin does.
 */
export declare function NFTCardV4({ name, collection, image, floorAmount, floorSymbol, floorDecimals, network, variant, loading, loadingLabel, floorLabel, onPress, style, }: NFTCardV4Props): React.ReactElement | null;
//# sourceMappingURL=NFTCardV4.d.ts.map