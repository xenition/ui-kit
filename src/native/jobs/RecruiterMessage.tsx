import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives';
import type { RecruiterMessagePayload } from './types';
import { formatRelative } from './format';

export interface RecruiterMessageProps {
  /** The message to render. */
  message: RecruiterMessagePayload;
  /** Fired when the message is pressed (open thread). */
  onPress?: (message: RecruiterMessagePayload) => void;
  /** Fired when the reply affordance is pressed. */
  onReply?: (message: RecruiterMessagePayload) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * An inbox row for a recruiter message: sender avatar, name + company, a
 * one-line preview, sent age, and an unread state. Unread is signalled by BOTH
 * a token dot and bold text (never color alone) and announced in the accessible
 * label. Data + callbacks only; tokens only.
 */
export function RecruiterMessage({
  message,
  onPress,
  onReply,
  style,
}: RecruiterMessageProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sent = formatRelative(message.sentAt);
  const unread = !!message.unread;

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`${unread ? 'Unread. ' : ''}Message from ${message.senderName}${
        message.company ? ` at ${message.company}` : ''
      }`}
      disabled={!onPress}
      onPress={onPress ? () => onPress(message) : undefined}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.md,
        },
        pressed && onPress ? { opacity: 0.9 } : null,
        style,
      ]}
    >
      <View>
        <Avatar src={message.senderAvatarUrl} name={message.senderName} size="md" />
        {unread ? (
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{
              position: 'absolute',
              top: -2,
              right: -2,
              width: 12,
              height: 12,
              borderRadius: tokens.radius.full,
              backgroundColor: colors.primary,
              borderWidth: 2,
              borderColor: colors.surface,
            }}
          />
        ) : null}
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              color: colors.onSurface,
              fontSize: tokens.typography.scale.sm,
              fontWeight: unread ? '700' : '600',
            }}
          >
            {message.senderName}
            {message.company ? (
              <Text style={{ color: colors.muted, fontWeight: '400' }}>{`  ·  ${message.company}`}</Text>
            ) : null}
          </Text>
          {sent ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{sent}</Text>
          ) : null}
        </View>

        <Text
          numberOfLines={2}
          style={{
            color: unread ? colors.onSurface : colors.muted,
            fontSize: tokens.typography.scale.sm,
            fontWeight: unread ? '500' : '400',
          }}
        >
          {message.preview}
        </Text>

        {onReply ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Reply to ${message.senderName}`}
            onPress={() => onReply(message)}
            hitSlop={6}
            style={{ alignSelf: 'flex-start', marginTop: tokens.spacing.xs }}
          >
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              Reply
            </Text>
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  );
}
