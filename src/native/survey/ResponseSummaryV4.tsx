import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { ResponseSummaryProps } from './ResponseSummary';

/** Drop-in for {@link ResponseSummaryProps} — same props, the V4 "focus" design. */
export type ResponseSummaryV4Props = ResponseSummaryProps;

/**
 * ResponseSummary — **V4** "focus" design. The calm, legible read-back of the
 * respondent's answers before submit: a titled list of airy rows where the
 * question sits small and muted above its bold on-surface answer. Skipped
 * answers render muted and italic with an explicit, spoken "Skipped" marker (not
 * color-only), and each row can expose a primary `Edit` affordance when `onEdit`
 * is supplied. An empty `answers` array renders a muted empty state. One accent
 * (primary), no gradients. Same props/behavior as {@link ResponseSummaryProps};
 * token-only colors via `useXenitionTheme()` + `withAlpha`.
 */
export function ResponseSummaryV4({
  answers,
  title = 'Review your answers',
  onEdit,
  editLabel = 'Edit',
  emptyText = 'No answers to review yet.',
  style,
}: ResponseSummaryV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (answers.length === 0) {
    return (
      <Card variant="outlined" padding="lg" style={style}>
        <View accessibilityRole="summary" style={{ alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>
            {emptyText}
          </Text>
        </View>
      </Card>
    );
  }

  return (
    <Card variant="outlined" padding="md" style={style}>
      <View style={{ gap: tokens.spacing.md }}>
        <Text
          accessibilityRole="header"
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}
        >
          {title}
        </Text>

        <View style={{ gap: tokens.spacing.sm }}>
          {answers.map((a, i) => (
            <View
              key={a.id}
              accessibilityLabel={
                a.skipped ? `${a.question}: skipped` : `${a.question}: ${a.answer}`
              }
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: tokens.spacing.sm,
                minHeight: 44,
                paddingVertical: tokens.spacing.xs,
                paddingTop: i === 0 ? tokens.spacing.xs : tokens.spacing.sm,
                borderTopWidth: i === 0 ? 0 : 1,
                borderTopColor: colors.border,
              }}
            >
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                  {a.question}
                </Text>
                {a.skipped ? (
                  <View
                    style={{
                      alignSelf: 'flex-start',
                      paddingHorizontal: tokens.spacing.sm,
                      paddingVertical: 2,
                      borderRadius: tokens.radius.full,
                      backgroundColor: withAlpha(colors.primary, 0.12),
                    }}
                  >
                    <Text
                      style={{
                        color: colors.muted,
                        fontSize: tokens.typography.scale.xs,
                        fontWeight: '700',
                        fontStyle: 'italic',
                      }}
                    >
                      Skipped
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={{
                      color: colors.onSurface,
                      fontSize: tokens.typography.scale.base,
                      fontWeight: '700',
                    }}
                  >
                    {a.answer}
                  </Text>
                )}
              </View>

              {onEdit ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`${editLabel} ${a.question}`}
                  onPress={() => onEdit(a.id)}
                  hitSlop={8}
                  style={{ minHeight: 44, justifyContent: 'center' }}
                >
                  <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>
                    {editLabel}
                  </Text>
                </Pressable>
              ) : null}
            </View>
          ))}
        </View>
      </View>
    </Card>
  );
}
