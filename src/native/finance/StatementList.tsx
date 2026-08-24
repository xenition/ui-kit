import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { EmptyState } from '../commerce/EmptyState';
import { TransactionRow, type TransactionDirection } from './TransactionRow';

/** One entry in a statement / transaction feed. */
export interface StatementEntry {
  /** Stable key for the row (falls back to the index when absent). */
  id?: string;
  title: string;
  subtitle?: string;
  amountCents: number;
  currency?: string;
  direction?: TransactionDirection;
  date?: string;
  icon?: string;
}

export interface StatementListProps {
  /** The rows to render (each a {@link TransactionRow}). */
  items: StatementEntry[];
  /** Optional section grouping header rendered above the list. */
  header?: string;
  /** Fires with the entry (and index) when a row is pressed. */
  onSelectItem?: (entry: StatementEntry, index: number) => void;
  /** Show skeleton placeholder rows instead of content. */
  loading?: boolean;
  /** How many skeleton rows to draw while `loading` (default `4`). */
  loadingRows?: number;
  /** Empty-state headline (default `No transactions`). */
  emptyTitle?: string;
  /** Empty-state supporting line. */
  emptyDescription?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A statement feed: an optional section header over a token-divided list of
 * {@link TransactionRow}s. Handles the three list states explicitly —
 * `loading` renders shimmer-less skeleton rows, an empty `items` array renders
 * an {@link EmptyState}, and otherwise each entry becomes a pressable row
 * (row keys guard against a missing `id` by falling back to the index). No
 * fetching; purely presentational and token-bound.
 */
export function StatementList({
  items,
  header,
  onSelectItem,
  loading = false,
  loadingRows = 4,
  emptyTitle = 'No transactions',
  emptyDescription,
  style,
}: StatementListProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const headerNode =
    header != null ? (
      <Text
        style={{
          color: colors.muted,
          fontSize: tokens.typography.scale.xs,
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          marginBottom: tokens.spacing.xs,
        }}
      >
        {header}
      </Text>
    ) : null;

  if (loading) {
    return (
      <View style={style}>
        {headerNode}
        {Array.from({ length: Math.max(1, loadingRows) }).map((_, i) => (
          <View
            key={i}
            accessibilityLabel="Loading transaction"
            style={{
              height: 44,
              borderRadius: tokens.radius.sm,
              backgroundColor: colors.border,
              opacity: 0.5,
              marginVertical: tokens.spacing.xs,
            }}
          />
        ))}
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={style}>
        {headerNode}
        <EmptyState title={emptyTitle} description={emptyDescription} />
      </View>
    );
  }

  return (
    <View style={style}>
      {headerNode}
      {items.map((entry, index) => (
        <View
          key={entry.id ?? String(index)}
          style={
            index < items.length - 1
              ? { borderBottomWidth: 1, borderBottomColor: colors.border }
              : undefined
          }
        >
          <TransactionRow
            title={entry.title}
            subtitle={entry.subtitle}
            amountCents={entry.amountCents}
            currency={entry.currency}
            direction={entry.direction}
            date={entry.date}
            icon={entry.icon}
            onPress={onSelectItem ? () => onSelectItem(entry, index) : undefined}
          />
        </View>
      ))}
    </View>
  );
}
