import * as React from 'react';
import { cn } from './cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
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

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-on-primary hover:opacity-90 focus-visible:ring-primary-300',
  secondary:
    'border border-primary bg-transparent text-primary hover:bg-primary-50 focus-visible:ring-primary-300',
  ghost: 'bg-transparent text-on-surface hover:bg-neutral-100 focus-visible:ring-neutral-300',
  outline:
    'border border-border bg-transparent text-on-surface hover:bg-neutral-100 focus-visible:ring-neutral-300',
  danger: 'bg-danger text-on-danger hover:opacity-90 focus-visible:ring-danger',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

/**
 * Themed button. All colors/radii come from the `--xen-*` tokens via the
 * Tailwind preset — no literal colors (kit lint rule).
 *
 * Pass `href` to render a styled `<a>` instead of a `<button>` (navigation
 * CTAs); everything else — variants, sizes, ref forwarding — is identical.
 */
export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    { variant = 'primary', size = 'md', className, type = 'button', href, target, rel, ...rest },
    ref
  ) {
    const classes = cn(
      'inline-flex items-center justify-center font-medium transition-colors',
      'rounded-[var(--xen-radius-md)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
      'disabled:pointer-events-none disabled:opacity-50',
      VARIANT_CLASSES[variant],
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
