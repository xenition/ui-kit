import * as React from 'react';
import { type SignInScreenProps } from './SignInScreen';
/** Drop-in for {@link SignInScreen} — identical props, different design. */
export type SignInScreenV3Props = SignInScreenProps;
/**
 * Sign-in / register — **V3, compact** (§11).
 *
 * No hero panel and no `3xl` display headline. The brand tile moves onto the
 * **same row** as an `xl` headline, so the identity and the ask occupy one
 * band instead of three, and the rows below tighten to `sm`/`md` rhythm. This
 * is the line for a bottom sheet, a modal, or a second-visit screen where the
 * user already knows what app they are in and wants the field, not the pitch.
 *
 * One deliberate difference from §5: the CTA sits **in flow** at the end of
 * the form rather than in a sticky footer. A sheet is sized to its content —
 * there is no scroll for the action to hide under, and pinning it would draw a
 * hairline across the bottom of a card that already has an edge. Everything
 * else about the button is unchanged: full width, 56 tall, `radius.full`,
 * trailing `→`.
 *
 * Same parts, same props, same 56px controls as the base line.
 */
export declare function SignInScreenV3(props: SignInScreenV3Props): React.ReactElement;
//# sourceMappingURL=SignInScreenV3.d.ts.map