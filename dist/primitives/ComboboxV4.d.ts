import * as React from 'react';
import type { ComboboxOption, ComboboxProps } from './Combobox';
export type { ComboboxProps as ComboboxV4Props, ComboboxOption };
/**
 * **V4 combobox** — the web twin of `ComboboxV4`, the same props as
 * {@link Combobox}, a different design line.
 *
 * ## The selected option has to be findable
 *
 * The base marks it with `text-primary`. `--xen-primary` is the one brand token
 * with no contrast promise against `--xen-surface` — it is guaranteed against
 * `on-primary` — and `--xen-primary-text` is the slot the compiler derives for
 * exactly this case: brand-coloured text ON a surface. So the selected row uses
 * `text-primary-text`, and it also carries a ✓, because colour alone is never
 * the only cue (§46).
 *
 * ## Everything else is about size, keyboard and honesty
 *
 * 1. **Rows at the tap-target floor.** `--xen-space-2xl`, where the base is
 *    `py-1.5` around `text-sm`: in a filtered list, the row above is a
 *    different answer.
 * 2. **A field that belongs in the form.** `InputV4`'s treatment, with the same
 *    halo armed on `:focus-within`.
 * 3. **A keyboard that works.** The base opens a list you can only click. ↑/↓
 *    move the active option, Enter takes it, Escape closes, and
 *    `aria-activedescendant` names the live row — the `combobox` pattern §31
 *    points at, actually implemented.
 * 4. **An empty state that says something.** "No matches for “x”", quoting the
 *    query back rather than a bare "No matches" (§15, §37).
 * 5. **Hover from a `color-mix`,** never `hover:bg-neutral-100`: the neutral
 *    ramp keeps the light orientation in both schemes, so step 100 flashes
 *    near-white on a dark page.
 *
 * The panel floats on `--xen-elevation-card` with its hairline and takes glass
 * only when the seed asked for `depth: 'glass'`.
 */
export declare function ComboboxV4({ options, value, onChange, placeholder, className, }: ComboboxProps): React.ReactElement;
//# sourceMappingURL=ComboboxV4.d.ts.map