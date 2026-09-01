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
     * rule as a prop, so a caller does not have to hand-roll a `max-w-*`.
     */
    measure?: boolean;
    /** Numeral setting. Default `'proportional'`. */
    numeric?: TextV4Numeric;
}
/**
 * **V4 text** — the web twin of the native `TextV4`, the base `Text`'s props
 * plus three, a different design line.
 *
 * This is the typographic foundation the whole auth/onboarding family reads
 * from, so it is the one component where getting the *defaults* right matters
 * more than what it can be told to do. Four changes, and nothing else.
 *
 * 1. **The face is bound.** The base `Text` sets no font family at all — the
 *    web twin inherits whatever the page happens to be in and the native twin
 *    falls through to the system font, so the same sentence is two typefaces
 *    across a product. That is the defect `LabelV4` documented for `Label`,
 *    and it is worse here because `Text` is where nearly all of a screen's
 *    type comes from. V4 binds it: display steps take the seed's heading face,
 *    copy takes its body face, and `face` overrides either way.
 * 2. **Copy gets air, display gets tightened.** See {@link LEADING_CLASS}. The
 *    "airy, generous" feel of the reference screens is almost entirely leading;
 *    the base was carrying Tailwind's named ratios, which are a framework's
 *    defaults rather than a decision.
 * 3. **Tracking is optical.** See {@link TRACKING_CLASS}. A 30px headline and a
 *    12px caption cannot share one tracking and both look deliberate.
 * 4. **Display type balances its wrap.** A headline that breaks with one
 *    orphan word on the second line is the single loudest "nobody set this"
 *    signal on an onboarding screen, and `text-wrap: balance` fixes it for
 *    free. Web only — React Native has no equivalent, exactly as the base's
 *    `-webkit-line-clamp` is web only.
 *
 * What V4 deliberately does **not** do is change `weight`. A `3xl` at the
 * default `regular` is thin, and it is tempting to bump it — but a component
 * that silently disobeys the weight it was handed is a worse bug than a
 * headline that needs `weight="bold"` (which is what §4 asks the caller for).
 *
 * There is no motion sheet and no state layer here on purpose. Text is not
 * interactive: `v4-motion` exists for a control changing state and `v4-state`
 * for a surface acknowledging a pointer, and a transition on every span in an
 * app would be decoration bought with a repaint (§7 — subtraction before
 * addition).
 *
 * Renders a `<span>` and forwards the rest of its props, so the DOM contract is
 * the base's. `numberOfLines` clamps to N lines with an ellipsis — the native
 * prop name, kept because prop parity beats platform idiom.
 */
export declare const TextV4: React.ForwardRefExoticComponent<TextV4Props & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=TextV4.d.ts.map