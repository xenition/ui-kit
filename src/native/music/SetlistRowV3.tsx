import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon, useXenitionTheme } from '../primitives';
import { formatDuration, withAlpha } from './types';
import type { SetlistRowProps } from './SetlistRow';

/** Same public contract as {@link SetlistRow} — a drop-in alternate design. */
export type SetlistRowV3Props = SetlistRowProps;

/**
 * SetlistRow, redesigned (v3): a **dense numbered playlist line** — a fixed
 * position number, the title with an inline muted artist, and a right-aligned
 * duration, all on one tight row with no card chrome. `playing` swaps the
 * number for a ♪ marker and bolds the title (never color alone). An empty slot
 * dims to a placeholder line. Tapping fires `onPress`; the optional play button
 * fires `onPlay`. Token-only styling. Distinct at a glance from v1. Same props.
 */
export function SetlistRowV3({
  song,
  index,
  playing = false,
  variant = 'full',
  emptyLabel = 'Empty slot',
  onPress,
  onPlay,
  style,
}: SetlistRowV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const pos = index != null && Number.isFinite(index) ? String(Math.trunc(index)) : '–';

  if (song == null) {
    return (
      <View
        accessibilityRole="text"
        accessibilityLabel={`Position ${pos}, ${emptyLabel}`}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            paddingVertical: 6,
            paddingHorizontal: tokens.spacing.xs,
            opacity: 0.5,
          },
          style,
        ]}
      >
        <Text style={{ width: 22, textAlign: 'center', color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {pos}
        </Text>
        <Text style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm, fontStyle: 'italic' }}>
          {emptyLabel}
        </Text>
      </View>
    );
  }

  const showArtist = variant === 'full' && !!song.artist;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Position ${pos}, ${song.title}${song.artist ? `, ${song.artist}` : ''}${playing ? ', playing' : ''}`}
      accessibilityState={{ selected: playing }}
      disabled={!onPress}
      onPress={() => onPress?.(song)}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: 6,
          paddingHorizontal: tokens.spacing.xs,
          borderRadius: tokens.radius.sm,
          backgroundColor: playing
            ? withAlpha(colors.primary, 0.1)
            : pressed
              ? withAlpha(colors.onSurface, 0.04)
              : 'transparent',
        },
        style,
      ]}
    >
      <View style={{ width: 22, alignItems: 'center' }}>
        {playing ? (
          <Icon glyph="♪" size="sm" color="primary" accessibilityLabel="Now playing" />
        ) : (
          <Text
            style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700', fontVariant: ['tabular-nums'] }}
          >
            {pos}
          </Text>
        )}
      </View>
      <Text
        numberOfLines={1}
        style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: playing ? '800' : '600' }}
      >
        {song.title}
        {showArtist ? (
          <Text style={{ color: colors.muted, fontWeight: '400' }}>{`  ${song.artist}`}</Text>
        ) : null}
      </Text>
      {song.durationSec != null ? (
        <Text
          style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600', fontVariant: ['tabular-nums'] }}
        >
          {formatDuration(song.durationSec)}
        </Text>
      ) : null}
      {onPlay ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={playing ? `Pause ${song.title}` : `Play ${song.title}`}
          accessibilityState={{ selected: playing }}
          onPress={() => onPlay(song)}
          style={({ pressed }) => ({ paddingHorizontal: 4, opacity: pressed ? 0.7 : 1 })}
        >
          <Icon glyph={playing ? '⏸' : '▶'} size="sm" color="primary" />
        </Pressable>
      ) : null}
    </Pressable>
  );
}
