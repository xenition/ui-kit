import * as React from 'react';
import { Animated, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { EmptyState } from '../commerce/EmptyState';
import { type Appearance } from '../primitives/internal/appearance';
import { useEnter } from '../primitives/internal/motion';
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
  /**
   * Surface treatment forwarded to every {@link TransactionRow}. Defaults to
   * `classic` — the historical borderless, divided rows, so this is opt-in only.
   */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

/**
 * One statement row wrapped in a mount-enter transition (a subcomponent so the
 * `useEnter` hook is called at a stable position, never inside a `.map`).
 */
function StatementRow({
  entry,
  index,
  isLast,
  appearance,
  onSelectItem,
}: {
  entry: StatementEntry;
  index: number;
  isLast: boolean;
  appearance: Appearance;
  onSelectItem?: (entry: StatementEntry, index: number) => void;
}): React.ReactElement {
  const { colors } = useXenitionTheme();
  const enter = useEnter();
  return (
    <Animated.View
      style={[
        enter,
        isLast ? undefined : { borderBottomWidth: 1, borderBottomColor: colors.border },
      ]}
    >
      <TransactionRow
        title={entry.title}
        subtitle={entry.subtitle}
        amountCents={entry.amountCents}
        currency={entry.currency}
        direction={entry.direction}
        date={entry.date}
        icon={entry.icon}
        appearance={appearance}
        onPress={onSelectItem ? () => onSelectItem(entry, index) : undefined}
      />
    </Animated.View>
  );
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
  appearance = 'classic',
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
        <StatementRow
          key={entry.id ?? String(index)}
          entry={entry}
          index={index}
          isLast={index === items.length - 1}
          appearance={appearance}
          onSelectItem={onSelectItem}
        />
      ))}
    </View>
  );
}
