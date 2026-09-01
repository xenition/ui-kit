import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import { IconV4 } from './IconV4';
import { SpinnerV4 } from './SpinnerV4';
import { TextV4 } from './TextV4';
import {
  gradientCss,
  gradientInk,
  shadowCss,
  useOptionalCompiledTheme,
} from './internal/v4-depth';
import { transitionCss, V4_MOTION } from './internal/v4-motion';
import { V4_STATE } from './internal/v4-state';
import type { ButtonTone } from './Button';
import type { IconName } from './icon-names';
import type { IconColor } from './Icon';

/**
 * **V4 auth submit button** — the web twin of the native `AuthSubmitButtonV4`,
 * the same props as `AuthSubmitButton` plus the three additive ones below.
 *
 * This is the single most prominent element in the auth and onboarding
 * reference screens: `ONBOARDING-DESIGN-SPEC.md` §5's big, warm, full-width
 * pill with a trailing arrow, sitting confidently at the bottom of the sticky
 * footer. Everything in this file exists to make it read as *generous* and
 * *unmissable*, and to make sure it never changes shape underneath the finger.
 *
 * ## Why this one keeps 56 / `radius.full`
 *
 * The Addendum settled V4 control metrics at `spacing['2xl']` (48) and
 * `radius.md` — but it anchored that ruling on `InputV4`, and it is a ruling
 * about **field-shaped** controls: the things that stack in a form and have to
 * share an edge. The sticky primary CTA is not one of them. It is the one
 * dominant action on the screen (§5), it stands alone under a hairline, and
 * shrinking it to field height would flatten the exact hierarchy the reference
 * screens are built on. So §5's own shape stands: {@link AUTH_SUBMIT_HEIGHT_V4}
 * tall, `radius.full`.
 *
 * ## What V4 changes against the base
 *
 * - **The fill is `gradient.brand`** at the default/primary tone, run through
 *   {@link gradientInk} so the label clears AA against **both** stops rather
 *   than against the one flat colour `on-primary` was measured on. §35.11 keeps
 *   gradients rare and purposeful; §5's single dominant action is precisely the
 *   place one is earned. A `danger` or `success` tone stays solid — §35.4, a
 *   semantic colour is not a brand colour, and "Delete account" wearing the
 *   brand sweep reads as a promotion.
 * - **The lift is `elevation.action`** and the press genuinely depresses
 *   (scale, plus a shadow that sits back down), both read off the compiled
 *   theme — so a `depth: 'flat'` seed produces a flat button with no branch in
 *   this file, because the tokens are already inert.
 * - **The busy state lives in the trailing slot.** The base put a spinner
 *   *before* the label, which widens the button the moment it starts working —
 *   the same "it moved" defect §5 forbids for the disabled state. Here the
 *   trailing `→` is simply replaced by the spinner: one slot, one indicator,
 *   no reflow.
 * - **Busy is not disabled.** M3 spends `0.38` to mean *unavailable*, and the
 *   base dimmed the whole button (spinner included) while it was working. This
 *   one blocks the second press but stays at full strength; only a genuinely
 *   disabled button dims.
 * - **The arrow leans into a hover** by half a `spacing.xs`, dropped entirely
 *   under `prefers-reduced-motion` (§36.10) — the direction is carried by the
 *   glyph, never by the movement.
 *
 * With no `XenitionUIProvider` above it there is no compiled theme, so it falls
 * back to the flat `bg-primary` look rather than guessing at a gradient it
 * cannot contrast-check.
 */

/*
  §10.1 permits the named control heights as bare numbers, and this is the one
  this file is allowed. 56 is §5's CTA height — the number that makes the
  reference screens read as generous instead of cramped. It is a *layout*
  decision, not a theme one: there is no "control height" token, and inventing
  one would push a layout choice into the seed where a brand colour belongs.

  The CSS below never types `56px`. It composes the same 56 out of the spacing
  scale — `2xl` (48) + `sm` (8) — exactly as `FloatButtonV4` does, so a
  re-scaled seed re-scales the CTA with the rest of the product instead of
  leaving one pinned literal behind.
*/
export const AUTH_SUBMIT_HEIGHT_V4 = 56;

/** {@link AUTH_SUBMIT_HEIGHT_V4}, composed from the scale rather than typed. */
const HEIGHT_CSS = 'calc(var(--xen-space-2xl) + var(--xen-space-sm))';

/**
 * How much of the button's own ink the busy ring's track carries, in percent.
 *
 * `SpinnerV4` mixes a fifth of `primary` into `surface` for its track, so the
 * whole ring stays one object rather than a bright chip orbiting a grey hoop.
 * On a filled CTA that idea has to be said in the button's ink instead: a
 * `primary` ring on a `primary` fill is invisible. Same ratio, different pair.
 */
const BUSY_TRACK_PERCENT = 20;

/**
 * Depth, shape and ink live in this sheet because `box-shadow`,
 * `background-image`, `color-mix()` over a custom property and the
 * `[data-theme="dark"]` switch are none of them expressible as a utility class
 * bound to a token. Every colour in it is a custom property — a `--xen-*`
 * token, or a `--xen-v4-*` the component computed from the compiled theme — so
 * the no-literal-colours rule holds.
 *
 * The shape is here rather than in a `rounded-[…]` class for a second reason:
 * two arbitrary-value classes for the same property have identical specificity,
 * and which one wins is decided by the order the build emitted them, not by the
 * order they were written. A pill that is only *usually* a pill is not a shape.
 */
const AUTH_SUBMIT_V4_CSS = `
[data-xen-v4-auth-submit] {
  /* §5's 56, composed from the spacing scale. A MINIMUM rather than a fixed
     height: a user at 200% text zoom must get a taller button, not a clipped
     label (§46 — accessibility before tidiness). */
  min-height: ${HEIGHT_CSS};
  border-radius: var(--xen-radius-full);
  background-image: var(--xen-v4-image-l, none);
  color: var(--xen-v4-on-l, var(--xen-on-primary));
  box-shadow: var(--xen-v4-shadow-l, none);
  transition: ${transitionCss(['box-shadow', 'opacity'])},
    ${transitionCss(['transform'], V4_MOTION.quick)};
}
[data-theme="dark"] [data-xen-v4-auth-submit] {
  background-image: var(--xen-v4-image-d, none);
  color: var(--xen-v4-on-d, var(--xen-on-primary));
  box-shadow: var(--xen-v4-shadow-d, none);
}
[data-xen-v4-auth-submit]:active {
  transform: scale(0.985);
  box-shadow: var(--xen-v4-shadow-held-l, none);
}
[data-theme="dark"] [data-xen-v4-auth-submit]:active {
  box-shadow: var(--xen-v4-shadow-held-d, none);
}
[data-xen-v4-auth-submit]:focus-visible {
  outline: 2px solid var(--xen-ring);
  outline-offset: 2px;
}
/*
  Disabled is the SAME SHAPE at reduced opacity — never a different shape, or
  the button appears to move when it enables (§5). Busy is deliberately exempt:
  a working button is not an unavailable one, and M3 spends 0.38 on
  "unavailable". It still cannot be pressed twice.
*/
[data-xen-v4-auth-submit]:disabled { pointer-events: none; }
[data-xen-v4-auth-submit]:disabled:not([aria-busy="true"]) {
  opacity: ${V4_STATE.disabledContent};
}
/*
  The label, the arrow and the busy ring all take the button's own measured ink.
  Two-part selectors, so they beat the text-* token class the child already
  carries without either side having to know the build's emission order — and
  the child keeps that class as a correct fallback if this sheet never loads.
*/
[data-xen-v4-auth-submit] [data-xen-v4-auth-label],
[data-xen-v4-auth-submit] [data-xen-v4-auth-arrow] { color: inherit; }
[data-xen-v4-auth-submit] [data-xen-v4-auth-busy] {
  border-color: color-mix(in srgb, currentColor ${BUSY_TRACK_PERCENT}%, transparent);
  border-top-color: currentColor;
}
[data-xen-v4-auth-arrow] { transition: ${transitionCss(['transform'], V4_MOTION.quick)}; }
[data-xen-v4-auth-submit]:hover:not(:disabled) [data-xen-v4-auth-arrow] {
  transform: translateX(calc(var(--xen-space-xs) / 2));
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-auth-submit], [data-xen-v4-auth-arrow] { transition: none; }
  [data-xen-v4-auth-submit]:active { transform: none; }
  [data-xen-v4-auth-submit]:hover:not(:disabled) [data-xen-v4-auth-arrow] { transform: none; }
}
`;

/**
 * Fill class and the `on` slot the label falls back to, per tone.
 *
 * The `on` slot is a *fallback*, not the final answer: the sheet upgrades every
 * child to the button's measured ink, which for a brand gradient is checked
 * against both stops. Keeping the semantic slot correct per tone means the
 * button is still legible in the one case where the sheet has not arrived.
 */
const TONE: Record<ButtonTone, { fill: string; on: IconColor; onVar: string }> = {
  default: { fill: 'bg-primary', on: 'onPrimary', onVar: 'var(--xen-on-primary)' },
  primary: { fill: 'bg-primary', on: 'onPrimary', onVar: 'var(--xen-on-primary)' },
  danger: { fill: 'bg-danger', on: 'onDanger', onVar: 'var(--xen-on-danger)' },
  success: { fill: 'bg-success', on: 'onSuccess', onVar: 'var(--xen-on-success)' },
};

export interface AuthSubmitButtonV4Props
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** The action, spelled out. "Sign in", "Create account", "Done". */
  label: string;
  /** Swaps the trailing glyph for a spinner and blocks a second press. */
  loading?: boolean;
  /** Trailing `→` on a forward action; drop it on a terminal one (§5). Default `true`. */
  trailingArrow?: boolean;
  /**
   * Semantic accent — V4 addition. `default`/`primary` carry the brand
   * gradient; `danger`/`success` stay solid, because a semantic colour is not a
   * brand colour (§35.4) and a destructive CTA wearing the brand sweep reads as
   * a promotion. Default `'default'`.
   */
  tone?: ButtonTone;
  /**
   * Which glyph sits in the trailing slot — V4 addition. Default `'forward'`,
   * §5's `→`. Only consulted when {@link trailingArrow} is on, so the two props
   * cannot disagree about whether there is a trailing glyph at all.
   */
  trailingIcon?: IconName;
  /**
   * The label while {@link loading} — V4 addition. "Signing in…" rather than a
   * frozen "Sign in", so the announced name changes with the state instead of
   * leaving a screen-reader user with a button that says it has not been
   * pressed. Falls back to {@link label}.
   */
  busyLabel?: string;
}

export const AuthSubmitButtonV4 = React.forwardRef<HTMLButtonElement, AuthSubmitButtonV4Props>(
  function AuthSubmitButtonV4(
    {
      label,
      loading = false,
      trailingArrow = true,
      tone = 'default',
      trailingIcon = 'forward',
      busyLabel,
      disabled,
      type = 'button',
      className,
      style,
      ...rest
    },
    ref
  ) {
    injectStyleOnce('xen-v4-auth-submit-styles', AUTH_SUBMIT_V4_CSS);
    const theme = useOptionalCompiledTheme();
    const t = TONE[tone];

    // The one place a gradient is allowed: the brand-toned dominant action.
    const brandAction = tone === 'default' || tone === 'primary';
    const shown = loading ? (busyLabel ?? label) : label;
    // §12 — the empty state. A label the caller left blank must not become an
    // empty text node with an empty accessible name; the pill keeps its shape
    // and simply has nothing in it.
    const named = shown.trim() !== '';

    const vars: Record<string, string> = {};
    if (theme !== null) {
      vars['--xen-v4-shadow-l'] = shadowCss(theme.lightElevation.action);
      vars['--xen-v4-shadow-d'] = shadowCss(theme.darkElevation.action);
      vars['--xen-v4-shadow-held-l'] = shadowCss(theme.lightElevation.action, 0.5);
      vars['--xen-v4-shadow-held-d'] = shadowCss(theme.darkElevation.action, 0.5);
    }
    if (theme !== null && brandAction) {
      const extremes = { darkest: theme.ramps.neutral[950], lightest: theme.ramps.neutral[50] };
      // One legible pair per scheme; the provider stamps `data-theme` on a
      // wrapper rather than putting the scheme in context, so both go down and
      // the sheet picks.
      const light = gradientInk(theme.lightGradient.brand, theme.light.onPrimary, extremes);
      const dark = gradientInk(theme.darkGradient.brand, theme.dark.onPrimary, extremes);
      vars['--xen-v4-image-l'] = gradientCss(theme.lightGradient.brand.angle, light.from, light.to);
      vars['--xen-v4-image-d'] = gradientCss(theme.darkGradient.brand.angle, dark.from, dark.to);
      vars['--xen-v4-on-l'] = light.ink;
      vars['--xen-v4-on-d'] = dark.ink;
    } else {
      // Solid tone (or no compiled theme): the ink is the tone's own `on` slot,
      // which the compiler already contrast-checked against the fill.
      vars['--xen-v4-on-l'] = t.onVar;
      vars['--xen-v4-on-d'] = t.onVar;
    }

    return (
      <button
        ref={ref}
        data-xen-v4-auth-submit=""
        type={type}
        disabled={disabled === true || loading}
        aria-busy={loading || undefined}
        aria-label={named ? shown : undefined}
        className={cn(
          // Full width: §5's "minus `spacing.lg` each side" is the sticky
          // footer's own padding, not an inset this button carries — so the
          // CTA and the provider buttons beside it share one edge.
          'inline-flex w-full items-center justify-center gap-sm px-lg font-body',
          'focus-visible:outline-none',
          t.fill,
          className
        )}
        style={{ ...vars, ...style } as React.CSSProperties}
        {...rest}
      >
        {named ? (
          <TextV4 data-xen-v4-auth-label="" size="lg" weight="semibold" tone={t.on}>
            {shown}
          </TextV4>
        ) : null}
        {loading ? (
          <SpinnerV4
            data-xen-v4-auth-busy=""
            size="sm"
            role={undefined}
            aria-label={undefined}
            aria-hidden="true"
          />
        ) : trailingArrow ? (
          <IconV4 data-xen-v4-auth-arrow="" name={trailingIcon} size="base" color={t.on} />
        ) : null}
      </button>
    );
  }
);
