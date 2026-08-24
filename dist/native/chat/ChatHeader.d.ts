import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Appearance } from '../primitives/internal/appearance';
import { type Presence } from './PresenceDot';
export interface ChatHeaderAction {
    /** Stable identifier. */
    id: string;
    /** Glyph/emoji rendered via `Icon`. */
    glyph: string;
    /** Accessible label (e.g. "Call", "Video"). */
    label: string;
    onPress?: () => void;
}
export interface ChatHeaderProps {
    /** Conversation title (contact / group name). */
    title: string;
    /** Secondary line (e.g. "last seen 09:41", "3 members"). */
    subtitle?: string;
    /** Avatar image URI. */
    avatarUri?: string;
    /** Presence badge on the avatar. */
    presence?: Presence;
    /** When true, the subtitle is replaced by a "typing…" caption. */
    typing?: boolean;
    /** Fires when the back affordance is tapped; hidden when omitted. */
    onBack?: () => void;
    /** Fires when the title/avatar block is tapped (open profile). */
    onPressTitle?: () => void;
    /** Trailing action buttons (call, video, info…). */
    actions?: ChatHeaderAction[];
    /**
     * Visual treatment for the header surface (diversity system). Defaults to
     * `classic` — the historical surface fill with a bottom divider.
     */
    appearance?: Appearance;
    style?: StyleProp<ViewStyle>;
}
/**
 * Top bar for a conversation screen — optional back button, tappable
 * avatar+title block with a presence badge and subtitle (or a "typing…"
 * caption), and trailing action buttons. Uses the `header` role. No literal
 * colors.
 */
export declare function ChatHeader({ title, subtitle, avatarUri, presence, typing, onBack, onPressTitle, actions, appearance, style, }: ChatHeaderProps): React.ReactElement;
//# sourceMappingURL=ChatHeader.d.ts.map