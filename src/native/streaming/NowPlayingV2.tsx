import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon, Slider, useXenitionTheme } from '../primitives';
import { MediaFigure } from '../media';
import type { MediaItem } from '../media';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { WaveformScrubber } from './WaveformScrubber';
import { CastButton } from './CastButton';
import { formatTime } from './types';
import type { NowPlayingProps } from './NowPlaying';

/** Drop-in for {@link NowPlayingProps} — a genuinely different design, same props. */
export type NowPlayingV2Props = NowPlayingProps;

/**
 * **NowPlaying — design V2 (artwork-forward).** Edge-to-edge hero artwork
 * anchors the screen; the title/artist sit on a dark, token-derived scrim
 * overlaid on the art, and the scrubber + transport live on an elevated
 * control card that floats over the lower edge. The main control's accessible
 * label reflects `state`. Same `NowPlayingProps`; token-pure; a11y-complete.
 */
export function NowPlayingV2({
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
}: NowPlayingV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isPlaying = state === 'playing';
  const isBuffering = state === 'buffering';
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
    <View style={[{ borderRadius: tokens.radius.lg, overflow: 'hidden', backgroundColor: colors.surface }, style]}>
      {/* Hero artwork with a title scrim overlaid. */}
      <View style={{ width: '100%', aspectRatio: compact ? 16 / 10 : 1 }}>
        {track.artworkUrl ? (
          <MediaFigure item={artItem} reserveAspect />
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
            <Icon glyph="♪" size="3xl" color="onAccent" />
          </View>
        )}
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            paddingTop: tokens.spacing.xl,
            paddingBottom: tokens.spacing.lg,
            paddingHorizontal: tokens.spacing.lg,
            backgroundColor: withAlpha(tokens.ramps.neutral[900] ?? colors.onSurface, 0.42),
            gap: tokens.spacing.xs,
          }}
        >
          <Text
            numberOfLines={2}
            style={{ color: colors.onAccent, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}
          >
            {track.title}
          </Text>
          {track.artist ? (
            <Text numberOfLines={1} style={{ color: colors.onAccent, fontSize: tokens.typography.scale.base }}>
              {track.artist}
            </Text>
          ) : null}
        </View>
      </View>

      {/* Floating control card. */}
      <View
        style={{
          margin: tokens.spacing.md,
          marginTop: -tokens.spacing.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.lg,
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          ...shadow('lg', tokens),
        }}
      >
        <View style={{ gap: tokens.spacing.xs }}>
          {peaks ? (
            <WaveformScrubber
              peaks={peaks}
              progress={frac}
              onSeek={onSeek ? (f) => onSeek(f * seekMax) : undefined}
            />
          ) : (
            <Slider value={Math.min(position, seekMax)} min={0} max={seekMax} onValueChange={onSeek} />
          )}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {formatTime(position)}
            </Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {formatTime(total)}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: tokens.spacing.xl,
          }}
        >
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
            accessibilityState={{ selected: isPlaying, busy: isBuffering }}
            disabled={!onPlayToggle}
            onPress={onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined}
            hitSlop={12}
            style={({ pressed }) => ({
              width: 76,
              height: 76,
              borderRadius: tokens.radius.full,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: !onPlayToggle ? 0.5 : pressed ? 0.7 : 1,
              ...shadow('md', tokens),
            })}
          >
            <Icon glyph={isBuffering ? '◌' : isPlaying ? '❙❙' : '▶'} size="2xl" color="onPrimary" />
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
    </View>
  );
}
