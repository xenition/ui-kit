import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Appearance } from '../primitives/internal/appearance';
/** The category of baggage. */
export type BaggageKind = 'cabin' | 'personal' | 'checked';
export interface BaggageRowProps {
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
    /**
     * Surface treatment (visual diversity). Default `'classic'` — the original
     * borderless row. Any other value wraps the row in that surface (with
     * padding + radius) so it can stand alone as a card-like tile.
     */
    appearance?: Appearance;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single baggage-allowance line — a kind glyph, the title, the allowance
 * detail, and a trailing status: an "Included" badge or a fare add-on price.
 * `included` drives both the badge text and the announcement (never
 * color-alone). Token-only colors.
 */
export declare function BaggageRow({ kind, label, allowance, included, priceCents, currency, appearance, style, }: BaggageRowProps): React.ReactElement;
//# sourceMappingURL=BaggageRow.d.ts.map