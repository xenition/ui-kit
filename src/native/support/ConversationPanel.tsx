import * as React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives/Button';
import { withAlpha } from './internal';

/** Which side of the conversation a message is from. */
export type MessageAuthor = 'agent' | 'customer' | 'system';

export interface ConversationMessage {
  /** Stable id. */
  id: string;
  /** Who sent it. */
  author: MessageAuthor;
  /** Message body text. */
  body: string;
  /** Optional display name. */
  authorName?: string;
  /** Optional timestamp hint (e.g. `"09:41"`). */
  timeLabel?: string;
  /** Optional flag for internal-only notes (rendered distinctly). */
  internal?: boolean;
}

export interface ConversationPanelProps {
  /** Ordered messages (oldest → newest). */
  messages: ConversationMessage[];
  /** Show a loading state instead of the thread. */
  loading?: boolean;
  /** Text shown when there are no messages. */
  emptyText?: string;
  /** Controlled reply draft. */
  replyValue?: string;
  /** Fires as the reply draft changes. */
  onChangeReply?: (text: string) => void;
  /** Fires with the trimmed reply text when "Send" is pressed. */
  onReply?: (text: string) => void;
  /** Send-button label (default "Reply"). */
  sendLabel?: string;
  /** Hide the reply composer (read-only transcript). */
  hideComposer?: boolean;
  /** Disable the composer (e.g. ticket closed). */
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A support-ticket conversation thread with an inline reply composer. Renders
 * customer / agent / system / internal-note bubbles (aligned + tinted by author,
 * with the author role in text so it's not color-only), plus a text field and a
 * "Reply" button that reports the trimmed draft via `onReply`. Handles the
 * `loading` and empty-thread states. The composer can be controlled
 * (`replyValue` + `onChangeReply`) or uncontrolled. Token colors only.
 */
export function ConversationPanel({
  messages,
  loading = false,
  emptyText = 'No messages yet.',
  replyValue,
  onChangeReply,
  onReply,
  sendLabel = 'Reply',
  hideComposer = false,
  disabled = false,
  style,
}: ConversationPanelProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const controlled = replyValue !== undefined;
  const [draft, setDraft] = React.useState('');
  const text = controlled ? (replyValue as string) : draft;

  const setText = (next: string): void => {
    if (!controlled) setDraft(next);
    onChangeReply?.(next);
  };

  const submit = (): void => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onReply?.(trimmed);
    if (!controlled) setDraft('');
  };

  const body = loading ? (
    <View accessibilityLabel="Loading conversation" style={{ padding: tokens.spacing.lg, gap: tokens.spacing.sm }}>
      {[0, 1, 2].map((i) => (
        <View
          key={i}
          style={{
            height: 40,
            borderRadius: tokens.radius.md,
            width: i % 2 === 0 ? '60%' : '75%',
            alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end',
            backgroundColor: withAlpha(colors.onSurface, 0.08),
          }}
        />
      ))}
    </View>
  ) : messages.length === 0 ? (
    <View
      accessibilityRole="text"
      accessibilityLabel={emptyText}
      style={{ padding: tokens.spacing.xl, alignItems: 'center' }}
    >
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyText}</Text>
    </View>
  ) : (
    <ScrollView contentContainerStyle={{ padding: tokens.spacing.md, gap: tokens.spacing.sm }}>
      {messages.map((m) => {
        const isAgent = m.author === 'agent';
        const isSystem = m.author === 'system';
        const roleLabel = m.internal
          ? 'Internal note'
          : m.author === 'agent'
            ? 'Agent'
            : m.author === 'customer'
              ? 'Customer'
              : 'System';
        const bubbleBg = m.internal
          ? withAlpha(colors.warn, 0.14)
          : isSystem
            ? withAlpha(colors.onSurface, 0.06)
            : isAgent
              ? withAlpha(colors.primary, 0.14)
              : colors.surface;
        const fg = colors.onSurface;
        return (
          <View
            key={m.id}
            accessible
            accessibilityLabel={`${roleLabel}${m.authorName ? ` ${m.authorName}` : ''}: ${m.body}`}
            style={{
              alignSelf: isSystem ? 'center' : isAgent ? 'flex-end' : 'flex-start',
              maxWidth: isSystem ? '90%' : '82%',
              backgroundColor: bubbleBg,
              borderColor: colors.border,
              borderWidth: m.author === 'customer' ? 1 : 0,
              borderRadius: tokens.radius.md,
              paddingVertical: tokens.spacing.xs,
              paddingHorizontal: tokens.spacing.sm,
            }}
          >
            <View style={{ flexDirection: 'row', gap: tokens.spacing.xs, marginBottom: 2 }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                {m.internal ? '🔒 ' : ''}
                {m.authorName ?? roleLabel}
              </Text>
              {m.timeLabel ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{m.timeLabel}</Text>
              ) : null}
            </View>
            <Text style={{ color: fg, fontSize: tokens.typography.scale.sm }}>{m.body}</Text>
          </View>
        );
      })}
    </ScrollView>
  );

  return (
    <View style={[{ flex: 1 }, style]}>
      <View style={{ flex: 1 }}>{body}</View>
      {hideComposer ? null : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: tokens.spacing.sm,
            padding: tokens.spacing.sm,
            borderTopColor: colors.border,
            borderTopWidth: 1,
          }}
        >
          <TextInput
            accessibilityLabel="Reply message"
            value={text}
            onChangeText={setText}
            editable={!disabled}
            multiline
            placeholder="Write a reply…"
            placeholderTextColor={colors.muted}
            style={{
              flex: 1,
              minHeight: 40,
              maxHeight: 120,
              color: colors.onSurface,
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: tokens.radius.md,
              paddingHorizontal: tokens.spacing.sm,
              paddingVertical: tokens.spacing.xs,
              fontSize: tokens.typography.scale.sm,
            }}
          />
          <Button size="sm" onPress={submit} disabled={disabled || text.trim().length === 0}>
            {sendLabel}
          </Button>
        </View>
      )}
    </View>
  );
}
