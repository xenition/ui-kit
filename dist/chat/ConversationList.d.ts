import * as React from 'react';
import { type ConversationRowProps } from './ConversationRow';
/** A conversation item — the row props plus a stable id for keying/callbacks. */
export interface ConversationListItem extends Omit<ConversationRowProps, 'onClick' | 'onLongPress'> {
    id: string;
}
export interface ConversationListProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Conversation data. Each item is rendered as a `ConversationRow`. Omit to
     * supply `ConversationRow` children directly instead.
     */
    items?: ConversationListItem[];
    /** Called with the item id when a row is clicked. */
    onPressItem?: (id: string) => void;
    /** Called with the item id on context-menu / long-press (context actions). */
    onLongPressItem?: (id: string) => void;
    /** Show the loading state (spinner) instead of rows. */
    loading?: boolean;
    /** Empty-state message when there are no items/children (default provided). */
    emptyLabel?: string;
    /** Divider line between rows (default true). */
    dividers?: boolean;
    /** Custom `ConversationRow` children (used when `items` is not provided). */
    children?: React.ReactNode;
}
/**
 * Scrollable inbox / DM list. Pass `items` for the data-driven path (each mapped
 * to a `ConversationRow`) or `children` for full control. Handles `loading` and
 * empty states out of the box and exposes the `list` role. No literal colors.
 */
export declare const ConversationList: React.ForwardRefExoticComponent<ConversationListProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ConversationList.d.ts.map