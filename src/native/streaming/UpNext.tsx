import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Icon, useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { formatTime } from './types';
import type { MediaTrack } from './types';

export interface UpNextProps {
  /** The next few upcoming tracks, in play order. An empty array renders nothing. */
  tracks: readonly MediaTrack[];
  /** Header label above the queue preview. */
  title?: string;
  /** Called with a track `id` when a row is tapped — jump to that track. */
  onSelect?: (id: string) => void;
  /** When provided, a subtle "Clear" affordance appears in the header. */
  onClear?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * UpNext — **V4** "spotlight" design. A compact "playing next" queue preview: a
 * clean elevated card listing the next few tracks (small artwork thumb +
 * title/artist, with the duration via {@link formatTime}), each row tappable to
 * jump ahead. The header carries the label and an optional Clear affordance. The
 * surface stays clean — the V4 gradient is reserved for the immersive/artwork
 * moments. Presentational only; token-only colors via `useXenitionTheme()`
 * (no literal hex). Dark-mode safe.
 */
export function UpNext({
  tracks,
  title = 'Up next',
  onSelect,
  onClear,
  style,
}: UpNextProps): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  const thumb = 44;

  if (tracks.length === 0) return null;

  return (
    <View
      accessibilityRole="list"
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          padding: tokens.spacing.md,
          gap: tokens.spacing.sm,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      {/* Header: label + optional Clear. */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: tokens.spacing.xs,
        }}
      >
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '700',
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          }}
        >
          {title}
        </Text>
        {onClear ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear up next"
            onPress={onClear}
            hitSlop={8}
            style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
          >
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              Clear
            </Text>
          </Pressable>
        ) : null}
      </View>

      {/* Queue rows. */}
      <View style={{ gap: tokens.spacing.xs }}>
        {tracks.map((track) => {
          const interactive = !!onSelect;
          const label = track.artist ? `${track.title} — ${track.artist}` : track.title;
          return (
            <Pressable
              key={track.id}
              accessibilityRole={interactive ? 'button' : undefined}
              accessibilityLabel={label}
              disabled={!interactive}
              onPress={interactive ? () => onSelect!(track.id) : undefined}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                minHeight: 44,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.xs,
                backgroundColor: interactive && pressed ? withAlpha(colors.primary, 0.12) : 'transparent',
              })}
            >
              {track.artworkUrl ? (
                <Image
                  source={{ uri: track.artworkUrl }}
                  accessibilityIgnoresInvertColors
                  resizeMode="cover"
                  style={{ width: thumb, height: thumb, borderRadius: tokens.radius.sm, backgroundColor: colors.border }}
                />
              ) : (
                <View
                  style={{
                    width: thumb,
                    height: thumb,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: colors.accent,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon glyph="♪" size="sm" color="onPrimary" />
                </View>
              )}

              <View style={{ flex: 1, minWidth: 0 }}>
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

              {track.duration != null ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                  {formatTime(track.duration)}
                </Text>
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
