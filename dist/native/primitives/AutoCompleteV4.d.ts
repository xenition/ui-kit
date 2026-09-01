import * as React from 'react';
import type { AutoCompleteOption, AutoCompleteProps } from './AutoComplete';
export type { AutoCompleteProps as AutoCompleteV4Props, AutoCompleteOption };
/**
 * **V4 autocomplete** — the same props as {@link AutoComplete}, a different
 * design line.
 *
 * ## Three things that make a suggestion list feel confident
 *
 * 1. **Rows at `tapTarget()`.** The base row is `md` vertical padding around a
 *    line of text: comfortably tappable in isolation, and the row above it is a
 *    different search result. In a list where every neighbour is a wrong
 *    answer, the floor matters more than anywhere else in the kit.
 * 2. **The match, marked.** The part of each label that matched what you typed
 *    is bolded. That is not decoration: it is the answer to "why is this in the
 *    list", and it lets the eye confirm a row without reading it (§33 —
 *    optimise for scanning). §32 asks for recognition over recall, and a
 *    highlighted substring is recognition made visible.
 * 3. **A list that says when it is empty.** The base hides itself when nothing
 *    matches, which is indistinguishable from being broken. V4 keeps the panel
 *    and says so, quoting the query back (§37 — make system status visible;
 *    §15 — an empty state should tell the user where they are).
 *
 * ## The field and the panel
 *
 * The field is `InputV4`'s: `2xl` minimum height, `md` radius, and the brand
 * halo with its space reserved so focusing never nudges the page (§36.11). The
 * panel below it floats on `elevation.card` with its hairline kept, and takes
 * glass only when the seed asked for `depth: 'glass'` — `flatten()` neutralises
 * gradients and elevation and stops there, so elevation needs no depth check
 * and glass does.
 *
 * A pressed row is filled with `pressFill`, an opaque mix against the panel's
 * own surface rather than `colors.border`, so the feedback is a wash rather
 * than a slab.
 *
 * ## The panel arrives
 *
 * It used to be a bare `{showPanel ? … : null}` — the only member of the
 * native picker line with no `Animated` in it at all, while its own web twin
 * faded and `ComboboxV4`, `DatePickerV4` and `TimePickerV4` beside it all rose
 * and faded over `PICKER_MOTION.popover` with `EASING_ENTER`. A list of
 * answers that blinks into existence under the keyboard reads as a glitch, and
 * the arrival is the cue that says *these are for what you just typed*.
 *
 * `EASING_ENTER` because it is an arrival, and the same `xs` rise the web
 * sheet's `xen-v4-picker-in` keyframe uses, so the two twins move on one arc.
 * Under `useReducedMotion()` the panel is simply there — small, anchored, and
 * not something whose sudden presence reads as a fault (§36.10).
 */
export declare function AutoCompleteV4({ options, value, onChange, onSelect, placeholder, maxResults, invalid, disabled, accessibilityLabel, style, }: AutoCompleteProps): React.ReactElement;
//# sourceMappingURL=AutoCompleteV4.d.ts.map