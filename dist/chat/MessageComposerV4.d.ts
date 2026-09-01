import * as React from 'react';
import type { MessageComposerProps } from './MessageComposer';
export interface MessageComposerV4Props extends MessageComposerProps {
    /** Copy on the two controls. */
    sendLabel?: string;
    attachLabel?: string;
    /**
     * How tall the field may grow before it scrolls. Default `5`.
     *
     * The base grew without bound, so a pasted paragraph pushed the send button
     * off the bottom of the screen with no way back to it.
     */
    maxLines?: number;
}
/**
 * **V4 message composer** — the web twin of the native `MessageComposerV4`,
 * same props as {@link MessageComposer} plus `sendLabel`, `attachLabel` and
 * `maxLines`.
 *
 * ## Four changes
 *
 * 1. **Send is dead on an empty message.** The base fired `onSend('')` on a
 *    blank field and on whitespace, so an app either sent an empty bubble or
 *    had to re-check the same condition at every call site.
 * 2. **The field stops growing.** See `maxLines`.
 * 3. **Both controls clear 44 and carry names.** They were bare glyphs.
 * 4. **Enter sends, Shift+Enter breaks the line** — the convention every chat
 *    client shares, which the base left to the caller.
 */
export declare const MessageComposerV4: React.ForwardRefExoticComponent<MessageComposerV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MessageComposerV4.d.ts.map