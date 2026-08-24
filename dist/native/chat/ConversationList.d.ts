import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ConversationRowProps } from './ConversationRow';
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
export declare function ConversationList({ items, onPressItem, onLongPressItem, loading, emptyLabel, dividers, children, style, }: ConversationListProps): React.ReactElement;
//# sourceMappingURL=ConversationList.d.ts.map