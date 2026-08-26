import * as React from 'react';
import type { ToggleGroupOption, ToggleGroupProps } from './ToggleGroup';
export type { ToggleGroupProps as ToggleGroupV4Props, ToggleGroupOption };
/**
 * `ToggleGroup`, V4 — the same props, at the height every other control in the
 * form is.
 *
 * ## One form, one edge
 *
 * The single biggest quality signal a form can send is that every control in it
 * agrees. So this takes the shared V4 control metrics: `2xl` tall,
 * `radius.md` — the same numbers `InputV4` shipped and `internal/field-v4`
 * holds for the eleven other form controls. The base's `py-sm` put it around
 * 34, so a toggle group stacked next to a select in the same form was visibly a
 * different family and missed the 44px target as well.
 *
 * ## The seam
 *
 * A hairline `<span>` between cells rather than a `border-l` on each, matching
 * `ButtonGroupV4`. A border on the cell stops at the cell's own padding box, so
 * when one neighbour is filled and the other is not the divider reads as a step
 * rather than a seam; a stretched span is full-bleed in every combination.
 *
 * The group is joined by adjacency and one hairline. No fill, no gradient, no
 * shadow (§9, §11) — the selected cell is what carries colour, and it is the
 * only thing that does.
 *
 * ## Feedback
 *
 * Hover and press are the M3 state layer, and each cell layers over **its own**
 * ground: an unselected cell mixes `on-surface` into `surface`, a selected one
 * mixes `on-primary` into `primary`. The base's `hover:bg-neutral-100` is a
 * light-oriented ramp step that paints a near-white slab on a dark page, and it
 * skipped the selected cell entirely, so the chosen option was the one thing in
 * the control that never answered the pointer.
 *
 * Focus is `--xen-ring` — one ring for the whole kit — inset by 2px so it stays
 * inside the joined shape instead of being clipped by it.
 *
 * ## What the group announces
 *
 * `radiogroup` in single mode, `group` in `multiple` mode. The base said
 * `group` on the web and `radiogroup` on native in **both** modes, so a
 * multi-select group announced itself to a screen reader as a set of mutually
 * exclusive choices — which is the opposite of what it does. `radio` children
 * also require a `radiogroup` parent to be valid at all, so the single-mode
 * case was under-described in the same breath.
 */
export declare function ToggleGroupV4({ options, value, onChange, multiple, disabled, accessibilityLabel, className, }: ToggleGroupProps): React.ReactElement;
//# sourceMappingURL=ToggleGroupV4.d.ts.map