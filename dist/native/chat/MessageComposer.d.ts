import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type StagedAttachment } from './AttachmentBar';
export interface MessageComposerProps {
    /** Controlled draft text. */
    value?: string;
    /** Fired on every keystroke. */
    onChangeText?: (text: string) => void;
    /**
     * Fired when the send affordance is tapped (or return submits). Receives the
     * current draft text; the parent is expected to clear `value`.
     */
    onSend?: (text: string) => void;
    /** Fired when the attach (paperclip) button is tapped. */
    onAttach?: () => void;
    /** Staged attachments to preview above the input. */
    attachments?: StagedAttachment[];
    /** Remove a staged attachment by id. */
    onRemoveAttachment?: (id: string) => void;
    /** Placeholder text (default "Message"). */
    placeholder?: string;
    /** Disable input + actions. */
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * Message input bar — an attach button, a growing multiline field, and a send
 * button that is disabled until there's something to send (text or a staged
 * attachment). Staged attachments preview above via `AttachmentBar`. Controlled
 * via `value`/`onChangeText`; emits `onSend`/`onAttach`. No literal colors.
 */
export declare function MessageComposer({ value, onChangeText, onSend, onAttach, attachments, onRemoveAttachment, placeholder, disabled, style, }: MessageComposerProps): React.ReactElement;
//# sourceMappingURL=MessageComposer.d.ts.map