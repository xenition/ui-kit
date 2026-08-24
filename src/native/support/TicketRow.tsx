import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { TicketPriority, type Priority } from './TicketPriority';
import { withAlpha } from './internal';

/** Lifecycle status of a support ticket. */
export type TicketStatus = 'open' | 'pending' | 'solved' | 'closed';

export interface Ticket {
  /** Stable id (used as the a11y key and returned to `onPress`). */
  id: string;
  /** Ticket subject line. */
  subject: string;
  /** Lifecycle status. */
  status: TicketStatus;
  /** Optional priority chip. */
  priority?: Priority;
  /** Requester display name (drives the avatar fallback). */
  requester?: string;
  /** Optional requester avatar URL. */
  requesterAvatar?: string;
  /** Human-readable "updated" hint (e.g. `"2h ago"`). */
  updatedLabel?: string;
  /** Unread reply count (renders a token badge when > 0). */
  unread?: number;
}

export interface TicketRowProps {
  /** The ticket to render. */
  ticket: Ticket;
  /** Fires with the ticket id when the row is tapped. */
  onPress?: (id: string) => void;
  /** Render a non-interactive skeleton placeholder. */
  loading?: boolean;
  /** Mark the row as currently selected (bg tint + a11y selected). */
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
}

interface StatusSpec {
  slot: keyof SemanticColors;
  glyph: string;
  label: string;
}

// open → primary, pending → warn, solved → success, closed → muted. Each has a
// distinct glyph so status is not color-only.
const STATUS: Record<TicketStatus, StatusSpec> = {
  open: { slot: 'primary', glyph: '◉', label: 'Open' },
  pending: { slot: 'warn', glyph: '◐', label: 'Pending' },
  solved: { slot: 'success', glyph: '✓', label: 'Solved' },
  closed: { slot: 'muted', glyph: '✕', label: 'Closed' },
};

/**
 * A single ticket row for a helpdesk queue/inbox — requester avatar, subject,
 * a glyph+label status marker, an optional priority chip, an updated-time hint,
 * and an unread badge. Tapping fires `onPress(id)`. Status is encoded by glyph
 * **and** text (not color alone). Supports a `loading` skeleton and a
 * `selected` state. Colors come only from `SemanticColors`/token tints — no
 * literal hex.
 */
export function TicketRow({
  ticket,
  onPress,
  loading = false,
  selected = false,
  style,
}: TicketRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (loading) {
    return (
      <View
        accessibilityRole="none"
        accessibilityLabel="Loading ticket"
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            padding: tokens.spacing.md,
            borderBottomColor: colors.border,
            borderBottomWidth: 1,
          },
          style,
        ]}
      >
        <View
          style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: withAlpha(colors.onSurface, 0.1) }}
        />
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <View style={{ height: 12, borderRadius: 4, width: '70%', backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
          <View style={{ height: 10, borderRadius: 4, width: '40%', backgroundColor: withAlpha(colors.onSurface, 0.08) }} />
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
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          padding: tokens.spacing.md,
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
      <Avatar size="md" name={ticket.requester} src={ticket.requesterAvatar} />
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {ticket.subject}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Text style={{ color: statusColor, fontSize: tokens.typography.scale.xs }}>{spec.glyph}</Text>
            <Text style={{ color: statusColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {spec.label}
            </Text>
          </View>
          {ticket.priority ? <TicketPriority level={ticket.priority} size="sm" /> : null}
          {ticket.updatedLabel ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {ticket.updatedLabel}
            </Text>
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
    </Pressable>
  );
}
