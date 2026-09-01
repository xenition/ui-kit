import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives/Card';
import { Button } from '../primitives/Button';
import { EmptyState } from '../commerce/EmptyState';
import { StatusPill } from './StatusPill';
import { TICKET_STATUS_META, type TicketStatus } from './internal';
import type { OrderTicketProps } from './OrderTicket';

/** Drop-in for {@link OrderTicketProps} — same props, the V4 "register" design. */
export type OrderTicketV4Props = OrderTicketProps;

const NEXT_LABEL: Record<TicketStatus, string> = {
  new: 'Start',
  preparing: 'Ready',
  ready: 'Serve',
  served: 'Done',
  void: 'Void',
};

/**
 * OrderTicket — **V4** "register" design. A crisp kitchen/order ticket for fast
 * scanning: a **bold order number**, a **glyph + word** status pill (state by
 * icon + label, never color alone), the item list with modifiers and notes
 * (completed lines struck + muted), and the elapsed time. An optional bump button
 * advances the ticket; when `onPress` is set the whole card is a button. An empty
 * ticket renders an {@link EmptyState}. Same props/behavior as
 * {@link OrderTicketProps}; composed from `Card` + `Button` + `StatusPill`,
 * token-only colors via `useXenitionTheme()`.
 */
export function OrderTicketV4({
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
}: OrderTicketV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';

  const body = (
    <Card variant="outlined" padding={compact ? 'sm' : 'md'} style={[{ gap: tokens.spacing.sm }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
            #{orderNumber}
            {destination ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '400' }}>{`  ${destination}`}</Text>
            ) : null}
          </Text>
          {server || elapsed ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }}>
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
        <Button size="sm" variant="secondary" onPress={onBump} style={{ alignSelf: 'flex-start' }}>
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
