import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Icon } from '../primitives';
import { StarButton } from './StarButton';
import { MailLabelChip, type MailLabelTone } from './MailLabelChip';

export interface MailLabelRef {
  id: string;
  label: string;
  tone?: MailLabelTone;
}

export interface MessageListRowProps {
  /** Sender display name (or "me" for sent items). */
  sender: string;
  /** Subject line. */
  subject: string;
  /** Snippet / preview of the body. */
  preview?: string;
  /** Timestamp label (e.g. "09:41", "Tue"). */
  timestamp?: string;
  /** Sender avatar image URI. */
  avatarUri?: string;
  /** Unread → bold sender/subject + a leading unread dot. */
  unread?: boolean;
  /** Starred state (renders a trailing star toggle). */
  starred?: boolean;
  /** Toggle star; also enables the star affordance. */
  onToggleStar?: (starred: boolean) => void;
  /** Show a paperclip when the message has attachments. */
  hasAttachments?: boolean;
  /** Number of messages in the thread; > 1 shows a count pill. */
  threadCount?: number;
  /** Labels applied to the message. */
  labels?: MailLabelRef[];
  /** Selected/active state (split view / multi-select). */
  selected?: boolean;
  /** Open the message. */
  onPress?: () => void;
  /** Long-press (enter selection / context menu). */
  onLongPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * One row in a mail list — avatar, sender, subject, preview snippet, timestamp,
 * plus star / attachment / thread-count / label affordances. The `unread`
 * variant bolds the sender+subject and shows a leading accent dot, and the
 * accessibility label spells out "unread" so the state is never color-alone.
 * Data + callbacks only; all colors from theme tokens. No literal colors.
 */
export function MessageListRow({
  sender,
  subject,
  preview,
  timestamp,
  avatarUri,
  unread = false,
  starred = false,
  onToggleStar,
  hasAttachments = false,
  threadCount = 1,
  labels,
  selected = false,
  onPress,
  onLongPress,
  style,
}: MessageListRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const safeLabels = labels ?? [];
  const count = threadCount > 1 ? threadCount : 0;

  const a11yLabel = [
    unread ? 'Unread' : 'Read',
    `from ${sender}`,
    subject,
    hasAttachments ? 'has attachment' : undefined,
    starred ? 'starred' : undefined,
    timestamp,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      accessibilityState={{ selected }}
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          backgroundColor: selected || pressed ? colors.border : colors.surface,
        },
        style,
      ]}
    >
      {/* Leading unread indicator (dot) + avatar. */}
      <View style={{ alignItems: 'center', gap: tokens.spacing.xs }}>
        <View
          accessibilityElementsHidden
          importantForAccessibility="no"
          style={{
            width: 8,
            height: 8,
            borderRadius: tokens.radius.full,
            backgroundColor: unread ? colors.primary : 'transparent',
            marginTop: tokens.spacing.sm,
          }}
        />
      </View>
      <Avatar size="md" src={avatarUri} name={sender} />

      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              color: colors.onSurface,
              fontSize: tokens.typography.scale.base,
              fontWeight: unread ? '700' : '500',
            }}
          >
            {sender}
          </Text>
          {count > 0 ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {count > 99 ? '99+' : String(count)}
            </Text>
          ) : null}
          {timestamp ? (
            <Text
              style={{
                color: unread ? colors.primary : colors.muted,
                fontSize: tokens.typography.scale.xs,
                fontWeight: unread ? '700' : '400',
              }}
            >
              {timestamp}
            </Text>
          ) : null}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          {hasAttachments ? <Icon glyph="📎" size="xs" color="muted" accessibilityLabel="Has attachment" /> : null}
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              color: colors.onSurface,
              fontSize: tokens.typography.scale.sm,
              fontWeight: unread ? '600' : '400',
            }}
          >
            {subject}
          </Text>
          {onToggleStar ? (
            <StarButton starred={starred} onToggle={onToggleStar} size="base" />
          ) : starred ? (
            <Icon glyph="★" size="base" color="warn" accessibilityLabel="Starred" />
          ) : null}
        </View>

        {preview ? (
          <Text
            numberOfLines={1}
            style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}
          >
            {preview}
          </Text>
        ) : null}

        {safeLabels.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs, marginTop: 2 }}>
            {safeLabels.map((l) => (
              <MailLabelChip key={l.id} label={l.label} tone={l.tone ?? 'neutral'} />
            ))}
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}
