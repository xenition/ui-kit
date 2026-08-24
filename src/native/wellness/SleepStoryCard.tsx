import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Skeleton } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

export type SleepStoryCategory = 'nature' | 'fiction' | 'asmr' | 'music' | 'travel' | 'meditation';

interface StoryMeta {
  glyph: string;
  label: string;
  color: keyof SemanticColors;
}

const STORY_META: Record<SleepStoryCategory, StoryMeta> = {
  nature: { glyph: '🌲', label: 'Nature', color: 'success' },
  fiction: { glyph: '📖', label: 'Fiction', color: 'primary' },
  asmr: { glyph: '🎧', label: 'ASMR', color: 'accent' },
  music: { glyph: '🎵', label: 'Music', color: 'accent' },
  travel: { glyph: '✈️', label: 'Travel', color: 'primary' },
  meditation: { glyph: '🌙', label: 'Meditation', color: 'primary' },
};

export interface SleepStoryCardProps {
  /** Story title. */
  title: string;
  /** Category — drives the icon, tag, and accent tone. */
  category: SleepStoryCategory;
  /** Narrator name. */
  narrator?: string;
  /** Length in minutes. */
  durationMin?: number;
  /** Short teaser. */
  description?: string;
  /** Whether this story is currently playing (swaps the play glyph to pause). */
  playing?: boolean;
  /** Gate behind a paywall. */
  locked?: boolean;
  /** Render a placeholder skeleton. */
  loading?: boolean;
  /** Fires on the play / pause control. */
  onPlay?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A sleep-story tile: a soft category-tinted cover, title + narrator + length,
 * and a round play / pause control. `playing` flips the control glyph and its
 * a11y label (state, not color alone); `locked` shows a premium lock; `loading`
 * renders a skeleton. Token-only colors (semantic slots + a `withAlpha` tint).
 */
export function SleepStoryCard({
  title,
  category,
  narrator,
  durationMin,
  description,
  playing = false,
  locked = false,
  loading = false,
  onPlay,
  style,
}: SleepStoryCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STORY_META[category] ?? STORY_META.nature;
  const accent = colors[meta.color];

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.md,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
  };

  if (loading) {
    return (
      <View accessibilityLabel="Loading story" style={[containerStyle, style]}>
        <Skeleton variant="rect" width={56} height={56} />
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <Skeleton width="70%" height={tokens.typography.scale.base} />
          <Skeleton width="45%" height={tokens.typography.scale.sm} />
        </View>
      </View>
    );
  }

  const control = locked ? '🔒' : playing ? '⏸' : '▶';
  const controlLabel = locked ? 'Locked' : playing ? 'Pause' : 'Play';

  return (
    <View accessibilityLabel={`${meta.label} sleep story: ${title}`} style={[containerStyle, style]}>
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: tokens.radius.md,
          backgroundColor: withAlpha(accent, 0.16),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
          {meta.glyph}
        </Text>
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{ color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }}
        >
          {meta.label}
        </Text>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {title}
        </Text>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {[narrator, durationMin != null ? `${durationMin} min` : null].filter(Boolean).join(' · ') ||
            description ||
            ''}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: playing, disabled: locked }}
        accessibilityLabel={controlLabel}
        disabled={locked || !onPlay}
        onPress={onPlay}
        style={({ pressed }) => ({
          width: 44,
          height: 44,
          borderRadius: tokens.radius.full,
          backgroundColor: playing ? accent : withAlpha(accent, 0.16),
          alignItems: 'center',
          justifyContent: 'center',
          opacity: locked ? 0.5 : pressed ? 0.75 : 1,
        })}
      >
        <Text
          allowFontScaling={false}
          style={{ fontSize: tokens.typography.scale.base, color: playing ? colors.onPrimary : accent }}
        >
          {control}
        </Text>
      </Pressable>
    </View>
  );
}
