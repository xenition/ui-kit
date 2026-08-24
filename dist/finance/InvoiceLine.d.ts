import * as React from 'react';
export interface InvoiceLineProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Line description (product / service). */
    description: string;
    /** Unit price in integer **cents**. */
    unitPriceCents: number;
    /** Quantity (default `1`). */
    quantity?: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /**
     * Line total in **cents**. When omitted it is computed as
     * `unitPriceCents × quantity` — integer math, so no float drift.
     */
    amountCents?: number;
    /** Render as the emphasized total row (heavier weight, no unit breakdown). */
    emphasized?: boolean;
}
/**
 * One invoice / receipt line: a description with a `qty × unit` sub-line and a
 * right-aligned line total. The total defaults to `unitPriceCents * quantity`
 * (integer cents — exact), rendered neutral-toned through {@link MoneyAmount}.
 * `emphasized` styles it as the grand-total row. Token-bound throughout. Web
 * parity of the native `InvoiceLine`.
 */
export declare const InvoiceLine: React.ForwardRefExoticComponent<InvoiceLineProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=InvoiceLine.d.ts.map