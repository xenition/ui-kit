import * as React from 'react';
import type { SelectProps } from './Select';
export type { SelectProps as SelectV4Props };
/**
 * **V4 select** — the same props as {@link Select}, a different design line.
 *
 * It is still a real `<select>` with real `<option>` children, and the caret is
 * still the platform's. That is a decision, not an omission: an
 * `appearance: none` select has to redraw the caret from an asset, re-teach the
 * listbox to a keyboard, and re-implement the OS picker every mobile browser
 * already opens for it — three regressions bought with one arrow. §31 asks for
 * familiar interactions and §46 puts accessibility before styling, so the part
 * of this control the platform does better than we would is left alone.
 *
 * What changes is the field it sits in. The trigger takes `FIELD_V4_SHELL` —
 * `2xl` tall, `md` radius, `md` horizontal padding — which are the same numbers
 * `InputV4` takes, from the same shared constant. That is the whole point. A
 * form where the text field is 48px and the select is 38px reads as two
 * components that happen to be near each other; matching them is the single
 * cheapest thing a kit can do to make a screen look considered (§13).
 *
 * §8 bans excessive pill-shaped controls, so unlike `SwitchV4` this takes
 * `--xen-radius-md` straight off the seed and a `sharp` brand gets a square
 * select. A select is a box; only the switch is a pill.
 *
 * Focus is the shared V4 halo rather than the base's `ring-1`, which was a
 * hairline that read as a second border. It is drawn with `box-shadow`, so
 * arming it costs no layout (§36.11), and `invalid` retints the border and the
 * ring from the same flag so the two can never disagree.
 *
 * No gradient, no glass, no shadow — §16 asks that forms stay minimal.
 */
export declare const SelectV4: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
//# sourceMappingURL=SelectV4.d.ts.map