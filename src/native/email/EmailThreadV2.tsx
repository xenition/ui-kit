import * as React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Spinner, EmptyState } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { StarButton } from './StarButton';
import { AttachmentChip } from './AttachmentChip';
import { MailLabelChip } from './MailLabelChip';
import type { EmailThreadProps } from './EmailThread';

/** Same public contract as {@link EmailThread} — a drop-in alternate design. */
export type EmailThreadV2Props = EmailThreadProps;

/**
 * EmailThread — design V2. The conversation as a stack of **elevated, rounded
 * message cards** with clear gaps between them. Each card is collapsible:
 * expanded shows the body + attachments, collapsed shows sender + a one-line
 * snippet. Handles loading (spinner) and empty (no messages) states. Same props
 * as `EmailThread`. No literal colors.
 */
export function EmailThreadV2({
  subject,
  messages,
  labels,
  expandedIds,
  onToggleMessage,
  onToggleStar,
  onPressAttachment,
  loading = false,
  style,
}: EmailThreadV2Props): React.ReactElement {
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
    <ScrollView
      style={[{ backgroundColor: colors.surface }, style]}
      contentContainerStyle={{ padding: tokens.spacing.md, gap: tokens.spacing.md }}
    >
      <View style={{ gap: tokens.spacing.sm }}>
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
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.surface,
                padding: tokens.spacing.md,
                ...shadow(isOpen ? 'md' : 'sm', tokens),
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
                    style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
                  >
                    {m.sender}
                  </Text>
                  {!isOpen ? (
                    <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
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
                <View
                  style={{
                    marginTop: tokens.spacing.md,
                    paddingTop: tokens.spacing.md,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    gap: tokens.spacing.sm,
                  }}
                >
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
