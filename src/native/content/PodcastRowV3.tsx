import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Icon, useXenitionTheme } from '../primitives';
import type { PodcastRowProps } from './PodcastRow';

/** Drop-in replacement for {@link PodcastRow} — identical props. */
export type PodcastRowV3Props = PodcastRowProps;

/**
 * PodcastRow — **minimal playlist line** alternate design.
 *
 * A borderless, hairline-separated line: a tiny rounded artwork, a single-line
 * title with the show beneath, the duration right-aligned, and a compact
 * text-glyph play control. Built for dense episode lists rather than the v1
 * bordered card. Same props as {@link PodcastRow}, so it is a drop-in swap.
 *
 * Token-pure: the divider is `colors.border`, the active play glyph is
 * `colors.primary` (muted when idle). No literal colors.
 */
export function PodcastRowV3({
  episode,
  playing = false,
  onPlayToggle,
  onPress,
  variant = 'standard',
  style,
}: PodcastRowV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const art = variant === 'compact' ? 36 : 44;

  const play = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={playing ? `Pause ${episode.title}` : `Play ${episode.title}`}
      accessibilityState={{ selected: playing }}
      disabled={!onPlayToggle}
      onPress={onPlayToggle ? () => onPlayToggle(!playing) : undefined}
      hitSlop={8}
      style={({ pressed }) => ({
        width: 32,
        height: 32,
        borderRadius: tokens.radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: !onPlayToggle ? 0.5 : pressed ? 0.6 : 1,
      })}
    >
      <Icon glyph={playing ? '❙❙' : '▶'} size="sm" color={playing ? 'primary' : 'muted'} />
    </Pressable>
  );

  const inner = (
    <View style={[{ paddingVertical: tokens.spacing.xs }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        {episode.artworkUrl ? (
          <Image
            source={{ uri: episode.artworkUrl }}
            accessibilityIgnoresInvertColors
            resizeMode="cover"
            style={{ width: art, height: art, borderRadius: tokens.radius.sm, backgroundColor: colors.border }}
          />
        ) : (
          <View
            style={{
              width: art,
              height: art,
              borderRadius: tokens.radius.sm,
              backgroundColor: colors.accent,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon glyph="🎧" size="sm" color="onAccent" />
          </View>
        )}

        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
          >
            {episode.title}
          </Text>
          {episode.show ? (
            <Text
              numberOfLines={1}
              style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}
            >
              {episode.show}
            </Text>
          ) : null}
        </View>

        {episode.duration ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {episode.duration}
          </Text>
        ) : null}

        {play}
      </View>

      {/* Trailing hairline — the only separator in this dense list style. */}
      <View style={{ height: 1, backgroundColor: colors.border, marginTop: tokens.spacing.xs }} />
    </View>
  );

  if (!onPress) return inner;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={episode.title}
      onPress={() => onPress(episode)}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {inner}
    </Pressable>
  );
}
