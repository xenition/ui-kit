import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** A single key fact in a {@link PropertyFactsBar} — a glyph, a label and a big value. */
export interface PropertyFact {
    /**
     * Optional decorative glyph for the fact (e.g. `'🛏'`, `'🛁'`, `'📐'`). Purely
     * ornamental — hidden from a11y; the `label`/`value` carry the meaning.
     */
    glyph?: string;
    /** Muted caption under the value (e.g. `'Beds'`, `'Sqft'`, `'Year'`). */
    label: string;
    /** The big legible fact numeral/text (e.g. `'3'`, `'1,450'`, `'Condo'`). */
    value: string;
}
export interface PropertyFactsBarProps {
    /**
     * The ordered key facts to display, each a `{ glyph?, label, value }` cell
     * (e.g. Beds 3 / Baths 2 / Sqft 1,450 / Lot 0.2ac / Year 1998 / Type Condo).
     * Wraps to new rows when the cells overflow the bar's width.
     */
    facts: readonly PropertyFact[];
    /**
     * Fixed number of columns for the fact grid. When omitted the strip lays the
     * cells out at ~2 per row and wraps. Clamped to `1–6`.
     */
    columns?: number;
    /**
     * Accessible label for the whole strip. Defaults to `'Key facts'`. Announced
     * on the enclosing group so it reads as a unit.
     */
    accessibilityLabel?: string;
    /** Container style override. */
    style?: StyleProp<ViewStyle>;
}
/**
 * PropertyFactsBar — **V4** "listing" design. A key-facts stat strip for a
 * property: a wrapping grid of fact cells, each a soft-primary tinted glyph
 * disc, a BIG bold value numeral and a muted label beneath, split by hairline
 * rules. Editorial, single-accent (primary), 8-pt spacing inside a rounded
 * elevated card. Presentational only — token-only colors via
 * `useXenitionTheme()`, no literals; dark-mode safe. Exposed as an a11y group.
 */
export declare function PropertyFactsBar({ facts, columns, accessibilityLabel, style, }: PropertyFactsBarProps): React.ReactElement;
//# sourceMappingURL=PropertyFactsBar.d.ts.map