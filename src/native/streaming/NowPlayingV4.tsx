import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon, Slider, useXenitionTheme } from '../primitives';
import { MediaFigure } from '../media';
import type { MediaItem } from '../media';
import { WaveformScrubber } from './WaveformScrubber';
import { CastButton } from './CastButton';
import { GradientSurface } from './internal/GradientSurface';
import { spotlightGlow, spotlightInk } from './internal/spotlight';
import { formatTime } from './types';
import type { NowPlayingProps } from './NowPlaying';

/** Drop-in for {@link NowPlayingProps} — same props, the V4 "spotlight" design. */
export type NowPlayingV4Props = NowPlayingProps;

/**
 * NowPlaying — **V4** "spotlight" design. The artwork-forward take on the
 * now-playing surface: the hero cover sits on a brand-gradient glow backdrop
 * (the signature immersive touch), with a big round primary play control framed
 * by prev/next. Same scrubber (linear `Slider`, or a {@link WaveformScrubber}
 * when `peaks` are given), time labels, and optional cast button. Same
 * props/behavior as {@link NowPlayingProps}; token-only colors via
 * `useXenitionTheme()`. `variant="compact"` tightens the layout.
 */
export function NowPlayingV4({
  track,
  state = 'paused',
  position = 0,
  duration,
  peaks,
  variant = 'full',
  onPlayToggle,
  onSeek,
  onPrev,
  onNext,
  onCast,
  casting,
  style,
}: NowPlayingV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const isPlaying = state === 'playing';
  const total = duration ?? track.duration;
  const seekMax = total && total > 0 ? total : 1;
  const frac = seekMax > 0 ? Math.min(1, Math.max(0, position / seekMax)) : 0;
  const compact = variant === 'compact';

  const artItem: MediaItem = {
    url: track.artworkUrl ?? '',
    alt: track.album ? `${track.title} — ${track.album}` : track.title,
    width: 1,
    height: 1,
  };

  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          padding: compact ? tokens.spacing.md : tokens.spacing.lg,
          gap: compact ? tokens.spacing.md : tokens.spacing.xl,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      {/* Hero artwork on a gradient glow backdrop — the V4 spotlight signature. */}
      <GradientSurface
        colors={spotlightGlow(r)}
        style={{
          alignSelf: 'center',
          width: compact ? '68%' : '88%',
          padding: compact ? tokens.spacing.md : tokens.spacing.lg,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {track.artworkUrl ? (
          <View style={{ width: '100%', borderRadius: tokens.radius.md, overflow: 'hidden' }}>
            <MediaFigure item={artItem} reserveAspect />
          </View>
        ) : (
          <View style={{ width: '100%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: spotlightInk(r), fontSize: tokens.typography.scale['3xl'] }}>♪</Text>
          </View>
        )}
      </GradientSurface>

      {/* Title + artist. */}
      <View style={{ gap: tokens.spacing.xs }}>
        <Text numberOfLines={2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>
          {track.title}
        </Text>
        {track.artist ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>
            {track.artist}
          </Text>
        ) : null}
      </View>

      {/* Scrubber + time labels. */}
      <View style={{ gap: tokens.spacing.xs }}>
        {peaks ? (
          <WaveformScrubber peaks={peaks} progress={frac} onSeek={onSeek ? (f) => onSeek(f * seekMax) : undefined} />
        ) : (
          <Slider value={Math.min(position, seekMax)} min={0} max={seekMax} onValueChange={onSeek} />
        )}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{formatTime(position)}</Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{formatTime(total)}</Text>
        </View>
      </View>

      {/* Transport. */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xl }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Previous"
          disabled={!onPrev}
          onPress={onPrev}
          hitSlop={10}
          style={({ pressed }) => ({ opacity: !onPrev ? 0.4 : pressed ? 0.6 : 1 })}
        >
          <Icon glyph="⏮" size="2xl" color="onSurface" />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
          accessibilityState={{ selected: isPlaying }}
          disabled={!onPlayToggle}
          onPress={onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined}
          hitSlop={12}
          style={({ pressed }) => ({
            width: 72,
            height: 72,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: !onPlayToggle ? 0.5 : pressed ? 0.7 : 1,
          })}
        >
          <Icon glyph={isPlaying ? '❙❙' : '▶'} size="2xl" color="onPrimary" />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Next"
          disabled={!onNext}
          onPress={onNext}
          hitSlop={10}
          style={({ pressed }) => ({ opacity: !onNext ? 0.4 : pressed ? 0.6 : 1 })}
        >
          <Icon glyph="⏭" size="2xl" color="onSurface" />
        </Pressable>
      </View>

      {onCast ? (
        <View style={{ alignItems: 'center' }}>
          <CastButton variant="labeled" connected={casting} onPress={onCast} />
        </View>
      ) : null}
    </View>
  );
}
