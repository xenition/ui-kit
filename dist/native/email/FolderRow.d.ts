import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface FolderRowProps {
    /** Folder / mailbox name (e.g. "Inbox", "Sent"). */
    name: string;
    /** Leading glyph (emoji / symbol). */
    glyph?: string;
    /** Unread / item count; > 0 renders a trailing count. */
    count?: number;
    /** Selected/active folder — tinted background + accent text. */
    selected?: boolean;
    /** Nesting depth for sub-folders (indents the row). */
    depth?: number;
    /** Open the folder. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A navigation row for a mailbox / folder in the mail sidebar — leading glyph,
 * name, and an optional unread count. The `selected` state tints the row with a
 * token-derived primary wash and colors the label with the primary slot; the
 * accessibility state also reports `selected` so it isn't signalled by color
 * alone. Indents by `depth` for nested folders. No literal colors.
 */
export declare function FolderRow({ name, glyph, count, selected, depth, onPress, style, }: FolderRowProps): React.ReactElement;
//# sourceMappingURL=FolderRow.d.ts.map