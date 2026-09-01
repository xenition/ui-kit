import * as React from 'react';
/** A saved reply the agent can drop into the composer with one tap. */
export interface CannedReply {
    /** Stable identifier, reported to `onPickCanned`. */
    id: string;
    /** Short chip label (e.g. "Greeting", "Refund policy"). */
    label: string;
    /** Full reply text this chip represents (for the consumer to insert). */
    body: string;
}
export interface ReplyBoxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Controlled composer text. */
    value: string;
    /** Fires with the next text on every keystroke (controlled). */
    onChangeText: (text: string) => void;
    /** Web alias for `onChangeText`, wired to the native `<textarea onChange>`. */
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    /** Fires when the agent submits the reply (Send button or ⌘/Ctrl+Enter). */
    onSend?: () => void;
    /** Placeholder shown while empty. Defaults to "Write a reply…". */
    placeholder?: string;
    /** In-flight state — shows a busy Send and blocks submits. */
    sending?: boolean;
    /** Disable the whole composer (input + Send + chips). */
    disabled?: boolean;
    /** Optional quick-pick chips shown above the input. */
    cannedReplies?: readonly CannedReply[];
    /** Fires with the picked chip's `id` when a canned reply is tapped. */
    onPickCanned?: (id: string) => void;
    /** Label for the Send button. Defaults to "Send". */
    sendLabel?: string;
}
/**
 * ReplyBox — **V4** "calm console" agent reply composer. A controlled,
 * rounded composer: an optional row of soft-primary quick-pick chips (canned
 * replies) above a multiline input, with a single primary **Send** button
 * (≥44px tap target) that disables when empty or sending. One accent = primary.
 * ⌘/Ctrl+Enter submits. Fully controlled — `value` in, `onChangeText`/`onChange`
 * + `onSend` out; nothing fetches. All colors from `--xen-*` token classes
 * (no literal hex). Dark-mode safe.
 */
export declare const ReplyBox: React.ForwardRefExoticComponent<ReplyBoxProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ReplyBox.d.ts.map