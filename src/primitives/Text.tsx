import * as React from 'react';
import { cn } from './cn';
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

const SIZE_CLASS: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
};

/*
  The same leading ratios the native twin computes (1.5 for body copy, 1.375 at
  `lg`, 1.25 for display sizes), expressed as Tailwind's named classes:
  `leading-normal` = 1.5, `leading-snug` = 1.375, `leading-tight` = 1.25. Keep
  this table in step with `LEADING_RATIO` in the native file.
*/
const LEADING_CLASS: Record<TextSize, string> = {
  xs: 'leading-normal',
  sm: 'leading-normal',
  base: 'leading-normal',
  lg: 'leading-snug',
  xl: 'leading-tight',
  '2xl': 'leading-tight',
  '3xl': 'leading-tight',
};

/**
 * Semantic slot → token class. Keyed by `SemanticColors` so a slot added to the
 * compiler and forgotten here is a type error, not a silently unstyled span.
 */
const TONE_CLASS: Record<TextTone, string> = {
  surface: 'text-surface',
  onSurface: 'text-on-surface',
  primary: 'text-primary',
  onPrimary: 'text-on-primary',
  accent: 'text-accent',
  onAccent: 'text-on-accent',
  muted: 'text-muted',
  primaryText: 'text-primary-text',
  accentText: 'text-accent-text',
  successText: 'text-success-text',
  warnText: 'text-warn-text',
  dangerText: 'text-danger-text',
  border: 'text-border',
  success: 'text-success',
  onSuccess: 'text-on-success',
  warn: 'text-warn',
  onWarn: 'text-on-warn',
  danger: 'text-danger',
  onDanger: 'text-on-danger',
};

const WEIGHT_CLASS: Record<TextWeight, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const ALIGN_CLASS: Record<TextAlign, string> = {
  auto: '',
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

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
export const Text = React.forwardRef<HTMLSpanElement, TextProps>(function Text(
  {
    size = 'base',
    tone = 'onSurface',
    weight = 'regular',
    align = 'auto',
    numberOfLines,
    className,
    style,
    children,
    ...rest
  },
  ref
) {
  // Line clamping has no token to violate — it is pure layout, so an inline
  // rule is fine here where a colour or a size would not be.
  const clamp: React.CSSProperties | undefined =
    numberOfLines != null
      ? {
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: numberOfLines,
          overflow: 'hidden',
        }
      : undefined;

  return (
    <span
      ref={ref}
      className={cn(
        SIZE_CLASS[size],
        LEADING_CLASS[size],
        TONE_CLASS[tone],
        WEIGHT_CLASS[weight],
        ALIGN_CLASS[align],
        className
      )}
      style={clamp ? { ...clamp, ...style } : style}
      {...rest}
    >
      {children}
    </span>
  );
});
