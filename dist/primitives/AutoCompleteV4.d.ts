import * as React from 'react';
import type { AutoCompleteOption, AutoCompleteProps } from './AutoComplete';
export type { AutoCompleteProps as AutoCompleteV4Props, AutoCompleteOption };
/**
 * **V4 autocomplete** — the web twin of `AutoCompleteV4`, the same props as
 * {@link AutoComplete}, a different design line.
 *
 * ## Four things that make a suggestion list feel confident
 *
 * 1. **Rows at the tap-target floor.** `--xen-space-2xl`, where the base is
 *    `py-sm` around a line of text. In a list where every neighbour is a wrong
 *    answer, the floor matters more than anywhere else in the kit.
 * 2. **The match, marked.** The part of each label that matched what you typed
 *    is bolded — the answer to "why is this in the list", and what lets the eye
 *    confirm a row without reading it (§33 — optimise for scanning; §32 —
 *    recognition over recall).
 * 3. **A list that says when it is empty.** The base hides itself when nothing
 *    matches, which is indistinguishable from being broken. V4 keeps the panel
 *    and says so, quoting the query back (§37 — make system status visible;
 *    §15 — an empty state should tell the user where they are).
 * 4. **A keyboard that works.** The base is `role="combobox"` with
 *    `aria-autocomplete="list"` and no key handling at all: the contract says
 *    "arrow through these" and nothing happens. ↑/↓ move the active option,
 *    Enter takes it, Escape closes — and `aria-activedescendant` points at the
 *    live row, so a screen reader is told which one it is. Familiar
 *    interactions (§31) only count when they actually work.
 *
 * ## The field and the panel
 *
 * The field is `InputV4`'s: same minimum height, same `md` radius, and the same
 * `box-shadow` halo armed on `:focus-within`. The panel floats on
 * `--xen-elevation-card` with its hairline kept, and takes glass only when the
 * seed asked for `depth: 'glass'`. Hover is a `color-mix` against
 * `--xen-surface`, never `hover:bg-neutral-100`, which is a light-oriented ramp
 * step in both schemes.
 */
export declare function AutoCompleteV4({ options, value, onChange, onSelect, placeholder, maxResults, invalid, disabled, accessibilityLabel, className, }: AutoCompleteProps): React.ReactElement;
//# sourceMappingURL=AutoCompleteV4.d.ts.map