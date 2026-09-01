import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { EngagementBarProps } from './EngagementBar';

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

/** Drop-in for {@link EngagementBarProps} — same props, the V4 "feed" design. */
export type EngagementBarV4Props = EngagementBarProps;

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}k`;
  return String(n);
}

/**
 * EngagementBar — **V4** "feed" design. A clean, airy row of like / comment /
 * share (+ optional bookmark) pill actions with big ≥44px tap targets. The
 * `liked` heart fills `dangerText`, the `bookmarked` flag fills `primaryText`;
 * inactive actions and counts read `muted`, and a pressed action gets a
 * soft-primary tint. Same props/behavior as {@link EngagementBarProps};
 * token-only colors via `useXenitionTheme()` + `withAlpha`. State is announced
 * via `accessibilityState.selected`, not color alone.
 */
export function EngagementBarV4({
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
}: EngagementBarV4Props): React.ReactElement {
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
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style]}>
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
              minHeight: 44,
              paddingHorizontal: tokens.spacing.md,
              borderRadius: tokens.radius.full,
              backgroundColor: pressed ? withAlpha(colors.primary, 0.1) : 'transparent',
            })}
          >
            <Text style={{ color: tint, fontSize: tokens.typography.scale.lg }}>
              {a.active && a.activeGlyph ? a.activeGlyph : a.glyph}
            </Text>
            {showCount ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                {formatCount(a.count as number)}
              </Text>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}
