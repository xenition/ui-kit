import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { appearanceStyle } from '../primitives/internal/appearance';
import { useEnter } from '../primitives/internal/motion';
import { MentionText } from './MentionText';
import type { CommentItemProps } from './CommentItem';

/** Drop-in for {@link CommentItem} — identical props, a different design. */
export type CommentItemV3Props = CommentItemProps;

/**
 * CommentItem, design V3 — **flat & threaded** with a thin **indent rail**.
 * No bubble: a tiny inline avatar, a single author line, a tight body, and a
 * compact action row. Nested replies (`depth` > 0) draw a hairline vertical
 * rail on the left to show the thread. Same props as {@link CommentItem}.
 */
export function CommentItemV3({
  author,
  handle,
  avatarUrl,
  text,
  timestamp,
  likeCount = 0,
  liked = false,
  depth = 0,
  pinned = false,
  appearance = 'classic',
  onLike,
  onReply,
  onPressAuthor,
  onPressMention,
  onPressHashtag,
  children,
  style,
}: CommentItemV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const nested = Math.max(0, depth) > 0;

  return (
    <Animated.View style={[{ opacity: enter.opacity, transform: enter.transform }, style]}>
      <View style={{ flexDirection: 'row' }}>
        {/* Hairline thread rail for nested replies. */}
        {nested ? (
          <View style={{ width: tokens.spacing.lg, alignItems: 'center' }}>
            <View style={{ width: 2, flex: 1, borderRadius: 1, backgroundColor: colors.border }} />
          </View>
        ) : null}
        <View
          style={{
            flex: 1,
            gap: tokens.spacing.xs,
            ...(pinned ? appearanceStyle(appearance, colors, tokens) : null),
            borderRadius: tokens.radius.sm,
            padding: pinned ? tokens.spacing.sm : 0,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }}>
            <Pressable accessibilityRole="button" accessibilityLabel={author} disabled={!onPressAuthor} onPress={onPressAuthor}>
              <Avatar src={avatarUrl} name={author} size="xs" />
            </Pressable>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{author}</Text>
            {handle ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>@{handle}</Text> : null}
            {timestamp ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>· {timestamp}</Text> : null}
            {pinned ? (
              <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>· Pinned</Text>
            ) : null}
          </View>

          <MentionText text={text} size="sm" onPressMention={onPressMention} onPressHashtag={onPressHashtag} />

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.lg }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Like, ${likeCount}`}
              accessibilityState={{ selected: liked }}
              disabled={!onLike}
              onPress={onLike}
              style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, opacity: pressed ? 0.6 : 1 })}
            >
              <Text style={{ color: liked ? colors.dangerText : colors.muted, fontSize: tokens.typography.scale.sm }}>{liked ? '♥' : '♡'}</Text>
              {likeCount > 0 ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{likeCount}</Text>
              ) : null}
            </Pressable>
            {onReply ? (
              <Pressable accessibilityRole="button" accessibilityLabel="Reply" onPress={onReply} style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>Reply</Text>
              </Pressable>
            ) : null}
          </View>

          {children ? <View style={{ marginTop: tokens.spacing.sm, gap: tokens.spacing.sm }}>{children}</View> : null}
        </View>
      </View>
    </Animated.View>
  );
}
