import * as React from 'react';
import { AUTH_DEFAULT_TERMS_LINKS, type AuthTermsCardProps, type AuthTermsLink } from './AuthCard';
export type { AuthTermsLink };
export { AUTH_DEFAULT_TERMS_LINKS };
/** The `<style>` id this component injects its card and link rules from. */
export declare const AUTH_TERMS_V4_STYLE_ID = "xen-v4-auth-terms-styles";
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
     * Where the checkbox sits when the copy wraps. `'center'` (the default,
     * and the base's behaviour) keeps a one-line consent optically balanced;
     * `'top'` is right once a `description` or a long sentence pushes the copy
     * to three lines and a vertically centred box starts to look adrift.
     */
    align?: AuthTermsCardV4Align;
    /**
     * Whether pressing the card's copy toggles the box. Default `true`.
     *
     * The whole point of the bordered card is that the consent is one object,
     * so the whole object should be the target — a 16px square is a cruel thing
     * to ask a thumb to find. Implemented as a real `<label>`, so it is the
     * platform's own association rather than a click handler pretending to be
     * one, and the links inside stay separately activatable because interactive
     * content inside a label does not forward its activation.
     */
    pressToToggle?: boolean;
}
/**
 * **V4 terms consent** — the web twin of the native `AuthTermsCardV4`, the same
 * props as {@link AuthTermsCard} plus three additive ones, a different design
 * line.
 *
 * `ONBOARDING-DESIGN-SPEC.md` §9 asks the register screen for a terms
 * "checkbox in a bordered card with the two links inline", with the CTA
 * disabled until the box is ticked. That last part is the reason this
 * component matters more than its size suggests: it is the one control
 * standing between a user and the end of the funnel, so if it is hard to find,
 * hard to hit, or reads as an error, the sign-up stops there.
 *
 * What the V4 line changes:
 *
 * 1. **It answers.** The base card looked identical ticked and unticked —
 *    only the 16px box changed, and the user's own finger was on top of it.
 *    V4 moves the border to `primary` and washes the ground with the M3
 *    `hover` state layer of the brand, so the change is visible from the far
 *    side of the card. It is a tint, not a fill: this is a consent, not a
 *    selected plan, and §7's filled treatment would make it shout.
 * 2. **The whole card is the target.** `pressToToggle` wraps the copy in a
 *    real `<label>`, taking the tap area from one small square to the full
 *    card, without inventing a click handler that a screen reader cannot see.
 * 3. **The links are reachable.** They stay inline `<button>`s — keyboard
 *    tabbable, with the shared `--xen-ring` focus outline every other V4
 *    control uses — and each gets a genuine {@link TAP_MIN} hit area from an
 *    absolute `::after`, so the sentence still reads as a sentence.
 * 4. **It composes V4 children.** `CheckboxV4` and `TextV4`, never the bases
 *    (§10.5) — so the tick, the focus halo and the type scale here are the
 *    ones the rest of the V4 register screen is using.
 *
 * The empty states §12 asks about all hold: `links={[]}` renders the lead-in
 * copy alone with no dangling separator and no trailing space, no `error`
 * renders no message row, and no `description` renders the single-line card
 * the base drew.
 *
 * No gradient, no glass, no shadow. §16 asks that forms stay minimal, and the
 * one thing on this card that should catch the eye is whether the box is
 * ticked.
 *
 * `onCheckedChange` is the boolean form both twins expose — the underlying web
 * `CheckboxV4` is a real DOM input whose `onChange` takes an event, so the
 * boolean lives one level up where it can have the same name on both
 * platforms.
 */
export declare function AuthTermsCardV4({ checked, onCheckedChange, label, links, onLinkClick, separator, description, align, pressToToggle, error, disabled, className, }: AuthTermsCardV4Props): React.ReactElement;
//# sourceMappingURL=AuthTermsCardV4.d.ts.map