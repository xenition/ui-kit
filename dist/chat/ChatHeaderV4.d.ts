import * as React from 'react';
import type { ChatHeaderProps } from './ChatHeader';
export interface ChatHeaderV4Props extends ChatHeaderProps {
    /** Copy on the back control. Default `'Back'`. */
    backLabel?: string;
    /** Build the typing line. Default `'Typing…'`. */
    typingLabel?: string;
}
/**
 * **V4 chat header** — the web twin of the native `ChatHeaderV4`, same props
 * as {@link ChatHeader} plus `backLabel` and `typingLabel`.
 *
 * ## Four changes
 *
 * 1. **Presence is a word.** A green dot beside a name is the whole status,
 *    and it said nothing to a screen reader and nothing to a colour-blind
 *    user. It now reads "Online" under the title.
 * 2. **Typing *replaces* the subtitle.** The base stacked a typing line under
 *    it, so the header grew a row and the messages below jumped — on a live
 *    signal that toggles every few seconds.
 * 3. **Every action has a name and clears 44.** `ChatHeaderAction` has always
 *    carried a `label`; the base never rendered it.
 * 4. **Back is a real control**, not a glyph with a tap handler.
 */
export declare const ChatHeaderV4: React.ForwardRefExoticComponent<ChatHeaderV4Props & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=ChatHeaderV4.d.ts.map