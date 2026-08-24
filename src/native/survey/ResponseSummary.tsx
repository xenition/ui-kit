import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives';
import type { SurveyAnswer } from './types';

export interface ResponseSummaryProps {
  /** The answered questions to review. Empty renders the empty state. */
  answers: SurveyAnswer[];
  /** Optional heading. Default `'Review your answers'`. */
  title?: string;
  /** Fires when a row's Edit affordance is pressed (enables per-answer edit). */
  onEdit?: (id: string) => void;
  /** Label for the edit affordance. Default `'Edit'`. */
  editLabel?: string;
  /** Copy for the empty state. Default `'No answers to review yet.'`. */
  emptyText?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A read-back of the respondent's answers before submit — a titled list of
 * question/answer rows inside a token `Card`. Skipped answers render in the
 * muted tone and are announced as skipped (not color-only). When `onEdit` is
 * supplied each row exposes an `Edit` button. An empty `answers` array renders
 * a muted empty state. No literal colors.
 */
export function ResponseSummary({
  answers,
  title = 'Review your answers',
  onEdit,
  editLabel = 'Edit',
  emptyText = 'No answers to review yet.',
  style,
}: ResponseSummaryProps): React.ReactElement {
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
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
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
                paddingTop: i === 0 ? 0 : tokens.spacing.sm,
                borderTopWidth: i === 0 ? 0 : 1,
                borderTopColor: colors.border,
              }}
            >
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                  {a.question}
                </Text>
                <Text
                  style={{
                    color: a.skipped ? colors.muted : colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    fontStyle: a.skipped ? 'italic' : 'normal',
                    fontWeight: a.skipped ? '400' : '600',
                  }}
                >
                  {a.skipped ? 'Skipped' : a.answer}
                </Text>
              </View>

              {onEdit ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`${editLabel} ${a.question}`}
                  onPress={() => onEdit(a.id)}
                  hitSlop={8}
                >
                  <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
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
