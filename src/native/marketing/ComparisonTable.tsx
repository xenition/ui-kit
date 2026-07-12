import * as React from 'react';
import { ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface ComparisonColumn {
  /** Column (plan) name shown in the header. */
  name: string;
  /** Emphasize this column as the recommended choice. */
  highlight?: boolean;
}

export interface ComparisonRow {
  /** Feature label for the row (leading cell). */
  label: string;
  /** One value per column: `true` → check, `false` → dash, string → text. */
  values: (boolean | string)[];
}

export interface ComparisonTableProps {
  /** Plan columns compared across the top. */
  columns: ComparisonColumn[];
  /** Feature rows; each `values[i]` maps to `columns[i]`. */
  rows: ComparisonRow[];
  /** Label for the empty top-left corner cell. */
  featureLabel?: string;
  /** Badge text on the highlighted column header. */
  highlightLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const LABEL_WIDTH = 140;
const CELL_WIDTH = 96;

/**
 * Feature-comparison matrix — the native mirror of the web `ComparisonTable`.
 * Plan `columns` across the top × feature `rows` down the side, with
 * check/dash/text cells and an optional highlighted recommended column.
 *
 * Native layout choice: rather than the base `Table` primitive, this is a
 * hand-built token-styled matrix wrapped in a horizontal `ScrollView` so the
 * true grid survives on phones — the sticky-ish feature label column keeps a
 * fixed width while the plan columns scroll horizontally when they overflow.
 * Token-only.
 */
export function ComparisonTable({
  columns,
  rows,
  featureLabel = '',
  highlightLabel = 'Recommended',
  style,
}: ComparisonTableProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const renderValue = (value: boolean | string): React.ReactElement => {
    if (value === true) {
      return <Text style={{ color: colors.success, fontWeight: '700' }}>✓</Text>;
    }
    if (value === false) {
      return <Text style={{ color: colors.muted, fontWeight: '700' }}>–</Text>;
    }
    return (
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
        {value}
      </Text>
    );
  };

  return (
    <View
      testID="xen-comparison"
      style={[
        {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* Header row */}
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: tokens.ramps.neutral[50],
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
          >
            <View style={{ width: LABEL_WIDTH, padding: tokens.spacing.md }}>
              <Text
                style={{
                  color: colors.onSurface,
                  fontSize: tokens.typography.scale.sm,
                  fontWeight: '600',
                }}
              >
                {featureLabel}
              </Text>
            </View>
            {columns.map((column, i) => (
              <View
                key={i}
                style={{
                  width: CELL_WIDTH,
                  padding: tokens.spacing.md,
                  alignItems: 'center',
                  gap: tokens.spacing.xs,
                  backgroundColor: column.highlight ? tokens.ramps.primary[50] : 'transparent',
                }}
              >
                <Text
                  style={{
                    color: column.highlight ? colors.primary : colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '600',
                    textAlign: 'center',
                  }}
                >
                  {column.name}
                </Text>
                {column.highlight ? (
                  <View
                    style={{
                      backgroundColor: colors.primary,
                      borderRadius: tokens.radius.full,
                      paddingHorizontal: tokens.spacing.xs,
                      paddingVertical: 1,
                    }}
                  >
                    <Text
                      style={{
                        color: colors.onPrimary,
                        fontSize: tokens.typography.scale.xs,
                        fontWeight: '500',
                      }}
                    >
                      {highlightLabel}
                    </Text>
                  </View>
                ) : null}
              </View>
            ))}
          </View>

          {/* Feature rows */}
          {rows.map((row, r) => (
            <View
              key={r}
              style={{
                flexDirection: 'row',
                borderBottomWidth: r < rows.length - 1 ? 1 : 0,
                borderBottomColor: colors.border,
              }}
            >
              <View style={{ width: LABEL_WIDTH, padding: tokens.spacing.md }}>
                <Text
                  style={{
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '500',
                  }}
                >
                  {row.label}
                </Text>
              </View>
              {columns.map((column, c) => (
                <View
                  key={c}
                  style={{
                    width: CELL_WIDTH,
                    padding: tokens.spacing.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: column.highlight ? tokens.ramps.primary[50] : 'transparent',
                  }}
                >
                  {renderValue(row.values[c] ?? false)}
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
