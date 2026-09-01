import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { ComparisonTableProps } from './ComparisonTable';

/** Drop-in for {@link ComparisonTableProps} — same props, the V4 "showcase" design. */
export type ComparisonTableV4Props = ComparisonTableProps;

const LABEL_WIDTH = 140;
const CELL_WIDTH = 96;

/**
 * ComparisonTable — **V4** "showcase" design (native mirror of the web V4). A
 * clean bordered feature-comparison matrix in a horizontal `ScrollView`: plan
 * `columns` across the top × feature `rows` down the side. ✓ = success glyph,
 * ✗ = muted glyph (never color alone), text cells pass through, and the
 * highlighted/recommended column gets a soft-primary tint plus a soft-primary
 * chip. Same props/behavior as {@link ComparisonTableProps}; token-only colors,
 * no literals.
 */
export function ComparisonTableV4({
  columns,
  rows,
  featureLabel = '',
  highlightLabel = 'Recommended',
  style,
}: ComparisonTableV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const highlightTint = withAlpha(colors.primary, 0.08);

  const renderValue = (value: boolean | string): React.ReactElement => {
    if (value === true) {
      return <Text style={{ color: colors.success, fontWeight: '700' }}>✓</Text>;
    }
    if (value === false) {
      return <Text style={{ color: colors.muted, fontWeight: '700' }}>✗</Text>;
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
          backgroundColor: colors.card,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.06,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 2,
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
                  fontWeight: '800',
                  letterSpacing: -0.2,
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
                  backgroundColor: column.highlight ? highlightTint : 'transparent',
                }}
              >
                <Text
                  style={{
                    color: column.highlight ? colors.primary : colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '800',
                    letterSpacing: -0.2,
                    textAlign: 'center',
                  }}
                >
                  {column.name}
                </Text>
                {column.highlight ? (
                  <View
                    style={{
                      backgroundColor: withAlpha(colors.primary, 0.12),
                      borderRadius: tokens.radius.full,
                      paddingHorizontal: tokens.spacing.xs,
                      paddingVertical: 1,
                    }}
                  >
                    <Text
                      style={{
                        color: tokens.ramps.primary[700],
                        fontSize: tokens.typography.scale.xs,
                        fontWeight: '600',
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
                    backgroundColor: column.highlight ? highlightTint : 'transparent',
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
