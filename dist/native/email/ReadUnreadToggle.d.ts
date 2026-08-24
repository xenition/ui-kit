import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ReadUnreadToggleProps {
    /** Current read state; `false` means the message is unread. */
    read?: boolean;
    /** Fires with the next read value when tapped. */
    onToggle?: (read: boolean) => void;
    /** Hide the text label and render icon-only (compact toolbars). */
    iconOnly?: boolean;
    /** Block interaction and dim. */
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A control that flips a message between read and unread. The glyph (open vs.
 * filled envelope) and the word label both change with state, and the tap
 * target announces the *action* ("Mark as read" / "Mark as unread") so it never
 * relies on color alone. Controlled via `read` / `onToggle`. No literal colors.
 */
export declare function ReadUnreadToggle({ read, onToggle, iconOnly, disabled, style, }: ReadUnreadToggleProps): React.ReactElement;
//# sourceMappingURL=ReadUnreadToggle.d.ts.map