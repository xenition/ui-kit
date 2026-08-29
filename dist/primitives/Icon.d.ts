import * as React from 'react';
import { type IconName } from './icon-names';
export type IconSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
/** Semantic color slots that map to a `text-*` token class. Mirrors the native `SemanticColors` keys. */
export type IconColor = 'onSurface' | 'onPrimary' | 'primary' | 'muted' | 'success' | 'onSuccess' | 'warn' | 'onWarn' | 'danger' | 'onDanger';
export interface IconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
    /**
     * Escape hatch for a one-off glyph the named set has no name for (e.g.
     * `'🫐'`). Wins over `name` when both are given.
     */
    glyph?: string;
    /**
     * A name from the kit's icon set (`'home'`, `'close'`, `'chevron-right'`, …),
     * resolved through {@link ICON_GLYPHS}. Typed, so a typo is a compile error.
     * An unrecognised string still renders as-is — the pre-named-set behaviour,
     * kept so nothing that works today breaks.
     */
    name?: IconName;
    /** Size from the typography scale (`'xs'…'3xl'`) or a raw px number. Default `'lg'`. */
    size?: IconSize | number;
    /** Semantic color slot. Default `'onSurface'`. */
    color?: IconColor;
    /**
     * Announced label. When omitted the icon is treated as decorative
     * (`aria-hidden`); when set the span exposes `role="img"` + the label.
     */
    'aria-label'?: string;
}
/**
 * Themed icon slot — the web mirror of the native `Icon`.
 *
 * `name` is a **semantic name from the kit's icon set** (`'home'`, `'close'`,
 * `'chevron-right'`, …) resolved through {@link ICON_GLYPHS}; `glyph` is the
 * escape hatch for a one-off the set has no name for. Naming the set is what
 * stops two screens in the same app from using different glyphs for the same
 * idea. An unrecognised `name` falls through and renders as-is, so callers
 * that passed raw emoji through `name` before the set existed still work.
 *
 * **These are unicode symbols and emoji, not a vector icon font.** The kit
 * ships no font: the pixels come from the platform's own emoji/symbol face, so
 * the same name looks different on iOS, Android and the web, and the colour
 * emoji among them ignore `color` entirely. See `icon-names.ts` for the full
 * caveat and which names actually take a tint.
 *
 * `size` maps to a `text-*` token class (or an inline px `fontSize` for a raw
 * number) and `color` resolves to a semantic `text-*` token — so every color
 * traces to a token, never a literal. Decorative by default; pass `aria-label`
 * to expose it as an image to screen readers.
 */
export declare const Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=Icon.d.ts.map