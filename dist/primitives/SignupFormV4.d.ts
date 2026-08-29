import * as React from 'react';
import type { AuthAlign } from './AuthCard';
import type { TextSize } from './Text';
import type { IconName } from './icon-names';
import type { SignupFormProps } from './SignupForm';
/**
 * One social/SSO button offered under the divider (§9).
 *
 * Structurally the onboarding module's `SignInProvider`, restated here because
 * `primitives/` must not import from `onboarding/` — a primitive that depends
 * on a screen module is a layering inversion, and this is three fields.
 */
export interface SignupProviderV4 {
    /** Stable key handed back to {@link SignupFormV4Props.onProviderClick}. */
    id: string;
    /** Button copy (e.g. `'Continue with Google'`). */
    label: string;
    /** One-off brand glyph — the kit ships no Google/Apple marks. */
    glyph?: string;
    /** A name from the kit's icon set, for a non-brand provider (`'mail'`, `'phone'`). */
    name?: IconName;
}
export interface SignupFormV4Props extends SignupFormProps {
    /** Brand icon from the named set, for an app with no mark of its own. */
    brandIcon?: IconName;
    /** Headline alignment. Default `'left'` — §9's tile and headline sit top-left. */
    align?: AuthAlign;
    /** Headline step. Default `'3xl'` — §9's register headline. */
    titleSize?: TextSize;
    /**
     * §9's First/Last row. Default `true`.
     *
     * Set `false` for the base's single `Name` box — a jurisdiction or an
     * audience where splitting a name is wrong (mononyms, non-Western ordering)
     * should not have to fork the component.
     */
    splitName?: boolean;
    /** First-name copy, used when {@link splitName} is on. */
    firstNameLabel?: string;
    firstNamePlaceholder?: string;
    /** Last-name copy, used when {@link splitName} is on. */
    lastNameLabel?: string;
    lastNamePlaceholder?: string;
    /**
     * Whether the last name is required. Default `false` — the base required
     * exactly one name and a great many people have exactly one.
     */
    requireLastName?: boolean;
    /** A quiet supporting line inside the consent card. */
    termsDescription?: string;
    /**
     * Shown in the consent card when a submit is attempted with the box
     * unticked. Default `'Please accept the terms to continue'`.
     */
    termsError?: string;
    /** Social/SSO providers. The whole block — divider included — is hidden when empty (§9). */
    providers?: SignupProviderV4[];
    /** Fires with the pressed provider's `id`. */
    onProviderClick?: (id: string) => void;
    /** Divider copy above the provider row. Default `'or continue with'`. */
    providersLabel?: string;
}
/**
 * **V4 sign-up form** — `ONBOARDING-DESIGN-SPEC.md` §9's register screen as one
 * drop-in composite. Web twin of the native `SignupFormV4`.
 *
 * Same shell as the V4 sign-in: the brand tile and headline via `AuthCardV4`,
 * then **First / Last on one row** with §6's `spacing.sm` between them, email,
 * password, the terms **checkbox in a bordered card** with both links inline,
 * the CTA — **disabled until the box is ticked** — then the divider, the
 * providers and the centred footer.
 *
 * ## What V4 changes
 *
 * **It composes V4 children, top to bottom** (§10.5). Every field is an
 * `AuthFieldV4`, so the form sits on `internal/field-v4`'s single control
 * metric (the Addendum's `spacing['2xl']` / `radius.md`) rather than on the
 * base's 56 — a sign-up field stacked above an `InputV4` shares an edge.
 *
 * **The name row is two boxes, one value.** §9 asks for First/Last side by
 * side; the base's `onSubmit` contract is a single `name`. Both hold: the two
 * boxes compose one trimmed string, so a caller written against `SignupForm`
 * can swap the import and nothing downstream notices. `splitName={false}`
 * restores the single box.
 *
 * **The consent is on by default.** `requireTerms` defaults `false` on the
 * base because turning it on silently would change what a shipped app asks its
 * users to agree to. `SignupFormV4` is a new export with no callers to
 * surprise, and §9 describes the card as part of the register anatomy — so it
 * defaults `true` here, and the CTA is disabled until it is ticked. A submit
 * forced past the disabled button (an Enter keypress in a field) is caught too,
 * and answers with a message in the card rather than silently doing nothing.
 *
 * **Providers are structural.** The row is handed to `AuthDividerV4` as its
 * children, so `providers={[]}` collapses the divider *and* the row together —
 * §9's "must not show an empty divider" is enforced by the composition rather
 * than by a `&&` at the call site.
 *
 * Errors are always a message, never a border colour alone: the submit failure
 * is an `AlertV4`, and every field prints its own text under the control.
 */
export declare function SignupFormV4({ onSubmit, onLoginClick, title, subtitle, brandGlyph, brandIcon, align, titleSize, minPasswordLength, requireTerms, termsLabel, termsLinks, onTermsLinkClick, termsDescription, termsError, splitName, submitLabel, submittingLabel, nameLabel, namePlaceholder, firstNameLabel, firstNamePlaceholder, lastNameLabel, lastNamePlaceholder, requireLastName, emailLabel, emailPlaceholder, passwordLabel, passwordPlaceholder, switchPrompt, switchLabel, providers, onProviderClick, providersLabel, }: SignupFormV4Props): React.ReactElement;
//# sourceMappingURL=SignupFormV4.d.ts.map