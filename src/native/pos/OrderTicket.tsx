import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives/Card';
import { Button } from '../primitives/Button';
import { EmptyState } from '../commerce/EmptyState';
import { StatusPill } from './StatusPill';
import { TICKET_STATUS_META, type TicketStatus } from './internal';

export interface OrderTicketItem {
  /** Item name. */
  name: string;
  /** Quantity (default 1). */
  quantity?: number;
  /** Modifier / option chips. */
  modifiers?: string[];
  /** Kitchen note. */
  note?: string;
  /** Line already completed — struck + muted. */
  done?: boolean;
}

export type OrderTicketVariant = 'default' | 'compact';

export interface OrderTicketProps {
  /** Ticket / order reference shown in the header. */
  orderNumber: string;
  /** Destination (table, "Takeaway", delivery zone). */
  destination?: string;
  /** Server / channel label. */
  server?: string;
  /** Kitchen lifecycle status — glyph + word pill (never color alone). */
  status?: TicketStatus;
  /** Pre-formatted elapsed / placed time (e.g. "4m ago"). */
  elapsed?: string;
  /** Line items. When empty a labelled {@link EmptyState} renders. */
  items: OrderTicketItem[];
  /** Advance-status handler; renders a bump button when provided. */
  onBump?: () => void;
  /** Copy for the bump button (default derived from status). */
  bumpLabel?: string;
  /** Tap handler for the whole ticket. */
  onPress?: () => void;
  /** `default` shows modifiers/notes; `compact` lists names only. */
  variant?: OrderTicketVariant;
  /** Empty-state copy when the ticket has no items. */
  emptyLabel?: string;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

const NEXT_LABEL: Record<TicketStatus, string> = {
  new: 'Start',
  preparing: 'Ready',
  ready: 'Serve',
  served: 'Done',
  void: 'Void',
};

/**
 * A kitchen / fulfilment order ticket: header (order ref, destination, server,
 * elapsed time) with a **glyph + word** status pill, the item list with
 * modifiers and notes (completed lines struck + muted, state by text not color),
 * and an optional bump button that advances the ticket. An empty ticket renders
 * an {@link EmptyState}. Composed from `Card` + `Button` + `StatusPill`;
 * token-only colors.
 */
export function OrderTicket({
  orderNumber,
  destination,
  server,
  status,
  elapsed,
  items,
  onBump,
  bumpLabel,
  onPress,
  variant = 'default',
  emptyLabel = 'No items on this ticket',
  testID,
  style,
}: OrderTicketProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';

  const body = (
    <Card variant="outlined" padding={compact ? 'sm' : 'md'} style={[{ gap: tokens.spacing.sm }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            #{orderNumber}
            {destination ? <Text style={{ color: colors.muted, fontWeight: '400' }}>{`  ${destination}`}</Text> : null}
          </Text>
          {server || elapsed ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {[server, elapsed].filter(Boolean).join(' · ')}
            </Text>
          ) : null}
        </View>
        {status ? <StatusPill meta={TICKET_STATUS_META[status]} variant="soft" size="sm" /> : null}
      </View>

      {items.length === 0 ? (
        <EmptyState title={emptyLabel} />
      ) : (
        <View style={{ gap: tokens.spacing.xs }}>
          {items.map((item, i) => {
            const qty = item.quantity ?? 1;
            const itemColor = item.done ? colors.muted : colors.onSurface;
            return (
              <View key={i} style={{ gap: 2, opacity: item.done ? 0.6 : 1 }}>
                <Text
                  style={{
                    color: itemColor,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '600',
                    textDecorationLine: item.done ? 'line-through' : 'none',
                  }}
                >
                  {qty > 1 ? `${qty}× ` : ''}
                  {item.name}
                </Text>
                {!compact && item.modifiers && item.modifiers.length > 0 ? (
                  <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                    {item.modifiers.join(' · ')}
                  </Text>
                ) : null}
                {!compact && item.note ? (
                  <Text style={{ color: colors.warn, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                    ⚠ {item.note}
                  </Text>
                ) : null}
              </View>
            );
          })}
        </View>
      )}

      {onBump ? (
        <Button
          size="sm"
          variant="secondary"
          onPress={onBump}
          style={{ alignSelf: 'flex-start' }}
        >
          {bumpLabel ?? (status ? NEXT_LABEL[status] : 'Bump')}
        </Button>
      ) : null}
    </Card>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Ticket ${orderNumber}${status ? `, ${TICKET_STATUS_META[status].label}` : ''}`}
        onPress={onPress}
        testID={testID}
      >
        {body}
      </Pressable>
    );
  }
  return <View testID={testID}>{body}</View>;
}
