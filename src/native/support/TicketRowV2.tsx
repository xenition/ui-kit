import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { appearanceStyle } from '../primitives/internal/appearance';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import { withAlpha } from './internal';
import { type Priority } from './TicketPriority';
import { type TicketStatus, type TicketRowProps } from './TicketRow';

/** Drop-in alternate design for {@link TicketRow}. Identical public contract. */
export type TicketRowV2Props = TicketRowProps;

interface StatusSpec {
  badge: BadgeTone;
  glyph: string;
  label: string;
}

const STATUS: Record<TicketStatus, StatusSpec> = {
  open: { badge: 'primary', glyph: '◉', label: 'Open' },
  pending: { badge: 'warn', glyph: '◐', label: 'Pending' },
  solved: { badge: 'success', glyph: '✓', label: 'Solved' },
  closed: { badge: 'neutral', glyph: '✕', label: 'Closed' },
};

interface PrioritySpec {
  fill: keyof SemanticColors;
  text: keyof SemanticColors;
  glyph: string;
  label: string;
}

const PRIORITY: Record<Priority, PrioritySpec> = {
  low: { fill: 'muted', text: 'muted', glyph: '▽', label: 'Low' },
  normal: { fill: 'primary', text: 'primaryText', glyph: '▷', label: 'Normal' },
  high: { fill: 'warn', text: 'warnText', glyph: '△', label: 'High' },
  urgent: { fill: 'danger', text: 'dangerText', glyph: '⚑', label: 'Urgent' },
};

interface SlaSpec {
  fill: keyof SemanticColors;
  text: keyof SemanticColors;
  glyph: string;
  label: string;
}

function slaFor(status: TicketStatus, priority: Priority | undefined): SlaSpec | null {
  if (status === 'solved' || status === 'closed') return null;
  if (priority === 'urgent') return { fill: 'danger', text: 'dangerText', glyph: '⚠', label: 'SLA breached' };
  if (priority === 'high') return { fill: 'warn', text: 'warnText', glyph: '◔', label: 'SLA at risk' };
  return { fill: 'success', text: 'successText', glyph: '✓', label: 'SLA on track' };
}

/**
 * TicketRow — **V2 (card)**. A raised card with a priority-tinted left rail, a
 * requester header, a status pill, an SLA chip and an unread badge. Same
 * `TicketRowProps` as {@link TicketRow}; swap the import to restyle. Status /
 * priority / SLA are carried by glyph + text, never color alone; all colors
 * trace to tokens.
 */
export function TicketRowV2({
  ticket,
  onPress,
  loading = false,
  selected = false,
  style,
}: TicketRowV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const enter = useEnter();

  const card = (children: React.ReactNode, a11yLabel?: string, onTap?: () => void): React.ReactElement => (
    <Animated.View
      style={[
        { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] },
        { marginVertical: tokens.spacing.xs, marginHorizontal: tokens.spacing.sm },
        style,
      ]}
    >
      <Pressable
        accessibilityRole={onTap ? 'button' : 'none'}
        accessibilityState={{ selected }}
        accessibilityLabel={a11yLabel}
        onPress={onTap}
        onPressIn={onTap ? press.onPressIn : undefined}
        onPressOut={onTap ? press.onPressOut : undefined}
        style={[
          appearanceStyle('elevated', colors, tokens),
          {
            borderRadius: tokens.radius.lg,
            overflow: 'hidden',
            padding: tokens.spacing.md,
            paddingLeft: tokens.spacing.md + 6,
            backgroundColor: selected ? withAlpha(colors.primary, 0.08) : colors.surface,
          },
        ]}
      >
        {children}
      </Pressable>
    </Animated.View>
  );

  if (loading) {
    return card(
      <View accessibilityLabel="Loading ticket" style={{ gap: tokens.spacing.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
          <View style={{ height: 12, width: '50%', borderRadius: 4, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
        </View>
        <View style={{ height: 14, width: '80%', borderRadius: 4, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
        <View style={{ height: 10, width: '40%', borderRadius: 4, backgroundColor: withAlpha(colors.onSurface, 0.08) }} />
      </View>,
      'Loading ticket'
    );
  }

  const status = STATUS[ticket.status] ?? STATUS.open;
  const priority = ticket.priority ? PRIORITY[ticket.priority] : null;
  const sla = slaFor(ticket.status, ticket.priority);
  const railColor = priority ? colors[priority.fill] : colors.border;
  const unread = typeof ticket.unread === 'number' && ticket.unread > 0 ? ticket.unread : 0;

  const a11y = `Ticket: ${ticket.subject}, ${status.label}${
    priority ? `, priority ${priority.label}` : ''
  }${sla ? `, ${sla.label}` : ''}${ticket.requester ? `, from ${ticket.requester}` : ''}${
    unread ? `, ${unread} unread` : ''
  }`;

  return card(
    <>
      {/* Priority rail */}
      <View
        style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, backgroundColor: railColor }}
      />
      <View style={{ gap: tokens.spacing.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Avatar size="sm" name={ticket.requester} src={ticket.requesterAvatar} />
          <Text
            numberOfLines={1}
            style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
          >
            {ticket.requester ?? 'Unknown requester'}
          </Text>
          <Badge tone={status.badge} variant="soft" size="sm">
            {`${status.glyph} ${status.label}`}
          </Badge>
        </View>

        <Text
          numberOfLines={2}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {ticket.subject}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
          {sla ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                backgroundColor: withAlpha(colors[sla.fill], 0.14),
                borderRadius: tokens.radius.full,
                paddingVertical: 2,
                paddingHorizontal: tokens.spacing.sm,
              }}
            >
              <Text style={{ color: colors[sla.text], fontSize: tokens.typography.scale.xs }}>{sla.glyph}</Text>
              <Text style={{ color: colors[sla.text], fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                {sla.label}
              </Text>
            </View>
          ) : null}
          {priority ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <Text style={{ color: colors[priority.text], fontSize: tokens.typography.scale.xs }}>{priority.glyph}</Text>
              <Text style={{ color: colors[priority.text], fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                {priority.label}
              </Text>
            </View>
          ) : null}
          <View style={{ flex: 1 }} />
          {ticket.updatedLabel ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{ticket.updatedLabel}</Text>
          ) : null}
          {unread ? <Badge tone="primary" variant="solid" size="sm" count={unread} /> : null}
        </View>
      </View>
    </>,
    a11y,
    onPress ? () => onPress(ticket.id) : undefined
  );
}
