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
    /**
     * Trailing `→` glyph. Default `true`: an onboarding CTA almost always moves
     * the user forward, and the arrow is what says so (onboarding spec §5). Pass
     * `false` on a **terminal** action — "Done", "Maybe later", "Restore
     * purchase" — where an arrow would promise a next screen that never comes.
     */
    trailingArrow?: boolean;
    /**
     * Announced name, when it should differ from the visible {@link label} —
     * e.g. a button reading "Next" that a screen reader should hear as "Next
     * slide". Parity with the web twin's `aria-label`. Defaults to `label`.
     */
    accessibilityLabel?: string;
    /** Show a spinner and block presses while an async step runs. */
    loading?: boolean;
    disabled?: boolean;
    /** Stretch to fill the parent width. Default `true`. */
    fullWidth?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * The primary onboarding call-to-action — and, since the redesign, the shape
 * every screen in the funnel ends on.
 *
 * What shipped before was a short flat rectangle sitting mid-page: the same
 * `Button` the rest of the app used, at whatever width its parent happened to
 * give it. The reference screens all end on one unmistakable bar, so this now
 * pins the spec's §5 treatment — **56 tall, `radius.full`, full width, primary
 * fill, semibold `onPrimary` label, trailing `→`** — into one place, so every
 * entry screen (welcome, slides, sign-in, paywall, profile) gets it without
 * re-specifying anything. Disabled is the same shape at reduced opacity, never
 * a different shape, so the button does not appear to move when it enables.
 *
 * The hero treatment applies at `size="lg"` (the default). `sm`/`md` fall back
 * to the `Button` primitive's own compact geometry, for the rare inline use.
 * All color and radius come from tokens. No literal colors.
 */
export declare function GetStartedButton({ onPress, label, variant, size, trailingArrow, accessibilityLabel, loading, disabled, fullWidth, style, }: GetStartedButtonProps): React.ReactElement;
//# sourceMappingURL=GetStartedButton.d.ts.map