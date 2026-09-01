import * as React from 'react';
import { Animated, Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import { MentionText } from './MentionText';
import { EngagementBar } from './EngagementBar';
import type { PostCardProps } from './PostCard';

/** Drop-in for {@link PostCardProps} — same props, the V4 "feed" design. */
export type PostCardV4Props = PostCardProps;

/**
 * PostCard — **V4** "feed" design. The clean, airy take on a feed post: an
 * elevated rounded card with generous whitespace, a larger avatar, a bold name
 * with a primary verified tick, a mention-aware body, rounded media, and the
 * {@link EngagementBar} footer. Same props/behavior as {@link PostCardProps};
 * token-only colors via `useXenitionTheme()`. `loading` shows a skeleton;
 * `density="compact"` tightens the spacing.
 */
export function PostCardV4({
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
  density = 'comfortable',
  style,
}: PostCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const press = usePressScale();
  const compact = density === 'compact';

  const containerStyle: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: tokens.radius.lg,
      padding: compact ? tokens.spacing.md : tokens.spacing.lg,
      gap: compact ? tokens.spacing.sm : tokens.spacing.md,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.06,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 2,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading post" style={containerStyle}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.border }} />
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            <View style={{ height: 10, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
            <View style={{ height: 8, width: '25%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          </View>
        </View>
        <View style={{ height: 10, width: '90%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        <View style={{ height: 10, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        <View style={{ height: 180, borderRadius: tokens.radius.md, backgroundColor: colors.border }} />
      </View>
    );
  }

  const header = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
      <Pressable accessibilityRole="button" accessibilityLabel={author.name} disabled={!onPressAuthor} onPress={onPressAuthor}>
        <Avatar src={author.avatarUrl} name={author.name} size="lg" />
      </Pressable>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
            {author.name}
          </Text>
          {author.verified ? (
            <Text accessibilityLabel="Verified" style={{ color: colors.primary, fontSize: tokens.typography.scale.sm }}>
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

  const body = text ? <MentionText text={text} onPressMention={onPressMention} onPressHashtag={onPressHashtag} /> : null;

  let media: React.ReactNode = null;
  if (variant === 'image' && imageUrl) {
    media = (
      <Image
        source={{ uri: imageUrl }}
        accessible
        accessibilityLabel={imageAlt ?? 'Post image'}
        resizeMode="cover"
        style={{ width: '100%', aspectRatio: 16 / 10, borderRadius: tokens.radius.lg, backgroundColor: colors.border }}
      />
    );
  } else if (variant === 'video') {
    media = (
      <View style={{ width: '100%', aspectRatio: 16 / 9, borderRadius: tokens.radius.lg, overflow: 'hidden', backgroundColor: colors.border, alignItems: 'center', justifyContent: 'center' }}>
        {video?.thumbnailUrl ? (
          <Image source={{ uri: video.thumbnailUrl }} accessibilityLabel="Video thumbnail" resizeMode="cover" style={{ width: '100%', height: '100%' }} />
        ) : null}
        <View style={{ position: 'absolute', width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary }}>
          <Text style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.xl }}>▶</Text>
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
      <View style={{ borderWidth: 1, borderColor: colors.border, borderRadius: tokens.radius.lg, overflow: 'hidden' }}>
        {link.imageUrl ? (
          <Image source={{ uri: link.imageUrl }} accessibilityLabel={link.title ?? 'Link preview'} resizeMode="cover" style={{ width: '100%', aspectRatio: 2, backgroundColor: colors.border }} />
        ) : null}
        <View style={{ padding: tokens.spacing.sm, gap: 2 }}>
          {link.domain ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{link.domain}</Text> : null}
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
  return <Animated.View style={[{ opacity: enter.opacity, transform: enter.transform }, containerStyle]}>{inner}</Animated.View>;
}
