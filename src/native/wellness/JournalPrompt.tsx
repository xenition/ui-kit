import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Button } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

export type JournalCategory = 'reflection' | 'gratitude' | 'intention' | 'growth' | 'emotion';

interface JournalMeta {
  glyph: string;
  label: string;
  color: keyof SemanticColors;
}

const JOURNAL_META: Record<JournalCategory, JournalMeta> = {
  reflection: { glyph: '🪞', label: 'Reflection', color: 'primary' },
  gratitude: { glyph: '🙏', label: 'Gratitude', color: 'success' },
  intention: { glyph: '🎯', label: 'Intention', color: 'accent' },
  growth: { glyph: '🌱', label: 'Growth', color: 'success' },
  emotion: { glyph: '💭', label: 'Emotion', color: 'primary' },
};

export interface JournalPromptProps {
  /** The reflective prompt / question. */
  prompt: string;
  /** Category — drives the icon, tag, and accent tone. Default `'reflection'`. */
  category?: JournalCategory;
  /** The user's saved response, if any (rendered as a preview). */
  response?: string;
  /** Whether the prompt has been answered (shows a done affordance). */
  answered?: boolean;
  /** Fires when the write / continue action is tapped. */
  onWrite?: () => void;
  /** Fires when the shuffle control is tapped (omit to hide it). */
  onShuffle?: () => void;
  /** Write button label. Defaults to "Write" (or "Continue" when answered). */
  writeLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A journaling prompt card: a category-tinted header, the prompt itself, an
 * optional saved-response preview, and a write / continue action with an
 * optional shuffle control for a fresh prompt. `answered` adds a "done" marker
 * and flips the CTA to continue (state via marker + label, not color alone).
 * Token-only colors (semantic slots + a `withAlpha` tint).
 */
export function JournalPrompt({
  prompt,
  category = 'reflection',
  response,
  answered = false,
  onWrite,
  onShuffle,
  writeLabel,
  style,
}: JournalPromptProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = JOURNAL_META[category] ?? JOURNAL_META.reflection;
  const accent = colors[meta.color];
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
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(accent, 0.16),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>
            {meta.glyph}
          </Text>
        </View>
        <Text
          style={{ flex: 1, color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }}
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
            borderLeftColor: accent,
            paddingLeft: tokens.spacing.sm,
          }}
        >
          <Text numberOfLines={3} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontStyle: 'italic' }}>
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
