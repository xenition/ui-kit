import * as React from 'react';
import { Pressable, Text, View, type TextStyle, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { mixToken } from '../../primitives/internal/v4-depth';
import {
  RULE_MIX,
  ZEBRA_MIX,
  isControlColumn,
  isNumericColumn,
} from '../../primitives/internal/v4-data';
import { Input } from './Input';
import { Pagination } from './Pagination';
import type { DataTableColumn, DataTableProps } from './DataTable';
import { pressFill } from './internal/state-v4';

export type { DataTableProps as DataTableV4Props, DataTableColumn };

/**
 * Guiding two-line empty state (design.md §15): a title plus a hint on what
 * makes rows appear, instead of a bare "No data".
 */
function DefaultEmptyState(): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  return (
    <View style={{ gap: tokens.spacing.xs, alignItems: 'center' }}>
      <Text
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale.sm,
          fontWeight: '600',
          textAlign: 'center',
        }}
      >
        Nothing here yet
      </Text>
      <Text
        style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs, textAlign: 'center' }}
      >
        Rows will appear once data is added.
      </Text>
    </View>
  );
}

/**
 * **V4 data table** — same props as {@link DataTable}, a different design line.
 *
 * It inherits everything `TableV4` establishes — one rule instead of `n`, a
 * scheme-derived zebra, right-aligned tabular numerals for quantity columns, a
 * steady row height — and answers the two questions a *sortable, paginated*
 * table adds, both of which the base leaves the reader to work out:
 *
 * 1. **Which column is the table sorted by?** The base marks it with a caret
 *    the same weight and colour as the eleven other carets on the row. V4
 *    promotes the active header itself to `onSurface` at full weight and
 *    leaves the inactive ones muted, so the sort order is legible from the
 *    header block at a glance rather than by hunting for a triangle (§33 —
 *    important information understandable through emphasis).
 * 2. **What am I looking at, out of how many?** A quiet `1–10 of 47` sits
 *    opposite the pager. It is derived from data the component already has, so
 *    it costs no prop, and it is the difference between "page 2" and "page 2
 *    of a filtered set of 47" — §37, make system status visible.
 *
 * That range line **only appears when it has something to say**: when the
 * table is paginated, or when a search has narrowed it. On a nine-row
 * unfiltered table it would be reading a number back to someone who can see
 * all nine, which is exactly the container §11 refuses to let exist.
 *
 * **No depth on any row.** A tapped row tints — twice the zebra, so it reads
 * as *this one* against banded neighbours — and does not lift. Depth marks a
 * layer; a row is not a layer, and a row that lifts is §8's "cards inside
 * cards" with a different name.
 */
export function DataTableV4<T>({
  columns,
  rows,
  pageSize = 10,
  searchable = false,
  getRowKey,
  onRowClick,
  empty = <DefaultEmptyState />,
  style,
}: DataTableProps<T>): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const [sort, setSort] = React.useState<{ key: string; dir: 'asc' | 'desc' } | null>(null);
  const [query, setQuery] = React.useState('');
  const [page, setPage] = React.useState(1);

  const accessorFor = React.useCallback(
    (col: DataTableColumn<T>) =>
      col.accessor ?? ((row: T) => (row as Record<string, unknown>)[col.key] as string | number),
    []
  );

  const filtered = React.useMemo(() => {
    if (!searchable || !query.trim()) return rows;
    const q = query.toLowerCase();
    return rows.filter((r) =>
      columns.some((c) => String(accessorFor(c)(r) ?? '').toLowerCase().includes(q))
    );
  }, [rows, query, searchable, columns, accessorFor]);

  const sorted = React.useMemo(() => {
    if (!sort) return filtered;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return filtered;
    const acc = accessorFor(col);
    const copy = [...filtered].sort((a, b) => {
      const av = acc(a);
      const bv = acc(b);
      if (av < bv) return -1;
      if (av > bv) return 1;
      return 0;
    });
    return sort.dir === 'asc' ? copy : copy.reverse();
  }, [filtered, sort, columns, accessorFor]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const current = Math.min(page, pageCount);
  const pageRows = sorted.slice((current - 1) * pageSize, current * pageSize);

  const toggleSort = (key: string): void =>
    setSort((s) =>
      s && s.key === key ? (s.dir === 'asc' ? { key, dir: 'desc' } : null) : { key, dir: 'asc' }
    );

  // Alignment follows the rows actually on screen, using the same accessor the
  // sort and the search read — so a column stays aligned across pages.
  const numeric = React.useMemo(() => {
    const set = new Set<string>();
    columns.forEach((c) => {
      if (c.render) return;
      if (isNumericColumn(pageRows.map((r) => String(accessorFor(c)(r) ?? '')))) set.add(c.key);
    });
    return set;
  }, [columns, pageRows, accessorFor]);

  const rule = mixToken(colors.surface, colors.onSurface, RULE_MIX);
  const zebra = mixToken(colors.surface, colors.onSurface, ZEBRA_MIX);
  const pressed = pressFill(theme);
  const rowHeight = tokens.spacing.xl + tokens.spacing.xs;

  // A row-actions column takes the width its buttons need; a data column
  // takes an equal share of what is left. Giving both `flex: 1` is how a
  // four-column table ends up spending a quarter of its width on two ghost
  // buttons while the data it exists to show gets squeezed.
  const control = React.useCallback(
    (c: DataTableColumn<T>) => isControlColumn(c.header, c.render !== undefined),
    []
  );

  const cell = (isNumeric: boolean, isControl: boolean): ViewStyle => ({
    flexGrow: isControl ? 0 : 1,
    flexShrink: 0,
    flexBasis: 'auto',
    justifyContent: 'center',
    alignItems: isNumeric || isControl ? 'flex-end' : 'flex-start',
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
  });
  const numeralStyle: TextStyle = { fontVariant: ['tabular-nums'], textAlign: 'right' };

  const first = (current - 1) * pageSize + 1;
  const last = (current - 1) * pageSize + pageRows.length;
  // Say it only when it says something: a nine-row unfiltered table does not
  // need to be told it is showing nine rows.
  const showRange = pageRows.length > 0 && (pageCount > 1 || sorted.length !== rows.length);

  return (
    <View style={[{ gap: tokens.spacing.md }, style]}>
      {searchable ? (
        <Input
          value={query}
          onChangeText={(t) => {
            setQuery(t);
            setPage(1);
          }}
          placeholder="Search…"
          accessibilityLabel="Search"
        />
      ) : null}

      <View
        style={{
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            minHeight: rowHeight,
            borderBottomWidth: 1,
            borderColor: rule,
          }}
        >
          {columns.map((c) => {
            const active = sort?.key === c.key;
            const isNumeric = numeric.has(c.key);
            const isControl = control(c);
            const headerNode =
              typeof c.header === 'string' ? (
                <Text
                  style={[
                    {
                      // The active column is promoted, not decorated: the sort
                      // reads off the header block instead of off a triangle.
                      color: active ? colors.onSurface : colors.mutedText,
                      fontSize: tokens.typography.scale.xs,
                      fontFamily: tokens.typography.fontBody,
                      fontWeight: active ? '700' : '600',
                    },
                    isNumeric ? numeralStyle : null,
                  ]}
                >
                  {c.header}
                </Text>
              ) : (
                c.header
              );
            const inner = (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
                {isNumeric ? null : headerNode}
                {c.sortable ? (
                  <Text
                    style={{
                      color: active ? colors.onSurface : colors.mutedText,
                      fontSize: tokens.typography.scale.xs,
                    }}
                  >
                    {active ? (sort?.dir === 'asc' ? '↑' : '↓') : '⇅'}
                  </Text>
                ) : null}
                {isNumeric ? headerNode : null}
              </View>
            );
            return c.sortable ? (
              <Pressable
                key={c.key}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                onPress={() => toggleSort(c.key)}
                style={cell(isNumeric, isControl)}
              >
                {inner}
              </Pressable>
            ) : (
              <View key={c.key} style={cell(isNumeric, isControl)}>
                {inner}
              </View>
            );
          })}
        </View>

        {pageRows.length === 0 ? (
          <View style={{ paddingVertical: tokens.spacing.xl, paddingHorizontal: tokens.spacing.md }}>
            {typeof empty === 'string' ? (
              <Text
                style={{
                  color: colors.mutedText,
                  fontSize: tokens.typography.scale.sm,
                  textAlign: 'center',
                }}
              >
                {empty}
              </Text>
            ) : (
              empty
            )}
          </View>
        ) : (
          pageRows.map((row, i) => {
            const band = i % 2 === 1 ? zebra : colors.surface;
            const cells = columns.map((c) => {
              const isNumeric = numeric.has(c.key);
              const content = c.render ? c.render(row) : String(accessorFor(c)(row) ?? '');
              return (
                <View key={c.key} style={cell(isNumeric, control(c))}>
                  {typeof content === 'string' ? (
                    <Text
                      style={[
                        {
                          color: colors.onSurface,
                          fontSize: tokens.typography.scale.sm,
                          fontFamily: tokens.typography.fontBody,
                        },
                        isNumeric ? numeralStyle : null,
                      ]}
                    >
                      {content}
                    </Text>
                  ) : (
                    content
                  )}
                </View>
              );
            });
            const key = getRowKey ? getRowKey(row, i) : String(i);
            return onRowClick ? (
              <Pressable
                key={key}
                accessibilityRole="button"
                onPress={() => onRowClick(row)}
                // A press tints; it never lifts. Depth marks a layer, and a row
                // is not one.
                style={({ pressed: down }) => ({
                  flexDirection: 'row',
                  minHeight: rowHeight,
                  backgroundColor: down ? pressed : band,
                })}
              >
                {cells}
              </Pressable>
            ) : (
              <View
                key={key}
                style={{ flexDirection: 'row', minHeight: rowHeight, backgroundColor: band }}
              >
                {cells}
              </View>
            );
          })
        )}
      </View>

      {showRange || pageCount > 1 ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: tokens.spacing.md,
          }}
        >
          {showRange ? (
            <Text
              style={{
                color: colors.mutedText,
                fontSize: tokens.typography.scale.xs,
                fontVariant: ['tabular-nums'],
              }}
            >
              {`${first}–${last} of ${sorted.length}`}
            </Text>
          ) : (
            <View />
          )}
          {pageCount > 1 ? (
            <Pagination page={current} pageCount={pageCount} onPageChange={setPage} />
          ) : (
            <View />
          )}
        </View>
      ) : null}
    </View>
  );
}
