import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import { calmGradient, calmInk } from './internal/calm';
import { JournalPrompt, type JournalPromptProps, type JournalCategory } from './JournalPrompt';

export type JournalPromptV4Props = JournalPromptProps;

interface JournalMeta {
  glyph: string;
  label: string;
}

const JOURNAL_META: Record<JournalCategory, JournalMeta> = {
  reflection: { glyph: '🪞', label: 'Reflection' },
  gratitude: { glyph: '🙏', label: 'Gratitude' },
  intention: { glyph: '🎯', label: 'Intention' },
  growth: { glyph: '🌱', label: 'Growth' },
  emotion: { glyph: '💭', label: 'Emotion' },
};

/**
 * JournalPromptV4 — the calm redesign of {@link JournalPrompt}. Same props,
 * defaults, labels, answered affordance, and write/shuffle controls. Only the
 * visuals change: a clean surface card with a small gradient category badge as
 * the single calm accent; the prompt, response preview, and controls stay calm.
 */
export function JournalPromptV4({
  prompt,
  category = 'reflection',
  response,
  answered = false,
  onWrite,
  onShuffle,
  writeLabel,
  style,
}: JournalPromptV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const meta = JOURNAL_META[category] ?? JOURNAL_META.reflection;
  const cta = writeLabel ?? (answered ? 'Continue' : 'Write');

  return (
    <View
      accessibilityLabel={`${meta.label} prompt${answered ? ', answered' : ''}: ${prompt}`}
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
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <GradientSurface
          colors={calmGradient(r)}
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg, color: calmInk(r) }}>
            {meta.glyph}
          </Text>
        </GradientSurface>
        <Text
          style={{
            flex: 1,
            color: colors.primary,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '700',
            textTransform: 'uppercase',
          }}
        >
          {meta.label}
        </Text>
        {answered ? (
          <Text style={{ color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            ✓ Done
          </Text>
        ) : null}
      </View>

      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '600' }}>
        {prompt}
      </Text>

      {response ? (
        <View
          style={{
            borderLeftWidth: 3,
            borderLeftColor: colors.primary,
            paddingLeft: tokens.spacing.sm,
          }}
        >
          <Text
            numberOfLines={3}
            style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm, fontStyle: 'italic' }}
          >
            {response}
          </Text>
        </View>
      ) : null}

      <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
        {onWrite ? (
          <View style={{ flex: 1 }}>
            <Button variant="primary" onPress={onWrite}>
              {cta}
            </Button>
          </View>
        ) : null}
        {onShuffle ? (
          <Button variant="outline" onPress={onShuffle} accessibilityLabel="Shuffle prompt">
            🔀
          </Button>
        ) : null}
      </View>
    </View>
  );
}
