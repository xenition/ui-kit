import * as React from 'react';
import { Animated, Image, Pressable, Text, View } from 'react-native';
import { Icon, Spinner, useXenitionTheme } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale } from '../primitives/internal/motion';
import type { MiniPlayerProps } from './MiniPlayer';

/** Drop-in for {@link MiniPlayerProps} — a genuinely different design, same props. */
export type MiniPlayerV2Props = MiniPlayerProps;

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * **MiniPlayer — design V2 (floating pill).** A rounded, heavily-elevated bar
 * that hovers above content, with a rounded top progress line tucked inside the
 * radius and a subtle press-scale on the whole surface. The play control's
 * accessible label reflects `state`. Same `MiniPlayerProps`; token-pure;
 * a11y-complete.
 */
export function MiniPlayerV2({
  track,
  state = 'paused',
  progress = 0,
  onPlayToggle,
  onNext,
  onPress,
  style,
}: MiniPlayerV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isPlaying = state === 'playing';
  const isBuffering = state === 'buffering';
  const frac = clamp01(progress);
  const press = usePressScale(0.98);

  const body = (
    <Animated.View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          backgroundColor: colors.surface,
          borderRadius: tokens.radius.full,
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.sm,
          overflow: 'hidden',
          transform: [{ scale: press.scale }],
          ...shadow('lg', tokens),
        },
        style,
      ]}
    >
      {/* Rounded top progress line, clipped inside the pill radius. */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, backgroundColor: colors.border }}>
        <View style={{ height: 3, width: `${frac * 100}%`, backgroundColor: colors.primary }} />
      </View>

      {track.artworkUrl ? (
        <Image
          source={{ uri: track.artworkUrl }}
          accessibilityIgnoresInvertColors
          resizeMode="cover"
          style={{ width: 44, height: 44, borderRadius: tokens.radius.full, backgroundColor: colors.border }}
        />
      ) : (
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.full,
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
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}
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
        <View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
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
            width: 40,
            height: 40,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: !onPlayToggle ? 0.5 : pressed ? 0.7 : 1,
          })}
        >
          <Icon glyph={isPlaying ? '❙❙' : '▶'} size="base" color="onPrimary" />
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
    </Animated.View>
  );

  if (!onPress) return body;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Now playing: ${track.title}. Expand`}
      onPress={() => onPress(track)}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
    >
      {body}
    </Pressable>
  );
}
