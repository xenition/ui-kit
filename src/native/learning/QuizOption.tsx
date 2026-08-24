import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

/**
 * Answer-review state. `correct`/`incorrect` are surfaced with an explicit glyph
 * and text — never color alone — so they're distinguishable without color vision.
 */
export type QuizOptionState = 'default' | 'selected' | 'correct' | 'incorrect';

interface StateVisual {
  border: keyof SemanticColors;
  glyph: string | null;
  glyphColor: keyof SemanticColors;
  /** Text appended to the a11y label so state isn't color-only. */
  a11ySuffix: string;
}

const STATE_VISUAL: Record<QuizOptionState, StateVisual> = {
  default: { border: 'border', glyph: null, glyphColor: 'muted', a11ySuffix: '' },
  selected: { border: 'primary', glyph: '●', glyphColor: 'primary', a11ySuffix: ', selected' },
  correct: { border: 'success', glyph: '✓', glyphColor: 'success', a11ySuffix: ', correct answer' },
  incorrect: { border: 'danger', glyph: '✕', glyphColor: 'danger', a11ySuffix: ', incorrect answer' },
};

export interface QuizOptionProps {
  /** The answer text. */
  label: string;
  /** Optional lead-in marker, e.g. "A". */
  marker?: string;
  /** Review/selection state. */
  state?: QuizOptionState;
  /** Whether this option is currently the chosen one (drives the radio a11y state). */
  selected?: boolean;
  disabled?: boolean;
  /** Fires when the option is chosen. */
  onSelect?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single selectable quiz answer, rendered as an accessibility `radio`.
 * Correct/incorrect states carry an explicit glyph (`✓` / `✕`) and spoken
 * suffix so they never rely on color alone. Token-only colors.
 */
export function QuizOption({
  label,
  marker,
  state = 'default',
  selected,
  disabled = false,
  onSelect,
  style,
}: QuizOptionProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const visual = STATE_VISUAL[state];
  const isSelected = selected ?? state === 'selected';

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: isSelected, disabled }}
      accessibilityLabel={`${marker ? `${marker}. ` : ''}${label}${visual.a11ySuffix}`}
      disabled={disabled || !onSelect}
      onPress={onSelect}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.md,
          borderWidth: 1,
          borderColor: colors[visual.border],
          borderRadius: tokens.radius.md,
          backgroundColor: colors.surface,
          opacity: disabled ? 0.5 : pressed ? 0.9 : 1,
        },
        style,
      ]}
    >
      {marker ? (
        <View
          style={{
            width: 26,
            height: 26,
            borderRadius: tokens.radius.full,
            borderWidth: 1,
            borderColor: colors.border,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{marker}</Text>
        </View>
      ) : null}
      <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base }}>{label}</Text>
      {visual.glyph ? (
        <Text
          allowFontScaling={false}
          style={{ color: colors[visual.glyphColor], fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {visual.glyph}
        </Text>
      ) : null}
    </Pressable>
  );
}
