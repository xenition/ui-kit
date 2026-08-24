import * as React from 'react';
import { Animated, Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import { MentionText } from './MentionText';
import { EngagementBar } from './EngagementBar';

export type PostVariant = 'text' | 'image' | 'link' | 'video';

export interface PostAuthor {
  name: string;
  /** @handle without the `@`. */
  handle?: string;
  avatarUrl?: string;
  verified?: boolean;
}

export interface PostLink {
  url: string;
  title?: string;
  description?: string;
  /** Domain shown as the source line (e.g. `nytimes.com`). */
  domain?: string;
  imageUrl?: string;
}

export interface PostVideo {
  thumbnailUrl?: string;
  /** Duration overlay (e.g. `1:24`). */
  duration?: string;
}

export interface PostCardProps {
  /** Media kind. `text` (no media), `image`, `link` preview, or `video`. */
  variant?: PostVariant;
  author: PostAuthor;
  /** Relative timestamp (e.g. `3h`). */
  timestamp?: string;
  /** Post body — `@mentions`/`#hashtags` are highlighted + tappable. */
  text?: string;
  /** `image` variant source. */
  imageUrl?: string;
  imageAlt?: string;
  /** `link` variant preview data. */
  link?: PostLink;
  /** `video` variant data. */
  video?: PostVideo;

  // ── engagement (footer) ──
  showEngagement?: boolean;
  likeCount?: number;
  commentCount?: number;
  shareCount?: number;
  liked?: boolean;
  bookmarked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;

  // ── navigation ──
  onPress?: () => void;
  onPressAuthor?: () => void;
  onPressMenu?: () => void;
  onPressMention?: (handle: string) => void;
  onPressHashtag?: (tag: string) => void;

  /** Skeleton placeholder while the post loads. */
  loading?: boolean;
  /**
   * Surface treatment for the card container — fill/border/elevation only;
   * radius/padding are unchanged. Default `'classic'` (the historical look).
   */
  appearance?: Appearance;
  /**
   * Layout density. `comfortable` (default) is the historical padding/gap;
   * `compact` tightens both for denser feeds.
   */
  density?: 'comfortable' | 'compact';
  style?: StyleProp<ViewStyle>;
}

/**
 * The feed post — one component, four media variants (`text` / `image` /
 * `link` / `video`) sharing an author header, a mention-aware body, and an
 * optional {@link EngagementBar} footer. Has a `loading` skeleton and tappable
 * author/menu/body affordances. Token-only.
 */
export function PostCard({
  variant = 'text',
  author,
  timestamp,
  text,
  imageUrl,
  imageAlt,
  link,
  video,
  showEngagement = true,
  likeCount,
  commentCount,
  shareCount,
  liked,
  bookmarked,
  onLike,
  onComment,
  onShare,
  onBookmark,
  onPress,
  onPressAuthor,
  onPressMenu,
  onPressMention,
  onPressHashtag,
  loading = false,
  appearance = 'classic',
  density = 'comfortable',
  style,
}: PostCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const press = usePressScale();
  const compact = density === 'compact';

  const containerStyle: StyleProp<ViewStyle> = [
    {
      ...appearanceStyle(appearance, colors, tokens),
      borderRadius: tokens.radius.lg,
      padding: compact ? tokens.spacing.sm : tokens.spacing.md,
      gap: compact ? tokens.spacing.xs : tokens.spacing.sm,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading post" style={containerStyle}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.border }} />
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            <View style={{ height: 10, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
            <View style={{ height: 8, width: '25%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          </View>
        </View>
        <View style={{ height: 10, width: '90%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        <View style={{ height: 10, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        <View style={{ height: 160, borderRadius: tokens.radius.md, backgroundColor: colors.border }} />
      </View>
    );
  }

  const header = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
      <Pressable accessibilityRole="button" accessibilityLabel={author.name} disabled={!onPressAuthor} onPress={onPressAuthor}>
        <Avatar src={author.avatarUrl} name={author.name} size="md" />
      </Pressable>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {author.name}
          </Text>
          {author.verified ? (
            <Text accessibilityLabel="Verified" style={{ color: colors.primaryText, fontSize: tokens.typography.scale.sm }}>
              ✓
            </Text>
          ) : null}
        </View>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {[author.handle ? `@${author.handle}` : null, timestamp].filter(Boolean).join(' · ')}
        </Text>
      </View>
      {onPressMenu ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="More options"
          onPress={onPressMenu}
          style={({ pressed }) => ({ paddingHorizontal: tokens.spacing.xs, opacity: pressed ? 0.6 : 1 })}
        >
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>⋯</Text>
        </Pressable>
      ) : null}
    </View>
  );

  const body = text ? (
    <MentionText text={text} onPressMention={onPressMention} onPressHashtag={onPressHashtag} />
  ) : null;

  let media: React.ReactNode = null;
  if (variant === 'image' && imageUrl) {
    media = (
      <Image
        source={{ uri: imageUrl }}
        accessible
        accessibilityLabel={imageAlt ?? 'Post image'}
        resizeMode="cover"
        style={{ width: '100%', aspectRatio: 16 / 10, borderRadius: tokens.radius.md, backgroundColor: colors.border }}
      />
    );
  } else if (variant === 'video') {
    media = (
      <View style={{ width: '100%', aspectRatio: 16 / 9, borderRadius: tokens.radius.md, overflow: 'hidden', backgroundColor: colors.border, alignItems: 'center', justifyContent: 'center' }}>
        {video?.thumbnailUrl ? (
          <Image source={{ uri: video.thumbnailUrl }} accessibilityLabel="Video thumbnail" resizeMode="cover" style={{ width: '100%', height: '100%' }} />
        ) : null}
        <View style={{ position: 'absolute', width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.onSurface, opacity: 0.85 }}>
          <Text style={{ color: colors.surface, fontSize: tokens.typography.scale.xl }}>▶</Text>
        </View>
        {video?.duration ? (
          <View style={{ position: 'absolute', right: tokens.spacing.sm, bottom: tokens.spacing.sm, backgroundColor: colors.onSurface, borderRadius: tokens.radius.sm, paddingHorizontal: tokens.spacing.xs, paddingVertical: 1 }}>
            <Text style={{ color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{video.duration}</Text>
          </View>
        ) : null}
      </View>
    );
  } else if (variant === 'link' && link) {
    media = (
      <View style={{ borderWidth: 1, borderColor: colors.border, borderRadius: tokens.radius.md, overflow: 'hidden' }}>
        {link.imageUrl ? (
          <Image source={{ uri: link.imageUrl }} accessibilityLabel={link.title ?? 'Link preview'} resizeMode="cover" style={{ width: '100%', aspectRatio: 2, backgroundColor: colors.border }} />
        ) : null}
        <View style={{ padding: tokens.spacing.sm, gap: 2 }}>
          {link.domain ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{link.domain}</Text>
          ) : null}
          <Text numberOfLines={2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {link.title ?? link.url}
          </Text>
          {link.description ? (
            <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {link.description}
            </Text>
          ) : null}
        </View>
      </View>
    );
  }

  const footer =
    showEngagement && (onLike || onComment || onShare || onBookmark || likeCount != null || commentCount != null || shareCount != null) ? (
      <EngagementBar
        likeCount={likeCount}
        commentCount={commentCount}
        shareCount={shareCount}
        liked={liked}
        bookmarked={bookmarked}
        onLike={onLike}
        onComment={onComment}
        onShare={onShare}
        onBookmark={onBookmark}
        style={{ marginTop: tokens.spacing.xs }}
      />
    ) : null;

  const inner = (
    <>
      {header}
      {body}
      {media}
      {footer}
    </>
  );

  if (onPress) {
    return (
      <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>
        <Animated.View style={{ transform: [{ scale: press.scale }] }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Post by ${author.name}`}
            onPress={onPress}
            onPressIn={press.onPressIn}
            onPressOut={press.onPressOut}
            style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.97 : 1 }]}
          >
            {inner}
          </Pressable>
        </Animated.View>
      </Animated.View>
    );
  }
  return (
    <Animated.View style={[{ opacity: enter.opacity, transform: enter.transform }, containerStyle]}>
      {inner}
    </Animated.View>
  );
}
