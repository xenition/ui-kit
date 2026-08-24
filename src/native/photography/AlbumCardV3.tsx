import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import type { AlbumCardProps } from './AlbumCard';

/** Drop-in alternate of {@link AlbumCardProps} — identical prop contract. */
export type AlbumCardV3Props = AlbumCardProps;

/** Square cover thumb edge for the row layout. */
const THUMB = 72;

/**
 * AlbumCard — design variant **V3**: a **horizontal cover-left row**. A compact
 * square cover sits flush on the left with the title, count and date stacked in
 * a right column and a chevron affordance trailing when tappable — a tight list
 * row rather than a card, so it packs densely in a scrolling album list. Private
 * albums keep the labelled `Badge`. Same props as {@link AlbumCardProps};
 * token-only, guarded, with a loading skeleton.
 */
export function AlbumCardV3({
  title,
  photoCount,
  dateText,
  coverUrl,
  isPrivate = false,
  loading = false,
  onPress,
  countLabel = 'photos',
  style,
}: AlbumCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.sm,
      borderRadius: tokens.radius.md,
      backgroundColor: colors.surface,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading album" style={containerStyle}>
        <View
          style={{
            width: THUMB,
            height: THUMB,
            borderRadius: tokens.radius.sm,
            backgroundColor: tokens.ramps.neutral[200],
          }}
        />
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <View style={{ height: 13, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] }} />
          <View style={{ height: 11, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        </View>
      </View>
    );
  }

  const metaBits: string[] = [];
  if (typeof photoCount === 'number') metaBits.push(`${photoCount} ${countLabel}`);
  if (dateText) metaBits.push(dateText);

  const inner = (
    <>
      <View
        style={{
          width: THUMB,
          height: THUMB,
          borderRadius: tokens.radius.sm,
          overflow: 'hidden',
          backgroundColor: tokens.ramps.neutral[100],
        }}
      >
        {coverUrl ? (
          <Image
            source={{ uri: coverUrl }}
            accessible={!onPress}
            accessibilityLabel={onPress ? undefined : title}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
          />
        ) : null}
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Text
            numberOfLines={1}
            style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
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

      {onPress ? <Icon glyph="›" size="lg" color="muted" /> : null}
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
