import * as React from 'react';
import type { OrgChartNodeProps } from './OrgChartNode';
export interface OrgChartNodeV4Props extends OrgChartNodeProps {
    /** Render the direct-report count. Default `'4 reports'` / `'1 report'`. */
    formatReports?: (count: number) => string;
    /** Copy on the disclosure when collapsed. Default `'Expand'`. */
    expandLabel?: string;
    /** Copy on the disclosure when expanded. Default `'Collapse'`. */
    collapseLabel?: string;
    /** Test hook. Every native `hr` component had one; no web one did. */
    testID?: string;
}
/**
 * **V4 org chart node** — the web twin of the native `OrgChartNodeV4`, same
 * props as {@link OrgChartNode} plus `formatReports`, `expandLabel`,
 * `collapseLabel` and `testID`.
 *
 * ## Six changes
 *
 * 1. **Pressing Enter on the disclosure no longer opens the person instead.**
 *    The chevron was a `<button>` inside a `<Card role="button">` carrying its
 *    own Enter/Space handler. Its click was guarded with `stopPropagation`;
 *    its keydown was not, and the card's `preventDefault()` cancels the
 *    button's own activation. So a keyboard user trying to open a branch was
 *    navigated to the manager's profile and the tree never expanded — which,
 *    on a tree, means the rest of the org is simply unreachable. The card is a
 *    plain container now and the disclosure is a **sibling** of the
 *    activation.
 * 2. **The disclosure is a 44 target.** It was 28 square — the smallest
 *    control in the module, on the affordance the whole component is for.
 * 3. **The indent is a spacing token.** `style={{ width: level * 24 }}` — a
 *    raw pixel literal in a file whose own docstring claims "no literals", and
 *    24 is not a step on the scale, so a seed that retuned its rhythm indented
 *    at the old pitch and the rail stopped lining up with anything around it.
 * 4. **`highlighted` uses the selected pair.** `bg-primary-50` is a ramp step:
 *    it mirrors under `[data-theme="dark"]`, so the focused person was a pale
 *    plate on a dark page — and the text on it kept `on-surface`, a pairing
 *    nobody had measured. `selected`/`on-selected` is the compiler's slot for
 *    exactly this and ships as a guaranteed pair.
 * 5. **The node is one accessible name.** `Org node Ada Lovelace` replaced the
 *    subtree, so the title, the department and the report count went unspoken.
 * 6. **"report"/"reports", "Expand" and "Collapse" are props.** The count
 *    pluralised by appending `'s'`, which is wrong in every language the kit
 *    is otherwise ready for.
 */
export declare const OrgChartNodeV4: React.ForwardRefExoticComponent<OrgChartNodeV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OrgChartNodeV4.d.ts.map