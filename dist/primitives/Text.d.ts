import * as React from 'react';
import type { SemanticColors } from '../theme/types';
/**
 * A step on the compiled `typography.scale`. These seven keys are the only
 * sizes the kit has — the same vocabulary `Icon`'s `size` reads, so a label,
 * its icon and its caption stay on one scale.
 */
export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
/**
 * Semantic color slot. Every `SemanticColors` key is allowed — the same open
 * contract as the native `Text`'s `tone`, taken straight off the compiler's
 * type so the two twins can never drift apart on which slots exist.
 */
export type TextTone = keyof SemanticColors;
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextAlign = 'auto' | 'left' | 'center' | 'right';
export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Step on the compiled type scale. Default `'base'`. */
    size?: TextSize;
    /** Semantic color slot. Default `'onSurface'`. */
    tone?: TextTone;
    /** Font weight. Default `'regular'`. */
    weight?: TextWeight;
    /** Horizontal alignment. Default `'auto'` (inherits the writing direction). */
    align?: TextAlign;
    /** Truncate with an ellipsis after N lines. */
    numberOfLines?: number;
}
/**
 * Themed text — **the** way to render text in a Xenition app, and the web
 * mirror of the native `Text`.
 *
 * Before this existed every screen hand-assembled `className="text-lg
 * text-muted"` (or worse, an inline `style={{ fontSize: 15 }}`) at every call
 * site. `Text` takes the scale step and the semantic slot as *props* —
 * `size` and `tone` — so there is nothing left to hand-assemble.
 *
 * **A raw `fontSize` (or a literal colour) in an app is a bug.** If a size or a
 * colour you need is missing here, the fix is a token, not a literal: reach for
 * the next `size`, or add the slot to the theme compiler.
 *
 * Renders a `<span>` and forwards the rest of its props. `numberOfLines` clamps
 * to N lines with an ellipsis (the same prop name the native twin uses — prop
 * parity beats platform idiom here).
 */
export declare const Text: React.ForwardRefExoticComponent<TextProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=Text.d.ts.map