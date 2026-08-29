import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import { NAV_V4_CSS } from './internal/nav-v4';
import { useDepth } from './internal/surface-v4';
import type { TooltipProps, TooltipSide } from './Tooltip';

export type { TooltipProps as TooltipV4Props, TooltipSide };

/** Placement, in token gaps rather than a fixed 4px. */
const SIDE: Record<TooltipSide, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-xs',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-xs',
  left: 'right-full top-1/2 -translate-y-1/2 mr-xs',
  right: 'left-full top-1/2 -translate-y-1/2 ml-xs',
};

/**
 * **V4 tooltip** — the web twin of the native `TooltipV4`, same props as
 * {@link Tooltip}, a different design line.
 *
 * ## Why the bubble inverts, and why it stopped using the ramp
 *
 * A tip is the one floating thing in the kit that inverts, and that is how a
 * reader recognises "this is an annotation, not a surface" before reading a
 * word (§31 — prefer the established pattern). The base built the inversion
 * from `bg-neutral-900` / `text-neutral-50`, which reads correctly only because
 * the dark block re-emits the ramps mirrored: a pair by luck, not by promise.
 * V4 uses `on-surface` / `surface`, which the compiler guarantees against each
 * other in both schemes, so the inversion carries its own contrast.
 *
 * It takes `--xen-elevation-card`, the smallest of the three, because a tip has
 * barely left the page — §36.8, feedback proportional to the event. The base
 * had Tailwind's `shadow`, which cannot know a dark page needs more of it.
 *
 * At `depth: 'glass'` it joins the glass family instead: an inverted bubble
 * behind a blur is neither legible nor translucent. That is the one place this
 * component reads `depth`, and a necessary one — the compiler neutralises
 * gradients and elevation and stops there, so glass has to be asked for while
 * elevation falls flat on its own.
 *
 * ## The wrapper stays, and that is not an oversight
 *
 * `MenuV4` and `PopoverV4` had to stop wrapping their trigger and clone it
 * instead: on native a `<Button>` trigger takes the touch responder from any
 * wrapper, and on web a wrapping `<span onClick>` made a trigger's `disabled` a
 * lie. Neither applies here. This span listens for mouse-enter/leave and
 * focus/blur, none of which a nested control intercepts and none of which
 * activate anything, so there is no handler to hand the child and nothing for
 * the child's `disabled` to have an opinion about. The child stays exactly as
 * passed. The native twin has no hover to lean on, so it injects an
 * `onLongPress` — the same rule in each platform's vocabulary.
 */
export function TooltipV4({
  label,
  side = 'top',
  children,
  className,
}: TooltipProps): React.ReactElement {
  injectStyleOnce('xen-v4-nav-styles', NAV_V4_CSS);
  const [open, setOpen] = React.useState(false);
  const glassy = useDepth() === 'glass';

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          data-xen-v4-nav-tip={glassy ? 'glass' : ''}
          className={cn(
            'pointer-events-none absolute z-50 whitespace-nowrap font-body text-sm',
            'rounded-[var(--xen-radius-sm)] px-sm py-xs',
            SIDE[side],
            className
          )}
        >
          {label}
        </span>
      )}
    </span>
  );
}
