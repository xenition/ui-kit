import * as React from 'react';
import { FlatList, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { ConversationRowV4 } from './ConversationRowV4';
import { skeletonFill } from './internal/thread-v4';
import type { ConversationListProps } from './ConversationList';

export interface ConversationListV4Props extends ConversationListProps {
  /** Description under the empty label. */
  emptyDescription?: string;
}

/**
 * **V4 conversation list** — same props as {@link ConversationList} plus
 * `emptyDescription`.
 *
 * ## Three changes
 *
 * 1. **The loading state is a skeleton, not a spinner.** An inbox that shows
 *    three ghost rows tells the user what is coming; a spinner tells them to
 *    wait. The skeleton is opaque, mixed against the card's own ground.
 * 2. **The empty state explains itself** rather than showing one muted line.
 * 3. **The last row drops its separator**, which the base drew under every
 *    row including the final one — a hairline hanging off the end of a list.
 */
export function ConversationListV4({
  items = [],
  onPressItem,
  onLongPressItem,
  loading = false,
  emptyLabel = 'No conversations yet.',
  emptyDescription,
  dividers = true,
  children,
  style,
}: ConversationListV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  if (loading) {
    return (
      <View style={[{ gap: tokens.spacing.md, padding: tokens.spacing.md }, style]}>
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}
          >
            <View
              style={{
                width: tokens.spacing['2xl'],
                height: tokens.spacing['2xl'],
                borderRadius: tokens.radius.full,
                backgroundColor: skeletonFill(theme),
              }}
            />
            <View style={{ flex: 1, gap: tokens.spacing.xs }}>
              <View
                style={{
                  height: tokens.typography.scale.base,
                  width: '45%',
                  borderRadius: tokens.radius.sm,
                  backgroundColor: skeletonFill(theme),
                }}
              />
              <View
                style={{
                  height: tokens.typography.scale.sm,
                  width: '70%',
                  borderRadius: tokens.radius.sm,
                  backgroundColor: skeletonFill(theme),
                }}
              />
            </View>
          </View>
        ))}
      </View>
    );
  }

  if (children) return <View style={style}>{children}</View>;

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      style={style}
      ListEmptyComponent={
        <View
          accessibilityRole="summary"
          style={{ padding: tokens.spacing.xl, gap: tokens.spacing.xs }}
        >
          <TextV4 size="sm" weight="semibold" tone="onSurface" align="center">
            {emptyLabel}
          </TextV4>
          {emptyDescription ? (
            <TextV4 size="xs" tone="mutedText" align="center">
              {emptyDescription}
            </TextV4>
          ) : null}
        </View>
      }
      renderItem={({ item, index }) => (
        <ConversationRowV4
          {...item}
          // The base drew a separator under the final row too — a hairline
          // hanging off the end of the list.
          last={!dividers || index === items.length - 1}
          onPress={onPressItem ? () => onPressItem(item.id) : undefined}
          onLongPress={onLongPressItem ? () => onLongPressItem(item.id) : undefined}
        />
      )}
    />
  );
}
