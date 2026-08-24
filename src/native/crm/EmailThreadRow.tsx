import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

export interface EmailThreadRowProps {
  /** Thread subject. */
  subject: string;
  /** Sender / counterpart name. */
  from: string;
  /** Preview snippet of the latest message. */
  snippet?: string;
  /** Avatar image URL; initials fallback from `from`. */
  avatarUrl?: string;
  /** Pre-formatted time (e.g. "9:41 AM"). */
  timestamp?: string;
  /** Unread → bold subject, a leading dot and a tinted surface. */
  unread?: boolean;
  /** Number of messages in the thread (badge when > 1). */
  messageCount?: number;
  /** Show a 📎 attachment marker. */
  hasAttachment?: boolean;
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Inbox-style row for an email thread tied to a contact / deal: sender avatar,
 * subject, snippet, timestamp and a message-count badge. Unread threads read as
 * a bold subject plus a leading primary dot **and** an "unread" a11y hint (not
 * color alone) over a token-tinted surface. Guards `messageCount` (badge only
 * when > 1). All colors are theme tokens; the unread wash uses `withAlpha`.
 */
export function EmailThreadRow({
  subject,
  from,
  snippet,
  avatarUrl,
  timestamp,
  unread = false,
  messageCount,
  hasAttachment = false,
  onPress,
  testID,
  style,
}: EmailThreadRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const showCount = messageCount != null && messageCount > 1;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${unread ? 'Unread, ' : ''}${from}: ${subject}`}
      disabled={!onPress}
      onPress={onPress}
      testID={testID}
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.sm,
          alignItems: 'center',
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          backgroundColor: unread ? withAlpha(colors.primary, 0.06) : colors.surface,
        },
        style,
      ]}
    >
      {unread ? (
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary }} />
      ) : (
        <View style={{ width: 8 }} />
      )}

      <Avatar size="sm" name={from} src={avatarUrl} />

      <View style={{ flex: 1, gap: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.xs }}>
          <Text
            numberOfLines={1}
            style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: unread ? '700' : '600' }}
          >
            {from}
          </Text>
          {timestamp ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{timestamp}</Text>
          ) : null}
        </View>
        <Text
          numberOfLines={1}
          style={{ color: unread ? colors.onSurface : colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: unread ? '600' : '400' }}
        >
          {subject}
        </Text>
        {snippet ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {snippet}
          </Text>
        ) : null}
      </View>

      <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs / 2 }}>
        {hasAttachment ? (
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm, color: colors.muted }}>
            📎
          </Text>
        ) : null}
        {showCount ? (
          <Badge tone="neutral" variant="soft" size="sm">
            {`${messageCount}`}
          </Badge>
        ) : null}
      </View>
    </Pressable>
  );
}
