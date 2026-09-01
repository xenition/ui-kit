import * as React from 'react';
import type { SignatureBlockProps, SignatureContactLine } from './SignatureBlock';
export interface SignatureBlockV4Props extends SignatureBlockProps {
    /**
     * Act on a contact line — dial the number, open the mail client, follow the
     * link. Omitted, the lines stay read-only and are **drawn** read-only.
     */
    onContactPress?: (line: SignatureContactLine) => void;
}
/**
 * **V4 signature block** — same props as {@link SignatureBlock} plus
 * `onContactPress`.
 *
 * ## Four changes
 *
 * 1. **A line that looks like a link is one.** The base painted every contact
 *    in `colors.primary` — the brand colour, the universal signal for "tap
 *    this" — with no `href`, no `onPress`, and nothing in the type that could
 *    ever have carried one. Every phone number and address in the kit was a
 *    dead link. With `onContactPress` the lines become real buttons that clear
 *    44; without it they are drawn as the plain text they are.
 * 2. **The brand colour is the `*Text` slot.** `primary` is a *fill*; as ink
 *    on `surface` it measured as low as 1.32:1 on a pale seed, which is what
 *    the contrast-corrected `primaryText` exists to replace.
 * 3. **The avatar is the same shape on both twins.** This one drew a rounded
 *    square and the web twin a circle. A signature is a person, so both are
 *    circles — the `Avatar` default, which is also what the web base already
 *    rendered.
 * 4. **Nothing renders without a name.** The block's whole anatomy hangs off
 *    it; with an empty `name` the base drew an accent rule, an empty avatar
 *    and a blank line.
 */
export declare function SignatureBlockV4({ name, title, company, avatarUri, contacts, tagline, onContactPress, style, }: SignatureBlockV4Props): React.ReactElement | null;
//# sourceMappingURL=SignatureBlockV4.d.ts.map