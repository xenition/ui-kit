import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Icon, useXenitionTheme } from '../primitives';
import { formatBpm, formatDuration, withAlpha } from './types';
import type { SetlistRowProps } from './SetlistRow';

/** Drop-in for {@link SetlistRowProps} — same props, the V4 "session" design. */
export type SetlistRowV4Props = SetlistRowProps;

/**
 * SetlistRow — **V4** "session" design. The tactile DAW take on a setlist row: a
 * rounded control surface where the playing row lights with a soft-primary fill,
 * a primary border, a leading `♪` marker and a left accent bar (never color
 * alone), the title reads bold, and the key/BPM/duration meta sits on one line.
 * Honors both `variant`s (`full` / `compact`) and the empty-slot state, identical
 * props/behavior to {@link SetlistRowProps}. The optional play button is a
 * satisfying ≥44px round control. Token-only colors via `useXenitionTheme()`.
 */
export function SetlistRowV4({
  song,
  index,
  playing = false,
  variant = 'full',
  emptyLabel = 'Empty slot',
  onPress,
  onPlay,
  style,
}: SetlistRowV4Props): React.ReactElement {
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
            padding: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: colors.border,
            opacity: 0.55,
          },
          style,
        ]}
      >
        <Text style={{ width: 20, color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{pos}</Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontStyle: 'italic' }}>{emptyLabel}</Text>
      </View>
    );
  }

  const meta: string[] = [];
  if (song.key) meta.push(song.key);
  if (song.bpm != null) meta.push(`${formatBpm(song.bpm)} BPM`);
  if (song.durationSec != null) meta.push(formatDuration(song.durationSec));

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, style]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Position ${pos}, ${song.title}${song.artist ? `, ${song.artist}` : ''}${playing ? ', playing' : ''}`}
        accessibilityState={{ selected: playing }}
        disabled={!onPress}
        onPress={() => onPress?.(song)}
        style={({ pressed }) => ({
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingRight: tokens.spacing.sm,
          paddingLeft: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          overflow: 'hidden',
          borderColor: playing ? colors.primary : colors.border,
          backgroundColor: playing ? withAlpha(colors.primary, 0.12) : pressed ? withAlpha(colors.onSurface, 0.04) : colors.surface,
        })}
      >
        {/* Tactile left accent bar marks the playing row. */}
        {playing ? (
          <View style={{ position: 'absolute', left: 0, top: 4, bottom: 4, width: 4, borderRadius: tokens.radius.full, backgroundColor: colors.primary }} />
        ) : null}
        <View style={{ width: 20, alignItems: 'center' }}>
          {playing ? (
            <Icon glyph="♪" size="sm" color="primary" accessibilityLabel="Now playing" />
          ) : (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{pos}</Text>
          )}
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: playing ? '700' : '600' }}>
            {song.title}
          </Text>
          {variant === 'full' && (song.artist || meta.length > 0) ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {[song.artist, ...meta].filter(Boolean).join('  ·  ')}
            </Text>
          ) : null}
        </View>
      </Pressable>
      {onPlay ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={playing ? `Pause ${song.title}` : `Play ${song.title}`}
          accessibilityState={{ selected: playing }}
          onPress={() => onPlay(song)}
          style={({ pressed }) => ({
            width: 44,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            backgroundColor: playing ? colors.primary : withAlpha(colors.primary, 0.16),
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Icon glyph={playing ? '⏸' : '▶'} size="sm" color={playing ? 'onPrimary' : 'primary'} />
        </Pressable>
      ) : null}
    </View>
  );
}
