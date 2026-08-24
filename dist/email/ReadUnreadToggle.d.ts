import * as React from 'react';
export interface ReadUnreadToggleProps {
    /** Current read state; `false` means the message is unread. */
    read?: boolean;
    /** Fires with the next read value when clicked. */
    onToggle?: (read: boolean) => void;
    /** Hide the text label and render icon-only (compact toolbars). */
    iconOnly?: boolean;
    /** Block interaction and dim. */
    disabled?: boolean;
    className?: string;
}
/**
 * A control that flips a message between read and unread. A real `<button>`
 * whose glyph (open vs. filled envelope) and word label both change with state,
 * and whose accessible label announces the *action* ("Mark as read" / "Mark as
 * unread") so it never relies on color alone. Controlled via `read` /
 * `onToggle`. No literal colors.
 */
export declare const ReadUnreadToggle: React.ForwardRefExoticComponent<ReadUnreadToggleProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=ReadUnreadToggle.d.ts.map