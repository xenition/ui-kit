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
 * textarea all take `radius.md` from the seed instead. The track's roundness
 * here is derived from its own height rather than `radius.full`, so the shape
 * survives a `sharp` seed that would otherwise square off the one control
 * whose whole affordance is the roundness.
 *
 * Three things make it read as a physical object rather than a coloured bar:
 *
 * 1. **The knob is above the track.** It carries `elevation.card` — the same
 *    token a raised surface takes, consumed unconditionally, so a
 *    `depth: 'flat'` seed flattens it with no branch here. This is one of the
 *    two places in the V4 form line where a shadow is honest: a switch knob is
 *    genuinely an object sitting on something (§11 — a container has to earn
 *    its existence, and so does a shadow).
 * 2. **The throw is a throw.** The knob translates on the native driver in
 *    {@link FIELD_MOTION}ms and the `colors.primary` track fades up beneath
 *    it, so on and off are connected by a movement rather than separated by a
 *    repaint (§36.1, §36.3). Under Reduce Motion both land on their final
 *    value on the first frame — the state is never carried by the animation
 *    (§36.10).
 * 3. **A target you can hit.** The track is `2xl` wide and `lg + xs` tall;
 *    `hitSlop` opens the touch area out to the `2xl` height every other V4
 *    control takes, and a brand halo lights in the space the focus ring
 *    already reserves while it is held, so pressing never shifts the layout
 *    (§36.11).
 *
 * The off track is `colors.border` rather than a ramp step. `ramps.neutral`
 * keeps the light-mode orientation in both schemes, so a neutral-300 track is
 * a pale bar on a dark page; `border` is resolved for the active scheme and is
 * the same hairline every other control in the form is outlined in.
 */
export declare function SwitchV4({ checked, onCheckedChange, onChange, disabled, accessibilityLabel, style, }: SwitchProps): React.ReactElement;
//# sourceMappingURL=SwitchV4.d.ts.map