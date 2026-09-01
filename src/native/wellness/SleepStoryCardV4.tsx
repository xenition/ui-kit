import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Skeleton } from '../primitives';
import { Icon } from '../primitives/Icon';
import { GradientSurface } from './internal/GradientSurface';
import { calmGradient, calmInk } from './internal/calm';
import type { SleepStoryCardProps, SleepStoryCategory } from './SleepStoryCard';

export type SleepStoryCardV4Props = SleepStoryCardProps;

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

/**
 * SleepStoryCardV4 — the "calm" restyle of {@link SleepStoryCard}. Same props,
 * defaults, labels, a11y and behavior; only the surface changes: a clean neutral
 * row card with a gradient cover tile (category glyph in near-white ink) and a
 * round gradient play/pause button. `playing` swaps the glyph and its a11y label;
 * `locked` and `loading` are preserved.
 */
export function SleepStoryCardV4({
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
}: SleepStoryCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const meta = STORY_META[category] ?? STORY_META.nature;

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
      <GradientSurface
        colors={calmGradient(r)}
        style={{
          width: 56,
          height: 56,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Icon glyph={meta.glyph} size={24} style={{ color: calmInk(r) }} />
      </GradientSurface>

      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{
            color: colors.mutedText,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}
        >
          {meta.label}
        </Text>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {title}
        </Text>
        <Text numberOfLines={1} style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
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
        style={({ pressed }) => ({ borderRadius: tokens.radius.full, opacity: locked ? 0.5 : pressed ? 0.85 : 1 })}
      >
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
          <Icon glyph={control} size={tokens.typography.scale.base} style={{ color: calmInk(r) }} />
        </GradientSurface>
      </Pressable>
    </View>
  );
}
