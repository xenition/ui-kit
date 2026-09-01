import * as React from 'react';
import type { MessageComposerProps } from './MessageComposer';
export interface MessageComposerV4Props extends MessageComposerProps {
    /** Accessible names for the two controls. */
    sendLabel?: string;
    attachLabel?: string;
    /**
     * How many lines the field grows to before it scrolls. Default `5`.
     *
     * The base bound no maximum, so a long message pushed the send button off
     * the screen — on the one control the whole component exists to reach.
     */
    maxLines?: number;
}
/**
 * **V4 message composer** — same props as {@link MessageComposer} plus
 * `sendLabel`, `attachLabel` and `maxLines`.
 *
 * ## Four changes
 *
 * 1. **Send is disabled when there is nothing to send.** The base rendered a
 *    live control that fired with an empty value — so the first thing a user
 *    does by accident is send an empty message.
 * 2. **The field stops growing.** See `maxLines`; it grew without bound and
 *    pushed the send button off screen.
 * 3. **Both controls clear 44 and carry names.** They were unlabelled glyphs.
 * 4. **The field is on the shared field metrics and focus halo**, so the
 *    composer matches every other input in the product rather than having its
 *    own border and its own focus colour.
 */
export declare function MessageComposerV4({ value, onChangeText, onSend, onAttach, attachments, onRemoveAttachment, placeholder, disabled, appearance, sendLabel, attachLabel, maxLines, style, }: MessageComposerV4Props): React.ReactElement;
//# sourceMappingURL=MessageComposerV4.d.ts.map