import * as React from 'react';
import type { SelectOption, SelectProps } from './Select';
export type { SelectProps as SelectV4Props, SelectOption };
/**
 * **V4 select** — the same props as {@link Select}, a different design line.
 *
 * The trigger is a **field**, not a button: `2xl` tall, `md` radius, `md`
 * horizontal padding — the same numbers `InputV4` takes, from the same shared
 * `fieldMetrics`. That is the whole point. A form where the text field is 48pt
 * and the select is 34pt reads as two components that happen to be near each
 * other; matching them is the single cheapest thing a kit can do to make a
 * screen look considered (§13, reusable components rather than one-off UI).
 *
 * §8 bans excessive pill-shaped controls, so unlike the `SwitchV4` track this
 * takes `radius.md` straight off the seed and a `sharp` brand gets a square
 * select. A select is a box; only the switch is a pill.
 *
 * What makes it feel like a control rather than a label:
 *
 * - **A ring that was always there.** The halo's space is reserved whether or
 *   not it is showing, so opening the sheet — or holding the trigger — never
 *   nudges the field or the label above it (§36.11).
 * - **A caret that answers.** It rotates through half a turn as the sheet
 *   opens, which is the disclosure explaining itself rather than a decoration
 *   (§36.1); it runs on the native driver and is skipped entirely under Reduce
 *   Motion (§36.10).
 * - **A sheet that is genuinely a layer.** The option list takes `panelSkin`
 *   and `elevation.sheet` from the shared surface plumbing, so it is the one
 *   place in this component where depth is honest — an overlay really is above
 *   the page. Its scrim is built from the elevation colour rather than a
 *   neutral ramp step, so it stays dark in dark mode instead of becoming the
 *   white veil the base select paints there.
 *
 * The rows inside are flat. §8's "cards inside cards inside cards" is the same
 * mistake as a raised row inside a raised sheet: the sheet is the layer, and
 * everything in it belongs to that layer.
 */
export declare function SelectV4({ options, value, onValueChange, placeholder, invalid, disabled, accessibilityLabel, style, }: SelectProps): React.ReactElement;
//# sourceMappingURL=SelectV4.d.ts.map