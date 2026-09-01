import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { ButtonV4 } from '../primitives/ButtonV4';
import { IconV4 } from '../primitives/IconV4';
import { MIN_TAP_SQUARE_CLASS } from '../primitives/internal/nav-v4';
import {
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
  stateGroundVars,
} from '../primitives/internal/v4-state';
import { ACTION_SKIN } from './LikePassButtonsV4';
import { TONE_INK, type ToneV4 } from './internal/profile-v4';
import type { BoostBannerProps, BoostVariant } from './BoostBanner';

export interface BoostBannerV4Props extends BoostBannerProps {
  /** Name for the dismiss control. Default `'Dismiss'`. */
  dismissLabel?: string;
}

interface Spec {
  glyph: string;
  tone: ToneV4;
  title: string;
  subtitle: string;
  cta: string;
}

/**
 * The three upsells.
 *
 * `premium` wore `warn` — the slot that means *something has gone wrong* — for
 * an offer. An upsell is identity, so the glyph carries which one it is and the
 * tone stays inside the two identity slots the theme guarantees.
 */
const SPEC: Record<BoostVariant, Spec> = {
  boost: {
    glyph: '⚡',
    tone: 'primary',
    title: 'Be seen first',
    subtitle: 'Boost your profile to the top for 30 minutes.',
    cta: 'Boost me',
  },
  superboost: {
    glyph: '🚀',
    tone: 'accent',
    title: 'Super Boost tonight',
    subtitle: 'Up to 100× more profile views during peak hours.',
    cta: 'Super Boost',
  },
  premium: {
    glyph: '★',
    tone: 'primary',
    title: 'Go Premium',
    subtitle: 'Unlimited likes, see who likes you, and more.',
    cta: 'Upgrade',
  },
};

/**
 * **V4 boost banner** — the web twin of the native `BoostBannerV4`, same props
 * as {@link BoostBanner} plus `dismissLabel`.
 *
 * ## Four changes
 *
 * 1. **`onDismiss` no longer deletes the CTA.** The two lived in one ternary,
 *    so supplying a dismiss handler silently removed the call to action —
 *    `ctaLabel` was accepted, typed and documented, and never rendered. A
 *    dismissible upsell is the normal case, and it shipped with no way to
 *    accept the offer. Both render.
 * 2. **The banner is not a button with buttons in it.** It was a `<div>` with
 *    `role="button"`, `tabIndex={0}` and a hand-written Enter/Space handler,
 *    wrapping a real `<button>` that had to `stopPropagation` to work — three
 *    approximations of a button, nested, each of which a screen reader reports
 *    as a separate control on top of the container's own name. The banner is a
 *    labelled group; the CTA and the dismiss are the only controls in it.
 * 3. **Dismiss is hittable and named.** It was a bare `✕` glyph on a text-sized
 *    hit box with a hard-coded English name.
 * 4. **Press is a state layer**, not `hover:opacity-90` on the whole card —
 *    dimming is how the line draws *disabled*, so a hovered banner and a dead
 *    one looked alike.
 */
export const BoostBannerV4 = React.forwardRef<HTMLDivElement, BoostBannerV4Props>(
  function BoostBannerV4(
    {
      variant = 'boost',
      title,
      subtitle,
      ctaLabel,
      onClick,
      activeLabel,
      onDismiss,
      dismissLabel = 'Dismiss',
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    const headingId = React.useId();
    const spec = SPEC[variant];
    const skin = ACTION_SKIN[spec.tone];
    const active = activeLabel != null;
    const heading = title ?? spec.title;
    const support = active ? activeLabel : (subtitle ?? spec.subtitle);

    // A CTA with no handler and no label of its own is an offer nobody can
    // accept, so it is not drawn — but supplying either one is enough.
    const showCta = onClick != null || ctaLabel != null;

    return (
      <div
        ref={ref}
        role="group"
        aria-labelledby={headingId}
        className={cn(
          'flex items-center gap-md rounded-[var(--xen-radius-lg)] border bg-surface p-md',
          active ? skin.ring : 'border-border',
          className
        )}
        {...rest}
      >
        <span
          aria-hidden="true"
          className={cn(
            'flex shrink-0 items-center justify-center rounded-full border text-xl',
            MIN_TAP_SQUARE_CLASS,
            skin.fill,
            skin.ring
          )}
        >
          {spec.glyph}
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-xs">
          <span id={headingId} className="text-base font-bold text-on-surface">
            {heading}
          </span>
          {/*
            A running countdown is the one thing here that changes on its own,
            so it is the one thing that announces — politely, once it settles.
          */}
          <span
            role={active ? 'status' : undefined}
            aria-live={active ? 'polite' : undefined}
            className={cn(
              'line-clamp-2 text-sm',
              active ? TONE_INK[spec.tone] : 'text-muted-text'
            )}
          >
            {support}
          </span>
        </div>

        {showCta ? (
          <ButtonV4 variant="primary" size="sm" onClick={() => onClick?.()}>
            {ctaLabel ?? spec.cta}
          </ButtonV4>
        ) : null}

        {onDismiss ? (
          <button
            type="button"
            aria-label={dismissLabel}
            onClick={() => onDismiss()}
            data-xen-v4-state=""
            style={stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)')}
            className={cn(
              'inline-flex shrink-0 items-center justify-center rounded-full text-muted-text',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              MIN_TAP_SQUARE_CLASS
            )}
          >
            <IconV4 name="close" size="lg" />
          </button>
        ) : null}
      </div>
    );
  }
);
