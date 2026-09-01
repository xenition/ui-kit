import * as React from 'react';
import type { ComparableRowProps } from './ComparableRow';
/** Drop-in for {@link ComparableRowProps} — same props, the V4 "listing" design. */
export type ComparableRowV4Props = ComparableRowProps;
/**
 * ComparableRow — **V4** "listing" design (web parity of the native V4). The
 * image-forward, editorial take on a comparable-sale ("comp") row: a small
 * rounded thumbnail, the address, the price-forward sold figure, beds/baths/sqft
 * facts as soft-primary chips, and a derived $/sqft indicator. The row itself
 * stays clean surface (no gradient). The $/sqft is guarded against a missing or
 * zero `sqft`. Same props/behavior as {@link ComparableRowProps}. All colors
 * from `--xen-*` token classes (no literals). Pass `onClick` to make the row a
 * keyboard-activatable button.
 */
export declare const ComparableRowV4: React.ForwardRefExoticComponent<ComparableRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ComparableRowV4.d.ts.map