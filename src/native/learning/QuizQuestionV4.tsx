import * as React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { QuizOptionV4 } from './QuizOptionV4';
import type { QuizOptionState } from './QuizOption';
import type { QuizQuestionProps, QuizChoice } from './QuizQuestion';

/** Drop-in for {@link QuizQuestionProps} — same props, the V4 "campus" design. */
export type QuizQuestionV4Props = QuizQuestionProps;

const MARKERS = 'ABCDEFGH';

/**
 * QuizQuestion — **V4** "campus" design (native twin of the web V4). An elevated
 * rounded card with a soft shadow holding a "Question X of Y" pill, the prompt,
 * and a `radiogroup` of {@link QuizOptionV4}s. In `review` mode each option
 * resolves to a correct / incorrect / selected state (glyph + border, never color
 * alone). Renders an empty-state note when there are no choices. Token-only
 * colors via `useXenitionTheme()`.
 */
export function QuizQuestionV4({ prompt, choices, questionNumber, totalQuestions, selectedId, review = false, onSelect, hint, style }: QuizQuestionV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const numbered = questionNumber != null && totalQuestions != null;

  const resolveState = (choice: QuizChoice): QuizOptionState => {
    const isSelected = choice.id === selectedId;
    if (review) {
      if (choice.correct) return 'correct';
      if (isSelected) return 'incorrect';
      return 'default';
    }
    return isSelected ? 'selected' : 'default';
  };

  const shell: ViewStyle = {
    gap: tokens.spacing.md,
    padding: tokens.spacing.lg,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  return (
    <View accessibilityLabel={numbered ? `Question ${questionNumber} of ${totalQuestions}: ${prompt}` : prompt} style={[shell, style]}>
      {numbered ? (
        <View style={{ alignSelf: 'flex-start', borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs, backgroundColor: withAlpha(colors.primary, 0.1) }}>
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase', fontVariant: ['tabular-nums'] }}>Question {questionNumber} of {totalQuestions}</Text>
        </View>
      ) : null}

      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>{prompt}</Text>

      {choices.length === 0 ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No choices available</Text>
      ) : (
        <View accessibilityRole="radiogroup" style={{ gap: tokens.spacing.sm }}>
          {choices.map((choice, i) => (
            <QuizOptionV4
              key={choice.id}
              label={choice.label}
              marker={MARKERS[i] ?? String(i + 1)}
              state={resolveState(choice)}
              selected={choice.id === selectedId}
              disabled={review}
              onSelect={review ? undefined : () => onSelect?.(choice.id)}
            />
          ))}
        </View>
      )}

      {hint ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{hint}</Text> : null}
    </View>
  );
}
