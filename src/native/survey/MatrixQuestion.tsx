import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { MatrixRow, SurveyChoice } from './types';

export interface MatrixQuestionProps {
  /** The statement rows. Empty (rows or columns) renders the empty state. */
  rows: MatrixRow[];
  /** The shared column choices applied to every row. */
  columns: SurveyChoice[];
  /** Controlled answers keyed by row id → selected column id. */
  value: Record<string, string>;
  /** Fires with the row and the column just chosen for it. */
  onChange: (rowId: string, columnId: string) => void;
  /** Accessible name for the matrix. Default `'Rating matrix'`. */
  accessibilityLabel?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A matrix / grid question — one `radiogroup` per statement row, each sharing
 * the same column choices, laid out as a header row plus one selectable cell
 * per column. The chosen cell in a row fills with the primary token and is
 * announced via `accessibilityState.selected` (state is never color-only). An
 * empty `rows` or `columns` list renders a muted empty state. No literal
 * colors.
 */
export function MatrixQuestion({
  rows,
  columns,
  value,
  onChange,
  accessibilityLabel = 'Rating matrix',
  disabled = false,
  style,
}: MatrixQuestionProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (rows.length === 0 || columns.length === 0) {
    return (
      <View accessibilityRole="summary" style={[{ padding: tokens.spacing.lg, alignItems: 'center' }, style]}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>
          Nothing to rate here.
        </Text>
      </View>
    );
  }

  return (
    <View accessibilityLabel={accessibilityLabel} style={[{ gap: tokens.spacing.sm }, style]}>
      {/* Column header. The leading spacer aligns with the row-label column. */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <View style={{ flex: 1.4 }} />
        {columns.map((c) => (
          <View key={c.id} style={{ flex: 1, alignItems: 'center' }}>
            <Text
              style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center', fontWeight: '600' }}
            >
              {c.label}
            </Text>
          </View>
        ))}
      </View>

      {rows.map((row) => {
        const chosen = value[row.id];
        return (
          <View
            key={row.id}
            accessibilityRole="radiogroup"
            accessibilityLabel={row.label}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: tokens.spacing.xs,
              borderTopWidth: 1,
              borderTopColor: colors.border,
            }}
          >
            <Text style={{ flex: 1.4, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              {row.label}
            </Text>
            {columns.map((c) => {
              const selected = chosen === c.id;
              return (
                <Pressable
                  key={c.id}
                  accessibilityRole="radio"
                  accessibilityState={{ selected, disabled }}
                  accessibilityLabel={`${row.label}: ${c.label}`}
                  disabled={disabled}
                  onPress={() => onChange(row.id, c.id)}
                  style={{ flex: 1, alignItems: 'center', paddingVertical: tokens.spacing.xs, opacity: disabled ? 0.5 : 1 }}
                >
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: tokens.radius.full,
                      borderWidth: selected ? 0 : 1,
                      borderColor: colors.border,
                      backgroundColor: selected ? colors.primary : colors.surface,
                    }}
                  >
                    {selected ? (
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: tokens.radius.full,
                          backgroundColor: colors.onPrimary,
                        }}
                      />
                    ) : null}
                  </View>
                </Pressable>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}
