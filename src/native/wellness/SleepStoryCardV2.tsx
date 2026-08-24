import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Skeleton } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import type { SleepStoryCardProps, SleepStoryCategory } from './SleepStoryCard';

/** Drop-in for {@link SleepStoryCardProps} — same props, a different design. */
export type SleepStoryCardV2Props = SleepStoryCardProps;

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
 * SleepStoryCard — **dark cover hero** design (v2). A tall night-time cover: a
 * dark neutral base washed with the category accent and a bottom scrim, the
 * category tag pinned top-left (lock top-right), a big centered play/pause
 * overlay, and the title + narrator/length line over the scrim. `playing` flips
 * the control glyph and a11y label (state, not color alone); `locked` shows a
 * lock; `loading` renders a skeleton. Same props as {@link SleepStoryCardProps};
 * token-only colors.
 */
export function SleepStoryCardV2({
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
}: SleepStoryCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const press = usePressScale();
  const meta = STORY_META[category] ?? STORY_META.nature;
  const accent = colors[meta.color];
  const ink = tokens.ramps.neutral[50] ?? colors.onPrimary;
  const base = tokens.ramps.neutral[900] ?? colors.onSurface;

  if (loading) {
    return (
      <View
        accessibilityLabel="Loading story"
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
        <Skeleton variant="rect" width="100%" height={150} />
        <Skeleton width="60%" height={tokens.typography.scale.lg} />
        <Skeleton width="40%" height={tokens.typography.scale.sm} />
      </View>
    );
  }

  const metaLine =
    [narrator, durationMin != null ? `${durationMin} min` : null].filter(Boolean).join(' · ') || description || '';
  const control = locked ? '🔒' : playing ? '⏸' : '▶';
  const controlLabel = locked ? 'Locked' : playing ? 'Pause' : 'Play';

  return (
    <Animated.View
      accessibilityLabel={`${meta.label} sleep story: ${title}${playing ? ', playing' : ''}${locked ? ', premium' : ''}`}
      style={[{ opacity: enter.opacity, transform: enter.transform }, style]}
    >
      <View
        style={{
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          borderColor: colors.border,
          borderWidth: 1,
          minHeight: 220,
          backgroundColor: base,
        }}
      >
        <View style={{ ...fill, backgroundColor: withAlpha(accent, 0.45) }} />
        <View style={{ ...fill, top: '40%', backgroundColor: withAlpha(base, 0.72) }} />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: tokens.spacing.md,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.xs,
              paddingVertical: 4,
              paddingHorizontal: tokens.spacing.sm,
              borderRadius: tokens.radius.full,
              backgroundColor: withAlpha(ink, 0.18),
            }}
          >
            <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>
              {meta.glyph}
            </Text>
            <Text style={{ color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }}>
              {meta.label}
            </Text>
          </View>
          {locked ? (
            <Text allowFontScaling={false} accessibilityLabel="Premium" style={{ fontSize: tokens.typography.scale.base }}>
              🔒
            </Text>
          ) : null}
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: tokens.spacing.md }}>
          <Animated.View style={{ transform: [{ scale: press.scale }] }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={controlLabel}
              accessibilityState={{ selected: playing, disabled: locked }}
              disabled={locked || !onPlay}
              onPress={onPlay}
              onPressIn={press.onPressIn}
              onPressOut={press.onPressOut}
              style={({ pressed }) => ({
                width: 72,
                height: 72,
                borderRadius: tokens.radius.full,
                backgroundColor: playing ? accent : withAlpha(ink, 0.95),
                alignItems: 'center',
                justifyContent: 'center',
                opacity: locked ? 0.55 : pressed ? 0.85 : 1,
              })}
            >
              <Text
                allowFontScaling={false}
                style={{ fontSize: tokens.typography.scale.xl, color: playing ? colors.onPrimary : accent }}
              >
                {control}
              </Text>
            </Pressable>
          </Animated.View>
        </View>

        <View style={{ padding: tokens.spacing.lg, gap: 4 }}>
          <Text numberOfLines={2} style={{ color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>
            {title}
          </Text>
          {metaLine ? (
            <Text numberOfLines={1} style={{ color: withAlpha(ink, 0.82), fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              {metaLine}
            </Text>
          ) : null}
        </View>
      </View>
    </Animated.View>
  );
}

const fill = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as const;
