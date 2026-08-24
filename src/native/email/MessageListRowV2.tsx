import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Badge, Icon } from '../primitives';
import { usePressScale } from '../primitives/internal/motion';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from './tint';
import { StarButton } from './StarButton';
import { MailLabelChip } from './MailLabelChip';
import type { MessageListRowProps } from './MessageListRow';

/** Same public contract as {@link MessageListRow} — a drop-in alternate design. */
export type MessageListRowV2Props = MessageListRowProps;

/**
 * MessageListRow — design V2. A tappable **card row**: a large sender avatar on
 * the left, a two-line body preview, a trailing timestamp, and an "Unread" pill
 * for the unread state (in addition to bold text + a dot, so state is never
 * signalled by color alone). Press-scales on tap and floats on a soft shadow.
 * Same props as `MessageListRow`. No literal colors.
 */
export function MessageListRowV2({
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
}: MessageListRowV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
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
    <Animated.View style={[{ transform: [{ scale: press.scale }] }, style]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11yLabel}
        accessibilityState={{ selected }}
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: tokens.spacing.md,
          margin: tokens.spacing.sm,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: selected ? 1.5 : 0,
          borderColor: selected ? colors.primary : colors.border,
          backgroundColor: selected ? withAlpha(colors.primary, 0.06) : colors.surface,
          ...shadow('sm', tokens),
        }}
      >
        <View>
          <Avatar size="lg" src={avatarUri} name={sender} />
          {unread ? (
            <View
              accessibilityElementsHidden
              importantForAccessibility="no"
              style={{
                position: 'absolute',
                top: -2,
                right: -2,
                width: 12,
                height: 12,
                borderRadius: tokens.radius.full,
                borderWidth: 2,
                borderColor: colors.surface,
                backgroundColor: colors.primary,
              }}
            />
          ) : null}
        </View>

        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                color: colors.onSurface,
                fontSize: tokens.typography.scale.base,
                fontWeight: unread ? '700' : '600',
              }}
            >
              {sender}
            </Text>
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
                color: colors.onSurface,
                fontSize: tokens.typography.scale.sm,
                fontWeight: unread ? '700' : '500',
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
              numberOfLines={2}
              style={{
                color: colors.muted,
                fontSize: tokens.typography.scale.sm,
                lineHeight: tokens.typography.scale.sm * 1.4,
              }}
            >
              {preview}
            </Text>
          ) : null}

          <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
            {unread ? <Badge tone="primary" variant="soft" size="sm">New</Badge> : null}
            {count > 0 ? (
              <Badge tone="neutral" variant="outline" size="sm">
                {count > 99 ? '99+' : String(count)}
              </Badge>
            ) : null}
            {safeLabels.map((l) => (
              <MailLabelChip key={l.id} label={l.label} tone={l.tone ?? 'neutral'} />
            ))}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}
