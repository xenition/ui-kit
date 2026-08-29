import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import { shadowCss, useOptionalCompiledTheme } from './internal/v4-depth';
import { V4_TABLE_CSS, V4_TABLE_STYLE_ID, isNumericColumn } from './internal/v4-data';
import type { TableColumn, TableProps } from './Table';

export type { TableProps as TableV4Props, TableColumn };

/**
 * Guiding two-line empty state (design.md §15): a title plus a hint on what
 * makes rows appear, instead of a bare "No data".
 */
const DEFAULT_EMPTY = (
  <div className="flex flex-col items-center gap-[var(--xen-space-xs)]">
    <span className="font-semibold text-on-surface">Nothing here yet</span>
    <span className="text-muted-text text-xs">Rows will appear once data is added.</span>
  </div>
);

/** The fallback cell text — the only path the component is allowed to read. */
function cellText<T>(row: T, col: TableColumn<T>): string {
  return String((row as Record<string, unknown>)[col.key] ?? '');
}

/**
 * **V4 table** — the web twin of the native `TableV4`, same props as
 * {@link Table}, a different design line.
 *
 * The base table draws a border under every row and fills its header with
 * `bg-neutral-50`. Both are the reflex §9 warns about: a rule per row costs a
 * line of ink for every item and buys nothing a steady baseline was not
 * already giving the eye, and a ramp-step header fill is a second surface
 * whose only job was to look like a header. On a twenty-row table the two
 * together turn the data into a grid the reader has to look *through*. A table
 * that reads faster is the premium version — not a table with more chrome.
 *
 * Five changes, all of them about scanning (§33):
 *
 * 1. **One rule, not `n` rules.** The single horizontal line left is the one
 *    that means something: labels above it, data below it.
 * 2. **A zebra that survives dark mode.** The band is `color-mix`ed from
 *    `--xen-surface` toward `--xen-on-surface`, both re-emitted under
 *    `[data-theme="dark"]`, so it darkens a light page and lightens a dark one
 *    with no dark rule of its own. `--xen-neutral-50` — what the base header
 *    used — was the obvious reach and the wrong one.
 * 3. **Numerals line up.** A column whose fallback text is entirely quantities
 *    is right-aligned and set in tabular figures, header included. Nothing was
 *    added to the props to say so: alignment is a fact about the data, and a
 *    column with a custom `render` opts out by construction.
 * 4. **A steady baseline.** Every row takes the same minimum height, so the
 *    eye tracks across a row and down a column without re-finding the line.
 * 5. **The header lifts, and only the header.** It is sticky, and it carries
 *    `elevation.card` — the one legitimate use of depth in a table, because it
 *    is genuinely a layer above the rows once they scroll under it. A data row
 *    never lifts. The compiler zeroes the token for a `depth: 'flat'` seed, so
 *    this needs no check.
 */
export function TableV4<T>({
  columns,
  rows,
  getRowKey,
  empty,
  className,
}: TableProps<T>): React.ReactElement {
  injectStyleOnce(V4_TABLE_STYLE_ID, V4_TABLE_CSS);
  const theme = useOptionalCompiledTheme();

  const numeric = React.useMemo(() => {
    const set = new Set<string>();
    columns.forEach((c) => {
      if (c.render) return;
      if (isNumericColumn(rows.map((r) => cellText(r, c)))) set.add(c.key);
    });
    return set;
  }, [columns, rows]);

  const vars: Record<string, string> = {};
  if (theme !== null) {
    vars['--xen-v4-lift-l'] = shadowCss(theme.lightElevation.card);
    vars['--xen-v4-lift-d'] = shadowCss(theme.darkElevation.card);
  }

  return (
    <div
      data-xen-v4-table=""
      className={cn(
        'w-full overflow-x-auto rounded-[var(--xen-radius-md)] border border-border bg-surface',
        className
      )}
      style={vars as React.CSSProperties}
    >
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                data-numeric={numeric.has(c.key) ? 'true' : 'false'}
                scope="col"
                className="px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-left text-xs font-semibold text-muted-text"
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-[var(--xen-space-md)] py-[var(--xen-space-xl)] text-center text-muted-text"
              >
                {empty ?? DEFAULT_EMPTY}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={getRowKey ? getRowKey(row, i) : String(i)}>
                {columns.map((c) => (
                  <td
                    key={c.key}
                    data-numeric={numeric.has(c.key) ? 'true' : 'false'}
                    className="h-[calc(var(--xen-space-xl)_+_var(--xen-space-xs))] px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-on-surface"
                  >
                    {c.render ? c.render(row) : cellText(row, c)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
