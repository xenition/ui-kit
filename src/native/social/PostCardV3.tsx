import * as React from 'react';
import { Animated, Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import { MentionText } from './MentionText';
import { EngagementBar } from './EngagementBar';
import type { PostCardProps } from './PostCard';

/** Drop-in for {@link PostCard} — identical props, a different design. */
export type PostCardV3Props = PostCardProps;

/**
 * PostCard, design V3 — **minimal & borderless** with a colored **left accent
 * rail**. No card fill or shadow: the post reads as a thread entry, header on
 * one line, a tight body, small inline media, and a flat engagement row. Same
 * props as {@link PostCard} (all four `variant`s supported), token-only.
 */
export function PostCardV3({
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
}: PostCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const press = usePressScale();
  const compact = density === 'compact';

  const containerStyle: StyleProp<ViewStyle> = [
    {
      backgroundColor: 'transparent',
      borderLeftWidth: 3,
      borderLeftColor: colors.primary,
      borderRadius: tokens.radius.sm,
      paddingLeft: tokens.spacing.md,
      paddingVertical: compact ? tokens.spacing.xs : tokens.spacing.sm,
      gap: compact ? tokens.spacing.xs : tokens.spacing.sm,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading post" style={containerStyle}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: colors.border }} />
          <View style={{ height: 10, width: '45%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        </View>
        <View style={{ height: 10, width: '90%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        <View style={{ height: 10, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
      </View>
    );
  }

  const header = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
      <Pressable accessibilityRole="button" accessibilityLabel={author.name} disabled={!onPressAuthor} onPress={onPressAuthor}>
        <Avatar src={author.avatarUrl} name={author.name} size="sm" />
      </Pressable>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {author.name}
        </Text>
        {author.verified ? (
          <Text accessibilityLabel="Verified" style={{ color: colors.primaryText, fontSize: tokens.typography.scale.xs }}>
            ✓
          </Text>
        ) : null}
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
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>⋯</Text>
        </Pressable>
      ) : null}
    </View>
  );

  const body = text ? (
    <MentionText text={text} size="sm" onPressMention={onPressMention} onPressHashtag={onPressHashtag} />
  ) : null;

  let media: React.ReactNode = null;
  if (variant === 'image' && imageUrl) {
    media = (
      <Image
        source={{ uri: imageUrl }}
        accessible
        accessibilityLabel={imageAlt ?? 'Post image'}
        resizeMode="cover"
        style={{ width: '100%', aspectRatio: 16 / 9, borderRadius: tokens.radius.md, backgroundColor: colors.border }}
      />
    );
  } else if (variant === 'video') {
    media = (
      <View
        style={{
          width: '100%',
          aspectRatio: 16 / 9,
          borderRadius: tokens.radius.md,
          overflow: 'hidden',
          backgroundColor: colors.border,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {video?.thumbnailUrl ? (
          <Image source={{ uri: video.thumbnailUrl }} accessibilityLabel="Video thumbnail" resizeMode="cover" style={{ width: '100%', height: '100%' }} />
        ) : null}
        <View style={{ position: 'absolute', width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.onSurface, opacity: 0.85 }}>
          <Text style={{ color: colors.surface, fontSize: tokens.typography.scale.lg }}>▶</Text>
        </View>
        {video?.duration ? (
          <View style={{ position: 'absolute', right: tokens.spacing.xs, bottom: tokens.spacing.xs, backgroundColor: colors.onSurface, borderRadius: tokens.radius.sm, paddingHorizontal: tokens.spacing.xs, paddingVertical: 1 }}>
            <Text style={{ color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{video.duration}</Text>
          </View>
        ) : null}
      </View>
    );
  } else if (variant === 'link' && link) {
    // Compact side-by-side link chip (thumbnail + title), not a full card.
    media = (
      <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'center', borderRadius: tokens.radius.md, backgroundColor: colors.surface, paddingRight: tokens.spacing.sm, overflow: 'hidden' }}>
        {link.imageUrl ? (
          <Image source={{ uri: link.imageUrl }} accessibilityLabel={link.title ?? 'Link preview'} resizeMode="cover" style={{ width: 56, height: 56, backgroundColor: colors.border }} />
        ) : (
          <View style={{ width: 56, height: 56, backgroundColor: colors.border }} />
        )}
        <View style={{ flex: 1, paddingVertical: tokens.spacing.xs }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {link.title ?? link.url}
          </Text>
          {link.domain ? <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{link.domain}</Text> : null}
        </View>
      </View>
    );
  }

  const footer =
    showEngagement &&
    (onLike || onComment || onShare || onBookmark || likeCount != null || commentCount != null || shareCount != null) ? (
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
