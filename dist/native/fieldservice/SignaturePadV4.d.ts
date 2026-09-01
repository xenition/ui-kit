import * as React from 'react';
import type { SignaturePadProps } from './SignaturePad';
export interface SignaturePadV4Props extends SignaturePadProps {
    /** The label Clear takes once it is armed and waiting. Default `'Confirm clear'`. */
    confirmClearLabel?: string;
    /** The empty pad's prompt. Default `'Tap to sign'` — one string on both twins. */
    signLabel?: string;
}
/**
 * **V4 signature pad** — same props as {@link SignaturePad} plus
 * `confirmClearLabel` and `signLabel`.
 *
 * ## Four changes
 *
 * 1. **Clear takes a confirming press.** The signature is the legally
 *    meaningful artefact of the visit and one press destroyed it — no
 *    confirmation, no undo, and no prop a host app could use to ask for
 *    either. The first press arms Clear and relabels it `confirmClearLabel`.
 * 2. **Clear is the same weight on both twins, and it is the quieter one.**
 *    It was a filled `danger` button on web and a `ghost` text button here, so
 *    the riskiest control in the module was the loudest thing on the card on
 *    one platform and nearly invisible on the other. Both are `ghost` now: the
 *    confirm carries the caution, not the fill.
 * 3. **`signLabel` is one string on both twins.** Web said "click to sign" and
 *    native "tap to sign", so a shared test or a voice command matched one
 *    platform and not the other.
 * 4. **Clear clears 44, and a press is a state layer.** The pad dimmed itself
 *    to `0.85` while held and to `0.5` when disabled — 0.38 is M3's disabled
 *    band, so a pressed pad and a dead one looked alike.
 */
export declare function SignaturePadV4({ label, signed, signerName, signedAt, onSign, onClear, disabled, confirmClearLabel, signLabel, style, }: SignaturePadV4Props): React.ReactElement;
//# sourceMappingURL=SignaturePadV4.d.ts.map