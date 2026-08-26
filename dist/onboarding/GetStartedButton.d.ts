import * as React from 'react';
import { type ButtonSize, type ButtonVariant } from '../primitives/Button';
export interface GetStartedButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    /**
     * CTA copy. Default `'Get started'` — an outcome, not "Submit"/"Continue"
     * (design.md §47). Override with the concrete next step where one fits
     * (e.g. `'Create my account'`, `'Start free trial'`).
     */
    label?: string;
    /** Visual weight. Default `'primary'`. */
    variant?: ButtonVariant;
    /** Control height. Default `'lg'` — this is a hero action. */
    size?: ButtonSize;
    /**
     * Trailing `→` glyph. Default `true`: an onboarding CTA almost always moves
     * the user forward, and the arrow is what says so (onboarding spec §5). Pass
     * `false` on a **terminal** action — "Done", "Maybe later", "Restore
     * purchase" — where an arrow would promise a next screen that never comes.
     */
    trailingArrow?: boolean;
    /**
     * Show a spinner and block clicks while an async step runs. The web `Button`
     * primitive has no `loading` of its own, so this maps to `disabled` +
     * `aria-busy` + an inline {@link Spinner}.
     */
    loading?: boolean;
    /** Stretch to fill the parent width. Default `true`. */
    fullWidth?: boolean;
}
/**
 * The primary onboarding call-to-action — and, since the redesign, the shape
 * every screen in the funnel ends on.
 *
 * What shipped before was a short flat rectangle sitting mid-page: the same
 * `Button` the rest of the app used, at whatever width its parent happened to
 * give it. The reference screens all end on one unmistakable bar, so this now
 * pins the spec's §5 treatment — **56 tall, fully rounded, full width, primary
 * fill, semibold on-primary label, trailing `→`** — into one place, so every
 * entry screen (welcome, slides, sign-in, paywall, profile) gets it without
 * re-specifying anything. Disabled is the same shape at reduced opacity, never
 * a different shape, so the button does not appear to move when it enables.
 *
 * The hero treatment applies at `size="lg"` (the default). `sm`/`md` fall back
 * to the `Button` primitive's own compact geometry, for the rare inline use.
 * The RN `loading` idiom (spinner + blocked press) has one web home here:
 * `disabled` + `aria-busy` + an inline {@link Spinner}. All color and radius
 * come from the `--xen-*` tokens. No literal colors.
 */
export declare const GetStartedButton: React.ForwardRefExoticComponent<GetStartedButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=GetStartedButton.d.ts.map