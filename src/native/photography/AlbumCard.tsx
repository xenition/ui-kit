import * as React from 'react';
import {
  Image,
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';

/** Layout variants for an album card. */
export type AlbumCardVariant = 'cover' | 'list' | 'compact';

export interface AlbumCardProps {
  /** Album title. */
  title: string;
  /** Number of photos in the album. */
  photoCount?: number;
  /** Short date / event line (e.g. "Aug 24, 2026"). */
  dateText?: string;
  /** Cover photo URL. When absent a token-tinted placeholder is drawn. */
  coverUrl?: string;
  /** Marks the album as private / unlisted (labelled, not color-alone). */
  isPrivate?: boolean;
  /** Layout variant (default `cover`). */
  variant?: AlbumCardVariant;
  /** Loading placeholder — token-only skeleton, no content. */
  loading?: boolean;
  /** Press handler for the whole card. */
  onPress?: () => void;
  /** Word for "photos" in the count line (default `photos`). */
  countLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A photo-album tile — cover image, title, photo count, and an optional date.
 * `variant` switches a full-bleed `cover` card, a horizontal `list` row, and a
 * dense `compact` tile. A private album shows a labelled `Badge` (never color
 * alone). Reuses the `Badge` primitive; `onPress` makes the whole card a
 * `button`. Token-only — cover placeholder and surfaces trace to theme tokens.
 */
export function AlbumCard({
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
}: AlbumCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const horizontal = variant === 'list';
  const coverHeight = variant === 'compact' ? 96 : 160;

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: horizontal ? 'row' : 'column',
      gap: tokens.spacing.md,
      overflow: 'hidden',
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      padding: horizontal ? tokens.spacing.md : 0,
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
        <View style={{ flex: 1, gap: tokens.spacing.sm, padding: horizontal ? 0 : tokens.spacing.md }}>
          <View style={{ height: 14, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] }} />
          <View style={{ height: 12, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        </View>
      </View>
    );
  }

  const media = (
    <View
      style={{
        width: horizontal ? 88 : '100%',
        height: horizontal ? 88 : coverHeight,
        borderRadius: tokens.radius.md,
        overflow: 'hidden',
        backgroundColor: tokens.ramps.neutral[100],
      }}
    >
      {coverUrl ? (
        <Image
          source={{ uri: coverUrl }}
          accessible
          accessibilityLabel={title}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        />
      ) : null}
    </View>
  );

  const metaBits: string[] = [];
  if (typeof photoCount === 'number') metaBits.push(`${photoCount} ${countLabel}`);
  if (dateText) metaBits.push(dateText);

  const body = (
    <View style={{ flex: 1, gap: tokens.spacing.xs, padding: horizontal ? 0 : tokens.spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <Text
          numberOfLines={1}
          style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {title}
        </Text>
        {isPrivate ? (
          <Badge tone="warn" variant="soft" size="sm">
            Private
          </Badge>
        ) : null}
      </View>
      {metaBits.length > 0 ? (
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {metaBits.join(' · ')}
        </Text>
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
