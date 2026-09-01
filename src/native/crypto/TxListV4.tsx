import * as React from 'react';
import { View, type DimensionValue } from 'react-native';
import { useXenitionTheme } from '../theme';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { rowContainerStyle, rowSeparatorStyle, rowTextStyle } from '../dashboard/internal/row-v4';
import { TxRowV4 } from './TxRowV4';
import { skeletonFill } from './internal/market-v4';
import type { TxListProps } from './TxRow';

export interface TxListV4Props extends TxListProps {
  /** The feed is still fetching. Draws skeleton rows, not the empty state. */
  loading?: boolean;
  /** Announced while the feed loads. Default `'Loading transactions'`. */
  loadingLabel?: string;
}

/** How many ghost rows a loading feed shows. Enough to read as a list. */
const SKELETON_ROWS = 3;

/**
 * **V4 transaction list** — same props as {@link TxList} plus `loading` and
 * `loadingLabel`.
 *
 * ## Three changes
 *
 * 1. **A feed that is still fetching says so.** The base had no loading state
 *    at all, so a wallet whose history had not arrived yet rendered **"No
 *    transactions"** — indistinguishable from a wallet that has never
 *    transacted, and the more alarming of the two readings. `loading` draws
 *    skeleton rows in the shape the feed is about to take.
 * 2. **A row's own handler is not silently overridden.** The base wrote
 *    `onPress={onSelectItem ? () => onSelectItem(item, index) : item.onPress}`,
 *    so passing a list-level handler discarded every per-row one. The row's
 *    handler wins now and the list's is the fallback.
 * 3. **The empty state moves the user forward** — a headline and a next step
 *    through the V4 empty state, rather than the older dashed placeholder.
 */
export function TxListV4({
  items,
  emptyTitle = 'No transactions',
  emptyDescription,
  loading = false,
  loadingLabel = 'Loading transactions',
  onSelectItem,
  style,
}: TxListV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  if (loading) {
    const band = (width: DimensionValue, height: number): React.ReactElement => (
      <View
        style={{
          height,
          width,
          borderRadius: tokens.radius.sm,
          backgroundColor: skeletonFill(theme),
        }}
      />
    );
    return (
      <View accessible accessibilityLabel={loadingLabel} style={style}>
        {Array.from({ length: SKELETON_ROWS }, (_, i) => (
          <View key={i} style={rowContainerStyle(theme, { twoLine: true })}>
            {band('25%', tokens.spacing.lg)}
            <View style={rowTextStyle(theme)}>
              {band('55%', tokens.typography.scale.sm)}
              {band('30%', tokens.typography.scale.xs)}
            </View>
            {band('20%', tokens.typography.scale.base)}
          </View>
        ))}
      </View>
    );
  }

  const rows = Array.isArray(items) ? items : [];

  if (rows.length === 0) {
    return (
      <View style={style}>
        <EmptyStateV4 title={emptyTitle} description={emptyDescription} />
      </View>
    );
  }

  return (
    <View style={style}>
      {rows.map((item, index) => (
        <View key={`${item.hash}-${index}`}>
          <TxRowV4
            {...item}
            // The row's own handler first. A list-level `onSelectItem` is the
            // fallback, not an override.
            onPress={item.onPress ?? (onSelectItem ? () => onSelectItem(item, index) : undefined)}
          />
          {index < rows.length - 1 ? <View style={rowSeparatorStyle(theme)} /> : null}
        </View>
      ))}
    </View>
  );
}
