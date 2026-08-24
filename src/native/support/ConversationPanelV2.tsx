import * as React from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { Button } from '../primitives/Button';
import { withAlpha } from './internal';
import { type ConversationPanelProps } from './ConversationPanel';

/** Drop-in alternate design for {@link ConversationPanel}. Identical contract. */
export type ConversationPanelV2Props = ConversationPanelProps;

function roleLabelFor(author: string, internal?: boolean): string {
  if (internal) return 'Internal note';
  if (author === 'agent') return 'Agent';
  if (author === 'customer') return 'Customer';
  return 'System';
}

/**
 * ConversationPanel — **V2 (avatar bubble thread)**. Chat-style bubbles with a
 * per-side avatar (customer left, agent right), a system chip in the centre,
 * and a rounded composer with a filled Send button. Same
 * `ConversationPanelProps` as {@link ConversationPanel}. Author role is in text
 * so it is never color-only; all colors trace to tokens. Handles loading and
 * empty threads.
 */
export function ConversationPanelV2({
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
}: ConversationPanelV2Props): React.ReactElement {
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
    <View accessibilityLabel="Loading conversation" style={{ padding: tokens.spacing.lg, gap: tokens.spacing.md }}>
      {[0, 1, 2].map((i) => (
        <View
          key={i}
          style={{
            flexDirection: 'row',
            gap: tokens.spacing.sm,
            alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end',
          }}
        >
          <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: withAlpha(colors.onSurface, 0.08) }} />
          <View
            style={{
              height: 40,
              width: 160,
              borderRadius: tokens.radius.lg,
              backgroundColor: withAlpha(colors.onSurface, 0.08),
            }}
          />
        </View>
      ))}
    </View>
  ) : messages.length === 0 ? (
    <View accessibilityRole="text" accessibilityLabel={emptyText} style={{ padding: tokens.spacing.xl, alignItems: 'center' }}>
      <Text style={{ fontSize: 28, marginBottom: tokens.spacing.sm }}>💬</Text>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyText}</Text>
    </View>
  ) : (
    <ScrollView contentContainerStyle={{ padding: tokens.spacing.md, gap: tokens.spacing.md }}>
      {messages.map((m) => {
        const isAgent = m.author === 'agent';
        const isSystem = m.author === 'system';
        const role = roleLabelFor(m.author, m.internal);

        if (isSystem) {
          return (
            <View key={m.id} accessible accessibilityLabel={`System: ${m.body}`} style={{ alignItems: 'center' }}>
              <View
                style={{
                  backgroundColor: withAlpha(colors.onSurface, 0.06),
                  borderRadius: tokens.radius.full,
                  paddingVertical: 2,
                  paddingHorizontal: tokens.spacing.md,
                }}
              >
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{m.body}</Text>
              </View>
            </View>
          );
        }

        const bubbleBg = m.internal
          ? withAlpha(colors.warn, 0.14)
          : isAgent
            ? withAlpha(colors.primary, 0.14)
            : colors.surface;

        return (
          <View
            key={m.id}
            accessible
            accessibilityLabel={`${role}${m.authorName ? ` ${m.authorName}` : ''}: ${m.body}`}
            style={{
              flexDirection: isAgent ? 'row-reverse' : 'row',
              alignItems: 'flex-end',
              gap: tokens.spacing.xs,
            }}
          >
            <Avatar
              size="sm"
              name={m.authorName ?? role}
              status={isAgent ? 'online' : undefined}
            />
            <View style={{ maxWidth: '76%' }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: tokens.spacing.xs,
                  marginBottom: 2,
                  justifyContent: isAgent ? 'flex-end' : 'flex-start',
                }}
              >
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                  {m.internal ? '🔒 ' : ''}
                  {m.authorName ?? role}
                </Text>
                {m.timeLabel ? (
                  <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{m.timeLabel}</Text>
                ) : null}
              </View>
              <View
                style={{
                  backgroundColor: bubbleBg,
                  borderColor: colors.border,
                  borderWidth: m.author === 'customer' ? 1 : 0,
                  borderRadius: tokens.radius.lg,
                  paddingVertical: tokens.spacing.sm,
                  paddingHorizontal: tokens.spacing.md,
                }}
              >
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{m.body}</Text>
              </View>
            </View>
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
              minHeight: 44,
              maxHeight: 120,
              color: colors.onSurface,
              backgroundColor: withAlpha(colors.onSurface, 0.04),
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: tokens.radius.full,
              paddingHorizontal: tokens.spacing.md,
              paddingVertical: tokens.spacing.sm,
              fontSize: tokens.typography.scale.sm,
            }}
          />
          <Button size="md" tone="primary" onPress={submit} disabled={disabled || text.trim().length === 0}>
            {sendLabel}
          </Button>
        </View>
      )}
    </View>
  );
}
