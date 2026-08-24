import * as React from 'react';
import { type StagedAttachment } from './AttachmentBar';
export interface MessageComposerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Controlled draft text. */
    value?: string;
    /** Fired on every keystroke with the new text. */
    onChangeText?: (text: string) => void;
    /**
     * Fired when the send affordance is clicked (or Enter submits). Receives the
     * current draft text; the parent is expected to clear `value`.
     */
    onSend?: (text: string) => void;
    /** Fired when the attach (plus) button is clicked. */
    onAttach?: () => void;
    /** Staged attachments to preview above the input. */
    attachments?: StagedAttachment[];
    /** Remove a staged attachment by id. */
    onRemoveAttachment?: (id: string) => void;
    /** Placeholder text (default "Message"). */
    placeholder?: string;
    /** Disable input + actions. */
    disabled?: boolean;
}
/**
 * Message input bar — an attach button, a growing multiline field, and a send
 * button that is disabled until there's something to send (text or a staged
 * attachment). Staged attachments preview above via `AttachmentBar`. Controlled
 * via `value`/`onChangeText`; emits `onSend`/`onAttach`. Enter sends (Shift+Enter
 * inserts a newline). No literal colors.
 */
export declare const MessageComposer: React.ForwardRefExoticComponent<MessageComposerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MessageComposer.d.ts.map