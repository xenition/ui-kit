import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** A saved reply the agent can drop into the composer with one tap. */
export interface CannedReply {
    /** Stable identifier, reported to `onPickCanned`. */
    id: string;
    /** Short chip label (e.g. "Greeting", "Refund policy"). */
    label: string;
    /** Full reply text this chip represents (for the consumer to insert). */
    body: string;
}
export interface ReplyBoxProps {
    /** Controlled composer text. */
    value: string;
    /** Fires with the next text on every keystroke (controlled). */
    onChangeText: (text: string) => void;
    /** Fires when the agent submits the reply (Send button). */
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
    /** Container style override. */
    style?: StyleProp<ViewStyle>;
}
/**
 * ReplyBox — **V4** "calm console" agent reply composer. A controlled,
 * rounded composer: an optional horizontal row of soft-primary quick-pick chips
 * (canned replies) above a multiline input, with a single primary **Send**
 * button (≥44px tap target) that disables when empty or sending. One accent =
 * primary. Fully controlled — `value` in, `onChangeText` + `onSend` out; nothing
 * fetches. Token-only colors via `useXenitionTheme()`; NO gradients.
 * Dark-mode safe.
 */
export declare function ReplyBox({ value, onChangeText, onSend, placeholder, sending, disabled, cannedReplies, onPickCanned, sendLabel, style, }: ReplyBoxProps): React.ReactElement;
//# sourceMappingURL=ReplyBox.d.ts.map