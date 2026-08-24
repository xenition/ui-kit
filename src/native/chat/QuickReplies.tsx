import * as React from 'react';
import { Pressable, ScrollView, Text, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface QuickReply {
  /** Stable identifier passed back to `onSelect`. */
  id: string;
  /** Chip label. */
  label: string;
}

export interface QuickRepliesProps {
  /** Suggested replies to render as tappable chips. */
  replies: QuickReply[];
  /** Called with the reply id when a chip is tapped. */
  onSelect?: (id: string) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Horizontal strip of suggested-reply chips (smart replies / canned responses).
 * Scrolls horizontally when the suggestions overflow. Each chip is a button.
 * Renders nothing when `replies` is empty. No literal colors.
 */
export function QuickReplies({
  replies,
  onSelect,
  style,
}: QuickRepliesProps): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  if (replies.length === 0) return null;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      accessibilityLabel="Suggested replies"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md }}
      style={style}
    >
      {replies.map((reply) => (
        <Pressable
          key={reply.id}
          accessibilityRole="button"
          accessibilityLabel={reply.label}
          onPress={() => onSelect?.(reply.id)}
          style={({ pressed }) => ({
            borderRadius: tokens.radius.full,
            borderWidth: 1,
            borderColor: colors.primary,
            backgroundColor: colors.surface,
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '500' }}>
            {reply.label}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
