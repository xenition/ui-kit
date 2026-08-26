import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import { FIELD_MOTION, FIELD_V4_CSS, FIELD_V4_STYLE_ID } from './internal/field-v4';
import type { SwitchProps } from './Switch';
import { EASE_ENTER, transitionCss } from './internal/v4-motion';

export type { SwitchProps as SwitchV4Props };

/** Half the gap between knob and track, top and bottom — the knob's seat. */
const INSET = 'calc(var(--xen-space-xs) / 2)';
/** Track width less the knob and both insets: exactly how far the knob throws. */
const TRAVEL = 'calc(var(--xen-space-2xl) - var(--xen-space-lg) - var(--xen-space-xs))';

/** Decelerating — a knob should settle into its end of the track (§36.3). */

const SWITCH_V4_CSS = `
[data-xen-v4-switch] { position: relative; }
[data-xen-v4-switch-fill] {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background-color: var(--xen-primary);
  opacity: 0;
  transition: ${transitionCss(['opacity'], FIELD_MOTION)};
}
[data-xen-v4-switch-knob] {
  position: absolute;
  left: ${INSET};
  box-shadow: var(--xen-elevation-card);
  transition: ${transitionCss(['transform'], FIELD_MOTION, EASE_ENTER)};
}
[data-xen-v4-switch][aria-checked="true"] [data-xen-v4-switch-fill] { opacity: 1; }
[data-xen-v4-switch][aria-checked="true"] [data-xen-v4-switch-knob] {
  transform: translateX(${TRAVEL});
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-switch-fill], [data-xen-v4-switch-knob] { transition: none; }
}
`;

/**
 * **V4 switch** — the same props as {@link Switch}, a different design line.
 *
 * `design.md` §8 lists "excessive pill-shaped controls" among the tells of
 * generic AI UI, and this is the control that is exempt: a switch is a pill
 * because a switch **is** a pill — a knob that travels a track. The ban is on
 * capsule-shaping things that are not, which is why the V4 select, field and
 * textarea all take `--xen-radius-md` from the seed instead. The roundness
 * here is derived from the track's own height rather than `--xen-radius-full`,
 * so the shape survives a `sharp` seed that would otherwise square off the one
 * control whose whole affordance is the roundness.
 *
 * Three things make it read as a physical object rather than a coloured bar:
 *
 * 1. **The knob is above the track.** It carries `--xen-elevation-card`,
 *    consumed unconditionally, so a `depth: 'flat'` seed flattens it with no
 *    branch here. This is one of the two places in the V4 form line where a
 *    shadow is honest: a switch knob is genuinely an object sitting on
 *    something (§11 — a container has to earn its existence, and so does a
 *    shadow).
 * 2. **The throw is a throw.** The knob translates on a decelerating curve in
 *    {@link FIELD_MOTION}ms while the brand track fades up beneath it, so on
 *    and off are connected by a movement rather than separated by a repaint
 *    (§36.1, §36.3). Under `prefers-reduced-motion` both transitions are
 *    dropped and the state is simply there (§36.10).
 * 3. **A real focus ring.** The same translucent brand halo `InputV4` paints,
 *    from the same shared sheet, drawn with `box-shadow` — the base's
 *    `ring-2 ring-offset-1` was two rings fighting for the same edge.
 *
 * The off track is `bg-border`, not `bg-neutral-300`. The neutral ramp keeps
 * its light-mode orientation under `[data-theme="dark"]`, so a `neutral-300`
 * track is a pale bar across a dark page; `--xen-border` is resolved per
 * scheme and is the same hairline every other control in the form is outlined
 * in (§35.9 — light and dark must be semantic).
 */
export const SwitchV4 = React.forwardRef<HTMLButtonElement, SwitchProps>(function SwitchV4(
  { className, checked = false, onCheckedChange, onChange, disabled, ...rest },
  ref
) {
  injectStyleOnce(FIELD_V4_STYLE_ID, FIELD_V4_CSS);
  injectStyleOnce('xen-v4-switch-styles', SWITCH_V4_CSS);

  // Two spellings, one callback: the original wins when both are passed, so a
  // caller who has migrated half a file never gets the change reported twice.
  const emit = onCheckedChange ?? onChange;

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      data-xen-v4-switch=""
      data-xen-v4-field=""
      aria-checked={checked}
      disabled={disabled}
      onClick={() => emit?.(!checked)}
      className={cn(
        'inline-flex shrink-0 items-center bg-border',
        'h-[calc(var(--xen-space-lg)_+_var(--xen-space-xs))] w-[var(--xen-space-2xl)]',
        'rounded-[calc((var(--xen-space-lg)_+_var(--xen-space-xs))_/_2)]',
        'disabled:pointer-events-none disabled:opacity-[0.38]',
        className
      )}
      {...rest}
    >
      <span aria-hidden data-xen-v4-switch-fill="" />
      <span
        aria-hidden
        data-xen-v4-switch-knob=""
        className={cn(
          'block h-[var(--xen-space-lg)] w-[var(--xen-space-lg)] bg-surface',
          'rounded-[calc(var(--xen-space-lg)_/_2)]'
        )}
      />
    </button>
  );
});
