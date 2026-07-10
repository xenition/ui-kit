import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Input } from './Input';
import { Pagination } from './Pagination';

export interface DataTableColumn<T> {
  key: string;
  header: React.ReactNode;
  /** Custom cell renderer; falls back to `String(accessor(row))`. */
  render?: (row: T) => React.ReactNode;
  /** Enable tap-to-sort on this column header. */
  sortable?: boolean;
  /** Value used for sort + search (defaults to `row[key]`). */
  accessor?: (row: T) => string | number;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  /** Rows per page (default 10). */
  pageSize?: number;
  /** Show a search box that filters across accessors. */
  searchable?: boolean;
  getRowKey?: (row: T, index: number) => string;
  /** Fires when a row is tapped (native mirror of the web `onRowClick`). */
  onRowClick?: (row: T) => void;
  empty?: React.ReactNode;
  /** Wrapper style override (native mirror of the web `className`). */
  style?: StyleProp<ViewStyle>;
}

/**
 * Sortable, searchable, paginated data table — the native mirror of the web
 * `DataTable`. RN has no `<table>`, so the layout is View/Text rows with
 * `flex: 1` columns (as the native `Table`); tap a `sortable` header to toggle
 * asc → desc → none, the search box filters across accessors, and it composes
 * the native `Pagination`. Client-side, token-bound, no literal colors. For a
 * full create/edit/delete screen use `CrudTable`.
 */
export function DataTable<T>({
  columns,
  rows,
  pageSize = 10,
  searchable = false,
  getRowKey,
  onRowClick,
  empty = 'No data',
  style,
}: DataTableProps<T>): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
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

  const cell: ViewStyle = {
    flex: 1,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
  };

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
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          overflow: 'hidden',
        }}
      >
        {/* header row */}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: colors.surface,
            borderBottomWidth: 1,
            borderColor: colors.border,
          }}
        >
          {columns.map((c) => {
            const active = sort?.key === c.key;
            const indicator = active ? (sort?.dir === 'asc' ? '▲' : '▼') : '⇅';
            const headerNode =
              typeof c.header === 'string' ? (
                <Text
                  style={{
                    color: colors.muted,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '500',
                  }}
                >
                  {c.header}
                </Text>
              ) : (
                c.header
              );
            const inner = (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
                {headerNode}
                {c.sortable ? (
                  <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                    {indicator}
                  </Text>
                ) : null}
              </View>
            );
            return c.sortable ? (
              <Pressable
                key={c.key}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                onPress={() => toggleSort(c.key)}
                style={cell}
              >
                {inner}
              </Pressable>
            ) : (
              <View key={c.key} style={cell}>
                {inner}
              </View>
            );
          })}
        </View>

        {/* body */}
        {pageRows.length === 0 ? (
          <View style={{ paddingVertical: tokens.spacing.xl, paddingHorizontal: tokens.spacing.md }}>
            {typeof empty === 'string' ? (
              <Text
                style={{
                  color: colors.muted,
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
            const rowNode = (
              <View style={{ flexDirection: 'row' }}>
                {columns.map((c) => {
                  const content = c.render
                    ? c.render(row)
                    : String(accessorFor(c)(row) ?? '');
                  return (
                    <View key={c.key} style={cell}>
                      {typeof content === 'string' ? (
                        <Text
                          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base }}
                        >
                          {content}
                        </Text>
                      ) : (
                        content
                      )}
                    </View>
                  );
                })}
              </View>
            );
            const rowStyle: ViewStyle = {
              borderBottomWidth: i === pageRows.length - 1 ? 0 : 1,
              borderColor: colors.border,
            };
            return onRowClick ? (
              <Pressable
                key={getRowKey ? getRowKey(row, i) : String(i)}
                accessibilityRole="button"
                onPress={() => onRowClick(row)}
                style={rowStyle}
              >
                {rowNode}
              </Pressable>
            ) : (
              <View key={getRowKey ? getRowKey(row, i) : String(i)} style={rowStyle}>
                {rowNode}
              </View>
            );
          })
        )}
      </View>

      {pageCount > 1 ? (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Pagination page={current} pageCount={pageCount} onPageChange={setPage} />
        </View>
      ) : null}
    </View>
  );
}
