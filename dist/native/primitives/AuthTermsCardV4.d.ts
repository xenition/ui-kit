import * as React from 'react';
import { AUTH_DEFAULT_TERMS_LINKS, type AuthTermsCardProps, type AuthTermsLink } from './AuthCard';
export type { AuthTermsLink };
export { AUTH_DEFAULT_TERMS_LINKS };
/** Where the box sits against copy that runs to more than one line. */
export type AuthTermsCardV4Align = 'center' | 'top';
export interface AuthTermsCardV4Props extends AuthTermsCardProps {
    /**
     * A quiet supporting line under the consent sentence — "You can withdraw
     * consent at any time", a data-retention note, whatever the jurisdiction
     * asks for.
     *
     * Additive and optional: with it absent the card is exactly the one-line
     * consent §9 describes.
     */
    description?: string;
    /**
     * Where the checkbox sits when the copy wraps. `'center'` (the default, and
     * the base's behaviour) keeps a one-line consent optically balanced;
     * `'top'` is right once a `description` or a long sentence pushes the copy
     * to three lines and a vertically centred box starts to look adrift.
     */
    align?: AuthTermsCardV4Align;
    /**
     * Whether pressing the card's copy toggles the box. Default `true`.
     *
     * The whole point of the bordered card is that the consent is one object,
     * so the whole object should be the target — a 20pt square is a cruel thing
     * to ask a thumb to find. The wrapper is deliberately `accessible={false}`:
     * it is a touch convenience, not a second control, and the `CheckboxV4`
     * inside stays the one thing a screen reader announces and toggles.
     */
    pressToToggle?: boolean;
}
/**
 * **V4 terms consent** — the native twin of the web `AuthTermsCardV4`, the same
 * props as {@link AuthTermsCard} plus three additive ones, a different design
 * line.
 *
 * `ONBOARDING-DESIGN-SPEC.md` §9 asks the register screen for a terms
 * "checkbox in a bordered card with the two links inline", with the CTA
 * disabled until the box is ticked. That last part is why this component
 * matters more than its size suggests: it is the one control standing between
 * a user and the end of the funnel, so if it is hard to find, hard to hit, or
 * reads as an error, the sign-up stops there.
 *
 * What the V4 line changes:
 *
 * 1. **It answers.** The base card looked identical ticked and unticked — only
 *    the 20pt box changed, and the user's own thumb was on top of it. V4 moves
 *    the border to `colors.primary` and cross-fades in the M3 `hover` state
 *    layer of the brand behind the copy, so the change is visible from the far
 *    side of the card. It is a tint, not a fill: this is a consent, not a
 *    selected plan, and §7's filled treatment would make it shout. The fade
 *    runs on the native driver in {@link FIELD_MOTION}ms — the same duration
 *    the tick inside it takes — and under Reduce Motion it lands on the final
 *    value on the first frame (§36.10): the state is never something you have
 *    to wait to see.
 * 2. **The whole card is the target.** `pressToToggle` makes the card itself
 *    press, taking the tap area from one small square to the full card.
 * 3. **The links are real targets.** This is the one place the twins diverge
 *    in construction rather than in props. The web can leave an inline
 *    `<button>` in flowing text and expand its hit area with an absolute
 *    `::after`; React Native has no equivalent — a nested `<Text onPress>` is
 *    exactly as tall as its own line, which is about half the platform floor,
 *    and `Text` takes no `hitSlop`. So the sentence is laid out as a
 *    **wrapping row** — the same `flexWrap` §7 insists on for chips — with the
 *    lead-in copy and every link in a box a full `minTap()` tall. It still
 *    reads as one inline sentence; every part of it can now actually be hit.
 *    §46, accessibility before tidiness.
 * 4. **It composes V4 children.** `CheckboxV4` and `TextV4`, never the bases
 *    (§10.5) — so the tick, the press halo and the type scale here are the
 *    ones the rest of the V4 register screen is using.
 *
 * The empty states §12 asks about all hold: `links={[]}` renders the lead-in
 * copy alone with no dangling separator, no `error` renders no message row,
 * and no `description` renders the single-line card the base drew.
 *
 * No gradient, no glass, no shadow. §16 asks that forms stay minimal, and the
 * one thing on this card that should catch the eye is whether the box is
 * ticked.
 */
export declare function AuthTermsCardV4({ checked, onCheckedChange, label, links, onLinkPress, separator, description, align, pressToToggle, error, disabled, style, }: AuthTermsCardV4Props): React.ReactElement;
//# sourceMappingURL=AuthTermsCardV4.d.ts.map