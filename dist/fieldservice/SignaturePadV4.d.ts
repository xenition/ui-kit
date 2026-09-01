import * as React from 'react';
import type { SignaturePadProps } from './SignaturePad';
export interface SignaturePadV4Props extends SignaturePadProps {
    /** How Clear names itself once armed. Default `'Confirm clear'`. */
    confirmClearLabel?: string;
    /** The prompt on the empty pad. Default `'Tap to sign'`. */
    signLabel?: string;
}
/**
 * **V4 signature pad** — the web twin of the native `SignaturePadV4`, same
 * props as {@link SignaturePad} plus `confirmClearLabel` and `signLabel`.
 *
 * ## Four changes
 *
 * 1. **Clear asks first.** The signature is the legally meaningful artefact of
 *    the visit and one press destroyed it — no confirmation, no undo, and no
 *    prop through which a host app could require either. The first press arms
 *    the button and renames it through `confirmClearLabel`; the second calls
 *    `onClear`.
 * 2. **Clear stops being the loudest thing on the card.** It was a filled
 *    `danger` button on the web and a quiet ghost text button on the phone, so
 *    the riskiest control in the module shouted on one platform and whispered
 *    on the other. Both twins now take the quieter treatment — a `danger`-toned
 *    ghost — and pay for the safety with the confirming press instead of with
 *    a red slab.
 * 3. **One prompt on both twins.** The web said "click to sign" and the phone
 *    "tap to sign", so a shared test, a shared translation and a voice command
 *    each matched exactly one of the two. `signLabel` is one string.
 * 4. **Clear clears 44**, and the pad answers a pointer with a state layer
 *    rather than dimming itself toward the band that means disabled.
 */
export declare const SignaturePadV4: React.ForwardRefExoticComponent<SignaturePadV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SignaturePadV4.d.ts.map