import * as React from 'react';
import type { ComposeBarProps } from './ComposeBar';
export interface ComposeBarV4Props extends ComposeBarProps {
    /** Name the attach control. Default `'Add attachment'`. */
    attachLabel?: string;
    /** Name the send control. Default `'Send'`. */
    sendLabel?: string;
    /** How tall the body field may grow, in lines. Default `5`. */
    maxLines?: number;
}
/**
 * **V4 compose bar** — same props as {@link ComposeBar} plus `attachLabel`,
 * `sendLabel` and `maxLines`.
 *
 * ## Five changes
 *
 * 1. **Send is dead with an empty recipient.** `canSend` tested the body and
 *    the attachments and never tested `to`, so one character of body — or a
 *    single staged file — fired `onSend({ to: '', … })` and the message went
 *    nowhere with no error. `canSendMail` is the shared rule, so both twins
 *    answer the question the same way. This is the one place V4 is not purely
 *    additive: a bar mounted with **no** `to` prop has no recipient to check
 *    and so cannot send until the caller supplies one.
 * 2. **The bar clears the home indicator.** It read no safe-area inset, so on
 *    a notched phone the send button sat under the home indicator — the one
 *    bug that tells a user this screen was not built for their device.
 * 3. **It gets out of the keyboard's way.** There was no keyboard avoidance of
 *    any kind: raise the keyboard to type and the bar you are typing into is
 *    behind it. `KeyboardAvoiderV4` is the kit's own answer, sized to the bar
 *    rather than to a screen.
 * 4. **The body field's ceiling is `maxLines`, not 140.** A literal height is
 *    a number of lines on exactly one type scale; a dense seed got three lines
 *    where a large one got two.
 * 5. **The attach control clears 44, the field is outlined with `input`, and
 *    press is a state layer.** `hitSlop={8}` around a glyph is not a target;
 *    `border` is the hairline token, not a control outline; and
 *    `opacity: 0.5 / 0.85` mixed M3's *disabled* band into a press. Disabled
 *    is 0.38.
 */
export declare function ComposeBarV4({ to, onChangeTo, subject, onChangeSubject, body, onChangeBody, onSend, onAttach, attachments, onRemoveAttachment, placeholder, sending, disabled, attachLabel, sendLabel, maxLines, style, }: ComposeBarV4Props): React.ReactElement;
//# sourceMappingURL=ComposeBarV4.d.ts.map