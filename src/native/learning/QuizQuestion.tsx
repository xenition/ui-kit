import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { QuizOption, type QuizOptionState } from './QuizOption';

/** One answer choice fed to {@link QuizQuestion}. */
export interface QuizChoice {
  /** Stable id returned by `onSelect`. */
  id: string;
  /** Answer text. */
  label: string;
  /** Whether this choice is the correct one (used only in `review` mode). */
  correct?: boolean;
}

export interface QuizQuestionProps {
  /** The question prompt. */
  prompt: string;
  /** Answer choices. */
  choices: QuizChoice[];
  /** 1-based question number for the "Question X of Y" header. */
  questionNumber?: number;
  /** Total questions, paired with `questionNumber`. */
  totalQuestions?: number;
  /** The currently chosen choice id. */
  selectedId?: string;
  /** When true, choices show correct/incorrect review states. */
  review?: boolean;
  /** Fires with the chosen choice id. */
  onSelect?: (id: string) => void;
  /** Optional helper/hint line under the choices. */
  hint?: string;
  style?: StyleProp<ViewStyle>;
}

const MARKERS = 'ABCDEFGH';

/**
 * A quiz question block: a "Question X of Y" eyebrow, the prompt, and a
 * `radiogroup` of {@link QuizOption}s. In `review` mode each option resolves to
 * a correct / incorrect / selected state (with glyphs, not color alone). Renders
 * an empty-state note when there are no choices. Token-only colors.
 */
export function QuizQuestion({
  prompt,
  choices,
  questionNumber,
  totalQuestions,
  selectedId,
  review = false,
  onSelect,
  hint,
  style,
}: QuizQuestionProps): React.ReactElement {
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

  return (
    <View
      accessibilityLabel={
        questionNumber != null && totalQuestions != null
          ? `Question ${questionNumber} of ${totalQuestions}: ${prompt}`
          : prompt
      }
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
      {questionNumber != null && totalQuestions != null ? (
        <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }}>
          Question {questionNumber} of {totalQuestions}
        </Text>
      ) : null}

      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>{prompt}</Text>

      {choices.length === 0 ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No choices available</Text>
      ) : (
        <View accessibilityRole="radiogroup" style={{ gap: tokens.spacing.sm }}>
          {choices.map((choice, i) => (
            <QuizOption
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

      {hint ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{hint}</Text>
      ) : null}
    </View>
  );
}
