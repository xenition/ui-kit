import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Button, Textarea } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

export type Mood = 'awful' | 'bad' | 'okay' | 'good' | 'great';

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

export interface MoodCheckInProps {
  /** Heading prompt. Default "How are you feeling?". */
  prompt?: string;
  /** Currently selected mood. */
  value?: Mood;
  /** Restrict / reorder the moods shown; defaults to all five. */
  options?: Mood[];
  /** Show a free-text note field under the faces. */
  showNote?: boolean;
  /** Controlled note text. */
  note?: string;
  /** Note placeholder. */
  notePlaceholder?: string;
  /** Fires with the tapped mood. */
  onChange?: (mood: Mood) => void;
  /** Fires as the note text changes. */
  onNoteChange?: (text: string) => void;
  /** Fires when the check-in is submitted (mood is required). */
  onSubmit?: (result: { mood: Mood; note?: string }) => void;
  /** Submit button label. Default "Save check-in". */
  submitLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A daily mood check-in: a prompt, a row of tappable emoji faces from awful to
 * great, an optional note field, and a submit action. The selected face keeps a
 * tinted ring in its mood color and is announced as selected (state, not color
 * alone); submit is disabled until a mood is chosen. `onSubmit` returns the
 * mood plus the note. Token-only colors (semantic slots + a `withAlpha` tint).
 */
export function MoodCheckIn({
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
}: MoodCheckInProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
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
          const tint = colors[meta.color];
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
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: tokens.radius.full,
                    borderWidth: 2,
                    borderColor: selected ? tint : colors.border,
                    backgroundColor: selected ? withAlpha(tint, 0.16) : colors.surface,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: selected || value == null ? 1 : 0.5,
                  }}
                >
                  <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
                    {meta.glyph}
                  </Text>
                </View>
                <Text
                  style={{
                    color: selected ? tint : colors.muted,
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
