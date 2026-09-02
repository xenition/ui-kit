import * as React from 'react';
import type { OrgChartNodeProps } from './OrgChartNode';
export interface OrgChartNodeV4Props extends OrgChartNodeProps {
    /** Build the direct-report count. Default `'3 reports'`. */
    formatReports?: (count: number) => string;
    /** Name for the disclosure when collapsed. Default `` `Expand ${name}` ``. */
    expandLabel?: string;
    /** Name for the disclosure when expanded. Default `` `Collapse ${name}` ``. */
    collapseLabel?: string;
}
/**
 * **V4 org chart node** — same props as {@link OrgChartNode} plus
 * `formatReports`, `expandLabel` and `collapseLabel`.
 *
 * ## Five changes
 *
 * 1. **The disclosure is reachable.** It was a `Pressable` inside the node's
 *    own `Pressable`, which is `accessible` by default and flattens its whole
 *    subtree into one leaf named "Org node Ada" — so the only control that
 *    opens a manager's reports was not a focus stop, and a VoiceOver user could
 *    not walk the tree at all. The node is a plain card now; the activation
 *    wraps only the avatar-and-text region and the disclosure is its sibling,
 *    keeping its own `expanded` state.
 * 2. **The disclosure is a target.** 28 × 28 with `hitSlop={8}` is not a 44pt
 *    target, and it is the smallest control in the module.
 * 3. **A press is a state layer.** The disclosure moved
 *    `withAlpha(colors.onSurface, 0.05)` to `0.1` on press — a translucent
 *    tint whose result depends on whatever is behind the card.
 * 4. **"3 reports" is a prop.** The base appended `'s'` to `report`, which is
 *    wrong in every language the kit is otherwise ready for, and the expand /
 *    collapse names were hard-coded English too.
 * 5. **The node announces what it shows** — name, title, department and the
 *    report count as one sentence — and the highlight uses the compiler's own
 *    `selected` slot rather than a hand-mixed 6% wash of `primary`.
 *
 * **Renders nothing without a `name`.**
 */
export declare function OrgChartNodeV4({ name, title, avatarUrl, department, directReports, depth, expandable, expanded, variant, formatReports, expandLabel, collapseLabel, onToggle, onPress, testID, style, }: OrgChartNodeV4Props): React.ReactElement | null;
//# sourceMappingURL=OrgChartNodeV4.d.ts.map