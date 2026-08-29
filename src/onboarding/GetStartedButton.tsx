import * as React from 'react';
import { Button, type ButtonSize, type ButtonVariant } from '../primitives/Button';
import { Icon, type IconColor } from '../primitives/Icon';
import { Spinner } from '../primitives/Spinner';
import { cn } from '../primitives/cn';

export interface GetStartedButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * CTA copy. Default `'Get started'` — an outcome, not "Submit"/"Continue"
   * (design.md §47). Override with the concrete next step where one fits
   * (e.g. `'Create my account'`, `'Start free trial'`).
   */
  label?: string;
  /** Visual weight. Default `'primary'`. */
  variant?: ButtonVariant;
  /** Control height. Default `'lg'` — this is a hero action. */
  size?: ButtonSize;
  /**
   * Trailing `→` glyph. Default `true`: an onboarding CTA almost always moves
   * the user forward, and the arrow is what says so (onboarding spec §5). Pass
   * `false` on a **terminal** action — "Done", "Maybe later", "Restore
   * purchase" — where an arrow would promise a next screen that never comes.
   */
  trailingArrow?: boolean;
  /**
   * Show a spinner and block clicks while an async step runs. The web `Button`
   * primitive has no `loading` of its own, so this maps to `disabled` +
   * `aria-busy` + an inline {@link Spinner}.
   */
  loading?: boolean;
  /** Stretch to fill the parent width. Default `true`. */
  fullWidth?: boolean;
}

/**
 * The sticky-footer CTA height from the onboarding spec (§5), as a Tailwind
 * class: `h-14` is 56px. A geometric control dimension, which §10.1 permits —
 * it is not a spacing token and must not be one: 56 is the touch-comfortable
 * height the inputs, provider buttons and this CTA all share so the funnel
 * reads as one control family.
 */
const CTA_HEIGHT_CLASS = 'h-14';

/**
 * Which semantic slot the trailing arrow takes, per button variant, so it
 * matches the label the `Button` primitive coloured. `IconColor` has no
 * `primary-text` slot, so the outlined/quiet variants take `primary`.
 */
const ARROW_COLOR: Record<ButtonVariant, IconColor> = {
  primary: 'onPrimary',
  secondary: 'primary',
  ghost: 'onSurface',
  outline: 'onSurface',
  danger: 'onDanger',
  soft: 'primary',
  link: 'primary',
  elevated: 'onSurface',
};

/**
 * The primary onboarding call-to-action — and, since the redesign, the shape
 * every screen in the funnel ends on.
 *
 * What shipped before was a short flat rectangle sitting mid-page: the same
 * `Button` the rest of the app used, at whatever width its parent happened to
 * give it. The reference screens all end on one unmistakable bar, so this now
 * pins the spec's §5 treatment — **56 tall, fully rounded, full width, primary
 * fill, semibold on-primary label, trailing `→`** — into one place, so every
 * entry screen (welcome, slides, sign-in, paywall, profile) gets it without
 * re-specifying anything. Disabled is the same shape at reduced opacity, never
 * a different shape, so the button does not appear to move when it enables.
 *
 * The hero treatment applies at `size="lg"` (the default). `sm`/`md` fall back
 * to the `Button` primitive's own compact geometry, for the rare inline use.
 * The RN `loading` idiom (spinner + blocked press) has one web home here:
 * `disabled` + `aria-busy` + an inline {@link Spinner}. All color and radius
 * come from the `--xen-*` tokens. No literal colors.
 */
export const GetStartedButton = React.forwardRef<HTMLButtonElement, GetStartedButtonProps>(
  function GetStartedButton(
    {
      label = 'Get started',
      variant = 'primary',
      size = 'lg',
      trailingArrow = true,
      loading = false,
      fullWidth = true,
      disabled,
      className,
      style,
      'aria-label': ariaLabel,
      ...rest
    },
    ref
  ) {
    // Only the hero size takes the §5 bar; a `sm`/`md` caller wanted a small
    // button and should keep getting one.
    const hero = size === 'lg';

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        aria-label={ariaLabel ?? label}
        className={cn(fullWidth && 'w-full', 'gap-2', hero && CTA_HEIGHT_CLASS, className)}
        /*
          `cn` is a plain joiner, not tailwind-merge, so a `rounded-full` class
          would sit alongside the primitive's own `rounded-[var(--xen-radius-md)]`
          and the winner would be whichever Tailwind emitted last. An inline rule
          is deterministic — and it is still the token, never a literal radius.
        */
        style={hero ? { borderRadius: 'var(--xen-radius-full)', ...style } : style}
        {...rest}
      >
        {loading ? <Spinner size="sm" aria-label="Loading" /> : null}
        {/*
          The label gets its own element so a text query still finds it once the
          arrow is in the button, and it is deliberately unstyled: the size comes
          from the primitive's `size` class and the colour is inherited from the
          variant, so there is nothing here for a `Text` to add.
        */}
        <span>{label}</span>
        {trailingArrow ? <Icon name="forward" size={size === 'lg' ? 'lg' : 'base'} color={ARROW_COLOR[variant]} /> : null}
      </Button>
    );
  }
);
