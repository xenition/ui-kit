import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { StatusDot, type StatusDotTone } from '../primitives/StatusDot';
import { withAlpha } from './internal';
import { type Priority } from './TicketPriority';
import { type TicketStatus, type TicketRowProps } from './TicketRow';

/** Drop-in alternate design for {@link TicketRow}. Identical public contract. */
export type TicketRowV3Props = TicketRowProps;

const STATUS: Record<TicketStatus, { dot: StatusDotTone; glyph: string; label: string }> = {
  open: { dot: 'primary', glyph: '◉', label: 'Open' },
  pending: { dot: 'warn', glyph: '◐', label: 'Pending' },
  solved: { dot: 'success', glyph: '✓', label: 'Solved' },
  closed: { dot: 'muted', glyph: '✕', label: 'Closed' },
};

const PRIORITY: Record<Priority, { text: keyof SemanticColors; glyph: string; label: string }> = {
  low: { text: 'muted', glyph: '▽', label: 'Low' },
  normal: { text: 'primaryText', glyph: '▷', label: 'Normal' },
  high: { text: 'warnText', glyph: '△', label: 'High' },
  urgent: { text: 'dangerText', glyph: '⚑', label: 'Urgent' },
};

/**
 * TicketRow — **V3 (dense line)**. A single-line queue row: a status dot,
 * a truncated subject, a priority glyph, an updated-time hint and an unread
 * count — no avatar, minimal padding, built for long scannable lists. Same
 * `TicketRowProps` as {@link TicketRow}. Status/priority carried by glyph +
 * text; token colors only.
 */
export function TicketRowV3({
  ticket,
  onPress,
  loading = false,
  selected = false,
  style,
}: TicketRowV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (loading) {
    return (
      <View
        accessibilityLabel="Loading ticket"
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
            borderBottomColor: colors.border,
            borderBottomWidth: 1,
          },
          style,
        ]}
      >
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: withAlpha(colors.onSurface, 0.12) }} />
        <View style={{ flex: 1, height: 12, borderRadius: 4, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
      </View>
    );
  }

  const status = STATUS[ticket.status] ?? STATUS.open;
  const priority = ticket.priority ? PRIORITY[ticket.priority] : null;
  const unread = typeof ticket.unread === 'number' && ticket.unread > 0 ? ticket.unread : 0;

  const a11y = `Ticket: ${ticket.subject}, ${status.label}${
    priority ? `, priority ${priority.label}` : ''
  }${unread ? `, ${unread} unread` : ''}`;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={a11y}
      onPress={onPress ? () => onPress(ticket.id) : undefined}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.xs + 2,
          paddingHorizontal: tokens.spacing.md,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
          backgroundColor: selected
            ? withAlpha(colors.primary, 0.1)
            : pressed
              ? withAlpha(colors.onSurface, 0.04)
              : 'transparent',
        },
        style,
      ]}
    >
      <StatusDot tone={status.dot} pulse={ticket.status === 'open'} size={8} />
      {priority ? (
        <Text style={{ color: colors[priority.text], fontSize: tokens.typography.scale.sm }}>{priority.glyph}</Text>
      ) : null}
      <Text
        numberOfLines={1}
        style={{
          flex: 1,
          color: colors.onSurface,
          fontSize: tokens.typography.scale.sm,
          fontWeight: unread ? '700' : '500',
        }}
      >
        {ticket.subject}
      </Text>
      {ticket.updatedLabel ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{ticket.updatedLabel}</Text>
      ) : null}
      {unread ? (
        <View
          style={{
            minWidth: 18,
            paddingHorizontal: 5,
            height: 18,
            borderRadius: 9,
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
    </Pressable>
  );
}
