import * as React from 'react';
import type { ComparableRowProps } from './ComparableRow';
/** Drop-in alternate of {@link ComparableRowProps} — identical prop contract. */
export type ComparableRowV3Props = ComparableRowProps;
/**
 * ComparableRow — design variant **V3**: an **ultra-compact leaderboard line**.
 * Where V1 is a bordered card row, V3 is borderless with a leading status dot,
 * the address in the middle, and price + $/sq ft stacked tight on the right —
 * built to stack many comps with hairline separation. Same props as
 * {@link ComparableRowProps}; the $/sq ft figure is guarded against a
 * missing/zero `sqft`. Token-only: the status dot reads a semantic color slot.
 */
export declare function ComparableRowV3({ address, priceCents, currency, sqft, beds, baths, distance, status, onPress, style, }: ComparableRowV3Props): React.ReactElement;
//# sourceMappingURL=ComparableRowV3.d.ts.map