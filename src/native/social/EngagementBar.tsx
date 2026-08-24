import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

interface ActionSpec {
  key: string;
  glyph: string;
  activeGlyph?: string;
  label: string;
  count?: number;
  active?: boolean;
  /** Color slot used when `active`. Default `primaryText` (readable on surface). */
  activeColor?: keyof SemanticColors;
  onPress?: () => void;
}

export interface EngagementBarProps {
  likeCount?: number;
  commentCount?: number;
  shareCount?: number;
  /** Whether the viewer has liked / bookmarked this item. */
  liked?: boolean;
  bookmarked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  /** When provided, a trailing bookmark toggle is rendered. */
  onBookmark?: () => void;
  /** Hide zero counts, showing icon only. Default `true`. */
  hideZero?: boolean;
  style?: StyleProp<ViewStyle>;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}k`;
  return String(n);
}

/**
 * The like / comment / share (+ optional bookmark) action row under a post.
 * Each action is an icon with an optional count; `liked` turns the heart
 * `dangerText`, `bookmarked` turns the flag `primaryText` (the on-surface-
 * readable variants). Only the handlers you pass become interactive. Token-only.
 */
export function EngagementBar({
  likeCount = 0,
  commentCount = 0,
  shareCount = 0,
  liked = false,
  bookmarked = false,
  onLike,
  onComment,
  onShare,
  onBookmark,
  hideZero = true,
  style,
}: EngagementBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const actions: ActionSpec[] = [
    { key: 'like', glyph: '♡', activeGlyph: '♥', label: 'Like', count: likeCount, active: liked, activeColor: 'dangerText', onPress: onLike },
    { key: 'comment', glyph: '💬', label: 'Comment', count: commentCount, onPress: onComment },
    { key: 'share', glyph: '↗', label: 'Share', count: shareCount, onPress: onShare },
  ];
  if (onBookmark) {
    actions.push({ key: 'bookmark', glyph: '🔖', label: 'Bookmark', active: bookmarked, activeColor: 'primaryText', onPress: onBookmark });
  }

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.lg }, style]}>
      {actions.map((a) => {
        const tint = a.active ? colors[a.activeColor ?? 'primaryText'] : colors.muted;
        const showCount = a.count != null && !(hideZero && a.count === 0);
        return (
          <Pressable
            key={a.key}
            accessibilityRole="button"
            accessibilityLabel={a.count != null ? `${a.label}, ${a.count}` : a.label}
            accessibilityState={{ selected: !!a.active }}
            disabled={!a.onPress}
            onPress={a.onPress}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.xs,
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <Text style={{ color: tint, fontSize: tokens.typography.scale.lg }}>
              {a.active && a.activeGlyph ? a.activeGlyph : a.glyph}
            </Text>
            {showCount ? (
              <Text style={{ color: tint, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                {formatCount(a.count as number)}
              </Text>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}
