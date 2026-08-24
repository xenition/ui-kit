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
import { Card } from '../primitives/Card';
import { Eyebrow } from '../primitives/Eyebrow';
import { GenerativeCover } from '../commerce/GenerativeCover';

export interface EntityCardMedia {
  /** Image URL; when present an `Image` is drawn. */
  imageUrl?: string;
  /** Stable seed for the {@link GenerativeCover} fallback (defaults to the title). */
  seed?: string;
  /** width / height aspect ratio of the media box (default 1.6). */
  aspect?: number;
}

export interface EntityCardProps {
  /** Primary heading. */
  title: string;
  /** Small kicker above the title (category, company, …). */
  eyebrow?: string;
  /** Body copy under the title. */
  description?: string;
  /** Compact trailing detail line (date, price · duration, talk, …). */
  meta?: string;
  /** Media descriptor; an image or a seeded generative cover. Omit for no media. */
  media?: EntityCardMedia;
  /** Corner overlay content (a `StatusDot`, a "Featured" pill, …). */
  badge?: React.ReactNode;
  /** Footer slot (actions, tags, author row, …). */
  footer?: React.ReactNode;
  /** Press handler for the whole card (native equivalent of the web `href`). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A generic content/entity card — the native mirror of the web marketing
 * `EntityCard`, collapsing the templates' bespoke `PostCard` / `ServiceCard` /
 * `SpeakerCard` / `ListingCard` / `ProgramCard` into props. Composes the native
 * `Card` with an inset media frame (an `Image` when `media.imageUrl` is set,
 * else a seeded {@link GenerativeCover}), an optional `Eyebrow`, the `title`
 * heading, an optional `description`, a `meta` line, an optional corner `badge`,
 * and a `footer` slot. `onPress` is native's `href`. Token-only.
 */
export function EntityCard({
  title,
  eyebrow,
  description,
  meta,
  media,
  badge,
  footer,
  onPress,
  style,
}: EntityCardProps): React.ReactElement {
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
        <GenerativeCover
          seed={media.seed ?? title}
          label={title}
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </View>
  ) : null;

  const body = (
    <Card style={[{ gap: tokens.spacing.sm }, style]}>
      {badge ? (
        <View
          testID="xen-entity-badge"
          style={{
            position: 'absolute',
            right: tokens.spacing.md,
            top: tokens.spacing.md,
            zIndex: 10,
          }}
        >
          {badge}
        </View>
      ) : null}
      {mediaBox}
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Text
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale.lg,
          fontWeight: '600',
        }}
      >
        {title}
      </Text>
      {description ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {description}
        </Text>
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
    </Card>
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
