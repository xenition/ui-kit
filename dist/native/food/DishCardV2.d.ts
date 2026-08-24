import * as React from 'react';
import type { DishCardProps } from './DishCard';
/** Drop-in for {@link DishCard}: identical props, a distinct design. */
export type DishCardV2Props = DishCardProps;
/**
 * DishCard, alternate design **V2** — an *image-hero* tile. Where the classic
 * card is a horizontal thumb-plus-text row, V2 leads with a full-width photo
 * that fills the top of the card, floats the {@link PriceTag} in a frosted pill
 * over the bottom-left of the image, and hangs a circular add button off the
 * bottom-right so it reads like a delivery-app feature card. Text lives below
 * on the solid surface (never over the photo) so contrast holds in both
 * schemes. `soldOut`, `loading`, and every prop behave exactly as the classic.
 */
export declare function DishCardV2({ name, description, priceCents, currency, imageUrl, rating, badges, soldOut, loading, onPress, onAdd, addLabel, soldOutLabel, formatMoney, style, }: DishCardV2Props): React.ReactElement;
//# sourceMappingURL=DishCardV2.d.ts.map