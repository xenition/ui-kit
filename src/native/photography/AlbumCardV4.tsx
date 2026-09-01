import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';
import { withAlpha } from '../primitives/internal/color';
import type { AlbumCardProps } from './AlbumCard';

/** Drop-in for {@link AlbumCardProps} — same props, the V4 "studio" design. */
export type AlbumCardV4Props = AlbumCardProps;

/**
 * AlbumCard — **V4** "studio" design. The matted, image-forward take on an album
 * tile: an elevated card whose cover photo floats inside a thin neutral **mat**,
 * a bold title, and the photo-count as a small soft-primary chip with the date
 * trailing. Honors all three `variant` layouts — `cover` (matted photo on top),
 * `list` (horizontal matted thumbnail), and `compact` (dense) — identical
 * props/behavior to {@link AlbumCardProps}. A private album carries a labelled
 * `Badge` (never color alone). Token-only colors via `useXenitionTheme()`;
 * `loading` shows a token skeleton; `onPress` makes the whole card a button.
 */
export function AlbumCardV4({
  title,
  photoCount,
  dateText,
  coverUrl,
  isPrivate = false,
  variant = 'cover',
  loading = false,
  onPress,
  countLabel = 'photos',
  style,
}: AlbumCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const horizontal = variant === 'list';
  const compact = variant === 'compact';
  const coverHeight = compact ? 96 : 176;

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: horizontal ? 'row' : 'column',
      gap: tokens.spacing.md,
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      padding: tokens.spacing.sm,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading album" style={containerStyle}>
        <View
          style={{
            width: horizontal ? 88 : '100%',
            height: horizontal ? 88 : coverHeight,
            borderRadius: tokens.radius.md,
            backgroundColor: tokens.ramps.neutral[200],
          }}
        />
        <View style={{ flex: 1, gap: tokens.spacing.sm, justifyContent: 'center' }}>
          <View style={{ height: 14, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] }} />
          <View style={{ height: 12, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        </View>
      </View>
    );
  }

  // The matted photo: the cover sits inside a thin inset mat ring.
  const media = (
    <View
      style={{
        width: horizontal ? 88 : '100%',
        height: horizontal ? 88 : coverHeight,
        borderRadius: tokens.radius.md,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: tokens.ramps.neutral[100],
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {coverUrl ? (
        <Image source={{ uri: coverUrl }} accessible accessibilityLabel={title} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
      ) : (
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
          🖼
        </Text>
      )}
    </View>
  );

  const body = (
    <View style={{ flex: 1, gap: tokens.spacing.xs, justifyContent: horizontal ? 'center' : 'flex-start' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <Text numberOfLines={1} style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {title}
        </Text>
        {isPrivate ? (
          <Badge tone="warn" variant="soft" size="sm">
            Private
          </Badge>
        ) : null}
      </View>
      {typeof photoCount === 'number' || dateText ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.sm }}>
          {typeof photoCount === 'number' ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: 2,
                borderRadius: tokens.radius.full,
                backgroundColor: withAlpha(colors.primary, 0.1),
              }}
            >
              <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs }}>
                🖼
              </Text>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                {photoCount} {countLabel}
              </Text>
            </View>
          ) : null}
          {dateText ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {dateText}
            </Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );

  const inner = (
    <>
      {media}
      {body}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${title}${
          typeof photoCount === 'number' ? `, ${photoCount} ${countLabel}` : ''
        }${isPrivate ? ', private' : ''}`}
        onPress={onPress}
        style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{inner}</View>;
}
