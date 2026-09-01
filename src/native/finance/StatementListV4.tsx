import * as React from 'react';
import { Animated, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { TextV4 } from '../primitives/TextV4';
import { useEnter } from '../primitives/internal/motion';
import {
  rowContainerStyle,
  rowLeadingStyle,
  rowMetrics,
  rowSeparatorStyle,
  rowTextStyle,
} from '../dashboard/internal/row-v4';
import type { Appearance } from '../primitives/internal/appearance';
import { TransactionRowV4 } from './TransactionRowV4';
import { placeholderGround } from './internal/ledger-v4';
import type { StatementEntry, StatementListProps } from './StatementList';

export interface StatementListV4Props extends StatementListProps {
  /** Announced once while the feed loads. Default `'Loading transactions'`. */
  loadingLabel?: string;
}

/** How wide the two placeholder lines run, as a share of the text column. */
const SKELETON_WIDTHS = ['45%', '70%'] as const;

/**
 * One statement row wrapped in a mount-enter transition — a subcomponent so
 * the `useEnter` hook is called at a stable position, never inside a `.map`.
 */
function StatementRowV4({
  entry,
  index,
  currency,
  appearance,
  onSelectItem,
}: {
  entry: StatementEntry;
  index: number;
  currency?: string;
  appearance: Appearance;
  onSelectItem?: (entry: StatementEntry, index: number) => void;
}): React.ReactElement {
  const enter = useEnter();
  return (
    <Animated.View style={enter}>
      <TransactionRowV4
        title={entry.title}
        subtitle={entry.subtitle}
        amountCents={entry.amountCents}
        currency={entry.currency ?? currency}
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
 * **V4 statement list** — same props as {@link StatementList} plus
 * `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **The loading state is the shape of the list.** Four flat bars at
 *    `colors.border` — the *hairline* colour, at `opacity: 0.5`, so a
 *    different colour on every ground — became four ghost rows with a leading
 *    slot, two text lines and an amount, drawn in the shared opaque skeleton.
 * 2. **`loadingRows={0}` draws no skeletons.** `Math.max(1, loadingRows)`
 *    made zero mean one, so a caller who asked for a quiet load got a row
 *    anyway.
 * 3. **The load is announced once.** Every placeholder carried
 *    `accessibilityLabel="Loading transaction"`, so a reader heard it four
 *    times and learned nothing the first time did not say.
 * 4. **An entry with no `currency` does not silently become USD.** It inherits
 *    the currency the list is already stating — the first entry that declares
 *    one — instead of falling through to a dollar sign on a euro statement.
 * 5. **The separator is a real rule between rows**, so the last row no longer
 *    trails a hairline off the end of the list, and it is inset to clear the
 *    leading slot.
 */
export function StatementListV4({
  items,
  header,
  onSelectItem,
  loading = false,
  loadingRows = 4,
  emptyTitle = 'No transactions',
  emptyDescription,
  loadingLabel = 'Loading transactions',
  appearance = 'classic',
  style,
}: StatementListV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  const metrics = rowMetrics(theme);

  const headerNode =
    header != null ? (
      <TextV4
        size="xs"
        weight="semibold"
        tone="mutedText"
        style={{ textTransform: 'uppercase', marginBottom: tokens.spacing.xs }}
      >
        {header}
      </TextV4>
    ) : null;

  if (loading) {
    const rows = Number.isFinite(loadingRows) ? Math.max(0, Math.trunc(loadingRows)) : 0;
    return (
      <View style={style}>
        {headerNode}
        {rows > 0 ? (
          <View accessible accessibilityLabel={loadingLabel}>
            {Array.from({ length: rows }).map((_, i) => (
              <View key={i} style={rowContainerStyle(theme, { twoLine: true })}>
                <View
                  style={[
                    rowLeadingStyle(theme),
                    {
                      borderRadius: tokens.radius.full,
                      backgroundColor: placeholderGround(theme),
                    },
                  ]}
                />
                <View style={rowTextStyle(theme)}>
                  {SKELETON_WIDTHS.map((width) => (
                    <View
                      key={width}
                      style={{
                        height: tokens.typography.scale.sm,
                        width,
                        borderRadius: tokens.radius.sm,
                        backgroundColor: placeholderGround(theme),
                      }}
                    />
                  ))}
                </View>
                <View
                  style={{
                    height: tokens.typography.scale.base,
                    width: metrics.leading,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: placeholderGround(theme),
                  }}
                />
              </View>
            ))}
          </View>
        ) : null}
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={style}>
        {headerNode}
        <EmptyStateV4 title={emptyTitle} description={emptyDescription} />
      </View>
    );
  }

  // The list states one currency; an entry that names none inherits it rather
  // than falling through to `TransactionRow`'s USD default.
  const currency = items.find((entry) => entry.currency != null)?.currency;

  return (
    <View style={style}>
      {headerNode}
      {items.map((entry, index) => (
        <React.Fragment key={entry.id ?? String(index)}>
          {index > 0 ? <View style={rowSeparatorStyle(theme, { inset: true })} /> : null}
          <StatementRowV4
            entry={entry}
            index={index}
            currency={currency}
            appearance={appearance}
            onSelectItem={onSelectItem}
          />
        </React.Fragment>
      ))}
    </View>
  );
}
