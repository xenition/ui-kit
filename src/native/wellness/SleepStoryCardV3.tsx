import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Skeleton } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { useEnter } from '../primitives/internal/motion';
import type { SleepStoryCardProps, SleepStoryCategory } from './SleepStoryCard';

/** Drop-in for {@link SleepStoryCardProps} — same props, a different design. */
export type SleepStoryCardV3Props = SleepStoryCardProps;

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
 * SleepStoryCard — **slim list row** design (v3). A minimal single line: a left
 * play/pause control, a thin accent stripe, the small category glyph, and the
 * title + a category/narrator/length line — no large cover. `playing` flips the
 * control glyph and a11y label (state, not color alone); `locked` shows a lock;
 * `loading` renders a skeleton. Same props as {@link SleepStoryCardProps};
 * token-only colors.
 */
export function SleepStoryCardV3({
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
}: SleepStoryCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const meta = STORY_META[category] ?? STORY_META.nature;
  const accent = colors[meta.color];

  const containerStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: tokens.spacing.sm,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.md,
    paddingVertical: tokens.spacing.sm,
    paddingRight: tokens.spacing.md,
    paddingLeft: 0,
    overflow: 'hidden' as const,
  };

  if (loading) {
    return (
      <View accessibilityLabel="Loading story" style={[containerStyle, { paddingLeft: tokens.spacing.md }, style]}>
        <Skeleton variant="circle" width={36} height={36} />
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <Skeleton width="65%" height={tokens.typography.scale.base} />
          <Skeleton width="40%" height={tokens.typography.scale.sm} />
        </View>
      </View>
    );
  }

  const metaLine =
    [meta.label, narrator, durationMin != null ? `${durationMin} min` : null].filter(Boolean).join(' · ') ||
    description ||
    '';
  const control = locked ? '🔒' : playing ? '⏸' : '▶';
  const controlLabel = locked ? 'Locked' : playing ? 'Pause' : 'Play';

  return (
    <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>
      <View
        accessibilityLabel={`${meta.label} sleep story: ${title}${playing ? ', playing' : ''}${locked ? ', premium' : ''}`}
        style={[containerStyle, style]}
      >
        {/* left accent stripe */}
        <View style={{ width: 4, alignSelf: 'stretch', backgroundColor: playing ? accent : withAlpha(accent, 0.5) }} />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={controlLabel}
          accessibilityState={{ selected: playing, disabled: locked }}
          disabled={locked || !onPlay}
          onPress={onPlay}
          style={({ pressed }) => ({
            width: 40,
            height: 40,
            marginLeft: tokens.spacing.sm,
            borderRadius: tokens.radius.full,
            backgroundColor: playing ? accent : withAlpha(accent, 0.16),
            alignItems: 'center',
            justifyContent: 'center',
            opacity: locked ? 0.55 : pressed ? 0.75 : 1,
          })}
        >
          <Text
            allowFontScaling={false}
            style={{ fontSize: tokens.typography.scale.base, color: playing ? colors.onPrimary : accent }}
          >
            {control}
          </Text>
        </Pressable>

        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {title}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {metaLine}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
