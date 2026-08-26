import * as React from 'react';
import { cn } from './cn';
import { resolveIconGlyph, type IconName } from './icon-names';

export type IconSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';

/** Semantic color slots that map to a `text-*` token class. Mirrors the native `SemanticColors` keys. */
export type IconColor =
  | 'onSurface'
  | 'onPrimary'
  | 'primary'
  | 'muted'
  | 'success'
  | 'onSuccess'
  | 'warn'
  | 'onWarn'
  | 'danger'
  | 'onDanger';

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

const SIZE_CLASS: Record<IconSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
};

const COLOR_CLASS: Record<IconColor, string> = {
  onSurface: 'text-on-surface',
  onPrimary: 'text-on-primary',
  primary: 'text-primary',
  muted: 'text-muted',
  success: 'text-success',
  onSuccess: 'text-on-success',
  warn: 'text-warn',
  onWarn: 'text-on-warn',
  danger: 'text-danger',
  onDanger: 'text-on-danger',
};

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
export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(function Icon(
  { glyph, name, size = 'lg', color = 'onSurface', className, style, 'aria-label': ariaLabel, ...rest },
  ref
) {
  const decorative = ariaLabel == null;
  const numeric = typeof size === 'number';
  return (
    <span
      ref={ref}
      role={decorative ? undefined : 'img'}
      aria-label={ariaLabel}
      aria-hidden={decorative || undefined}
      className={cn(
        'inline-flex items-center justify-center leading-none',
        !numeric && SIZE_CLASS[size],
        COLOR_CLASS[color],
        className
      )}
      style={numeric ? { fontSize: size, ...style } : style}
      {...rest}
    >
      {glyph ?? (name != null ? resolveIconGlyph(name) : '')}
    </span>
  );
});
