import * as React from 'react';
import type { PriceListProps, PriceRow } from './PriceList';
/** Drop-in for {@link PriceListProps} — same props, the V4 "showcase" design. */
export type PriceListV4Props = PriceListProps;
/** A single menu-style row (mirrors the web `PriceRowV4`). */
export interface PriceRowV4Props {
    row: PriceRow;
}
/**
 * PriceRow — **V4** "showcase" design (native mirror of the web V4). One
 * menu-style row: `name ········ price` — the leading name left, a spaced dotted
 * leader (a flex spacer with a thin soft-primary dotted bottom border, since RN
 * has no CSS `color-mix` leader), and an extra-bold `tabular-nums` price right,
 * with an optional description beneath. Token-only colors, no literals.
 */
export declare function PriceRowV4({ row }: PriceRowV4Props): React.ReactElement;
/**
 * PriceList — **V4** "showcase" design (native mirror of the web V4). A clean
 * menu-style price group: an optional ornamented rule, a small-caps group
 * heading, and dotted-leader `PriceRowV4`s from the base's `rows` data array
 * (the web V4 composes children). Same props/behavior as {@link PriceListProps};
 * token-only colors, no literals.
 */
export declare function PriceListV4({ heading, rows, ornament, style, }: PriceListV4Props): React.ReactElement;
//# sourceMappingURL=PriceListV4.d.ts.map