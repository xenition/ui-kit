import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Icon, useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import type { PodcastRowProps } from './PodcastRow';

/** Drop-in replacement for {@link PodcastRow} — identical props. */
export type PodcastRowV2Props = PodcastRowProps;

/**
 * PodcastRow — **artwork-forward player card** alternate design.
 *
 * Large square artwork with the play/pause control overlaid at its center on a
 * scrim, title + show stacked to the right, and the duration shown as a tinted
 * pill. A "now playing" feel versus the v1 list row with a tiny trailing button.
 * Same props as {@link PodcastRow}, so it is a drop-in swap.
 *
 * Token-pure: elevation via the shared `shadow()`, the play scrim via
 * `withAlpha(ramps.neutral[900], …)`, the duration pill via
 * `withAlpha(colors.primary, …)`. No literal colors.
 */
export function PodcastRowV2({
  episode,
  playing = false,
  onPlayToggle,
  onPress,
  variant = 'standard',
  style,
}: PodcastRowV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const art = variant === 'compact' ? 64 : 84;
  const scrimHex = tokens.ramps.neutral[900] ?? tokens.ramps.neutral[800] ?? colors.onSurface;

  const playButton = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={playing ? `Pause ${episode.title}` : `Play ${episode.title}`}
      accessibilityState={{ selected: playing }}
      disabled={!onPlayToggle}
      onPress={onPlayToggle ? () => onPlayToggle(!playing) : undefined}
      hitSlop={8}
      style={({ pressed }) => ({
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: withAlpha(scrimHex, playing ? 0.28 : 0.4),
        opacity: !onPlayToggle ? 0.6 : pressed ? 0.85 : 1,
      })}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: tokens.radius.full,
          backgroundColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          ...shadow('sm', tokens),
        }}
      >
        <Icon glyph={playing ? '❙❙' : '▶'} size="sm" color="onPrimary" />
      </View>
    </Pressable>
  );

  const artwork = (
    <View style={{ width: art, height: art, borderRadius: tokens.radius.md, overflow: 'hidden' }}>
      {episode.artworkUrl ? (
        <Image
          source={{ uri: episode.artworkUrl }}
          accessibilityIgnoresInvertColors
          resizeMode="cover"
          style={{ width: '100%', height: '100%', backgroundColor: colors.border }}
        />
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: colors.accent,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon glyph="🎧" size="xl" color="onAccent" />
        </View>
      )}
      {playButton}
    </View>
  );

  const inner = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      {artwork}

      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <Text
          numberOfLines={2}
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '800',
            lineHeight: tokens.typography.scale.base * 1.25,
          }}
        >
          {episode.title}
        </Text>
        {episode.show ? (
          <Text
            numberOfLines={1}
            style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}
          >
            {episode.show}
          </Text>
        ) : null}
        {episode.duration ? (
          <View
            style={{
              alignSelf: 'flex-start',
              backgroundColor: withAlpha(colors.primary, 0.12),
              borderRadius: tokens.radius.full,
              paddingHorizontal: tokens.spacing.sm,
              paddingVertical: 2,
            }}
          >
            <Text
              style={{ color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}
            >
              {episode.duration}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) return inner;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={episode.title}
      onPress={() => onPress(episode)}
      style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1 })}
    >
      {inner}
    </Pressable>
  );
}
