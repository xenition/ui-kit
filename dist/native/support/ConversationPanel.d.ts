import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Which side of the conversation a message is from. */
export type MessageAuthor = 'agent' | 'customer' | 'system';
export interface ConversationMessage {
    /** Stable id. */
    id: string;
    /** Who sent it. */
    author: MessageAuthor;
    /** Message body text. */
    body: string;
    /** Optional display name. */
    authorName?: string;
    /** Optional timestamp hint (e.g. `"09:41"`). */
    timeLabel?: string;
    /** Optional flag for internal-only notes (rendered distinctly). */
    internal?: boolean;
}
export interface ConversationPanelProps {
    /** Ordered messages (oldest → newest). */
    messages: ConversationMessage[];
    /** Show a loading state instead of the thread. */
    loading?: boolean;
    /** Text shown when there are no messages. */
    emptyText?: string;
    /** Controlled reply draft. */
    replyValue?: string;
    /** Fires as the reply draft changes. */
    onChangeReply?: (text: string) => void;
    /** Fires with the trimmed reply text when "Send" is pressed. */
    onReply?: (text: string) => void;
    /** Send-button label (default "Reply"). */
    sendLabel?: string;
    /** Hide the reply composer (read-only transcript). */
    hideComposer?: boolean;
    /** Disable the composer (e.g. ticket closed). */
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A support-ticket conversation thread with an inline reply composer. Renders
 * customer / agent / system / internal-note bubbles (aligned + tinted by author,
 * with the author role in text so it's not color-only), plus a text field and a
 * "Reply" button that reports the trimmed draft via `onReply`. Handles the
 * `loading` and empty-thread states. The composer can be controlled
 * (`replyValue` + `onChangeReply`) or uncontrolled. Token colors only.
 */
export declare function ConversationPanel({ messages, loading, emptyText, replyValue, onChangeReply, onReply, sendLabel, hideComposer, disabled, style, }: ConversationPanelProps): React.ReactElement;
//# sourceMappingURL=ConversationPanel.d.ts.map