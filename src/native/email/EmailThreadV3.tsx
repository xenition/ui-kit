import * as React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Spinner, EmptyState } from '../primitives';
import { withAlpha } from './tint';
import { StarButton } from './StarButton';
import { AttachmentChip } from './AttachmentChip';
import { MailLabelChip } from './MailLabelChip';
import type { EmailThreadProps } from './EmailThread';

/** Same public contract as {@link EmailThread} — a drop-in alternate design. */
export type EmailThreadV3Props = EmailThreadProps;

/**
 * EmailThread — design V3. A **flat, quoted-style conversation**: each message
 * hangs off a colored vertical **sender rail** (like a quote block) instead of a
 * card, with no elevation — a calm, document-like read. Each message is
 * collapsible (body + attachments when open, snippet when closed). Handles
 * loading (spinner) and empty states. Same props as `EmailThread`. No literal
 * colors.
 */
export function EmailThreadV3({
  subject,
  messages,
  labels,
  expandedIds,
  onToggleMessage,
  onToggleStar,
  onPressAttachment,
  loading = false,
  style,
}: EmailThreadV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const safeMessages = messages ?? [];
  const safeLabels = labels ?? [];
  const expanded = new Set(
    expandedIds ?? (safeMessages.length > 0 ? [safeMessages[safeMessages.length - 1]!.id] : [])
  );

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
        safeMessages.map((m, i) => {
          const isOpen = expanded.has(m.id);
          const atts = m.attachments ?? [];
          // Alternate the rail tint per message so adjacent replies read distinctly.
          const railColor = i % 2 === 0 ? colors.primary : colors.accent;
          return (
            <View
              key={m.id}
              style={{
                marginHorizontal: tokens.spacing.md,
                marginVertical: tokens.spacing.xs,
                paddingLeft: tokens.spacing.md,
                borderLeftWidth: 3,
                borderLeftColor: isOpen ? railColor : withAlpha(railColor, 0.4),
              }}
            >
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${isOpen ? 'Collapse' : 'Expand'} message from ${m.sender}`}
                accessibilityState={{ expanded: isOpen }}
                onPress={() => onToggleMessage?.(m.id)}
                style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}
              >
                <Avatar size="sm" src={m.avatarUri} name={m.sender} />
                <View style={{ flex: 1 }}>
                  <Text
                    numberOfLines={1}
                    style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}
                  >
                    {m.sender}
                  </Text>
                  {!isOpen ? (
                    <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
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
                  size="sm"
                />
              </Pressable>

              {isOpen ? (
                <View style={{ marginTop: tokens.spacing.sm, gap: tokens.spacing.sm, paddingBottom: tokens.spacing.sm }}>
                  <Text
                    style={{
                      color: colors.onSurface,
                      fontSize: tokens.typography.scale.base,
                      lineHeight: tokens.typography.scale.base * 1.6,
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
