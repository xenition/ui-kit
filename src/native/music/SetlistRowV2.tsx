import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { Badge, Icon, useXenitionTheme } from '../primitives';
import { usePressScale } from '../primitives/internal/motion';
import { shadow } from '../primitives/internal/elevation';
import { formatBpm, formatDuration, withAlpha } from './types';
import type { SetlistRowProps } from './SetlistRow';

/** Same public contract as {@link SetlistRow} — a drop-in alternate design. */
export type SetlistRowV2Props = SetlistRowProps;

/**
 * SetlistRow, redesigned (v2): an **elevated card** with an artwork tile (a
 * token-tinted square carrying the song's initial, or a ♪ for an empty slot), a
 * title / artist block, a duration `Badge`, and a drag handle. `playing` lights
 * the card with a marker + weight (never color alone) and springs on press. An
 * empty slot renders the same card, dashed and dimmed. Tapping fires `onPress`;
 * the optional play button fires `onPlay`. Meta is guarded. Token-only styling.
 * Distinct at a glance from v1's flat line. Same props.
 */
export function SetlistRowV2({
  song,
  index,
  playing = false,
  variant = 'full',
  emptyLabel = 'Empty slot',
  onPress,
  onPlay,
  style,
}: SetlistRowV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale(0.98);
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
            gap: tokens.spacing.md,
            padding: tokens.spacing.sm,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: colors.border,
            backgroundColor: colors.surface,
            opacity: 0.6,
          },
          style,
        ]}
      >
        <View
          style={{
            width: 48,
            height: 48,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(colors.onSurface, 0.06),
          }}
        >
          <Icon glyph="♪" size="lg" color="muted" />
        </View>
        <Text style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm, fontStyle: 'italic' }}>
          {emptyLabel}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{pos}</Text>
      </View>
    );
  }

  const initial = song.title.trim().charAt(0).toUpperCase() || '♪';
  const meta: string[] = [];
  if (song.key) meta.push(song.key);
  if (song.bpm != null) meta.push(`${formatBpm(song.bpm)} BPM`);

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          padding: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          borderWidth: playing ? 1.5 : 0,
          borderColor: playing ? colors.primary : 'transparent',
          backgroundColor: colors.surface,
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      {/* Artwork tile (derived initial — SetlistSong carries no image). */}
      <View
        style={{
          width: 48,
          height: 48,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: tokens.radius.md,
          backgroundColor: withAlpha(colors.primary, playing ? 0.24 : 0.12),
        }}
      >
        {playing ? (
          <Icon glyph="♪" size="lg" color="primary" accessibilityLabel="Now playing" />
        ) : (
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
            {initial}
          </Text>
        )}
      </View>

      <View style={{ flex: 1, gap: 3 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: playing ? '800' : '700' }}
        >
          {song.title}
        </Text>
        {variant === 'full' && (song.artist || meta.length > 0) ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {[song.artist, ...meta].filter(Boolean).join('  ·  ')}
          </Text>
        ) : null}
      </View>

      {song.durationSec != null ? (
        <Badge tone="neutral" variant="soft" size="sm">
          {formatDuration(song.durationSec)}
        </Badge>
      ) : null}

      {onPlay ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={playing ? `Pause ${song.title}` : `Play ${song.title}`}
          accessibilityState={{ selected: playing }}
          onPress={() => onPlay(song)}
          style={({ pressed }) => ({
            width: 36,
            height: 36,
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

      {/* Decorative drag handle — hidden from a11y (not an action here). */}
      <View importantForAccessibility="no" accessibilityElementsHidden style={{ paddingLeft: 2 }}>
        <Icon glyph="⋮⋮" size="base" color="muted" />
      </View>
    </View>
  );

  if (!onPress) return body;
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Position ${pos}, ${song.title}${song.artist ? `, ${song.artist}` : ''}${playing ? ', playing' : ''}`}
        accessibilityState={{ selected: playing }}
        onPress={() => onPress(song)}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.95 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
