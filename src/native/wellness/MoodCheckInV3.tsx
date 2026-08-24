import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Button, Textarea } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { MoodCheckInProps, Mood } from './MoodCheckIn';

/** Drop-in for {@link MoodCheckInProps} — same props, a different design. */
export type MoodCheckInV3Props = MoodCheckInProps;

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
 * MoodCheckIn — **compact face row** design (v3). A tight single line: the prompt
 * on the left and a snug `radiogroup` of small emoji faces on the right, the
 * chosen face lit as a tinted pill with its label revealed inline. Optional note
 * and submit follow underneath. Selection is announced as a radio state (not
 * color alone) and submit is disabled until a mood is picked. Same props as
 * {@link MoodCheckInProps}; token-only colors.
 */
export function MoodCheckInV3({
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
}: MoodCheckInV3Props): React.ReactElement {
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
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.md,
          gap: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
        <Text
          accessibilityRole="header"
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', flexShrink: 1 }}
        >
          {prompt}
        </Text>

        <View
          accessibilityRole="radiogroup"
          style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, marginLeft: 'auto' }}
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
                style={({ pressed }) => ({
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: selected ? 4 : 0,
                  height: 34,
                  paddingHorizontal: selected ? tokens.spacing.sm : 6,
                  borderRadius: tokens.radius.full,
                  backgroundColor: selected ? withAlpha(tint, 0.16) : 'transparent',
                  opacity: pressed ? 0.7 : selected || value == null ? 1 : 0.55,
                })}
              >
                <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
                  {meta.glyph}
                </Text>
                {selected ? (
                  <Text style={{ color: tint, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{meta.label}</Text>
                ) : null}
              </Pressable>
            );
          })}
        </View>
      </View>

      {showNote ? (
        <Textarea rows={2} value={note} onChangeText={onNoteChange} placeholder={notePlaceholder} accessibilityLabel="Mood note" />
      ) : null}

      {onSubmit ? (
        <Button
          variant="primary"
          size="sm"
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
