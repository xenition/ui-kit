import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Icon, Spinner, useXenitionTheme } from '../primitives';
import type { MediaTrack, PlaybackState } from './types';

export type MiniPlayerVariant = 'bar' | 'floating';

export interface MiniPlayerProps {
  /** The track shown in the docked mini bar. */
  track: MediaTrack;
  /** Transport state — drives the play control + a11y label. Default `'paused'`. */
  state?: PlaybackState;
  /** Played fraction in `[0, 1]` for the thin top progress line. */
  progress?: number;
  /**
   * - `bar`      — full-width docked bar with a square edge (default).
   * - `floating` — inset rounded card that hovers above content.
   */
  variant?: MiniPlayerVariant;
  /** Called with the next playing state when the play/pause control is tapped. */
  onPlayToggle?: (next: boolean) => void;
  /** Next-track intent (shows a next control when set). */
  onNext?: () => void;
  /** Called when the body is tapped — expand to the full `NowPlaying`. */
  onPress?: (track: MediaTrack) => void;
  style?: StyleProp<ViewStyle>;
}

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * A docked **mini player** bar — the collapsed now-playing surface that sits
 * above a tab bar. UI shell only: `onPlayToggle(next)` / `onNext` report intent
 * and `onPress` expands to the full player. A thin `primary` progress line rides
 * the top edge. The play control's accessible label reflects `state`.
 * Token-only — no literal hex.
 */
export function MiniPlayer({
  track,
  state = 'paused',
  progress = 0,
  variant = 'bar',
  onPlayToggle,
  onNext,
  onPress,
  style,
}: MiniPlayerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isPlaying = state === 'playing';
  const isBuffering = state === 'buffering';
  const floating = variant === 'floating';
  const frac = clamp01(progress);

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: floating ? tokens.radius.lg : tokens.radius.sm,
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.sm,
        },
        style,
      ]}
    >
      {/* Top progress line. */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: colors.border,
        }}
      >
        <View
          style={{
            height: 2,
            width: `${frac * 100}%`,
            backgroundColor: colors.primary,
          }}
        />
      </View>

      {track.artworkUrl ? (
        <Image
          source={{ uri: track.artworkUrl }}
          accessibilityIgnoresInvertColors
          resizeMode="cover"
          style={{ width: 40, height: 40, borderRadius: tokens.radius.sm, backgroundColor: colors.border }}
        />
      ) : (
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: tokens.radius.sm,
            backgroundColor: colors.accent,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon glyph="♪" size="base" color="onAccent" />
        </View>
      )}

      <View style={{ flex: 1, gap: 1 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
        >
          {track.title}
        </Text>
        {track.artist ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {track.artist}
          </Text>
        ) : null}
      </View>

      {isBuffering ? (
        <View style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}>
          <Spinner size="sm" />
        </View>
      ) : (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
          accessibilityState={{ selected: isPlaying }}
          disabled={!onPlayToggle}
          onPress={onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined}
          hitSlop={8}
          style={({ pressed }) => ({
            width: 36,
            height: 36,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: !onPlayToggle ? 0.5 : pressed ? 0.6 : 1,
          })}
        >
          <Icon glyph={isPlaying ? '❙❙' : '▶'} size="lg" color="primary" />
        </Pressable>
      )}

      {onNext ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Next" onPress={onNext} hitSlop={8}>
          <Icon glyph="⏭" size="lg" color="onSurface" />
        </Pressable>
      ) : null}
    </View>
  );

  if (!onPress) return body;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Now playing: ${track.title}. Expand`}
      onPress={() => onPress(track)}
      style={({ pressed }) => ({ opacity: pressed ? 0.95 : 1 })}
    >
      {body}
    </Pressable>
  );
}
