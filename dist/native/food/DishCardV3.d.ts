import * as React from 'react';
import type { DishCardProps } from './DishCard';
/** Drop-in for {@link DishCard}: identical props, a distinct design. */
export type DishCardV3Props = DishCardProps;
/**
 * DishCard, alternate design **V3** — a *text-first* menu line. Borderless and
 * dense, separated from its neighbours by a single hairline rule rather than a
 * card. The name and price share the top baseline (name left, price right,
 * bridged by a dotted leader), the description follows, and a small square
 * thumbnail sits on the *right* — the inverse of the classic left-thumb row.
 * Adding is a quiet text button, not a filled pill. Same props as the classic.
 */
export declare function DishCardV3({ name, description, priceCents, currency, imageUrl, rating, badges, soldOut, loading, onPress, onAdd, addLabel, soldOutLabel, formatMoney, style, }: DishCardV3Props): React.ReactElement;
//# sourceMappingURL=DishCardV3.d.ts.map