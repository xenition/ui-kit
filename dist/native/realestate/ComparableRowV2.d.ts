import * as React from 'react';
import type { ComparableRowProps } from './ComparableRow';
/** Drop-in alternate of {@link ComparableRowProps} — identical prop contract. */
export type ComparableRowV2Props = ComparableRowProps;
/**
 * ComparableRow — design variant **V2**: a **stat-forward, elevated card**.
 * Where V1 is a single bordered line (facts left, price right), V2 leads with an
 * address + status header and a metric strip of three `Statistic` cells —
 * price, $/sq ft, and size — reading as a valuation summary block rather than a
 * table row. Same props as {@link ComparableRowProps}; the $/sq ft figure is
 * still guarded against a missing/zero `sqft`. Token-only.
 */
export declare function ComparableRowV2({ address, priceCents, currency, sqft, beds, baths, distance, status, onPress, style, }: ComparableRowV2Props): React.ReactElement;
//# sourceMappingURL=ComparableRowV2.d.ts.map