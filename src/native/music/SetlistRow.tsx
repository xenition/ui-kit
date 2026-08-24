import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Icon, useXenitionTheme } from '../primitives';
import { formatBpm, formatDuration, withAlpha, type SetlistSong } from './types';

export type SetlistRowVariant = 'full' | 'compact';

export interface SetlistRowProps {
  /** The song for this row; omit to render an empty / unfilled slot. */
  song?: SetlistSong;
  /** 1-based position shown at the left. */
  index?: number;
  /** Whether this song is currently playing (lit + non-color affordance). */
  playing?: boolean;
  /**
   * - `full` — title, artist, and a key/BPM/duration meta row (default).
   * - `compact` — single line.
   */
  variant?: SetlistRowVariant;
  /** Label for an empty slot (no song). */
  emptyLabel?: string;
  /** Fires with the song when the row is tapped. */
  onPress?: (song: SetlistSong) => void;
  /** When set, shows a play button that fires with the song. */
  onPlay?: (song: SetlistSong) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A setlist row — one song in a performance / practice list, a UI shell only.
 * With a `song` it shows position, title, artist and a key/BPM/duration meta
 * line; with no `song` it renders a dimmed empty slot (so a fixed-length
 * setlist can show gaps). `playing` lights the row via a marker + weight, not
 * color alone. Tapping fires `onPress`; the optional play button fires
 * `onPlay`. Meta is guarded against missing fields. Token-only styling.
 */
export function SetlistRow({
  song,
  index,
  playing = false,
  variant = 'full',
  emptyLabel = 'Empty slot',
  onPress,
  onPlay,
  style,
}: SetlistRowProps): React.ReactElement {
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
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: colors.border,
            opacity: 0.55,
          },
          style,
        ]}
      >
        <Text style={{ width: 20, color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {pos}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontStyle: 'italic' }}>
          {emptyLabel}
        </Text>
      </View>
    );
  }

  const meta: string[] = [];
  if (song.key) meta.push(song.key);
  if (song.bpm != null) meta.push(`${formatBpm(song.bpm)} BPM`);
  if (song.durationSec != null) meta.push(formatDuration(song.durationSec));

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
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: playing ? colors.primary : colors.border,
          backgroundColor: playing ? withAlpha(colors.primary, 0.12) : pressed ? withAlpha(colors.onSurface, 0.04) : colors.surface,
        },
        style,
      ]}
    >
      <View style={{ width: 20, alignItems: 'center' }}>
        {playing ? (
          <Icon glyph="♪" size="sm" color="primary" accessibilityLabel="Now playing" />
        ) : (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{pos}</Text>
        )}
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: playing ? '700' : '600' }}
        >
          {song.title}
        </Text>
        {variant === 'full' && (song.artist || meta.length > 0) ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {[song.artist, ...meta].filter(Boolean).join('  ·  ')}
          </Text>
        ) : null}
      </View>
      {onPlay ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={playing ? `Pause ${song.title}` : `Play ${song.title}`}
          accessibilityState={{ selected: playing }}
          onPress={() => onPlay(song)}
          style={({ pressed }) => ({
            width: 34,
            height: 34,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.primary, playing ? 0.28 : 0.16),
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Icon glyph={playing ? '⏸' : '▶'} size="sm" color="primary" />
        </Pressable>
      ) : null}
    </Pressable>
  );
}
