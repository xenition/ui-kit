import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Button, Textarea } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { GradientSurface } from './internal/GradientSurface';
import { calmGradient } from './internal/calm';
import { MoodCheckIn, type MoodCheckInProps, type Mood } from './MoodCheckIn';

export type MoodCheckInV4Props = MoodCheckInProps;

interface MoodMeta {
  glyph: string;
  label: string;
  color: keyof SemanticColors;
}

const MOOD_META: Record<Mood, MoodMeta> = {
  awful: { glyph: '😣', label: 'Awful', color: 'danger' },
  bad: { glyph: '🙁', label: 'Bad', color: 'warn' },
  okay: { glyph: '😐', label: 'Okay', color: 'muted' },
  good: { glyph: '🙂', label: 'Good', color: 'primary' },
  great: { glyph: '😄', label: 'Great', color: 'success' },
};

const MOOD_ORDER: Mood[] = ['awful', 'bad', 'okay', 'good', 'great'];

/**
 * MoodCheckInV4 — the calm redesign of {@link MoodCheckIn}. Same props, defaults,
 * labels, radiogroup a11y, note field, and disabled-until-selected submit. Only
 * the visuals change: a clean surface card where the *selected* face sits on a
 * small gradient circle (the one calm accent), the others staying soft neutral.
 */
export function MoodCheckInV4({
  prompt = 'How are you feeling?',
  value,
  options,
  showNote = false,
  note = '',
  notePlaceholder = 'Add a note (optional)',
  onChange,
  onNoteChange,
  onSubmit,
  submitLabel = 'Save check-in',
  style,
}: MoodCheckInV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const moods = options && options.length > 0 ? options : MOOD_ORDER;

  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      <Text
        accessibilityRole="header"
        style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
      >
        {prompt}
      </Text>

      <View
        accessibilityRole="radiogroup"
        style={{ flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.xs }}
      >
        {moods.map((mood) => {
          const meta = MOOD_META[mood] ?? MOOD_META.okay;
          const selected = value === mood;
          return (
            <Pressable
              key={mood}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={meta.label}
              onPress={() => onChange?.(mood)}
              style={({ pressed }) => ({ flex: 1, alignItems: 'center', opacity: pressed ? 0.7 : 1 })}
            >
              <View style={{ alignItems: 'center', gap: tokens.spacing.xs }}>
                {selected ? (
                  <GradientSurface
                    colors={calmGradient(r)}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: tokens.radius.full,
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
                      {meta.glyph}
                    </Text>
                  </GradientSurface>
                ) : (
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: tokens.radius.full,
                      backgroundColor: withAlpha(colors.border, 0.4),
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: value == null ? 1 : 0.5,
                    }}
                  >
                    <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
                      {meta.glyph}
                    </Text>
                  </View>
                )}
                <Text
                  style={{
                    color: selected ? colors.primary : colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: selected ? '700' : '400',
                  }}
                >
                  {meta.label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      {showNote ? (
        <Textarea
          rows={3}
          value={note}
          onChangeText={onNoteChange}
          placeholder={notePlaceholder}
          accessibilityLabel="Mood note"
        />
      ) : null}

      {onSubmit ? (
        <Button
          variant="primary"
          disabled={value == null}
          onPress={() => {
            if (value != null) onSubmit({ mood: value, note: showNote ? note : undefined });
          }}
        >
          {submitLabel}
        </Button>
      ) : null}
    </View>
  );
}
