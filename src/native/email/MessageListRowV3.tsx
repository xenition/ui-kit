import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { StarButton } from './StarButton';
import { MailLabelChip } from './MailLabelChip';
import type { MessageListRowProps } from './MessageListRow';

/** Same public contract as {@link MessageListRow} — a drop-in alternate design. */
export type MessageListRowV3Props = MessageListRowProps;

/**
 * MessageListRow — design V3. A **dense, Gmail-style line**: a leading unread
 * dot, the sender and subject stacked tight, and the timestamp pinned to the far
 * right. No avatar, minimal padding — built for long, scannable lists. Unread is
 * bold + dot + announced (never color alone). Same props as `MessageListRow`.
 * No literal colors.
 */
export function MessageListRowV3({
  sender,
  subject,
  preview,
  timestamp,
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
}: MessageListRowV3Props): React.ReactElement {
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
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.xs,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          backgroundColor: selected || pressed ? colors.border : colors.surface,
        },
        style,
      ]}
    >
      <View
        accessibilityElementsHidden
        importantForAccessibility="no"
        style={{
          width: 8,
          height: 8,
          borderRadius: tokens.radius.full,
          backgroundColor: unread ? colors.primary : 'transparent',
        }}
      />

      <View style={{ flex: 1, minWidth: 0 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              color: colors.onSurface,
              fontSize: tokens.typography.scale.sm,
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
                color: unread ? colors.primaryText : colors.muted,
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
              color: unread ? colors.onSurface : colors.muted,
              fontSize: tokens.typography.scale.xs,
              fontWeight: unread ? '600' : '400',
            }}
          >
            <Text style={{ color: colors.onSurface, fontWeight: unread ? '700' : '500' }}>{subject}</Text>
            {preview ? <Text style={{ color: colors.muted }}>{`  —  ${preview}`}</Text> : null}
          </Text>
          {onToggleStar ? (
            <StarButton starred={starred} onToggle={onToggleStar} size="sm" />
          ) : starred ? (
            <Icon glyph="★" size="sm" color="warn" accessibilityLabel="Starred" />
          ) : null}
        </View>

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
