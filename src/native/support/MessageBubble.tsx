import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { withAlpha } from './internal';

/** Which side of the thread a message sits on. */
export type MessageBubbleSide = 'agent' | 'customer';

/** Delivery state for an outgoing (agent) message. */
export type MessageBubbleStatus = 'sending' | 'sent' | 'failed';

export interface MessageBubbleProps {
  /** Display name of the sender (announced for a11y, shown as a muted label). */
  author: string;
  /** The message text. */
  body: string;
  /** Optional muted timestamp (e.g. "2:14 PM"). */
  time?: string;
  /**
   * Alignment + treatment. `agent` = right-aligned soft-primary tint bubble;
   * `customer` = left-aligned surface + border bubble. Defaults to `customer`.
   */
  side?: MessageBubbleSide;
  /** Optional sender avatar image URL (initials fall back to `author`). */
  avatarUrl?: string;
  /** Optional delivery hint shown under the bubble (muted, or danger when `failed`). */
  status?: MessageBubbleStatus;
  /** Container style override. */
  style?: StyleProp<ViewStyle>;
}

// Delivery status → glyph + label. `failed` is the only danger-toned hint.
const STATUS_TEXT: Record<MessageBubbleStatus, string> = {
  sending: 'Sending…',
  sent: '✓ Sent',
  failed: '⚠ Failed to send',
};

/**
 * MessageBubble — **V4** "calm console" chat bubble. A single message in an
 * agent↔customer thread. Agent messages align right on a soft-primary tint
 * bubble; customer messages align left on a bordered surface bubble — one accent
 * = primary, no second color. Comfortable rounded padding, a muted sender label,
 * an optional avatar, an optional muted timestamp, and an optional delivery hint
 * (`sending`/`sent`/`failed`, the last in danger). The whole row is announced as
 * "{author} said: {body}". Presentational only. Token-only colors via
 * `useXenitionTheme()`; NO gradients. Dark-mode safe.
 */
export function MessageBubble({
  author,
  body,
  time,
  side = 'customer',
  avatarUrl,
  status,
  style,
}: MessageBubbleProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isAgent = side === 'agent';

  return (
    <View
      accessible
      accessibilityLabel={`${author} said: ${body}`}
      style={[
        { flexDirection: isAgent ? 'row-reverse' : 'row', gap: tokens.spacing.sm, width: '100%' },
        style,
      ]}
    >
      <Avatar size="sm" name={author} src={avatarUrl} />
      <View style={{ flexShrink: 1, maxWidth: '80%', gap: 4, alignItems: isAgent ? 'flex-end' : 'flex-start' }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500', paddingHorizontal: 4 }}>
          {author}
        </Text>
        <View
          style={{
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            borderRadius: tokens.radius.lg,
            backgroundColor: isAgent ? withAlpha(colors.primary, 0.12) : colors.surface,
            borderWidth: isAgent ? 0 : 1,
            borderColor: colors.border,
            ...(isAgent
              ? { borderTopRightRadius: tokens.radius.sm }
              : { borderTopLeftRadius: tokens.radius.sm }),
          }}
        >
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{body}</Text>
        </View>
        <View
          style={{
            flexDirection: isAgent ? 'row-reverse' : 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            paddingHorizontal: 4,
          }}
        >
          {time ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{time}</Text>
          ) : null}
          {status ? (
            <Text
              style={{
                color: status === 'failed' ? colors.dangerText : colors.muted,
                fontSize: tokens.typography.scale.xs,
                fontWeight: status === 'failed' ? '700' : '400',
              }}
            >
              {STATUS_TEXT[status]}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}
