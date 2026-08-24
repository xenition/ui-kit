import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ButtonSize, type ButtonVariant } from '../primitives';
export interface GetStartedButtonProps {
    /** Fires when the primary CTA is pressed. */
    onPress?: () => void;
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
    /** Show a spinner and block presses while an async step runs. */
    loading?: boolean;
    disabled?: boolean;
    /** Stretch to fill the parent width. Default `true`. */
    fullWidth?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * The primary onboarding call-to-action — a thin, opinionated wrapper over the
 * {@link Button} primitive that defaults to a large, full-width, outcome-worded
 * hero button. Exists so every entry screen (welcome, paywall, profile) ships
 * the same affordance without re-specifying size/width. All color and radius
 * come from the button primitive's tokens. No literal colors.
 */
export declare function GetStartedButton({ onPress, label, variant, size, loading, disabled, fullWidth, style, }: GetStartedButtonProps): React.ReactElement;
//# sourceMappingURL=GetStartedButton.d.ts.map