import * as React from 'react';
import { Pressable, ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Spinner, EmptyState } from '../primitives';
import { StarButton } from './StarButton';
import { AttachmentChip, type AttachmentKind } from './AttachmentChip';
import { MailLabelChip, type MailLabelTone } from './MailLabelChip';

export interface ThreadAttachment {
  id: string;
  name: string;
  kind?: AttachmentKind;
  size?: string;
}

export interface ThreadMessage {
  id: string;
  /** Sender name. */
  sender: string;
  /** Sender avatar URI. */
  avatarUri?: string;
  /** Timestamp label. */
  timestamp?: string;
  /** Full body text (shown when expanded). */
  body: string;
  /** Starred state for this message. */
  starred?: boolean;
  /** Attachments on this message. */
  attachments?: ThreadAttachment[];
}

export interface ThreadLabelRef {
  id: string;
  label: string;
  tone?: MailLabelTone;
}

export interface EmailThreadProps {
  /** Thread subject line. */
  subject: string;
  /** Ordered messages in the conversation. */
  messages?: ThreadMessage[];
  /** Labels applied to the thread. */
  labels?: ThreadLabelRef[];
  /** Ids of expanded messages; others render collapsed (sender + snippet). */
  expandedIds?: string[];
  /** Toggle a message open/closed. */
  onToggleMessage?: (id: string) => void;
  /** Star toggle for a specific message. */
  onToggleStar?: (id: string, starred: boolean) => void;
  /** Tap an attachment. */
  onPressAttachment?: (messageId: string, attachmentId: string) => void;
  /** Loading state → spinner. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A full email conversation view — the subject header with thread labels, then
 * a stack of message cards. Each card is collapsible: expanded shows the body
 * and attachments, collapsed shows just sender + a one-line snippet. Handles
 * `loading` (spinner) and empty (no messages) states. Data + callbacks only;
 * every color from theme tokens. No literal colors.
 */
export function EmailThread({
  subject,
  messages,
  labels,
  expandedIds,
  onToggleMessage,
  onToggleStar,
  onPressAttachment,
  loading = false,
  style,
}: EmailThreadProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const safeMessages = messages ?? [];
  const safeLabels = labels ?? [];
  const expanded = new Set(expandedIds ?? (safeMessages.length > 0 ? [safeMessages[safeMessages.length - 1]!.id] : []));

  if (loading) {
    return (
      <View
        accessible
        accessibilityLabel="Loading messages"
        style={[{ padding: tokens.spacing.xl, alignItems: 'center', backgroundColor: colors.surface }, style]}
      >
        <Spinner />
      </View>
    );
  }

  return (
    <ScrollView style={[{ backgroundColor: colors.surface }, style]}>
      <View
        style={{
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          gap: tokens.spacing.sm,
        }}
      >
        <Text
          accessibilityRole="header"
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}
        >
          {subject}
        </Text>
        {safeLabels.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
            {safeLabels.map((l) => (
              <MailLabelChip key={l.id} label={l.label} tone={l.tone ?? 'neutral'} />
            ))}
          </View>
        ) : null}
      </View>

      {safeMessages.length === 0 ? (
        <View style={{ padding: tokens.spacing.xl }}>
          <EmptyState title="No messages" description="This conversation is empty." />
        </View>
      ) : (
        safeMessages.map((m) => {
          const isOpen = expanded.has(m.id);
          const atts = m.attachments ?? [];
          return (
            <View
              key={m.id}
              style={{
                paddingHorizontal: tokens.spacing.md,
                paddingVertical: tokens.spacing.md,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}
            >
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${isOpen ? 'Collapse' : 'Expand'} message from ${m.sender}`}
                accessibilityState={{ expanded: isOpen }}
                onPress={() => onToggleMessage?.(m.id)}
                style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}
              >
                <Avatar size="md" src={m.avatarUri} name={m.sender} />
                <View style={{ flex: 1 }}>
                  <Text
                    numberOfLines={1}
                    style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
                  >
                    {m.sender}
                  </Text>
                  {!isOpen ? (
                    <Text
                      numberOfLines={1}
                      style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}
                    >
                      {m.body}
                    </Text>
                  ) : null}
                </View>
                {m.timestamp ? (
                  <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{m.timestamp}</Text>
                ) : null}
                <StarButton
                  starred={m.starred ?? false}
                  onToggle={onToggleStar ? (s) => onToggleStar(m.id, s) : undefined}
                  size="base"
                />
              </Pressable>

              {isOpen ? (
                <View style={{ marginTop: tokens.spacing.sm, gap: tokens.spacing.sm }}>
                  <Text
                    style={{
                      color: colors.onSurface,
                      fontSize: tokens.typography.scale.base,
                      lineHeight: tokens.typography.scale.base * 1.5,
                    }}
                  >
                    {m.body}
                  </Text>
                  {atts.length > 0 ? (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
                      {atts.map((a) => (
                        <AttachmentChip
                          key={a.id}
                          name={a.name}
                          kind={a.kind ?? 'file'}
                          size={a.size}
                          onPress={onPressAttachment ? () => onPressAttachment(m.id, a.id) : undefined}
                        />
                      ))}
                    </View>
                  ) : null}
                </View>
              ) : null}
            </View>
          );
        })
      )}
    </ScrollView>
  );
}
