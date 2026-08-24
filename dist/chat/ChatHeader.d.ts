import * as React from 'react';
import { type Presence } from './PresenceDot';
export interface ChatHeaderAction {
    /** Stable identifier. */
    id: string;
    /** Glyph/emoji rendered via `Icon`. */
    glyph: string;
    /** Accessible label (e.g. "Call", "Video"). */
    label: string;
    onClick?: () => void;
}
export interface ChatHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
    /** Conversation title (contact / group name). */
    title: string;
    /** Secondary line (e.g. "last seen 09:41", "3 members"). */
    subtitle?: string;
    /** Avatar image URL. */
    avatarUri?: string;
    /** Presence badge on the avatar. */
    presence?: Presence;
    /** When true, the subtitle is replaced by a "typing…" caption. */
    typing?: boolean;
    /** Fires when the back affordance is clicked; hidden when omitted. */
    onBack?: () => void;
    /** Fires when the title/avatar block is clicked (open profile). */
    onPressTitle?: () => void;
    /** Trailing action buttons (call, video, info…). */
    actions?: ChatHeaderAction[];
}
/**
 * Top bar for a conversation screen — optional back button, clickable
 * avatar+title block with a presence badge and subtitle (or a "typing…"
 * caption), and trailing action buttons. Rendered as a `<header>` element. No
 * literal colors.
 */
export declare const ChatHeader: React.ForwardRefExoticComponent<ChatHeaderProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=ChatHeader.d.ts.map