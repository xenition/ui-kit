import * as React from 'react';
import type { PriceListProps, PriceRowProps } from './PriceList';
/** Drop-in for {@link PriceListProps} — same props, the V4 "showcase" design. */
export type PriceListV4Props = PriceListProps;
/** Drop-in for {@link PriceRowProps} — same props, the V4 "showcase" design. */
export type PriceRowV4Props = PriceRowProps;
/**
 * PriceList — **V4** "showcase" design (web parity of the native V4). A clean
 * menu-style price group on the page ground: an optional ornamented rule, a
 * small-caps group heading, and dotted-leader rows. Same props/behavior as
 * {@link PriceListProps}; token-only colors, no literals.
 */
export declare const PriceListV4: React.ForwardRefExoticComponent<PriceListProps & React.RefAttributes<HTMLElement>>;
/**
 * PriceRow — **V4** "showcase" design (web parity of the native V4). One
 * menu-style row: `name ········ price`, the leading name left, a spaced dotted
 * leader, and an extra-bold `tabular-nums` price right, with an optional
 * description beneath. The leader is `aria-hidden`; screen readers hear "name,
 * price". Same props/behavior as {@link PriceRowProps}; token-only colors, no
 * literals.
 */
export declare const PriceRowV4: React.ForwardRefExoticComponent<PriceRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PriceListV4.d.ts.map