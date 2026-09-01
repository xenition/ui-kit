import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Eyebrow } from '../primitives/Eyebrow';
import { withAlpha } from '../primitives/internal/color';
import { GenerativeCover } from '../commerce/GenerativeCover';
import type { EntityCardProps } from './EntityCard';

/** Drop-in for {@link EntityCardProps} — same props, the V4 "showcase" design. */
export type EntityCardV4Props = EntityCardProps;

/**
 * EntityCard — **V4** "showcase" design (native mirror of the web V4). The
 * generic content/entity card re-skinned as an image-forward showcase card: a
 * floating rounded media frame (an `Image` when `media.imageUrl` is set, else a
 * seeded {@link GenerativeCover}; a soft-primary well with a glyph when no media
 * is given at all), the `eyebrow` as a soft-primary chip, a bold tight-tracked
 * `title`, muted `description`, an emphasized `meta` line, a corner `badge`, and
 * a `footer` slot — all on a clean elevated card (`colors.card` + border + soft
 * shadow; NO gradient). `onPress` is native's `href` (wraps the whole card in a
 * Pressable). Honors every base prop; token-only colors, no literals.
 */
export function EntityCardV4({
  title,
  eyebrow,
  description,
  meta,
  media,
  badge,
  footer,
  onPress,
  style,
}: EntityCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const mediaBox = media ? (
    <View
      style={{
        aspectRatio: media.aspect ?? 1.6,
        width: '100%',
        overflow: 'hidden',
        borderRadius: tokens.radius.md,
        backgroundColor: tokens.ramps.neutral[100],
      }}
    >
      {media.imageUrl ? (
        <Image
          source={{ uri: media.imageUrl }}
          accessible
          accessibilityLabel={title}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <GenerativeCover seed={media.seed ?? title} label={title} style={{ width: '100%', height: '100%' }} />
      )}
    </View>
  ) : (
    // No media descriptor at all — a soft-primary well with a glyph.
    <View
      style={{
        aspectRatio: 1.6,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: tokens.radius.md,
        backgroundColor: withAlpha(colors.primary, 0.08),
      }}
    >
      <View style={{ height: 28, width: 28, borderRadius: 6, borderWidth: 2, borderColor: colors.primary }} />
    </View>
  );

  const body = (
    <View
      style={[
        {
          gap: tokens.spacing.sm,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.06,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 2,
        },
        style,
      ]}
    >
      {badge ? (
        <View
          testID="xen-entity-badge"
          style={{ position: 'absolute', right: tokens.spacing.md, top: tokens.spacing.md, zIndex: 10 }}
        >
          {badge}
        </View>
      ) : null}
      {mediaBox}
      {eyebrow ? (
        <View
          style={{
            alignSelf: 'flex-start',
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.primary, 0.1),
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: 2,
          }}
        >
          <Eyebrow>{eyebrow}</Eyebrow>
        </View>
      ) : null}
      <Text
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale.lg,
          fontWeight: '800',
          letterSpacing: -0.3,
        }}
      >
        {title}
      </Text>
      {description ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{description}</Text>
      ) : null}
      {meta ? (
        <Text
          testID="xen-entity-meta"
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '500' }}
        >
          {meta}
        </Text>
      ) : null}
      {footer ? <View style={{ marginTop: tokens.spacing.xs }}>{footer}</View> : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={onPress}
        style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
      >
        {body}
      </Pressable>
    );
  }

  return body;
}
