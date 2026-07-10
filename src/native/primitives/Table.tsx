import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface TableColumn<T> {
  key: string;
  header: React.ReactNode;
  /** Custom cell renderer; falls back to `String(row[key])`. */
  render?: (row: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  getRowKey?: (row: T, index: number) => string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Themed data table — the native mirror of the web `Table`. Row/column layout
 * built from View/Text (RN has no <table>); token-bound borders and text. No
 * literal colors.
 */
export function Table<T>({ columns, rows, getRowKey, style }: TableProps<T>): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const cell: ViewStyle = {
    flex: 1,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
  };
  return (
    <View
      style={[
        {
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
          backgroundColor: colors.surface,
          borderBottomWidth: 1,
          borderColor: colors.border,
        }}
      >
        {columns.map((c) => (
          <View key={c.key} style={cell}>
            {typeof c.header === 'string' ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '500' }}>
                {c.header}
              </Text>
            ) : (
              c.header
            )}
          </View>
        ))}
      </View>
      {rows.map((row, i) => (
        <View
          key={getRowKey ? getRowKey(row, i) : String(i)}
          style={{
            flexDirection: 'row',
            borderBottomWidth: i === rows.length - 1 ? 0 : 1,
            borderColor: colors.border,
          }}
        >
          {columns.map((c) => {
            const content = c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? '');
            return (
              <View key={c.key} style={cell}>
                {typeof content === 'string' ? (
                  <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base }}>
                    {content}
                  </Text>
                ) : (
                  content
                )}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}
