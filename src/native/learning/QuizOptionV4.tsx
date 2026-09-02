import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { QuizOptionProps, QuizOptionState } from './QuizOption';

/** Drop-in for {@link QuizOptionProps} — same props, the V4 "campus" design. */
export type QuizOptionV4Props = QuizOptionProps;

interface StateVisual {
  tone: keyof SemanticColors | null;
  glyph: string | null;
  glyphColor: keyof SemanticColors;
  onWell: keyof SemanticColors;
  a11ySuffix: string;
}

const STATE_VISUAL: Record<QuizOptionState, StateVisual> = {
  default: { tone: null, glyph: null, glyphColor: 'muted', onWell: 'onSurface', a11ySuffix: '' },
  selected: { tone: 'primary', glyph: '●', glyphColor: 'primary', onWell: 'onPrimary', a11ySuffix: ', selected' },
  correct: { tone: 'success', glyph: '✓', glyphColor: 'success', onWell: 'onSuccess', a11ySuffix: ', correct answer' },
  incorrect: { tone: 'danger', glyph: '✕', glyphColor: 'danger', onWell: 'onDanger', a11ySuffix: ', incorrect answer' },
};

/**
 * QuizOption — **V4** "campus" design (native twin of the web V4). A single
 * selectable quiz answer rendered as an accessibility `radio` on an elevated
 * rounded surface. The lead marker sits in a tone-filled well and correct /
 * incorrect / selected states carry an explicit glyph (`✓` / `✕` / `●`) + spoken
 * suffix + a toned border, so they never rely on color alone. Token-only colors
 * via `useXenitionTheme()`.
 */
export function QuizOptionV4({ label, marker, state = 'default', selected, disabled = false, onSelect, style }: QuizOptionV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const visual = STATE_VISUAL[state];
  const isSelected = selected ?? state === 'selected';
  const toneColor = visual.tone ? colors[visual.tone] : colors.border;
  const markerBg = visual.tone ? colors[visual.tone] : colors.border;
  const markerFg = visual.tone ? colors[visual.onWell] : colors.muted;

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
          minHeight: 48,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          borderWidth: visual.tone ? 2 : 1,
          borderColor: toneColor,
          borderRadius: tokens.radius.md,
          backgroundColor: colors.card,
          opacity: disabled ? 0.5 : pressed ? 0.9 : 1,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.06,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
          elevation: 1,
        },
        style,
      ]}
    >
      {marker ? (
        <View style={{ width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: visual.tone ? markerBg : withAlpha(colors.onSurface, 0.06) }}>
          <Text style={{ color: markerFg, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{marker}</Text>
        </View>
      ) : null}
      <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base }}>{label}</Text>
      {visual.glyph ? (
        <Text allowFontScaling={false} style={{ color: colors[visual.glyphColor], fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{visual.glyph}</Text>
      ) : null}
    </Pressable>
  );
}
