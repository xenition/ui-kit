import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Icon, Slider, useXenitionTheme } from '../primitives';
import { MediaFigure } from '../media';
import type { MediaItem } from '../media';
import { WaveformScrubber } from './WaveformScrubber';
import { CastButton } from './CastButton';
import { GradientSurface } from './internal/GradientSurface';
import {
  spotlightGradient,
  spotlightInk,
  spotlightInkSoft,
  spotlightTile,
  spotlightBorder,
} from './internal/spotlight';
import { formatTime, clamp01 } from './types';
import type { MediaTrack, PlaybackState } from './types';

/**
 * Props for {@link FullScreenPlayer} — the immersive, full-screen now-playing
 * surface (native). A presentational shell only: it takes shaped track data plus
 * transport callbacks and never touches a playback engine. Position/duration are
 * passed in; seek/toggle intents come back out.
 */
export interface FullScreenPlayerProps {
  /** The track on the deck (title, artist, artwork, optional duration). */
  track: MediaTrack;
  /** Transport state reflected in the play control + its a11y state. */
  state?: PlaybackState;
  /** Current playback position in **seconds**. */
  position?: number;
  /** Total length in **seconds**; falls back to `track.duration`. */
  duration?: number;
  /** Precomputed waveform amplitudes in `[0, 1]`; renders a {@link WaveformScrubber} instead of a linear slider. */
  peaks?: number[];
  /** Fires with the desired play state when the big play/pause control is pressed. */
  onPlayToggle?: (playing: boolean) => void;
  /** Fires with the new position in **seconds** when the scrubber is moved. */
  onSeek?: (seconds: number) => void;
  /** Fires when the previous-track control is pressed. */
  onPrev?: () => void;
  /** Fires when the next-track control is pressed. */
  onNext?: () => void;
  /** Fires when the close/dismiss control is pressed; hidden when unset. */
  onClose?: () => void;
  /** Whether the track is favorited (controlled); tints the favorite tile. */
  favorite?: boolean;
  /** Fires with the desired favorite state when the favorite tile is pressed; hidden when unset. */
  onFavorite?: (favorite: boolean) => void;
  /** Fires when the queue tile is pressed; hidden when unset. */
  onQueue?: () => void;
  /** Fires when the cast tile is pressed; hidden when unset. */
  onCast?: () => void;
  /** Whether a cast target is currently connected (controlled). */
  casting?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * FullScreenPlayer — the **V4 "spotlight"** peak moment (native). The immersive,
 * artwork-forward full-screen now-playing surface: a full brand-gradient ground,
 * a big centered cover in a frosted frame, title/artist in near-white ink, an
 * on-gradient scrubber (linear `Slider`, or a {@link WaveformScrubber} when
 * `peaks` are given), a large near-white round play control framed by prev/next,
 * and secondary glassy tiles (favorite / queue / cast). Token-only colors via
 * `useXenitionTheme()` + `spotlight*(tokens.ramps)` on `GradientSurface` — no
 * literals; dark-mode safe.
 */
export function FullScreenPlayer({
  track,
  state = 'paused',
  position = 0,
  duration,
  peaks,
  onPlayToggle,
  onSeek,
  onPrev,
  onNext,
  onClose,
  favorite,
  onFavorite,
  onQueue,
  onCast,
  casting,
  style,
}: FullScreenPlayerProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = spotlightInk(r);
  const inkSoft = spotlightInkSoft(r);
  const tile = spotlightTile(r);
  const border = spotlightBorder(r);

  const isPlaying = state === 'playing';
  const total = duration ?? track.duration;
  const seekMax = total && total > 0 ? total : 1;
  const frac = clamp01(seekMax > 0 ? position / seekMax : 0);

  const artItem: MediaItem = {
    url: track.artworkUrl ?? '',
    alt: track.album ? `${track.title} — ${track.album}` : track.title,
    width: 1,
    height: 1,
  };

  const glassTile: ViewStyle = {
    height: 44,
    minWidth: 44,
    paddingHorizontal: tokens.spacing.md,
    borderRadius: tokens.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tile,
    borderWidth: 1,
    borderColor: border,
  };

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={spotlightGradient(r)}
        style={{
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.xl,
          gap: tokens.spacing.xl,
          overflow: 'hidden',
        }}
      >
        {/* Top bar: close + now-playing context. */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.md }}>
          {onClose ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close player"
              onPress={onClose}
              hitSlop={8}
              style={({ pressed }) => [glassTile, { width: 44, minWidth: 44, opacity: pressed ? 0.8 : 1 }]}
            >
              <Icon glyph="⌄" size="lg" color="onPrimary" />
            </Pressable>
          ) : (
            <View style={{ width: 44, height: 44 }} />
          )}
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              textAlign: 'center',
              color: inkSoft,
              fontSize: tokens.typography.scale.xs,
              fontWeight: '600',
              letterSpacing: 0.5,
            }}
          >
            {track.album ?? 'Now playing'}
          </Text>
          <View style={{ width: 44, height: 44 }} />
        </View>

        {/* Hero artwork in a frosted frame — the spotlight centerpiece. */}
        <View
          style={{
            alignSelf: 'center',
            width: '80%',
            padding: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            backgroundColor: tile,
            borderWidth: 1,
            borderColor: border,
            overflow: 'hidden',
          }}
        >
          {track.artworkUrl ? (
            <View style={{ width: '100%', borderRadius: tokens.radius.md, overflow: 'hidden' }}>
              <MediaFigure item={artItem} reserveAspect />
            </View>
          ) : (
            <View style={{ width: '100%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: ink, fontSize: tokens.typography.scale['3xl'] }}>♪</Text>
            </View>
          )}
        </View>

        {/* Title + artist. */}
        <View style={{ gap: tokens.spacing.xs, alignItems: 'center' }}>
          <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.xl * 1.15, fontWeight: '800' }}>
            {track.title}
          </Text>
          {track.artist ? (
            <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.base }}>
              {track.artist}
            </Text>
          ) : null}
        </View>

        {/* Scrubber + time labels on the gradient. */}
        <View style={{ gap: tokens.spacing.xs }}>
          {peaks ? (
            <WaveformScrubber peaks={peaks} progress={frac} onSeek={onSeek ? (f) => onSeek(f * seekMax) : undefined} />
          ) : (
            <View style={{ backgroundColor: tile, borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.xs }}>
              <Slider value={Math.min(position, seekMax)} min={0} max={seekMax} onValueChange={onSeek} />
            </View>
          )}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>{formatTime(position)}</Text>
            <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>{formatTime(total)}</Text>
          </View>
        </View>

        {/* Transport: prev · big play · next. */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xl }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Previous"
            disabled={!onPrev}
            onPress={onPrev}
            hitSlop={10}
            style={({ pressed }) => ({ opacity: !onPrev ? 0.4 : pressed ? 0.6 : 1 })}
          >
            <Icon glyph="⏮" size="2xl" color="onPrimary" />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
            accessibilityState={{ selected: isPlaying }}
            disabled={!onPlayToggle}
            onPress={onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined}
            hitSlop={12}
            style={({ pressed }) => ({
              width: 76,
              height: 76,
              borderRadius: tokens.radius.full,
              backgroundColor: ink,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: !onPlayToggle ? 0.5 : pressed ? 0.85 : 1,
            })}
          >
            <Icon glyph={isPlaying ? '❙❙' : '▶'} size="2xl" color="primary" />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Next"
            disabled={!onNext}
            onPress={onNext}
            hitSlop={10}
            style={({ pressed }) => ({ opacity: !onNext ? 0.4 : pressed ? 0.6 : 1 })}
          >
            <Icon glyph="⏭" size="2xl" color="onPrimary" />
          </Pressable>
        </View>

        {/* Secondary glassy controls: favorite · queue · cast. */}
        {onFavorite || onQueue || onCast ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.md }}>
            {onFavorite ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={favorite ? 'Remove from favorites' : 'Add to favorites'}
                accessibilityState={{ selected: !!favorite }}
                onPress={() => onFavorite(!favorite)}
                hitSlop={8}
                style={({ pressed }) => [
                  glassTile,
                  { backgroundColor: favorite ? spotlightTile(r, 0.3) : tile, opacity: pressed ? 0.8 : 1 },
                ]}
              >
                <Icon glyph={favorite ? '♥' : '♡'} size="lg" color="onPrimary" />
              </Pressable>
            ) : null}
            {onQueue ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Open queue"
                onPress={onQueue}
                hitSlop={8}
                style={({ pressed }) => [glassTile, { opacity: pressed ? 0.8 : 1 }]}
              >
                <Icon glyph="☰" size="lg" color="onPrimary" />
              </Pressable>
            ) : null}
            {onCast ? (
              <View style={glassTile}>
                <CastButton connected={casting} onPress={onCast} />
              </View>
            ) : null}
          </View>
        ) : null}
      </GradientSurface>
    </View>
  );
}
