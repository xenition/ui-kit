import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Icon, Slider, useXenitionTheme } from '../primitives';
import { MediaFigure } from '../media';
import type { MediaItem } from '../media';
import { WaveformScrubber } from './WaveformScrubber';
import { CastButton } from './CastButton';
import { formatTime, type MediaTrack, type PlaybackState } from './types';

export type NowPlayingVariant = 'full' | 'compact';

export interface NowPlayingProps {
  /** The track on screen. */
  track: MediaTrack;
  /** Transport state — drives the play control + a11y label. Default `'paused'`. */
  state?: PlaybackState;
  /** Playback position in seconds. */
  position?: number;
  /** Total duration in seconds (falls back to `track.duration`). */
  duration?: number;
  /**
   * Optional waveform peaks in `[0, 1]`. When provided the scrubber is a
   * {@link WaveformScrubber}; otherwise a linear `Slider` is used.
   */
  peaks?: number[];
  /**
   * - `full`    — large hero artwork + full transport (default).
   * - `compact` — smaller artwork, tighter spacing.
   */
  variant?: NowPlayingVariant;
  /** Called with the next playing state when the main control is tapped. */
  onPlayToggle?: (next: boolean) => void;
  /** Called with a new position (seconds) when the scrubber changes. */
  onSeek?: (seconds: number) => void;
  /** Previous-track intent. */
  onPrev?: () => void;
  /** Next-track intent. */
  onNext?: () => void;
  /** Cast intent (shows a `CastButton` when set). */
  onCast?: () => void;
  /** Whether a cast target is connected. */
  casting?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * The full-screen **now-playing** surface — hero artwork, title/artist, a
 * scrubber (linear `Slider`, or a {@link WaveformScrubber} when `peaks` are
 * given) with time labels, and transport controls (prev / play-pause / next)
 * plus an optional cast button. UI shell only: seek/toggle/skip intents come
 * back through callbacks; wire a real engine behind them. The main control's
 * accessible label reflects `state`. Token-only — no literal hex.
 */
export function NowPlaying({
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
}: NowPlayingProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
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
    <View style={[{ gap: compact ? tokens.spacing.md : tokens.spacing.xl }, style]}>
      {/* Hero artwork. */}
      {track.artworkUrl ? (
        <View style={{ alignSelf: 'center', width: compact ? '60%' : '82%' }}>
          <MediaFigure item={artItem} reserveAspect />
        </View>
      ) : (
        <View
          style={{
            alignSelf: 'center',
            width: compact ? '60%' : '82%',
            aspectRatio: 1,
            borderRadius: tokens.radius.lg,
            backgroundColor: colors.accent,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon glyph="♪" size="3xl" color="onAccent" />
        </View>
      )}

      {/* Title + artist. */}
      <View style={{ gap: tokens.spacing.xs }}>
        <Text
          numberOfLines={2}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}
        >
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

      {/* Transport. */}
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
