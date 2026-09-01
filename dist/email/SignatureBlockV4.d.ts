import * as React from 'react';
import type { SignatureBlockProps, SignatureContactLine } from './SignatureBlock';
export interface SignatureBlockV4Props extends SignatureBlockProps {
    /**
     * Activate a contact line — open the mail client, dial the number, follow
     * the link. Without it the lines are drawn as plain text, because a line
     * that looks like a link and does nothing is worse than a line that does not
     * look like one.
     */
    onContactPress?: (line: SignatureContactLine) => void;
}
/**
 * **V4 signature block** — same props as {@link SignatureBlock} plus
 * `onContactPress`.
 *
 * ## Four changes
 *
 * 1. **A contact line either works or stops pretending to.** Every line was
 *    painted in the brand colour — the universal "this is a link" — with no
 *    `href`, no handler and no handler in the type at all. Clicking an email
 *    address in a signature did nothing, on both twins, forever.
 *    `onContactPress` makes them real buttons that clear 44; without it they
 *    are drawn as the plain text they are.
 * 2. **The brand colour is the `primaryText` slot.** `text-primary` is the
 *    *fill*: the pairing it carries is for ink drawn on top of it, not for a
 *    14px line drawn in it on a white card.
 * 3. **The avatar is pinned to one shape** so the web block and the native
 *    block are the same object — the shape was left to each twin's default.
 * 4. **The rule beside the block stops being a literal.** `border-l-[3px]`
 *    was a typed width in a kit with no typed widths anywhere else.
 */
export declare const SignatureBlockV4: React.ForwardRefExoticComponent<SignatureBlockV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SignatureBlockV4.d.ts.map