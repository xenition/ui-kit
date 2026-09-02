import * as React from 'react';
import type { ApplyButtonProps } from './ApplyButton';
export interface ApplyButtonV4Props extends ApplyButtonProps {
    /** Copy in the `apply` state. Default `'Apply'`. */
    applyLabel?: string;
    /** Copy in the `applied` state. Default `'Applied'`. */
    appliedLabel?: string;
    /** Copy in the `withdrawn` state. Default `'Re-apply'`. */
    reapplyLabel?: string;
}
/**
 * **V4 apply button** — same props as {@link ApplyButton} plus `applyLabel`,
 * `appliedLabel` and `reapplyLabel`.
 *
 * ## Four changes
 *
 * 1. **A double-tap no longer submits the application twice.** The base wired
 *    the press straight through to `onApply`, and an application is the least
 *    forgiving thing in the module to send twice — a recruiter sees two
 *    identical candidates and the applicant cannot un-send either. A press is
 *    now dropped when it lands within {@link DOUBLE_SUBMIT_MS} of the previous
 *    one, and the window is reset the moment `state` changes, so a genuine
 *    "apply, then immediately withdraw" is never blocked. Nothing is
 *    remembered across a state change, so the button can never end up
 *    permanently dead waiting for an acknowledgement the app never sends.
 * 2. **The button stays focusable while it is busy.** `disabled={loading}`
 *    removes an element from the tab order *and* blurs it, so the moment a
 *    keyboard user pressed Apply their focus was dumped on `<body>` and the
 *    next Tab restarted from the top of the page. Busy is now
 *    `aria-disabled` + `aria-busy`, which announces "dimmed, busy", keeps the
 *    focus ring where the user put it, and still refuses the press.
 * 3. **`loading` and `disabled` are finally different things.** On web they
 *    were the same expression — `disabled={disabled || loading}` — so a job
 *    you cannot apply for and a job you are *currently applying for* looked
 *    and announced identically; native, meanwhile, drew them differently
 *    again. Loading keeps full contrast and adds a spinner; disabled takes
 *    M3's 0.38 disabled band and the real `disabled` attribute, because a
 *    control that will not respond at all should not be in the tab order.
 * 4. **The copy is translatable, and only the copy.** Three English strings
 *    were hard-coded in a component whose entire content is those strings.
 *    The applied state's tick stays out of them: it is drawn as decoration
 *    beside the label and hidden from the reader (see {@link APPLIED_TICK}),
 *    so `appliedLabel` is a word a translator can translate and the accessible
 *    name is the same tick-free sentence the native twin says.
 */
export declare const ApplyButtonV4: React.ForwardRefExoticComponent<ApplyButtonV4Props & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=ApplyButtonV4.d.ts.map