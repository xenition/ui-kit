import * as React from 'react';
import { cn } from '../primitives/cn';

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
export const PropertyFactsBar = React.forwardRef<HTMLDivElement, PropertyFactsBarProps>(
  function PropertyFactsBar({ facts, columns, ariaLabel = 'Key facts', className, style, ...rest }, ref) {
    const cols = columns != null ? Math.max(1, Math.min(6, Math.round(columns))) : undefined;
    const gridStyle: React.CSSProperties = {
      gridTemplateColumns: cols != null ? `repeat(${cols}, minmax(0, 1fr))` : 'repeat(auto-fit, minmax(112px, 1fr))',
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[var(--xen-radius-lg)] border border-border bg-surface p-2 text-on-surface shadow-md',
          className
        )}
        {...rest}
      >
        <ul role="list" aria-label={ariaLabel} className="grid gap-x-2 gap-y-3" style={gridStyle}>
          {facts.map((fact, i) => (
            <li
              key={`${fact.label}-${i}`}
              className={cn(
                'flex flex-col items-center gap-1 px-2 py-1 text-center',
                // Hairline separators between cells on the same row (skip the
                // first column start edge — the auto-fit grid handles wrapping).
                i > 0 && 'border-l border-border'
              )}
            >
              {fact.glyph ? (
                <span
                  aria-hidden="true"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-base leading-none text-primary"
                >
                  {fact.glyph}
                </span>
              ) : null}
              <span className="text-xl font-bold leading-tight text-on-surface tabular-nums">{fact.value}</span>
              <span className="text-xs font-medium uppercase tracking-wide text-muted">{fact.label}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
