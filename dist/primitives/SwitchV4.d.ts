import * as React from 'react';
import type { SwitchProps } from './Switch';
export type { SwitchProps as SwitchV4Props };
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
export declare const SwitchV4: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=SwitchV4.d.ts.map