import * as React from 'react';
import type { DishCardProps } from './DishCard';
/** Drop-in for {@link DishCard}: identical props, a distinct design. */
export type DishCardV3Props = DishCardProps;
/**
 * DishCard, alternate design **V3** — a *text-first* menu line. Borderless and
 * dense, separated from its neighbours by a single hairline rule rather than a
 * card. The name and price share the top baseline (name left, price right,
 * bridged by a dotted leader), the description follows, and a small square
 * thumbnail sits on the *right* — the inverse of the base left-thumb row. Adding
 * is a quiet text button, not a filled pill. Same props as the base; token-only.
 */
export declare const DishCardV3: React.ForwardRefExoticComponent<DishCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DishCardV3.d.ts.map