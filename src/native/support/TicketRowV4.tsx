import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { TicketPriority } from './TicketPriority';
import { withAlpha } from './internal';
import type { TicketRowProps, TicketStatus } from './TicketRow';

/** Drop-in for {@link TicketRowProps} — same props, the V4 "console" design. */
export type TicketRowV4Props = TicketRowProps;

interface StatusSpec {
  slot: keyof SemanticColors;
  glyph: string;
  label: string;
}

// open → primary, pending → warn, solved → success, closed → muted. Each has a
// distinct glyph so status is never color-only.
const STATUS: Record<TicketStatus, StatusSpec> = {
  open: { slot: 'primary', glyph: '◉', label: 'Open' },
  pending: { slot: 'warn', glyph: '◐', label: 'Pending' },
  solved: { slot: 'success', glyph: '✓', label: 'Solved' },
  closed: { slot: 'muted', glyph: '✕', label: 'Closed' },
};

/**
 * TicketRow — **V4** "console" design. The calm-workspace take on a queue row:
 * an elevated rounded card with a left status-accent bar (the signature at-a-
 * glance cue) and a soft-tint status pill carrying glyph + label. Requester
 * avatar, subject, optional priority chip, updated hint, and an unread badge.
 * Status is encoded by glyph **and** color (never color alone). Same
 * props/behavior as {@link TicketRowProps}; token-only colors via
 * `useXenitionTheme()`. Supports a `loading` skeleton and a `selected` state.
 */
export function TicketRowV4({
  ticket,
  onPress,
  loading = false,
  selected = false,
  style,
}: TicketRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const cardBase = {
    flexDirection: 'row' as const,
    backgroundColor: colors.card,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden' as const,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  };

  if (loading) {
    return (
      <View accessibilityLabel="Loading ticket" style={[cardBase, style]}>
        <View style={{ width: 4, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, padding: tokens.spacing.md, flex: 1 }}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            <View style={{ height: 12, borderRadius: 4, width: '70%', backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
            <View style={{ height: 10, borderRadius: 4, width: '40%', backgroundColor: withAlpha(colors.onSurface, 0.08) }} />
          </View>
        </View>
      </View>
    );
  }

  const spec = STATUS[ticket.status] ?? STATUS.open;
  const statusColor = colors[spec.slot];
  const unread = typeof ticket.unread === 'number' && ticket.unread > 0 ? ticket.unread : 0;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`Ticket: ${ticket.subject}, ${spec.label}${
        ticket.requester ? `, from ${ticket.requester}` : ''
      }${unread ? `, ${unread} unread` : ''}`}
      onPress={onPress ? () => onPress(ticket.id) : undefined}
      style={({ pressed }) => [
        cardBase,
        { backgroundColor: selected ? withAlpha(colors.primary, 0.1) : pressed ? withAlpha(colors.onSurface, 0.04) : colors.card },
        style,
      ]}
    >
      {/* Left status-accent bar — the V4 at-a-glance cue. */}
      <View style={{ width: 4, backgroundColor: statusColor }} />

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, padding: tokens.spacing.md, flex: 1 }}>
        <Avatar size="md" name={ticket.requester} src={ticket.requesterAvatar} />
        <View style={{ flex: 1, gap: 4 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {ticket.subject}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
            {/* Soft-tint status pill */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: 2,
                borderRadius: tokens.radius.full,
                backgroundColor: withAlpha(statusColor, 0.12),
              }}
            >
              <Text style={{ color: statusColor, fontSize: tokens.typography.scale.xs }}>{spec.glyph}</Text>
              <Text style={{ color: statusColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{spec.label}</Text>
            </View>
            {ticket.priority ? <TicketPriority level={ticket.priority} size="sm" /> : null}
            {ticket.updatedLabel ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{ticket.updatedLabel}</Text>
            ) : null}
          </View>
        </View>
        {unread ? (
          <View
            style={{
              minWidth: 20,
              paddingHorizontal: 6,
              height: 20,
              borderRadius: 10,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
              {unread > 99 ? '99+' : unread}
            </Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}
