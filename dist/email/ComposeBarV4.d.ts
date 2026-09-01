import * as React from 'react';
import type { ComposeBarProps } from './ComposeBar';
export interface ComposeBarV4Props extends ComposeBarProps {
    /** Copy on the attach control. Default `'Add attachment'`. */
    attachLabel?: string;
    /** Copy on the send control. Default `'Send'`. */
    sendLabel?: string;
    /** How many lines the body may grow to before it scrolls. Default `5`. */
    maxLines?: number;
}
/**
 * **V4 compose bar** — same props as {@link ComposeBar} plus `attachLabel`,
 * `sendLabel` and `maxLines`.
 *
 * ## Four changes
 *
 * 1. **Send stops firing with no recipient.** `canSend` tested the body and
 *    the attachments and never tested `to`, so one character of body — or a
 *    single staged file — enabled Send and `onSend({ to: '', … })` went out.
 *    The test is now `canSendMail`, shared with the native twin so the two bars
 *    cannot disagree about what a sendable draft is.
 * 2. **The body actually grows here.** Both docblocks advertised a growing
 *    field and only native had one; the web bar was a one-row `Textarea` with a
 *    `max-h` on it, so a four-line reply was typed through a one-line slot.
 *    It now grows to `maxLines` and scrolls after that.
 * 3. **The attach control clears 44** — it was a glyph with no box beside a
 *    44 send button, and it is the control a user reaches for while holding
 *    the phone one-handed.
 * 4. **Press is a state layer, disabled is 0.38, and the fields are outlined
 *    in `input`** — the bar dimmed its own controls on hover at exactly the
 *    band M3 spends on unavailable.
 */
export declare const ComposeBarV4: React.ForwardRefExoticComponent<ComposeBarV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ComposeBarV4.d.ts.map