import * as React from 'react';
import type { TextAlign, TextProps, TextSize, TextTone, TextWeight } from './Text';
export type { TextSize, TextTone, TextWeight, TextAlign };
/** Which of the seed's two faces a run of text is set in. */
export type TextV4Face = 'auto' | 'heading' | 'body';
/** Numeral setting. `tabular` gives every figure the same advance width. */
export type TextV4Numeric = 'proportional' | 'tabular';
export interface TextV4Props extends TextProps {
    /**
     * Typeface. Default `'auto'` — display steps (`xl` and above) take the
     * seed's heading face, everything else takes its body face.
     */
    face?: TextV4Face;
    /**
     * Cap the line length at a comfortable reading measure. Default `false`.
     *
     * §4 asks that a subhead "not run the full width on a tablet"; this is that
     * rule as a prop, so a caller does not have to hand-roll a `maxWidth`.
     */
    measure?: boolean;
    /** Numeral setting. Default `'proportional'`. */
    numeric?: TextV4Numeric;
}
/**
 * **V4 text** — the base `Text`'s props plus three, a different design line.
 *
 * This is the typographic foundation the whole auth/onboarding family reads
 * from, so it is the one component where getting the *defaults* right matters
 * more than what it can be told to do. Three changes, and nothing else.
 *
 * 1. **The face is bound.** The base `Text` sets no `fontFamily` at all, so a
 *    native screen falls through to San Francisco / Roboto while its web twin
 *    inherits the seed's face — the same sentence in two typefaces across one
 *    product. That is exactly the defect `LabelV4` documented for `Label`, and
 *    it is worse here because `Text` is where nearly all of a screen's type
 *    comes from. V4 binds it: display steps take the seed's heading face, copy
 *    takes its body face, and `face` overrides either way.
 * 2. **Copy gets air, display gets tightened.** See {@link LEADING_RATIO}. The
 *    "airy, generous" feel of the reference screens is almost entirely leading.
 * 3. **Tracking is optical.** See {@link TRACKING_RATIO}. A 30px headline and a
 *    12px caption cannot share one tracking and both look deliberate.
 *
 * What V4 deliberately does **not** do is change `weight`. A `3xl` at the
 * default `regular` is thin, and it is tempting to bump it — but a component
 * that silently disobeys the weight it was handed is a worse bug than a
 * headline that needs `weight="bold"` (which is what §4 asks the caller for).
 *
 * There is no press feedback and no state layer here on purpose. Text is not
 * interactive; `motion-v4` and `state-v4` exist for controls, and animating a
 * colour on every `Text` in an app would be decoration bought with a re-render
 * (§7 — subtraction before addition).
 *
 * Renders RN's `Text` underneath and forwards the rest of its props, so
 * `numberOfLines`, `onPress`, `selectable`, `ellipsizeMode`, `accessibilityRole`
 * and friends work exactly as they do on the base. `style` is for layout only.
 */
export declare function TextV4({ size, tone, weight, align, face, measure, numeric, numberOfLines, style, children, ...rest }: TextV4Props): React.ReactElement;
//# sourceMappingURL=TextV4.d.ts.map