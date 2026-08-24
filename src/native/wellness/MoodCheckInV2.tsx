import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Button, Textarea } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { MoodCheckInProps, Mood } from './MoodCheckIn';

/** Drop-in for {@link MoodCheckInProps} — same props, a different design. */
export type MoodCheckInV2Props = MoodCheckInProps;

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
 * MoodCheckIn — **big face** design (v2). The chosen mood blooms as one large
 * emoji face inside a tinted circle with its label underneath; a compact
 * `radiogroup` of small faces sits below to change the selection. Optional note
 * and submit follow. Selection is announced as a radio state (not color alone)
 * and submit is disabled until a mood is picked. Same props as
 * {@link MoodCheckInProps}; token-only colors.
 */
export function MoodCheckInV2({
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
}: MoodCheckInV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const moods = options && options.length > 0 ? options : MOOD_ORDER;
  const selectedMeta = value != null ? MOOD_META[value] ?? MOOD_META.okay : null;
  const selectedTint = selectedMeta ? colors[selectedMeta.color] : colors.muted;

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
          alignItems: 'center',
        },
        style,
      ]}
    >
      <Text
        accessibilityRole="header"
        style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', textAlign: 'center' }}
      >
        {prompt}
      </Text>

      {/* big preview face */}
      <View
        style={{
          width: 104,
          height: 104,
          borderRadius: tokens.radius.full,
          borderWidth: 2,
          borderColor: selectedMeta ? selectedTint : colors.border,
          backgroundColor: selectedMeta ? withAlpha(selectedTint, 0.14) : withAlpha(colors.muted, 0.08),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['3xl'] }}>
          {selectedMeta ? selectedMeta.glyph : '🫧'}
        </Text>
      </View>
      <Text
        style={{
          color: selectedMeta ? selectedTint : colors.muted,
          fontSize: tokens.typography.scale.xl,
          fontWeight: '800',
        }}
      >
        {selectedMeta ? selectedMeta.label : 'Tap a face'}
      </Text>

      {/* compact picker */}
      <View
        accessibilityRole="radiogroup"
        style={{ flexDirection: 'row', justifyContent: 'center', gap: tokens.spacing.sm, alignSelf: 'stretch' }}
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
                width: 44,
                height: 44,
                borderRadius: tokens.radius.full,
                borderWidth: selected ? 2 : 1,
                borderColor: selected ? tint : colors.border,
                backgroundColor: selected ? withAlpha(tint, 0.16) : colors.surface,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pressed ? 0.7 : selected || value == null ? 1 : 0.55,
              })}
            >
              <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
                {meta.glyph}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {showNote ? (
        <View style={{ alignSelf: 'stretch' }}>
          <Textarea rows={3} value={note} onChangeText={onNoteChange} placeholder={notePlaceholder} accessibilityLabel="Mood note" />
        </View>
      ) : null}

      {onSubmit ? (
        <View style={{ alignSelf: 'stretch' }}>
          <Button
            variant="primary"
            disabled={value == null}
            onPress={() => {
              if (value != null) onSubmit({ mood: value, note: showNote ? note : undefined });
            }}
          >
            {submitLabel}
          </Button>
        </View>
      ) : null}
    </View>
  );
}
