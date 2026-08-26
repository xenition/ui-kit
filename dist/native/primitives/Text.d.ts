import * as React from 'react';
import { type StyleProp, type TextProps as RNTextProps, type TextStyle } from 'react-native';
import { type SemanticColors } from '../theme';
/**
 * A step on the compiled `typography.scale`. These seven keys are the only
 * sizes the kit has — the same vocabulary `Button`'s `size` and `Icon`'s `size`
 * read, so a label, its icon and its caption stay on one scale.
 */
export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
/**
 * Semantic color slot for the glyphs. Every `SemanticColors` key is allowed —
 * the same open contract as `Icon`'s `color`, rather than `Button`'s narrowed
 * `default | primary | danger | success`, because text is coloured with far
 * more of the palette than a button's accent is (`muted` captions, `border`
 * separators, the contrast-safe `primaryText`/`dangerText` forms).
 */
export type TextTone = keyof SemanticColors;
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextAlign = 'auto' | 'left' | 'center' | 'right';
export interface TextProps extends Omit<RNTextProps, 'style'> {
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
    /** Style override — for layout (margins, flex), never for size or color. */
    style?: StyleProp<TextStyle>;
    children?: React.ReactNode;
}
/**
 * Themed text — **the** way to render text in a Xenition app, and the native
 * mirror of the web `Text`.
 *
 * Before this existed every screen imported React Native's own `Text` and
 * hand-assembled `{ fontSize: tokens.typography.scale.lg, color: colors.muted }`
 * inline. That block was the single most repeated code in a generated app and
 * the place a literal `fontSize: 15` eventually crept in. `Text` takes the
 * scale step and the semantic slot as *props* — `size` and `tone` — so there
 * is nothing left to hand-assemble and nothing to get wrong.
 *
 * **A raw `fontSize` (or a literal `color`) in an app is a bug.** If a size or
 * a colour you need is missing here, the fix is a token, not a literal: reach
 * for the next `size`, or add the slot to the theme compiler.
 *
 * Renders RN's `Text` underneath and forwards the rest of its props, so
 * `numberOfLines`, `onPress`, `selectable`, `ellipsizeMode`, `accessibilityRole`
 * and friends work exactly as they always did. `style` is for layout only.
 */
export declare function Text({ size, tone, weight, align, numberOfLines, style, children, ...rest }: TextProps): React.ReactElement;
//# sourceMappingURL=Text.d.ts.map