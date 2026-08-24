import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon, Slider, useXenitionTheme } from '../primitives';
import { MediaFigure } from '../media';
import type { MediaItem } from '../media';
import { WaveformScrubber } from './WaveformScrubber';
import { CastButton } from './CastButton';
import { formatTime } from './types';
import type { NowPlayingProps } from './NowPlaying';

/** Drop-in for {@link NowPlayingProps} — a genuinely different design, same props. */
export type NowPlayingV3Props = NowPlayingProps;

/**
 * **NowPlaying — design V3 (minimalist centred).** Everything centred on a bare
 * surface with generous air: a modest rounded artwork, large centred
 * title/artist, one full-width slider, and a lightweight in-line transport row
 * (no filled play disc — the play/pause is a large glyph). The play control's
 * accessible label reflects `state`. Same `NowPlayingProps`; token-pure;
 * a11y-complete.
 */
export function NowPlayingV3({
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
}: NowPlayingV3Props): React.ReactElement {
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
    <View
      style={[
        { alignItems: 'center', gap: compact ? tokens.spacing.lg : tokens.spacing['2xl'], paddingVertical: tokens.spacing.lg },
        style,
      ]}
    >
      {/* Modest centred artwork. */}
      <View style={{ width: compact ? '45%' : '58%', borderRadius: tokens.radius.lg, overflow: 'hidden' }}>
        {track.artworkUrl ? (
          <MediaFigure item={artItem} reserveAspect />
        ) : (
          <View
            style={{
              width: '100%',
              aspectRatio: 1,
              backgroundColor: colors.accent,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon glyph="♪" size="3xl" color="onAccent" />
          </View>
        )}
      </View>

      {/* Centred title + artist. */}
      <View style={{ gap: tokens.spacing.xs, alignItems: 'center', paddingHorizontal: tokens.spacing.lg }}>
        <Text
          numberOfLines={2}
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale['2xl'],
            fontWeight: '800',
            textAlign: 'center',
          }}
        >
          {track.title}
        </Text>
        {track.artist ? (
          <Text
            numberOfLines={1}
            style={{ color: colors.muted, fontSize: tokens.typography.scale.base, textAlign: 'center' }}
          >
            {track.artist}
          </Text>
        ) : null}
      </View>

      {/* One wide scrubber. */}
      <View style={{ alignSelf: 'stretch', gap: tokens.spacing.xs, paddingHorizontal: tokens.spacing.lg }}>
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

      {/* Lightweight glyph transport. */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing['2xl'],
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Previous"
          disabled={!onPrev}
          onPress={onPrev}
          hitSlop={12}
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
          hitSlop={16}
          style={({ pressed }) => ({ opacity: !onPlayToggle ? 0.5 : pressed ? 0.6 : 1 })}
        >
          <Icon glyph={isBuffering ? '◌' : isPlaying ? '❙❙' : '▶'} size="3xl" color="primary" />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Next"
          disabled={!onNext}
          onPress={onNext}
          hitSlop={12}
          style={({ pressed }) => ({ opacity: !onNext ? 0.4 : pressed ? 0.6 : 1 })}
        >
          <Icon glyph="⏭" size="2xl" color="onSurface" />
        </Pressable>
      </View>

      {onCast ? <CastButton variant="labeled" connected={casting} onPress={onCast} /> : null}
    </View>
  );
}
