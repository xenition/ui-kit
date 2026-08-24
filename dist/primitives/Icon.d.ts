import * as React from 'react';
export type IconSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
/** Semantic color slots that map to a `text-*` token class. Mirrors the native `SemanticColors` keys. */
export type IconColor = 'onSurface' | 'onPrimary' | 'primary' | 'muted' | 'success' | 'onSuccess' | 'warn' | 'onWarn' | 'danger' | 'onDanger';
export interface IconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
    /** The glyph/emoji to render (e.g. `'✓'`, `'★'`, `'🔔'`). Alias of `name`. */
    glyph?: string;
    /** Alias of `glyph` — the glyph/emoji string to render. */
    name?: string;
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
 * Themed icon slot — the kit ships no icon font, so `Icon` renders a
 * caller-supplied `glyph`/`name` (emoji or unicode symbol) as a sized, colored
 * `<span>`. `size` maps to a `text-*` token class (or an inline px `fontSize`
 * for a raw number) and `color` resolves to a semantic `text-*` token — so
 * every color traces to a token, never a literal. Decorative by default; pass
 * `aria-label` to expose it as an image to screen readers.
 */
export declare const Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=Icon.d.ts.map