import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { QuizQuestionProps, QuizChoice } from './QuizQuestion';
import type { QuizOptionState } from './QuizOption';

/** Same public contract as {@link QuizQuestion} — a drop-in alternate design. */
export type QuizQuestionV3Props = QuizQuestionProps;

const MARKERS = 'ABCDEFGH';

interface RowVisual {
  border: keyof SemanticColors;
  glyph: string | null;
  tint: keyof SemanticColors;
  a11ySuffix: string;
}

const ROW_VISUAL: Record<QuizOptionState, RowVisual> = {
  default: { border: 'border', glyph: null, tint: 'muted', a11ySuffix: '' },
  selected: { border: 'primary', glyph: '●', tint: 'primary', a11ySuffix: ', selected' },
  correct: { border: 'success', glyph: '✓', tint: 'success', a11ySuffix: ', correct answer' },
  incorrect: { border: 'danger', glyph: '✕', tint: 'danger', a11ySuffix: ', incorrect answer' },
};

/**
 * QuizQuestion, design v3 — **full-width stacked rows with big letter badges**.
 * A pill counter and an oversized prompt sit on a chrome-less surface; each
 * choice is a wide filled row led by a large circular letter badge that flips
 * to a state glyph (`✓`/`✕`) in `review`, with the state also spoken — never
 * color alone. Empty state supported. Same props as {@link QuizQuestion}.
 * Token-only colors.
 */
export function QuizQuestionV3({
  prompt,
  choices,
  questionNumber,
  totalQuestions,
  selectedId,
  review = false,
  onSelect,
  hint,
  style,
}: QuizQuestionV3Props): React.ReactElement {
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

  const showCounter = questionNumber != null && totalQuestions != null;

  return (
    <View
      accessibilityLabel={showCounter ? `Question ${questionNumber} of ${totalQuestions}: ${prompt}` : prompt}
      style={[{ gap: tokens.spacing.md, paddingVertical: tokens.spacing.md }, style]}
    >
      {showCounter ? (
        <View
          style={{
            alignSelf: 'flex-start',
            paddingVertical: 3,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.primary, 0.12),
          }}
        >
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '800' }}>
            {questionNumber} of {totalQuestions}
          </Text>
        </View>
      ) : null}

      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>{prompt}</Text>

      {choices.length === 0 ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No choices available</Text>
      ) : (
        <View accessibilityRole="radiogroup" style={{ gap: tokens.spacing.sm }}>
          {choices.map((choice, i) => {
            const state = resolveState(choice);
            const visual = ROW_VISUAL[state];
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
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: tokens.spacing.md,
                  paddingVertical: tokens.spacing.md,
                  paddingHorizontal: tokens.spacing.md,
                  borderRadius: tokens.radius.md,
                  borderWidth: 1,
                  borderColor: colors[visual.border],
                  backgroundColor: state === 'default' ? withAlpha(colors.onSurface, 0.03) : withAlpha(colors[visual.tint], 0.1),
                  opacity: review ? 0.95 : pressed ? 0.9 : 1,
                })}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.full,
                    backgroundColor: withAlpha(colors[visual.tint], 0.16),
                    borderWidth: 1.5,
                    borderColor: colors[visual.border],
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {visual.glyph ? (
                    <Text
                      allowFontScaling={false}
                      style={{ color: colors[visual.tint], fontSize: tokens.typography.scale.lg, fontWeight: '800' }}
                    >
                      {visual.glyph}
                    </Text>
                  ) : (
                    <Text style={{ color: colors[visual.tint], fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
                      {marker}
                    </Text>
                  )}
                </View>
                <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
                  {choice.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}

      {hint ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{hint}</Text> : null}
    </View>
  );
}
