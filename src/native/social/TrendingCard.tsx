import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';

export interface TrendingCardProps {
  /** Position in the trending list (e.g. `1`). Shown as a muted `#N ·` prefix. */
  rank?: number;
  /** Category / context line above the topic (e.g. `Trending in Tech`). */
  category?: string;
  /** The trending topic — a hashtag (`#Xenition`) or a phrase. Shown bold. */
  topic: string;
  /** Formatted post count shown as a big muted numeral (e.g. `12.4K posts`). */
  postCount?: string;
  /** Fires when the card is pressed. */
  onPress?: () => void;
  /** Fires when the overflow `⋯` menu is tapped. Renders the menu button when set. */
  onMenu?: () => void;
  /** Optional style override for the card container. */
  style?: StyleProp<ViewStyle>;
}

/**
 * TrendingCard — **V4** "feed" design. A clean, airy trending-topic card: a
 * muted `#rank · category` context line, the bold `topic`, and the `postCount`
 * as a big muted numeral. An optional `⋯` menu sits at the top-right. Pressed
 * state uses a soft-primary tint (via `withAlpha`). Presentational; token-only
 * colors via `useXenitionTheme()`. Native twin of the web `TrendingCard`.
 */
export function TrendingCard({
  rank,
  category,
  topic,
  postCount,
  onPress,
  onMenu,
  style,
}: TrendingCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const context = [rank != null ? `#${rank}` : null, category].filter(Boolean).join(' · ');
  const a11yLabel = [context, topic, postCount].filter(Boolean).join(', ');

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: tokens.spacing.sm,
      minHeight: 44,
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      padding: tokens.spacing.lg,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.06,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 2,
    },
    style,
  ];

  const inner = (
    <>
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        {context ? (
          <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, fontWeight: '600', color: colors.muted }}>
            {context}
          </Text>
        ) : null}
        <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.base, fontWeight: '800', color: colors.onSurface }}>
          {topic}
        </Text>
        {postCount ? (
          <Text style={{ fontSize: tokens.typography.scale['2xl'], fontWeight: '800', color: colors.muted }}>
            {postCount}
          </Text>
        ) : null}
      </View>

      {onMenu ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="More options"
          onPress={onMenu}
          hitSlop={8}
          style={({ pressed }) => ({
            width: 44,
            height: 44,
            marginTop: -tokens.spacing.xs,
            marginRight: -tokens.spacing.xs,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            backgroundColor: pressed ? withAlpha(colors.primary, 0.1) : 'transparent',
          })}
        >
          <Text style={{ fontSize: tokens.typography.scale.lg, fontWeight: '700', color: colors.muted }}>⋯</Text>
        </Pressable>
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11yLabel}
        onPress={onPress}
        style={({ pressed }) => [containerStyle, pressed ? { backgroundColor: withAlpha(colors.primary, 0.1) } : null]}
      >
        {inner}
      </Pressable>
    );
  }

  return (
    <View accessibilityRole="text" accessibilityLabel={a11yLabel} style={containerStyle}>
      {inner}
    </View>
  );
}
