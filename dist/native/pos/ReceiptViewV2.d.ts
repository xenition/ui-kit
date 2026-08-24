import * as React from 'react';
import type { ReceiptViewProps } from './ReceiptView';
/** Drop-in alternate of {@link ReceiptViewProps} — identical prop contract. */
export type ReceiptViewV2Props = ReceiptViewProps;
/**
 * ReceiptView — design variant **V2**: an **elevated paper receipt**. Where V1
 * is a flat bordered card, V2 floats on a shadowed surface, prints a dashed
 * **perforation** strip beneath the header, and wraps the grand total in a
 * primary-tinted **highlighted band** so the amount due reads at a glance across
 * a counter. Item ladder, tenders with derived change, and footer as in V1. An
 * empty item list renders a labelled {@link EmptyState}. Same props as
 * {@link ReceiptViewProps}. Token-only; money is integer cents.
 */
export declare function ReceiptViewV2({ merchant, addressLines, orderNumber, timestamp, items, currency, subtotalCents, discountCents, taxCents, tipCents, totalCents, tenders, footer, variant, emptyLabel, testID, style, }: ReceiptViewV2Props): React.ReactElement;
//# sourceMappingURL=ReceiptViewV2.d.ts.map