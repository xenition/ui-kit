import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { appearanceStyle } from '../primitives/internal/appearance';
import { useEnter } from '../primitives/internal/motion';
import { withAlpha } from '../primitives/internal/color';
import { MentionText } from './MentionText';
import type { CommentItemProps } from './CommentItem';

/** Drop-in for {@link CommentItem} — identical props, a different design. */
export type CommentItemV2Props = CommentItemProps;

/**
 * CommentItem, design V2 — a **chat bubble**: the avatar sits outside a filled,
 * speech-bubble surface (one squared corner) that carries the author + body;
 * timestamp and like/reply actions live below the bubble. Threads via `depth`
 * indentation; `pinned` tints the bubble. Same props as {@link CommentItem}.
 */
export function CommentItemV2({
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
}: CommentItemV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const indent = Math.max(0, depth) * tokens.spacing.xl;

  // Pinned uses the shared appearance treatment; otherwise a faint neutral fill
  // gives the bubble body without a literal color.
  const bubbleSurface = pinned
    ? appearanceStyle(appearance, colors, tokens)
    : { backgroundColor: withAlpha(colors.onSurface, 0.05) };

  return (
    <Animated.View style={[{ opacity: enter.opacity, transform: enter.transform }, { paddingLeft: indent }, style]}>
      <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'flex-end' }}>
        <Pressable accessibilityRole="button" accessibilityLabel={author} disabled={!onPressAuthor} onPress={onPressAuthor}>
          <Avatar src={avatarUrl} name={author} size="sm" />
        </Pressable>
        <View style={{ flex: 1 }}>
          <View
            style={{
              ...bubbleSurface,
              borderRadius: tokens.radius.lg,
              borderBottomLeftRadius: tokens.radius.sm,
              paddingHorizontal: tokens.spacing.md,
              paddingVertical: tokens.spacing.sm,
              gap: tokens.spacing.xs,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }}>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{author}</Text>
              {handle ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>@{handle}</Text> : null}
              {pinned ? (
                <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>· Pinned</Text>
              ) : null}
            </View>
            <MentionText text={text} size="sm" onPressMention={onPressMention} onPressHashtag={onPressHashtag} />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.lg, paddingHorizontal: tokens.spacing.sm, paddingTop: tokens.spacing.xs }}>
            {timestamp ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{timestamp}</Text> : null}
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
        </View>
      </View>
      {children ? <View style={{ marginTop: tokens.spacing.sm, gap: tokens.spacing.sm }}>{children}</View> : null}
    </Animated.View>
  );
}
