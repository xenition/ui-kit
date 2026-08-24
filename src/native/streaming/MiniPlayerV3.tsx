import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Icon, Spinner, useXenitionTheme } from '../primitives';
import type { MiniPlayerProps } from './MiniPlayer';

/** Drop-in for {@link MiniPlayerProps} — a genuinely different design, same props. */
export type MiniPlayerV3Props = MiniPlayerProps;

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * **MiniPlayer — design V3 (flat dock).** A square-cornered, shadowless bar
 * that reads as part of the chrome: a single hairline divider on top, a
 * square-cropped thumbnail, text, transport, and a full-bleed progress line
 * pinned to the very bottom edge. The play control's accessible label reflects
 * `state`. Same `MiniPlayerProps`; token-pure; a11y-complete.
 */
export function MiniPlayerV3({
  track,
  state = 'paused',
  progress = 0,
  onPlayToggle,
  onNext,
  onPress,
  style,
}: MiniPlayerV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isPlaying = state === 'playing';
  const isBuffering = state === 'buffering';
  const frac = clamp01(progress);

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
        },
        style,
      ]}
    >
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
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Next"
          onPress={onNext}
          hitSlop={8}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <Icon glyph="⏭" size="lg" color="onSurface" />
        </Pressable>
      ) : null}

      {/* Full-bleed progress line pinned to the bottom edge. */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, backgroundColor: colors.border }}>
        <View style={{ height: 2, width: `${frac * 100}%`, backgroundColor: colors.primary }} />
      </View>
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
