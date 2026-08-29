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
 * agrees, so this reads its height and radius from `fieldMetrics` — the same
 * `2xl` / `radius.md` `InputV4` shipped and the other eleven V4 form controls
 * share. The base's `paddingVertical: sm` put it around 34, so a toggle group
 * stacked next to a select was visibly a different family and missed the 44pt
 * target as well.
 *
 * ## The seam
 *
 * A hairline `<View>` between cells rather than a `borderLeftWidth` on each.
 * A border on the cell stops at the cell's own box, so when one neighbour is
 * filled and the other is not the divider reads as a step rather than a seam; a
 * stretched hairline is full-bleed in every combination. Same construction as
 * `ButtonGroupV4`.
 *
 * The group is joined by adjacency and one hairline. No fill, no gradient, no
 * shadow (§9, §11) — the selected cell is what carries colour, and it is the
 * only thing that does.
 *
 * ## Feedback
 *
 * Press is the M3 state layer, and each cell layers over **its own** ground: an
 * unselected cell mixes `onSurface` into `surface`, a selected one mixes
 * `onPrimary` into `primary`. The base pressed with a fill of `colors.border` —
 * a hairline colour used as a surface — and skipped the selected cell, so the
 * chosen option was the one thing in the control that never answered a tap.
 *
 * A disabled cell drops to M3's `disabledContent` (0.38) instead of the base's
 * blanket 0.5 on the whole group, so the group's own edge stays legible while
 * its contents read as unavailable.
 *
 * ## What the group announces
 *
 * `radiogroup` only in single mode. The base claimed `radiogroup` in **both**,
 * so a `multiple` group announced itself to a screen reader as a set of
 * mutually exclusive choices — the opposite of what it does. In multiple mode
 * the container makes no role claim at all and the `checkbox` children carry
 * the meaning, which is the honest description.
 */
export declare function ToggleGroupV4({ options, value, onChange, multiple, disabled, accessibilityLabel, style, }: ToggleGroupProps): React.ReactElement;
//# sourceMappingURL=ToggleGroupV4.d.ts.map