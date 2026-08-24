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
     * Show a spinner and block clicks while an async step runs. The web `Button`
     * primitive has no `loading` of its own, so this maps to `disabled` +
     * `aria-busy` + an inline {@link Spinner}.
     */
    loading?: boolean;
    /** Stretch to fill the parent width. Default `true`. */
    fullWidth?: boolean;
}
/**
 * The primary onboarding call-to-action — a thin, opinionated wrapper over the
 * {@link Button} primitive that defaults to a large, full-width, outcome-worded
 * hero button. Exists so every entry screen (welcome, paywall, profile) ships
 * the same affordance without re-specifying size/width, and so the RN `loading`
 * idiom (spinner + blocked press) has one web home: `disabled` + `aria-busy` +
 * an inline {@link Spinner}. All color and radius come from the button
 * primitive's tokens. No literal colors.
 */
export declare const GetStartedButton: React.ForwardRefExoticComponent<GetStartedButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=GetStartedButton.d.ts.map