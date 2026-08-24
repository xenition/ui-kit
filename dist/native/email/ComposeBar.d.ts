import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type AttachmentKind } from './AttachmentChip';
export interface ComposeStagedAttachment {
    id: string;
    name: string;
    kind?: AttachmentKind;
    size?: string;
}
export interface ComposeBarProps {
    /** Controlled recipient string. When provided, a "To" field is shown. */
    to?: string;
    onChangeTo?: (text: string) => void;
    /** Controlled subject. When provided, a "Subject" field is shown. */
    subject?: string;
    onChangeSubject?: (text: string) => void;
    /** Controlled body text. */
    body?: string;
    onChangeBody?: (text: string) => void;
    /**
     * Fired when send is tapped. Receives the assembled draft; the parent clears
     * the fields.
     */
    onSend?: (draft: {
        to?: string;
        subject?: string;
        body: string;
    }) => void;
    /** Attach button handler. */
    onAttach?: () => void;
    /** Staged attachments previewed above the body. */
    attachments?: ComposeStagedAttachment[];
    /** Remove a staged attachment by id. */
    onRemoveAttachment?: (id: string) => void;
    /** Body placeholder. Default "Write a message". */
    placeholder?: string;
    /** Sending in flight → send button shows a busy state and is blocked. */
    sending?: boolean;
    /** Disable the whole bar. */
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A mobile mail compose surface — optional "To"/"Subject" fields (shown only
 * when their controlled value is supplied), a growing body field, staged
 * attachment chips, an attach button, and a send button that stays disabled
 * until there's something to send (body text or an attachment) and while
 * `sending`. Controlled; emits an assembled `{ to, subject, body }` on send.
 * No literal colors.
 */
export declare function ComposeBar({ to, onChangeTo, subject, onChangeSubject, body, onChangeBody, onSend, onAttach, attachments, onRemoveAttachment, placeholder, sending, disabled, style, }: ComposeBarProps): React.ReactElement;
//# sourceMappingURL=ComposeBar.d.ts.map