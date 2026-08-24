import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ListRowProps {
    title: string;
    /** Secondary line under the title. */
    meta?: string;
    /** Optional avatar image URL; when omitted, initials from `title` are shown. */
    avatarUrl?: string;
    /** Set false to omit the avatar entirely (plain text row). */
    showAvatar?: boolean;
    /** Custom leading slot; overrides the avatar. */
    leading?: React.ReactNode;
    /** Trailing slot: value text, badge, chevron, control, … */
    action?: React.ReactNode;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A generic list row: leading avatar/slot, title + meta, and a trailing action
 * slot. The workhorse row for lists of people, files, items, etc. Pressable
 * when `onPress` is provided. Token-only.
 */
export declare function ListRow({ title, meta, avatarUrl, showAvatar, leading, action, onPress, style, }: ListRowProps): React.ReactElement;
//# sourceMappingURL=ListRow.d.ts.map