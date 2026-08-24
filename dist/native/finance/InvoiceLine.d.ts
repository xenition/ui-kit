import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Appearance } from '../primitives/internal/appearance';
export interface InvoiceLineProps {
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
    /**
     * Surface treatment (visual-diversity preset). Defaults to `classic` — the
     * historical borderless line, so this is opt-in only.
     */
    appearance?: Appearance;
    style?: StyleProp<ViewStyle>;
}
/**
 * One invoice / receipt line: a description with a `qty × unit` sub-line and a
 * right-aligned line total. The total defaults to `unitPriceCents * quantity`
 * (integer cents — exact), rendered neutral-toned through {@link MoneyAmount}.
 * `emphasized` styles it as the grand-total row. Token-bound throughout.
 */
export declare function InvoiceLine({ description, unitPriceCents, quantity, currency, amountCents, emphasized, appearance, style, }: InvoiceLineProps): React.ReactElement;
//# sourceMappingURL=InvoiceLine.d.ts.map