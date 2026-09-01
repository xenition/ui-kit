import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { MatrixQuestionProps } from './MatrixQuestion';

/** Drop-in for {@link MatrixQuestionProps} — same props, the V4 "focus" design. */
export type MatrixQuestionV4Props = MatrixQuestionProps;

/**
 * MatrixQuestion — **V4** "clean form / focus" design. A calm, legible row×column
 * grid: one `radiogroup` per statement row sharing the same column choices, laid
 * out as a header row plus one big-tap-target cell per column. Legible column
 * headers sit above zebra-free rows separated only by a hairline `border`. The
 * chosen cell fills with a solid **primary** disc (on a soft primary tint) and is
 * announced via `accessibilityState.selected` — state is never color-only. One
 * accent, generous 8-pt air, no gradients. An empty `rows`/`columns` list renders
 * a muted empty state. Same props/behavior as {@link MatrixQuestionProps};
 * token-only colors via `useXenitionTheme()` + `withAlpha` (no literal colors).
 */
export function MatrixQuestionV4({
  rows,
  columns,
  value,
  onChange,
  accessibilityLabel = 'Rating matrix',
  disabled = false,
  style,
}: MatrixQuestionV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (rows.length === 0 || columns.length === 0) {
    return (
      <View accessibilityRole="summary" style={[{ padding: tokens.spacing.lg, alignItems: 'center' }, style]}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>Nothing to rate here.</Text>
      </View>
    );
  }

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      style={[
        {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {/* Column header — legible, calm. The leading spacer aligns with the row-label column. */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          paddingHorizontal: tokens.spacing.sm,
          paddingTop: tokens.spacing.sm,
          paddingBottom: tokens.spacing.xs,
        }}
      >
        <View style={{ flex: 1.4 }} />
        {columns.map((c) => (
          <View key={c.id} style={{ flex: 1, alignItems: 'center' }}>
            <Text
              style={{
                color: colors.muted,
                fontSize: tokens.typography.scale.xs,
                textAlign: 'center',
                fontWeight: '700',
                letterSpacing: 0.4,
              }}
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
              paddingHorizontal: tokens.spacing.sm,
              borderTopWidth: 1,
              borderTopColor: colors.border,
            }}
          >
            <Text
              style={{
                flex: 1.4,
                color: colors.onSurface,
                fontSize: tokens.typography.scale.sm,
                fontWeight: '600',
                paddingVertical: tokens.spacing.sm,
                paddingRight: tokens.spacing.sm,
              }}
            >
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
                  style={{
                    flex: 1,
                    minHeight: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.md,
                    backgroundColor: selected ? withAlpha(colors.primary, 0.12) : 'transparent',
                    opacity: disabled ? 0.5 : 1,
                  }}
                >
                  <View
                    style={{
                      width: 28,
                      height: 28,
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
