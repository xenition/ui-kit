import * as React from 'react';
/** The category of baggage. */
export type BaggageKind = 'cabin' | 'personal' | 'checked';
export interface BaggageRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Baggage category (selects a default glyph + label). */
    kind?: BaggageKind;
    /** Override the row title. */
    label?: string;
    /** Allowance detail, e.g. `'1 × 23 kg'` or `'55 × 40 × 20 cm'`. */
    allowance?: string;
    /** Whether the allowance is included in the fare. */
    included?: boolean;
    /** Extra price in integer minor units (cents) when not included. */
    priceCents?: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
}
/**
 * Web parity of the native `BaggageRow`: a single baggage-allowance line — a
 * kind glyph, the title, the allowance detail, and a trailing status: an
 * "Included" badge or a fare add-on price. `included` drives both the badge text
 * and the announcement (never color-alone). Token-only colors.
 */
export declare const BaggageRow: React.ForwardRefExoticComponent<BaggageRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BaggageRow.d.ts.map