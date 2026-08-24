import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Progress } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { QuizQuestionProps, QuizChoice } from './QuizQuestion';
import type { QuizOptionState } from './QuizOption';

/** Same public contract as {@link QuizQuestion} — a drop-in alternate design. */
export type QuizQuestionV2Props = QuizQuestionProps;

const MARKERS = 'ABCDEFGH';

interface CellVisual {
  border: keyof SemanticColors;
  glyph: string | null;
  tint: keyof SemanticColors;
  a11ySuffix: string;
}

const CELL_VISUAL: Record<QuizOptionState, CellVisual> = {
  default: { border: 'border', glyph: null, tint: 'muted', a11ySuffix: '' },
  selected: { border: 'primary', glyph: '●', tint: 'primary', a11ySuffix: ', selected' },
  correct: { border: 'success', glyph: '✓', tint: 'success', a11ySuffix: ', correct answer' },
  incorrect: { border: 'danger', glyph: '✕', tint: 'danger', a11ySuffix: ', incorrect answer' },
};

/**
 * QuizQuestion, design v2 — a **two-column grid of answer cards**. A progress
 * bar replaces the eyebrow, then each choice is a tall radio card carrying its
 * letter badge and, in `review`, a state glyph (`✓`/`✕`) plus a spoken suffix —
 * never color alone. Renders an empty note when there are no choices. Same props
 * as {@link QuizQuestion}. Token-only colors.
 */
export function QuizQuestionV2({
  prompt,
  choices,
  questionNumber,
  totalQuestions,
  selectedId,
  review = false,
  onSelect,
  hint,
  style,
}: QuizQuestionV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const resolveState = (choice: QuizChoice): QuizOptionState => {
    const isSelected = choice.id === selectedId;
    if (review) {
      if (choice.correct) return 'correct';
      if (isSelected) return 'incorrect';
      return 'default';
    }
    return isSelected ? 'selected' : 'default';
  };

  const showProgress = questionNumber != null && totalQuestions != null && totalQuestions > 0;

  return (
    <View
      accessibilityLabel={showProgress ? `Question ${questionNumber} of ${totalQuestions}: ${prompt}` : prompt}
      style={[
        {
          gap: tokens.spacing.md,
          padding: tokens.spacing.lg,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
        },
        style,
      ]}
    >
      {showProgress ? (
        <View style={{ gap: 4 }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            {questionNumber} / {totalQuestions}
          </Text>
          <Progress value={questionNumber ?? 0} max={totalQuestions ?? 1} tone="primary" size="sm" />
        </View>
      ) : null}

      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>{prompt}</Text>

      {choices.length === 0 ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No choices available</Text>
      ) : (
        <View accessibilityRole="radiogroup" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
          {choices.map((choice, i) => {
            const state = resolveState(choice);
            const visual = CELL_VISUAL[state];
            const isSelected = choice.id === selectedId;
            const marker = MARKERS[i] ?? String(i + 1);
            return (
              <Pressable
                key={choice.id}
                accessibilityRole="radio"
                accessibilityState={{ checked: isSelected, disabled: review }}
                accessibilityLabel={`${marker}. ${choice.label}${visual.a11ySuffix}`}
                disabled={review || !onSelect}
                onPress={review ? undefined : () => onSelect?.(choice.id)}
                style={({ pressed }) => ({
                  flexGrow: 1,
                  flexBasis: '46%',
                  minHeight: 84,
                  gap: tokens.spacing.sm,
                  padding: tokens.spacing.md,
                  borderWidth: 1.5,
                  borderColor: colors[visual.border],
                  borderRadius: tokens.radius.md,
                  backgroundColor: state === 'default' ? colors.surface : withAlpha(colors[visual.tint], 0.08),
                  opacity: review ? 0.95 : pressed ? 0.9 : 1,
                })}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: tokens.radius.full,
                      backgroundColor: withAlpha(colors[visual.tint], 0.16),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ color: colors[visual.tint], fontSize: tokens.typography.scale.xs, fontWeight: '800' }}>
                      {marker}
                    </Text>
                  </View>
                  {visual.glyph ? (
                    <Text
                      allowFontScaling={false}
                      style={{ color: colors[visual.tint], fontSize: tokens.typography.scale.base, fontWeight: '800' }}
                    >
                      {visual.glyph}
                    </Text>
                  ) : null}
                </View>
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base }}>{choice.label}</Text>
              </Pressable>
            );
          })}
        </View>
      )}

      {hint ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{hint}</Text> : null}
    </View>
  );
}
