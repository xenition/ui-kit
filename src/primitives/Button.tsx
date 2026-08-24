import * as React from 'react';
import { cn } from './cn';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'danger'
  | 'soft'
  | 'link'
  | 'elevated';
export type ButtonSize = 'sm' | 'md' | 'lg';
/**
 * Recolors the button's accent — the web mirror of the native `ButtonTone`.
 * `default`/`primary` share the primary slot; `danger`/`success` swap in the
 * semantic accent. Defaults to `default`, which reproduces the historical look.
 */
export type ButtonTone = 'default' | 'primary' | 'danger' | 'success';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Semantic accent for the button (danger/success paths). Defaults to `default`. */
  tone?: ButtonTone;
  /**
   * When set, the button renders as an anchor (`<a href>`) styled identically
   * via the same variant/size classes — for navigation CTAs (external links,
   * or wrap this in a router `<Link>`). The `type` prop is ignored in this
   * form. Existing `<Button onClick>` usage is unaffected.
   */
  href?: string;
  /** Anchor `target` (only applied when `href` is set), e.g. `_blank`. */
  target?: React.HTMLAttributeAnchorTarget;
  /** Anchor `rel` (only applied when `href` is set), e.g. `noreferrer`. */
  rel?: string;
}

/** Per-tone token-class pieces. `default`/`primary` share the primary slot. */
const TONE: Record<
  ButtonTone,
  {
    solid: string;
    ring: string;
    text: string;
    border: string;
    softBg: string;
    softHover: string;
  }
> = {
  default: {
    solid: 'bg-primary text-on-primary',
    ring: 'focus-visible:ring-primary-300',
    text: 'text-primary',
    border: 'border-primary',
    softBg: 'bg-primary-50',
    softHover: 'hover:bg-primary-50',
  },
  primary: {
    solid: 'bg-primary text-on-primary',
    ring: 'focus-visible:ring-primary-300',
    text: 'text-primary',
    border: 'border-primary',
    softBg: 'bg-primary-50',
    softHover: 'hover:bg-primary-50',
  },
  danger: {
    solid: 'bg-danger text-on-danger',
    ring: 'focus-visible:ring-danger',
    text: 'text-danger',
    border: 'border-danger',
    // success/warn/danger have no `-50` ramp → subtle neutral bg + colored text.
    softBg: 'bg-neutral-100',
    softHover: 'hover:bg-neutral-100',
  },
  success: {
    solid: 'bg-success text-on-success',
    ring: 'focus-visible:ring-success',
    text: 'text-success',
    border: 'border-success',
    softBg: 'bg-neutral-100',
    softHover: 'hover:bg-neutral-100',
  },
};

/**
 * Resolve the color-bearing classes for a variant under a tone. With the
 * default tone the five historical variants reproduce their prior class strings
 * byte-for-byte; the additive `soft`/`link`/`elevated` variants and the
 * non-default tones layer on top.
 */
function variantClasses(variant: ButtonVariant, tone: ButtonTone): string {
  const t = TONE[tone];
  const neutralText = tone === 'default';
  switch (variant) {
    case 'primary':
      return cn(t.solid, 'hover:opacity-90', t.ring);
    case 'secondary':
      return cn('border', t.border, 'bg-transparent', t.text, t.softHover, t.ring);
    case 'ghost':
      return cn(
        'bg-transparent',
        neutralText ? 'text-on-surface' : t.text,
        'hover:bg-neutral-100',
        neutralText ? 'focus-visible:ring-neutral-300' : t.ring
      );
    case 'outline':
      return cn(
        'border border-border bg-transparent',
        neutralText ? 'text-on-surface' : t.text,
        'hover:bg-neutral-100',
        neutralText ? 'focus-visible:ring-neutral-300' : t.ring
      );
    // `danger` is a semantic variant that pins the danger accent regardless of
    // tone — kept identical to the historical string.
    case 'danger':
      return 'bg-danger text-on-danger hover:opacity-90 focus-visible:ring-danger';
    case 'soft':
      return cn(t.softBg, t.text, 'hover:opacity-90', t.ring);
    case 'link':
      return cn('bg-transparent', t.text, 'underline underline-offset-2 hover:opacity-80', t.ring);
    case 'elevated':
      return cn(
        'border border-border bg-surface shadow',
        neutralText ? 'text-on-surface' : t.text,
        'hover:bg-neutral-100',
        neutralText ? 'focus-visible:ring-neutral-300' : t.ring
      );
  }
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

/**
 * Themed button. All colors/radii come from the `--xen-*` tokens via the
 * Tailwind preset — no literal colors (kit lint rule).
 *
 * Variants `primary`/`secondary`/`ghost`/`outline`/`danger` and the default
 * tone render exactly as before; `soft`/`link`/`elevated` and the `tone` prop
 * (`danger`/`success`) are additive opt-ins mirroring the native `Button`.
 *
 * Pass `href` to render a styled `<a>` instead of a `<button>` (navigation
 * CTAs); everything else — variants, sizes, ref forwarding — is identical.
 */
export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      tone = 'default',
      className,
      type = 'button',
      href,
      target,
      rel,
      ...rest
    },
    ref
  ) {
    const classes = cn(
      'inline-flex items-center justify-center font-medium transition-colors',
      'rounded-[var(--xen-radius-md)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
      'disabled:pointer-events-none disabled:opacity-50',
      variantClasses(variant, tone),
      SIZE_CLASSES[size],
      className
    );

    if (href !== undefined) {
      // Anchor form. `rest` carries button-typed DOM props (event handlers keyed
      // to HTMLButtonElement); the DOM shape is identical at runtime, so cast to
      // the anchor attribute set for the spread. `type` is intentionally dropped.
      return (
        <a
          ref={ref as React.Ref<never>}
          href={href}
          target={target}
          rel={rel}
          className={classes}
          {...(rest as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        />
      );
    }

    return <button ref={ref as React.Ref<never>} type={type} className={classes} {...rest} />;
  }
);
