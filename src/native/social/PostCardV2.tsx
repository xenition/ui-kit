import * as React from 'react';
import { Animated, Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import { MentionText } from './MentionText';
import { EngagementBar } from './EngagementBar';
import type { PostCardProps } from './PostCard';

/** Drop-in for {@link PostCard} — identical props, a different design. */
export type PostCardV2Props = PostCardProps;

/**
 * PostCard, design V2 — an **elevated, media-forward** post. The media leads
 * (big imagery, no border), the engagement bar **floats** in a shadowed pill
 * bridging the media and the body, and the author sits beneath. Same props as
 * {@link PostCard} (all four `variant`s supported), token-only.
 */
export function PostCardV2({
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
}: PostCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const press = usePressScale();
  const compact = density === 'compact';

  const containerStyle: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.surface,
      borderRadius: tokens.radius.lg,
      ...shadow('lg', tokens),
      padding: compact ? tokens.spacing.sm : tokens.spacing.md,
      gap: compact ? tokens.spacing.xs : tokens.spacing.sm,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading post" style={containerStyle}>
        <View style={{ height: 200, borderRadius: tokens.radius.md, backgroundColor: colors.border }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.border }} />
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            <View style={{ height: 10, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
            <View style={{ height: 8, width: '25%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          </View>
        </View>
        <View style={{ height: 10, width: '80%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
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
        style={{ flex: 1, justifyContent: 'space-between' }}
      />
    ) : null;

  let media: React.ReactNode = null;
  if (variant === 'image' && imageUrl) {
    media = (
      <Image
        source={{ uri: imageUrl }}
        accessible
        accessibilityLabel={imageAlt ?? 'Post image'}
        resizeMode="cover"
        style={{ width: '100%', aspectRatio: 4 / 5, borderRadius: tokens.radius.md, backgroundColor: colors.border }}
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
        <View
          style={{
            position: 'absolute',
            width: 64,
            height: 64,
            borderRadius: 32,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(colors.onSurface, 0.55),
          }}
        >
          <Text style={{ color: colors.surface, fontSize: tokens.typography.scale['2xl'] }}>▶</Text>
        </View>
        {video?.duration ? (
          <View
            style={{
              position: 'absolute',
              right: tokens.spacing.sm,
              top: tokens.spacing.sm,
              backgroundColor: withAlpha(colors.onSurface, 0.6),
              borderRadius: tokens.radius.full,
              paddingHorizontal: tokens.spacing.sm,
              paddingVertical: 2,
            }}
          >
            <Text style={{ color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{video.duration}</Text>
          </View>
        ) : null}
      </View>
    );
  } else if (variant === 'link' && link) {
    media = (
      <View style={{ borderRadius: tokens.radius.md, overflow: 'hidden', backgroundColor: withAlpha(colors.primary, 0.06) }}>
        {link.imageUrl ? (
          <Image source={{ uri: link.imageUrl }} accessibilityLabel={link.title ?? 'Link preview'} resizeMode="cover" style={{ width: '100%', aspectRatio: 2, backgroundColor: colors.border }} />
        ) : null}
        <View style={{ padding: tokens.spacing.md, gap: 2 }}>
          {link.domain ? <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{link.domain}</Text> : null}
          <Text numberOfLines={2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
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
  } else if (variant === 'text' && text) {
    // No media: a tinted hero block carries the body large and up-front.
    media = (
      <View style={{ backgroundColor: withAlpha(colors.primary, 0.06), borderRadius: tokens.radius.md, padding: tokens.spacing.lg }}>
        <MentionText text={text} size="lg" onPressMention={onPressMention} onPressHashtag={onPressHashtag} />
      </View>
    );
  }

  const header = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
      <Pressable accessibilityRole="button" accessibilityLabel={author.name} disabled={!onPressAuthor} onPress={onPressAuthor}>
        <Avatar src={author.avatarUrl} name={author.name} size="md" ring />
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

  // Body caption below media only when the media itself isn't the text hero.
  const caption = text && variant !== 'text' ? (
    <MentionText text={text} onPressMention={onPressMention} onPressHashtag={onPressHashtag} />
  ) : null;

  const inner = (
    <>
      {media ? (
        <View style={{ position: 'relative', marginBottom: footer ? tokens.spacing.lg : 0 }}>
          {media}
          {footer ? (
            <View
              style={{
                position: 'absolute',
                left: tokens.spacing.md,
                right: tokens.spacing.md,
                bottom: -tokens.spacing.md,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.surface,
                borderRadius: tokens.radius.full,
                ...shadow('md', tokens),
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.md,
              }}
            >
              {footer}
            </View>
          ) : null}
        </View>
      ) : null}
      {header}
      {caption}
      {!media && footer ? footer : null}
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
