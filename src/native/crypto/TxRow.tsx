import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { MoneyAmount } from '../finance/MoneyAmount';
import { EmptyState } from '../commerce/EmptyState';
import { formatToken, truncateHash } from './internal/format';

/** On-chain lifecycle state of a transaction. */
export type TxStatus = 'pending' | 'confirmed' | 'failed';

/** Send (out) vs receive (in) — drives the amount sign/tone. */
export type TxDirection = 'send' | 'receive';

export interface TxRowProps {
  /** Transaction hash (truncated for display). */
  hash: string;
  /** Lifecycle state — rendered with a glyph AND label, never color alone. */
  status?: TxStatus;
  /** Send tints the amount `danger`, receive tints it `success`. */
  direction?: TxDirection;
  /** Amount in token units. */
  amount?: number;
  /** Token ticker for the amount. */
  symbol?: string;
  /** Fraction digits for the token amount (default `4`). */
  decimals?: number;
  /** Optional fiat value in integer **cents**. */
  valueCents?: number;
  /** ISO 4217 currency for the fiat value (default `USD`). */
  currency?: string;
  /** Right-aligned timestamp string (already localized by the caller). */
  timestamp?: string;
  /** Truncation lead/tail for the hash (default 6/4). */
  hashLead?: number;
  hashTail?: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const STATUS: Record<TxStatus, { label: string; glyph: string; slot: keyof SemanticColors }> = {
  pending: { label: 'Pending', glyph: '◷', slot: 'warn' },
  confirmed: { label: 'Confirmed', glyph: '✓', slot: 'success' },
  failed: { label: 'Failed', glyph: '✕', slot: 'danger' },
};

/**
 * One transaction in a history feed: a status pill (glyph + label, so state is
 * never color-only), a truncated hash, an optional signed token amount +
 * fiat value, and a timestamp. Send reads `danger`, receive reads `success`.
 * Amounts are fixed-precision — no float drift. Becomes a button when
 * `onPress` is set.
 */
export function TxRow({
  hash,
  status = 'confirmed',
  direction,
  amount,
  symbol,
  decimals = 4,
  valueCents,
  currency = 'USD',
  timestamp,
  hashLead = 6,
  hashTail = 4,
  onPress,
  style,
}: TxRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS[status];
  const short = truncateHash(hash, hashLead, hashTail);

  const signedAmount = direction && amount != null ? (direction === 'send' ? -Math.abs(amount) : Math.abs(amount)) : amount;
  const amountToneKey: keyof SemanticColors =
    direction === 'send' ? 'danger' : direction === 'receive' ? 'success' : 'onSurface';
  const amountPrefix = direction === 'send' ? '−' : direction === 'receive' ? '+' : '';

  const row = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View
        accessibilityLabel={meta.label}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          backgroundColor: tokens.ramps.neutral[100],
          borderRadius: tokens.radius.full,
          paddingVertical: 2,
          paddingHorizontal: tokens.spacing.sm,
        }}
      >
        <Text style={{ color: colors[meta.slot], fontSize: tokens.typography.scale.xs }}>{meta.glyph}</Text>
        <Text style={{ color: colors[meta.slot], fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          {meta.label}
        </Text>
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '600',
            fontVariant: ['tabular-nums'],
          }}
        >
          {short}
        </Text>
        {timestamp != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{timestamp}</Text>
        ) : null}
      </View>

      {signedAmount != null ? (
        <View style={{ alignItems: 'flex-end', gap: 2 }}>
          <Text
            style={{
              color: colors[amountToneKey],
              fontSize: tokens.typography.scale.base,
              fontWeight: '700',
              fontVariant: ['tabular-nums'],
            }}
          >
            {amountPrefix}
            {formatToken(Math.abs(signedAmount), { decimals, symbol })}
          </Text>
          {valueCents != null ? (
            <MoneyAmount cents={valueCents} currency={currency} tone="muted" size="sm" />
          ) : null}
        </View>
      ) : null}
    </View>
  );

  if (!onPress) return row;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Transaction ${short}, ${meta.label}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {row}
    </Pressable>
  );
}

export interface TxListProps {
  /** Transactions to render, newest first. */
  items: TxRowProps[];
  /** Empty-state headline (default `No transactions`). */
  emptyTitle?: string;
  /** Empty-state supporting line. */
  emptyDescription?: string;
  /** Fires with the row (and index) on press. */
  onSelectItem?: (item: TxRowProps, index: number) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A token-divided list of {@link TxRow}s with an explicit empty state. Row
 * keys fall back to the index when a `hash` collides. Purely presentational.
 */
export function TxList({
  items,
  emptyTitle = 'No transactions',
  emptyDescription,
  onSelectItem,
  style,
}: TxListProps): React.ReactElement {
  const { colors } = useXenitionTheme();

  if (items.length === 0) {
    return (
      <View style={style}>
        <EmptyState title={emptyTitle} description={emptyDescription} />
      </View>
    );
  }

  return (
    <View style={style}>
      {items.map((item, index) => (
        <View
          key={`${item.hash}-${index}`}
          style={
            index < items.length - 1
              ? { borderBottomWidth: 1, borderBottomColor: colors.border }
              : undefined
          }
        >
          <TxRow {...item} onPress={onSelectItem ? () => onSelectItem(item, index) : item.onPress} />
        </View>
      ))}
    </View>
  );
}
