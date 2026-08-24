import * as React from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Button } from '../primitives/Button';
import { withAlpha } from './internal';
import { type MessageAuthor, type ConversationPanelProps } from './ConversationPanel';

/** Drop-in alternate design for {@link ConversationPanel}. Identical contract. */
export type ConversationPanelV3Props = ConversationPanelProps;

interface AuthorSpec {
  rail: keyof SemanticColors;
  name: keyof SemanticColors;
  role: string;
  glyph: string;
}

const AUTHOR: Record<MessageAuthor, AuthorSpec> = {
  agent: { rail: 'primary', name: 'primaryText', role: 'Agent', glyph: '🎧' },
  customer: { rail: 'accent', name: 'accentText', role: 'Customer', glyph: '👤' },
  system: { rail: 'muted', name: 'muted', role: 'System', glyph: '⚙' },
};

/**
 * ConversationPanel — **V3 (flat quoted thread)**. An email-style transcript:
 * every message is a left sender rail + a role/name header + the body, laid out
 * flat (no bubbles, no side alignment) for a calm, readable log. Internal notes
 * get a warn rail and a lock glyph. Same `ConversationPanelProps` as
 * {@link ConversationPanel}. Sender is carried by rail + text; token colors
 * only. Handles loading and empty threads.
 */
export function ConversationPanelV3({
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
}: ConversationPanelV3Props): React.ReactElement {
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
    <View accessibilityLabel="Loading conversation" style={{ padding: tokens.spacing.md, gap: tokens.spacing.md }}>
      {[0, 1, 2].map((i) => (
        <View key={i} style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          <View style={{ width: 3, height: 44, borderRadius: 2, backgroundColor: withAlpha(colors.onSurface, 0.12) }} />
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            <View style={{ height: 10, width: '30%', borderRadius: 4, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
            <View style={{ height: 12, width: '85%', borderRadius: 4, backgroundColor: withAlpha(colors.onSurface, 0.08) }} />
          </View>
        </View>
      ))}
    </View>
  ) : messages.length === 0 ? (
    <View accessibilityRole="text" accessibilityLabel={emptyText} style={{ padding: tokens.spacing.xl, alignItems: 'center' }}>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyText}</Text>
    </View>
  ) : (
    <ScrollView contentContainerStyle={{ paddingVertical: tokens.spacing.sm }}>
      {messages.map((m) => {
        const spec = AUTHOR[m.author] ?? AUTHOR.system;
        const railColor = m.internal ? colors.warn : colors[spec.rail];
        const nameColor = m.internal ? colors.warnText : colors[spec.name];
        const roleText = m.internal ? 'Internal note' : spec.role;
        return (
          <View
            key={m.id}
            accessible
            accessibilityLabel={`${roleText}${m.authorName ? ` ${m.authorName}` : ''}: ${m.body}`}
            style={{
              flexDirection: 'row',
              gap: tokens.spacing.sm,
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.md,
              backgroundColor: m.internal ? withAlpha(colors.warn, 0.06) : 'transparent',
            }}
          >
            <View style={{ width: 3, borderRadius: 2, backgroundColor: railColor }} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, marginBottom: 2 }}>
                <Text style={{ fontSize: tokens.typography.scale.xs }}>{m.internal ? '🔒' : spec.glyph}</Text>
                <Text style={{ color: nameColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
                  {m.authorName ?? roleText}
                </Text>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>· {roleText}</Text>
                {m.timeLabel ? (
                  <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>· {m.timeLabel}</Text>
                ) : null}
              </View>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{m.body}</Text>
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
          <Button size="sm" variant="outline" onPress={submit} disabled={disabled || text.trim().length === 0}>
            {sendLabel}
          </Button>
        </View>
      )}
    </View>
  );
}
