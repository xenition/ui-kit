import * as React from 'react';
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
    onClick?: () => void;
    className?: string;
}
/**
 * A navigation row for a mailbox / folder in the mail sidebar — leading glyph,
 * name, and an optional unread count. A real `<button>`. The `selected` state
 * tints the row with a token-derived primary wash and colors the label with the
 * primary slot, and reports `aria-current` so it isn't signalled by color
 * alone. Indents by `depth` for nested folders. No literal colors.
 */
export declare const FolderRow: React.ForwardRefExoticComponent<FolderRowProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=FolderRow.d.ts.map