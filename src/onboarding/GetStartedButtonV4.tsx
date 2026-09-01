import * as React from 'react';
import { cn } from '../primitives/cn';
import { ButtonV4 } from '../primitives/ButtonV4';
import { IconV4 } from '../primitives/IconV4';
import { Spinner } from '../primitives/Spinner';
import type { ButtonVariant } from '../primitives/Button';
import type { IconColor } from '../primitives/Icon';
import type { GetStartedButtonProps } from './GetStartedButton';

export interface GetStartedButtonV4Props extends GetStartedButtonProps {
  /**
   * What sits after the label.
   *
   * The base offered `trailingArrow: boolean`, and the reference screens show
   * why that is one bit too few: a forward step ends in `→`, but the *offer*
   * step ends in a sparkle — the mark is part of what the button is selling.
   * Pass any node to replace the arrow; pass `null` for nothing. Omit it and
   * `trailingArrow` decides, exactly as today.
   */
  trailing?: React.ReactNode;
  /**
   * Carry `elevation.action`. Default `true`.
   *
   * A funnel's CTA is the one control on the screen that genuinely sits above
   * the page — it is pinned over content that scrolls beneath it. A
   * `depth: 'flat'` seed has already zeroed the token, so flat apps get flat
   * for free with no branch here. Pass `false` inside a sheet or a card that
   * already casts one.
   */
  raised?: boolean;
}

/**
 * The §5 CTA bar's height, composed from the spacing scale rather than pinned
 * at `h-14`.
 *
 * `2xl + sm` is the same 56px on the default scale and stays proportional on
 * any other — the base's literal is exactly the drift the design-spec Addendum
 * settled for form controls, applied here on the action side.
 */
const CTA_HEIGHT = 'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))]';

/**
 * Which semantic slot the trailing mark takes, per variant.
 *
 * `IconColor` carries no `primaryText` slot, so the quiet variants take
 * `primary` here and the **label** beside them is what wears the corrected
 * tone. Widening `IconColor` to the four `*Text` slots is worth doing — a
 * brand-coloured glyph on `surface` has the same contrast problem a
 * brand-coloured word does — but it is a change to `Icon`, not something to
 * fork inside one module.
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
 * **V4 onboarding CTA** — the web twin of the native `GetStartedButtonV4`,
 * same props as {@link GetStartedButton} plus `trailing` and `raised`.
 *
 * The shape every screen in the funnel ends on: full width, `radius.full`,
 * semibold label, a trailing mark, pinned into one place so no screen
 * re-specifies it.
 *
 * ## Four changes
 *
 * 1. **The height comes off the scale** (see {@link CTA_HEIGHT}).
 * 2. **The trailing mark is a slot, not a boolean.**
 * 3. **The label and mark take contrast-corrected tones** (see
 *    {@link ARROW_COLOR}).
 * 4. **It is raised** — `elevation.action` via `ButtonV4`'s own depth, which
 *    a flat seed has already zeroed.
 *
 * `disabled` is the same shape at reduced opacity, never a different one, so
 * the button does not appear to move when it enables. The hero treatment
 * applies at `size="lg"` (the default); `sm`/`md` fall back to `ButtonV4`'s
 * compact geometry for the rare inline use.
 */
export const GetStartedButtonV4 = React.forwardRef<HTMLButtonElement, GetStartedButtonV4Props>(
  function GetStartedButtonV4(
    {
      label = 'Get started',
      variant = 'primary',
      size = 'lg',
      trailingArrow = true,
      trailing,
      raised = true,
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
    // Only the hero size takes the §5 bar; an `sm`/`md` caller wanted a small
    // button and should keep getting one.
    const hero = size === 'lg';

    const mark =
      trailing !== undefined ? (
        trailing
      ) : trailingArrow ? (
        <IconV4 name="forward" size={hero ? 'lg' : 'base'} color={ARROW_COLOR[variant]} />
      ) : null;

    return (
      <ButtonV4
        ref={ref}
        variant={variant}
        size={size}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        aria-label={ariaLabel ?? label}
        className={cn(fullWidth && 'w-full', 'gap-sm', hero && CTA_HEIGHT, className)}
        /*
          `cn` is a plain joiner, not tailwind-merge, so a `rounded-full` class
          would sit beside the primitive's own radius and the winner would be
          whichever Tailwind emitted last. An inline rule is deterministic —
          and it is still the token, never a literal radius. The shadow rides
          along for the same reason: it is the compiled `--xen-elevation-action`,
          zero on a flat seed.
        */
        style={
          hero
            ? {
                borderRadius: 'var(--xen-radius-full)',
                // A disabled control that still casts a shadow reads as pressable.
                boxShadow: raised && !disabled ? 'var(--xen-elevation-action)' : undefined,
                ...style,
              }
            : style
        }
        {...rest}
      >
        {loading ? <Spinner size="sm" aria-label="Loading" /> : null}
        {/* The label keeps its own element so a text query still finds it once
            the mark is in the button. */}
        <span className="font-semibold">{label}</span>
        {mark}
      </ButtonV4>
    );
  }
);
