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
import type { ConversationPanelProps } from './ConversationPanel';

/** Drop-in for {@link ConversationPanelProps} — same props, the V4 "console" design. */
export type ConversationPanelV4Props = ConversationPanelProps;

/**
 * ConversationPanel — **V4** "calm console" design. A quiet, legible support
 * thread: agent replies as soft-primary bubbles aligned right, customer messages
 * as surface + hairline bubbles aligned left, system notes centered, internal
 * notes with a warn tint — each aligned and tinted by author with the role in
 * text (never color-only). Muted timestamps, an inline reply composer with a
 * ≥44px send target, and the base's `loading` / empty states. Same
 * props/behavior as {@link ConversationPanelProps}; token-only colors via
 * `useXenitionTheme()`.
 */
export function ConversationPanelV4({
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
}: ConversationPanelV4Props): React.ReactElement {
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
            height: 40,
            borderRadius: tokens.radius.lg,
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
    <ScrollView contentContainerStyle={{ padding: tokens.spacing.md, gap: tokens.spacing.md }}>
      {messages.map((m) => {
        const isAgent = m.author === 'agent';
        const isSystem = m.author === 'system';
        const isCustomer = m.author === 'customer';
        const roleLabel = m.internal
          ? 'Internal note'
          : isAgent
            ? 'Agent'
            : isCustomer
              ? 'Customer'
              : 'System';
        const bubbleBg = m.internal
          ? withAlpha(colors.warn, 0.08)
          : isSystem
            ? withAlpha(colors.onSurface, 0.05)
            : isAgent
              ? withAlpha(colors.primary, 0.1)
              : colors.surface;
        const bordered = m.internal || isCustomer;
        return (
          <View
            key={m.id}
            accessible
            accessibilityLabel={`${roleLabel}${m.authorName ? ` ${m.authorName}` : ''}: ${m.body}`}
            style={{
              alignSelf: isSystem ? 'center' : isAgent ? 'flex-end' : 'flex-start',
              maxWidth: isSystem ? '90%' : '82%',
              backgroundColor: bubbleBg,
              borderColor: m.internal ? withAlpha(colors.warn, 0.4) : colors.border,
              borderWidth: bordered ? 1 : 0,
              borderRadius: tokens.radius.lg,
              paddingVertical: tokens.spacing.xs,
              paddingHorizontal: tokens.spacing.sm,
              shadowColor: colors.onSurface,
              shadowOpacity: 0.05,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
              elevation: 1,
            }}
          >
            <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, marginBottom: 2 }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
                {m.internal ? '🔒 ' : ''}
                {m.authorName ?? roleLabel}
              </Text>
              {m.timeLabel ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{m.timeLabel}</Text>
              ) : null}
            </View>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{m.body}</Text>
          </View>
        );
      })}
    </ScrollView>
  );

  return (
    <View style={[{ flex: 1 }, style as StyleProp<ViewStyle>]}>
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
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: tokens.radius.lg,
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
