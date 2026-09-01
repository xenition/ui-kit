import * as React from 'react';
import type { ComparableRowProps } from './ComparableRow';
/** Drop-in for {@link ComparableRowProps} — same props, the V4 "listing" design. */
export type ComparableRowV4Props = ComparableRowProps;
/**
 * ComparableRow — **V4** "listing" design. The image-forward, editorial take on a
 * comparable-sale ("comp") row: a small rounded thumbnail, the address, the
 * price-forward sold figure, beds/baths/sqft facts as soft-primary chips, and a
 * derived $/sqft indicator. The row itself stays clean surface (no gradient).
 * The $/sqft is guarded against a missing or zero `sqft`. Same props/behavior as
 * {@link ComparableRowProps}. Token-only colors via `useXenitionTheme()`.
 */
export declare function ComparableRowV4({ address, priceCents, currency, sqft, beds, baths, distance, status, onPress, style, }: ComparableRowV4Props): React.ReactElement;
//# sourceMappingURL=ComparableRowV4.d.ts.map