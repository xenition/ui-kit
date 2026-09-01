import * as React from 'react';
/** A single key fact in a {@link PropertyFactsBar} — a glyph, a label and a big value. */
export interface PropertyFact {
    /**
     * Optional decorative glyph for the fact (e.g. `'🛏'`, `'🛁'`, `'📐'`). Purely
     * ornamental — rendered `aria-hidden`; the `label`/`value` carry the meaning.
     */
    glyph?: string;
    /** Muted caption under the value (e.g. `'Beds'`, `'Sqft'`, `'Year'`). */
    label: string;
    /** The big legible fact numeral/text (e.g. `'3'`, `'1,450'`, `'Condo'`). */
    value: string;
}
export interface PropertyFactsBarProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The ordered key facts to display, each a `{ glyph?, label, value }` cell
     * (e.g. Beds 3 / Baths 2 / Sqft 1,450 / Lot 0.2ac / Year 1998 / Type Condo).
     * Rendered as a semantic list; wraps to new rows on narrow widths.
     */
    facts: readonly PropertyFact[];
    /**
     * Fixed number of columns for the fact grid. When omitted the strip auto-fits
     * as many cells per row as fit (min ~112px each) and wraps. Clamped to `1–6`.
     */
    columns?: number;
    /**
     * Accessible label for the whole strip. Defaults to `'Key facts'`. Announced
     * on the enclosing list so the group reads as a unit.
     */
    ariaLabel?: string;
}
/**
 * PropertyFactsBar — **V4** "listing" design. A key-facts stat strip for a
 * property: a responsive grid of fact cells, each a soft-primary tinted glyph
 * disc, a BIG bold value numeral and a muted label beneath, separated by
 * hairline rules. Editorial, single-accent (primary), 8-pt spacing inside a
 * rounded elevated card. Wraps on small widths; pass `columns` to pin a fixed
 * grid. Presentational only — all colors from `--xen-*` token classes, no
 * literals; dark-mode safe. Rendered as a semantic list for screen readers.
 */
export declare const PropertyFactsBar: React.ForwardRefExoticComponent<PropertyFactsBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PropertyFactsBar.d.ts.map