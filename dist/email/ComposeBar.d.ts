import * as React from 'react';
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
     * Fired when send is clicked. Receives the assembled draft; the parent clears
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
    className?: string;
}
/**
 * A mail compose surface — optional "To"/"Subject" fields (shown only when
 * their controlled value is supplied), a growing body `Textarea`, staged
 * attachment chips, an attach button, and a send button that stays disabled
 * until there's something to send (body text or an attachment) and while
 * `sending`. Every interactive element is a real `<button>`/field. Controlled;
 * emits an assembled `{ to, subject, body }` on send. No literal colors.
 */
export declare const ComposeBar: React.ForwardRefExoticComponent<ComposeBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ComposeBar.d.ts.map