import * as React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { VirtualListProps } from './VirtualList';

export type { VirtualListProps as VirtualListV4Props };

/**
 * `VirtualList`, V4 — a structural primitive, so the V4 changes are confined to
 * the three places it actually paints.
 *
 * ## What a recycling list is, and is not
 *
 * This component's job is a `FlatList` with a separator, an empty slot and a
 * loading slot. It has no surface of its own to restyle, no state to give
 * feedback for — the rows are whatever `renderItem` returns, and their
 * interactivity belongs to them — and no hierarchy to rebuild. Like `StackV4`,
 * most of it had nothing for a design line to disagree with.
 *
 * It is **not** an alias, because it does paint in three places:
 *
 * 1. **The empty line.** `muted` is a decorative slot with no contrast promise.
 *    "Nothing here yet" is the only thing on screen when it shows, so it takes
 *    `mutedText`, which does. §46 puts that ahead of quietness.
 * 2. **The spinner.** It gains an accessible label. A spinner with no name is
 *    invisible to a screen reader, and §37 asks that system status be visible —
 *    to everyone, not only to people looking at the pixels.
 * 3. **The separators.** These were already right — `colors.border` is
 *    scheme-resolved — so they stay. §9 would rather a list separated by
 *    spacing than by rules, but `separators` is a prop the caller sets, and a
 *    V4 that quietly ignored it would be answering a different question than
 *    the one it was asked.
 *
 * ## The empty state is still only as good as its copy
 *
 * §15 asks that an empty state say what belongs here and what to do next. This
 * one can only render the `emptyText` node it is handed, so what V4 adds is the
 * rhythm — centred, padded, legible — and nothing more. A list that wants the
 * full treatment should pass an `<EmptyStateV4>` as `emptyText`, which works
 * because the prop is a `ReactNode`. That is written here rather than left
 * implicit, because "the empty state is bad" is usually a call-site problem
 * that looks like a component problem.
 */
export function VirtualListV4<T>({
  data,
  renderItem,
  keyExtractor,
  estimatedItemSize,
  separators = true,
  emptyText = 'Nothing here yet',
  loading = false,
  style,
  contentContainerStyle,
}: VirtualListProps<T>): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (loading) {
    return (
      <View style={[{ padding: tokens.spacing.xl, alignItems: 'center' }, style]}>
        {/* A spinner with no name is invisible to a screen reader (§37, §46). */}
        <ActivityIndicator color={colors.primary} accessibilityLabel="Loading" />
      </View>
    );
  }

  const Separator = separators
    ? (): React.ReactElement => <View style={{ height: 1, backgroundColor: colors.border }} />
    : undefined;

  const Empty = (
    <View style={{ padding: tokens.spacing.xl, alignItems: 'center' }}>
      {typeof emptyText === 'string' ? (
        <Text
          style={{
            // `mutedText`, not `muted`: this line is the only thing on screen
            // when it shows, and `muted` carries no contrast promise.
            color: colors.mutedText,
            fontFamily: tokens.typography.fontBody,
            fontSize: tokens.typography.scale.sm,
            textAlign: 'center',
          }}
        >
          {emptyText}
        </Text>
      ) : (
        emptyText
      )}
    </View>
  );

  return (
    <FlatList<T>
      data={data as T[]}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={Empty}
      getItemLayout={
        estimatedItemSize != null
          ? (_, index) => ({
              length: estimatedItemSize,
              offset: estimatedItemSize * index,
              index,
            })
          : undefined
      }
      style={[{ backgroundColor: colors.surface }, style]}
      contentContainerStyle={contentContainerStyle}
    />
  );
}
