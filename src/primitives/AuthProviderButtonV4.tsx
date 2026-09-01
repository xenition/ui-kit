import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import { IconV4 } from './IconV4';
import { SpinnerV4 } from './SpinnerV4';
import { TextV4 } from './TextV4';
import type { AuthProviderButtonProps } from './AuthCard';
import { transitionCss, V4_MOTION } from './internal/v4-motion';
import {
  stateGroundVars,
  V4_DISABLED_CLASS,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from './internal/v4-state';

/**
 * ## Which control height this takes, and why
 *
 * §9 says "provider buttons at the same 56 height" as the CTA and the fields.
 * The Addendum overrules the number and keeps the sentence: control height is
 * `spacing['2xl']` (48) at `radius.md`, because `InputV4` shipped first at
 * those values and is the anchor every field is measured against, and because
 * 56 is not a step on the spacing scale.
 *
 * The instruction §9 was actually giving is *"the same height as the fields"*.
 * A provider button is stacked directly under the email and password fields
 * and the CTA, and the single biggest quality signal an auth screen can send
 * is that every edge in that stack lines up. So this control takes the field
 * metric — `--xen-space-2xl` tall, `--xen-radius-md` corners, `px-lg` inside —
 * exactly as `InputV4` does, and the whole stack agrees.
 *
 * That is also why there is no named `56` constant in this file: taking the
 * metric off the scale means there is no literal to name. A `sharp` seed gets
 * square provider buttons and a re-scaled seed re-scales the auth stack
 * together, neither of which a hard 56 could do.
 *
 * The base's `radius.full` pill is deliberately not carried over. A pill at
 * `radius.full` beside a `radius.md` field reads as a different family, and
 * §9's own point is that the provider row is the *alternative to the form*,
 * not a visitor from another screen.
 */
const HEIGHT_CLASS = 'min-h-[var(--xen-space-2xl)]';

/**
 * How far the button depresses under a finger — the same figure `ButtonV4`
 * uses, so the CTA and the provider button beneath it answer a press
 * identically. A transform scale is geometry, not a token: there is no
 * "amount of squash" slot in the theme, and inventing one would put a motion
 * decision in the brand seed.
 */
const PRESS_SCALE = 0.985;

/**
 * The press depression and the focus ring live in a sheet for the reason every
 * V4 sheet does: a `transform` keyed to `:active` and an `outline` drawn from
 * a custom property cannot be said as utility classes bound to a token. Every
 * colour in it is a `--xen-*`.
 *
 * Hover, focus and press *tinting* is not here — that is the shared M3 state
 * layer from `internal/v4-state`, opted into with `data-xen-v4-state`.
 */
const PROVIDER_V4_CSS = `
[data-xen-v4-provider] {
  transition: ${transitionCss(['border-color'])},
    ${transitionCss(['transform'], V4_MOTION.quick)};
}
[data-xen-v4-provider]:focus-visible {
  outline: 2px solid var(--xen-ring);
  outline-offset: 2px;
}
[data-xen-v4-provider]:active:not(:disabled) { transform: scale(${PRESS_SCALE}); }
@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-provider] { transition: none; }
  [data-xen-v4-provider]:active { transform: none; }
}
`;

export interface AuthProviderButtonV4Props extends AuthProviderButtonProps {
  /**
   * Social sign-in leaves the app: a redirect, a popup, a native sheet. The
   * gap between the tap and the browser handing over is real, and without a
   * pending state a user taps "Continue with Google" twice. Shows a spinner in
   * the logo's place and blocks further presses.
   */
  loading?: boolean;
  /**
   * Logo only, no label — for a row of three or more providers side by side,
   * where full-width rows would push the footer off the fold.
   *
   * The label is not lost: it stays the button's accessible name, so a screen
   * reader still announces "Continue with Google" and the control keeps a
   * square footprint at the field height.
   */
  compact?: boolean;
  /**
   * Whether the button fills its container. Default `true` — the base's
   * `w-full` rendering, and what §9's stacked provider list wants. Set `false`
   * to lay several out in a row.
   */
  fullWidth?: boolean;
}

/**
 * **V4 provider button** — one social/SSO action from `ONBOARDING-DESIGN-SPEC.md`
 * §9, in the V4 design line. Web twin of the native `AuthProviderButtonV4`.
 *
 * Outlined, never filled. §5 gives the screen exactly one dominant action and
 * the primary CTA is it; a filled provider button beside a filled CTA makes
 * the user choose between two equally loud options for the same goal. So this
 * is `surface` behind a hairline `border`, with the logo leading the label —
 * calm enough to read as the alternative, present enough to be obviously
 * tappable.
 *
 * Feedback is the shared M3 state layer (`data-xen-v4-state`): hover, focus
 * and press tint the *container* at M3's opacities rather than dimming the
 * control's own content, which is the signal `0.38` is reserved for and which
 * made the base's `hover:opacity-85` read like a half-disabled button. Disabled
 * is that `0.38` — `V4_DISABLED_CLASS`, one spelling for the whole line.
 *
 * Because the button owns its fill, the state layer is grounded on it
 * explicitly ({@link stateGroundVars}) rather than left translucent: the label
 * is contrast-checked against `surface`, and an opaque layer keeps that
 * promise measurable instead of borrowing whatever the page put underneath.
 *
 * See {@link HEIGHT_CLASS} for the control-height ruling.
 */
export const AuthProviderButtonV4 = React.forwardRef<
  HTMLButtonElement,
  AuthProviderButtonV4Props
>(function AuthProviderButtonV4(
  {
    label,
    glyph,
    name,
    loading = false,
    compact = false,
    fullWidth = true,
    disabled = false,
    className,
    style,
    ...rest
  },
  ref
) {
  injectStyleOnce('xen-v4-auth-provider-styles', PROVIDER_V4_CSS);
  injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

  const isDisabled = disabled || loading;
  const hasMark = Boolean(glyph) || Boolean(name);

  return (
    <button
      ref={ref}
      type="button"
      // The visible label is also the accessible name, and it is the *only*
      // name in `compact`. Set unconditionally so the two forms announce
      // identically.
      aria-label={label}
      aria-busy={loading || undefined}
      disabled={isDisabled}
      data-xen-v4-provider=""
      data-xen-v4-state=""
      className={cn(
        'inline-flex items-center justify-center gap-sm font-body',
        HEIGHT_CLASS,
        'bg-surface text-on-surface',
        'border border-border rounded-[var(--xen-radius-md)]',
        'focus-visible:outline-none',
        compact ? 'px-md min-w-[var(--xen-space-2xl)]' : 'px-lg',
        fullWidth ? 'w-full' : 'w-auto',
        V4_DISABLED_CLASS,
        className
      )}
      style={
        {
          ...stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)'),
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      {loading ? <SpinnerV4 size="sm" /> : hasMark ? <IconV4 glyph={glyph} name={name} size="base" /> : null}
      {compact ? null : (
        <TextV4 size="base" weight="semibold">
          {label}
        </TextV4>
      )}
    </button>
  );
});
