import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface InboxHeaderAction {
    id: string;
    /** Glyph rendered in the tap target. */
    glyph: string;
    /** Accessible label. */
    label: string;
    onPress?: () => void;
}
export interface InboxHeaderProps {
    /** Mailbox / folder title (e.g. "Inbox"). */
    title: string;
    /** Unread count shown next to the title. */
    unreadCount?: number;
    /** Back affordance; shown when provided. */
    onBack?: () => void;
    /** Trailing action buttons (search, compose, refresh…). */
    actions?: InboxHeaderAction[];
    /** Syncing state → shows a "Syncing…" caption under the title. */
    syncing?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * Top bar for an inbox / mailbox screen — optional back button, the folder
 * title with an unread count, an optional "Syncing…" caption, and a row of
 * trailing icon actions. Uses the `header` role and token-bound surface/border.
 * Data + callbacks only. No literal colors.
 */
export declare function InboxHeader({ title, unreadCount, onBack, actions, syncing, style, }: InboxHeaderProps): React.ReactElement;
//# sourceMappingURL=InboxHeader.d.ts.map