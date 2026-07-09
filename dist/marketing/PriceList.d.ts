import * as React from 'react';
import { OrnamentShape } from './OrnamentRule';
export interface PriceListProps extends React.HTMLAttributes<HTMLElement> {
    /** Group heading (e.g. a menu course, a service tier family). */
    heading?: React.ReactNode;
    /** Ornament drawn above the heading (default `diamond`; `none` hides the rule). */
    ornament?: OrnamentShape;
}
export interface PriceRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Item name (left side of the leader). */
    name: React.ReactNode;
    /** Price, already formatted (right side of the leader — the kit never guesses currency). */
    price: React.ReactNode;
    /** Supporting line under the row. */
    description?: React.ReactNode;
    /** Heading level for the item name (default `h3`). */
    as?: 'h3' | 'h4' | 'p';
}
/**
 * Editorial price group generalized from the restaurant menu: an ornamented
 * rule, a small-caps group heading, and dotted-leader rows. Token-colored and
 * static (motion belongs to a wrapping `Reveal`/`Stagger`, by composition).
 */
export declare const PriceList: React.ForwardRefExoticComponent<PriceListProps & React.RefAttributes<HTMLElement>>;
/**
 * One dotted-leader row: `name ········ price`, with an optional description
 * beneath. The leader is `aria-hidden`; screen readers hear "name, price".
 */
export declare const PriceRow: React.ForwardRefExoticComponent<PriceRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PriceList.d.ts.map