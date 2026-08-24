import * as React from 'react';
import type { ProductGridTileProps } from './ProductGridTile';
/** Drop-in alternate of {@link ProductGridTileProps} — identical prop contract. */
export type ProductGridTileV2Props = ProductGridTileProps;
/**
 * ProductGridTile — design variant **V2**: an **elevated tile with a large image
 * and a floating price chip**. Where V1 is a flat bordered card with a short
 * plate, V2 floats on a shadow, gives the image a tall 4:3 area, and overlays a
 * solid **price chip** on the artwork so the price reads before the eye reaches
 * the name. Missing `imageUrl` falls back to a token-tinted initials plate.
 * `soldOut` dims + flags by word; `selected` draws an accent ring. Same props as
 * {@link ProductGridTileProps}. Token-only.
 */
export declare function ProductGridTileV2({ name, priceCents, currency, imageUrl, seed, tone, soldOut, selected, onPress, onLongPress, variant, testID, style, }: ProductGridTileV2Props): React.ReactElement;
//# sourceMappingURL=ProductGridTileV2.d.ts.map