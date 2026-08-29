import * as React from 'react';
import { Text, View, type TextStyle, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { mixToken } from '../../primitives/internal/v4-depth';
import { RULE_MIX, ZEBRA_MIX, isNumericColumn } from '../../primitives/internal/v4-data';
import type { TableColumn, TableProps } from './Table';

export type { TableProps as TableV4Props, TableColumn };

/**
 * Guiding two-line empty state (design.md §15): a title plus a hint on what
 * makes rows appear, instead of a bare "No data".
 */
function DefaultEmptyState(): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
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

/** The fallback cell text — the only path the component is allowed to read. */
function cellText<T>(row: T, col: TableColumn<T>): string {
  return String((row as Record<string, unknown>)[col.key] ?? '');
}

/**
 * **V4 table** — same props as {@link Table}, a different design line.
 *
 * The base table draws a border under every row. That is the reflex §9 warns
 * about: a rule per row costs a line of ink for every item and buys nothing
 * the eye was not already getting from a steady baseline, and on a
 * twenty-row table it turns the data into a grid the reader has to look
 * *through*. A table that reads faster is the premium version — not a table
 * with more chrome on it.
 *
 * Four changes, all of them about scanning (§33):
 *
 * 1. **One rule, not `n` rules.** The single horizontal line left is the one
 *    that means something: labels above it, data below it. Row separation
 *    becomes a steady row height plus an optional zebra band — spacing as
 *    structure (§9), not borders everywhere.
 * 2. **A zebra that survives dark mode.** The band is mixed from `surface`
 *    toward `onSurface`, both of which the provider has already resolved for
 *    the active scheme, so it darkens a light page and lightens a dark one
 *    with no branch. `tokens.ramps` would have been the obvious reach and the
 *    wrong one — it carries the LIGHT orientation in both schemes, so
 *    `ramps.neutral[50]` paints a near-white band across a dark table.
 * 3. **Numerals line up.** A column whose fallback text is entirely quantities
 *    is right-aligned and set in tabular figures, header included. A column of
 *    numbers whose decimal points do not line up cannot be compared by eye,
 *    and that comparison is why the column is on screen. Nothing was added to
 *    the props to say so: alignment is a fact about the data, and a column
 *    with a custom `render` opts out by construction.
 * 4. **A steady baseline.** Every row takes the same minimum height and
 *    centres its cells in it, so the eye tracks across a row and down a column
 *    without re-finding the line each time.
 *
 * **No depth anywhere in the body.** Depth marks a layer, not a row — a table
 * whose rows each cast a shadow is the "cards inside cards inside cards" §8
 * bans, wearing a different hat. The container keeps its hairline because a
 * table genuinely is one object (§11); the rows inside it are not eleven more.
 */
export function TableV4<T>({
  columns,
  rows,
  getRowKey,
  empty = <DefaultEmptyState />,
  style,
}: TableProps<T>): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  // Alignment is derived from the rows on screen, once per render.
  const numeric = React.useMemo(() => {
    const set = new Set<string>();
    columns.forEach((c) => {
      if (c.render) return;
      if (isNumericColumn(rows.map((r) => cellText(r, c)))) set.add(c.key);
    });
    return set;
  }, [columns, rows]);

  const rule = mixToken(colors.surface, colors.onSurface, RULE_MIX);
  const zebra = mixToken(colors.surface, colors.onSurface, ZEBRA_MIX);
  const rowHeight = tokens.spacing.xl + tokens.spacing.xs;

  const cell = (isNumeric: boolean): ViewStyle => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: isNumeric ? 'flex-end' : 'flex-start',
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
  });

  const numeralStyle: TextStyle = { fontVariant: ['tabular-nums'], textAlign: 'right' };

  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          overflow: 'hidden',
        },
        style,
      ]}
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
          const isNumeric = numeric.has(c.key);
          return (
            <View key={c.key} style={cell(isNumeric)}>
              {typeof c.header === 'string' ? (
                <Text
                  style={[
                    {
                      color: colors.mutedText,
                      fontSize: tokens.typography.scale.xs,
                      fontFamily: tokens.typography.fontBody,
                      fontWeight: '600',
                    },
                    isNumeric ? numeralStyle : null,
                  ]}
                >
                  {c.header}
                </Text>
              ) : (
                c.header
              )}
            </View>
          );
        })}
      </View>

      {rows.length === 0 ? (
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
        rows.map((row, i) => (
          <View
            key={getRowKey ? getRowKey(row, i) : String(i)}
            style={{
              flexDirection: 'row',
              minHeight: rowHeight,
              // The band replaces the per-row rule; it is a tracking aid, not
              // a second surface, so only every other row carries it.
              backgroundColor: i % 2 === 1 ? zebra : colors.surface,
            }}
          >
            {columns.map((c) => {
              const isNumeric = numeric.has(c.key);
              const content = c.render ? c.render(row) : cellText(row, c);
              return (
                <View key={c.key} style={cell(isNumeric)}>
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
            })}
          </View>
        ))
      )}
    </View>
  );
}
