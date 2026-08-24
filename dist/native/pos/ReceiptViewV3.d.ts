import * as React from 'react';
import type { ReceiptViewProps } from './ReceiptView';
/** Drop-in alternate of {@link ReceiptViewProps} — identical prop contract. */
export type ReceiptViewV3Props = ReceiptViewProps;
/**
 * ReceiptView — design variant **V3**: a **minimal, total-first digital
 * receipt**. Where V1/V2 print merchant → items → total top-to-bottom, V3 leads
 * with the grand total as the hero, drops all card chrome, and lists the items
 * and adjustment ladder underneath as quiet supporting text — the shape of an
 * order-confirmation screen rather than a paper slip. An empty item list renders
 * a labelled {@link EmptyState}. Same props as {@link ReceiptViewProps}.
 * Token-only; money is integer cents.
 */
export declare function ReceiptViewV3({ merchant, addressLines, orderNumber, timestamp, items, currency, subtotalCents, discountCents, taxCents, tipCents, totalCents, tenders, footer, variant, emptyLabel, testID, style, }: ReceiptViewV3Props): React.ReactElement;
//# sourceMappingURL=ReceiptViewV3.d.ts.map