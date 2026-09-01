import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { EmptyState, Icon, useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { formatTime } from './types';
import type { QueueListProps } from './QueueList';

/** Drop-in for {@link QueueListProps} — same props, the V4 "spotlight" design. */
export type QueueListV4Props = QueueListProps;

/**
 * QueueList — **V4** "spotlight" design. An ordered now/next queue of calm surface
 * rows: each row is a small rounded artwork plus title/artist, with a trailing
 * duration and a per-row remove affordance. The row matching `nowPlayingId` gets
 * a soft-`primary` tint and a leading **primary** now-playing glyph (the one
 * accent), announced via `accessibilityState.selected`. Rows are clean surface
 * (no gradient — that is reserved for the artwork-hero moments); tap targets are
 * ≥44px. When `tracks` is empty it renders an `EmptyState`. Same props/behavior
 * as {@link QueueListProps}; token-only colors via `useXenitionTheme()`.
 */
export function QueueListV4({
  tracks,
  nowPlayingId,
  state = 'paused',
  title = 'Up Next',
  rowVariant: _rowVariant = 'standard',
  onSelect,
  onRemove,
  emptyLabel = 'Your queue is empty',
  style,
}: QueueListV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (tracks.length === 0) {
    return (
      <View style={[{ gap: tokens.spacing.sm }, style]}>
        <EmptyState
          icon={<Icon glyph="🎵" size="2xl" color="muted" accessibilityLabel="Queue" />}
          title={emptyLabel}
          description="Add songs to build up your queue."
        />
      </View>
    );
  }

  const tint = withAlpha(colors.primary, 0.1);

  return (
    <View style={[{ gap: tokens.spacing.xs }, style]}>
      {title ? (
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '700',
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            paddingHorizontal: tokens.spacing.sm,
            marginBottom: tokens.spacing.xs,
          }}
        >
          {title}
        </Text>
      ) : null}
      {tracks.map((track, index) => {
        const active = nowPlayingId != null && track.id === nowPlayingId;
        const isPlaying = active && state === 'playing';

        const lead = (
          <View style={{ width: 44, height: 44 }}>
            {track.artworkUrl ? (
              <Image
                source={{ uri: track.artworkUrl }}
                accessibilityIgnoresInvertColors
                resizeMode="cover"
                style={{ width: 44, height: 44, borderRadius: tokens.radius.sm, backgroundColor: colors.border }}
              />
            ) : (
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: tokens.radius.sm,
                  backgroundColor: colors.accent,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon glyph="♪" size="base" color="onAccent" />
              </View>
            )}
            {active ? (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: tokens.radius.sm,
                  backgroundColor: withAlpha(colors.primary, 0.14),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon glyph={isPlaying ? '❙❙' : '▶'} size="base" color="primary" />
              </View>
            ) : null}
          </View>
        );

        const row = (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.md,
              minHeight: 44,
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.sm,
              borderRadius: tokens.radius.md,
              backgroundColor: active ? tint : 'transparent',
            }}
          >
            {lead}

            <View style={{ flex: 1, gap: 1 }}>
              <Text
                numberOfLines={1}
                style={{
                  color: active ? colors.primary : colors.onSurface,
                  fontSize: tokens.typography.scale.base,
                  fontWeight: active ? '700' : '600',
                }}
              >
                {track.title}
              </Text>
              {track.artist ? (
                <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                  {track.artist}
                </Text>
              ) : null}
            </View>

            {track.duration != null ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {formatTime(track.duration)}
              </Text>
            ) : null}

            {onRemove ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Remove ${track.title}`}
                onPress={() => onRemove(track, index)}
                hitSlop={8}
                style={({ pressed }) => ({
                  width: 44,
                  height: 44,
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: pressed ? 0.6 : 1,
                })}
              >
                <Icon glyph="⋯" size="lg" color="muted" />
              </Pressable>
            ) : null}
          </View>
        );

        if (!onSelect) return <View key={track.id}>{row}</View>;
        return (
          <Pressable
            key={track.id}
            accessibilityRole="button"
            accessibilityLabel={track.title}
            accessibilityState={{ selected: active }}
            onPress={() => onSelect(track, index)}
            style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
          >
            {row}
          </Pressable>
        );
      })}
    </View>
  );
}
