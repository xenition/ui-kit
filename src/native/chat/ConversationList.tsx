import * as React from 'react';
import { ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Spinner } from '../primitives';
import { ConversationRow, type ConversationRowProps } from './ConversationRow';

/** A conversation item — the row props plus a stable id for keying/callbacks. */
export interface ConversationListItem extends Omit<ConversationRowProps, 'onPress' | 'onLongPress'> {
  id: string;
}

export interface ConversationListProps {
  /**
   * Conversation data. Each item is rendered as a `ConversationRow`. Omit to
   * supply `ConversationRow` children directly instead.
   */
  items?: ConversationListItem[];
  /** Called with the item id when a row is tapped. */
  onPressItem?: (id: string) => void;
  /** Called with the item id on long-press (context actions). */
  onLongPressItem?: (id: string) => void;
  /** Show the loading state (spinner) instead of rows. */
  loading?: boolean;
  /** Empty-state message when there are no items/children (default provided). */
  emptyLabel?: string;
  /** Divider line between rows (default true). */
  dividers?: boolean;
  /** Custom `ConversationRow` children (used when `items` is not provided). */
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Scrollable inbox / DM list. Pass `items` for the data-driven path (each mapped
 * to a `ConversationRow`) or `children` for full control. Handles `loading` and
 * empty states out of the box and exposes the `list` role. No literal colors.
 */
export function ConversationList({
  items,
  onPressItem,
  onLongPressItem,
  loading = false,
  emptyLabel = 'No conversations yet',
  dividers = true,
  children,
  style,
}: ConversationListProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (loading) {
    return (
      <View
        accessibilityRole="progressbar"
        accessibilityLabel="Loading conversations"
        style={[{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: tokens.spacing.xl }, style]}
      >
        <Spinner size="lg" />
      </View>
    );
  }

  const usingItems = items != null;
  const isEmpty = usingItems ? items.length === 0 : React.Children.count(children) === 0;

  if (isEmpty) {
    return (
      <View
        accessibilityRole="summary"
        style={[{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: tokens.spacing.xl }, style]}
      >
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.base,
            textAlign: 'center',
          }}
        >
          {emptyLabel}
        </Text>
      </View>
    );
  }

  const Divider = (
    <View style={{ height: 1, marginLeft: tokens.spacing.md, backgroundColor: colors.border }} />
  );

  return (
    <ScrollView
      accessibilityRole="list"
      style={[{ flex: 1, backgroundColor: colors.surface }, style]}
      keyboardShouldPersistTaps="handled"
    >
      {usingItems
        ? items.map((item, i) => {
            const { id, ...rowProps } = item;
            return (
              <View key={id}>
                <ConversationRow
                  {...rowProps}
                  onPress={() => onPressItem?.(id)}
                  onLongPress={() => onLongPressItem?.(id)}
                />
                {dividers && i < items.length - 1 ? Divider : null}
              </View>
            );
          })
        : children}
    </ScrollView>
  );
}
