import * as React from 'react';
import type { MenuSectionProps } from './MenuSection';
export interface MenuSectionV4Props extends MenuSectionProps {
    /** The next-step sentence under `emptyLabel`. */
    emptyDescription?: string;
}
/**
 * **V4 menu section** — same props as {@link MenuSection} plus
 * `emptyDescription`.
 *
 * ## Four changes
 *
 * 1. **The empty state is the shared primitive.** This twin hand-rolled a
 *    dashed box around one muted line while the web twin had already moved to
 *    `EmptyState` — so the "EmptyState is a primitive" change only ever landed
 *    on half the kit, and an empty category looked like two different products
 *    depending on the device. `EmptyStateV4` also drops the dashed rectangle,
 *    which is a placeholder outline drawn around a region whose emptiness the
 *    reader can already see.
 * 2. **An empty section says what to do next**, via `emptyDescription`. "No
 *    items yet." on its own is the failure mode an empty state exists to
 *    avoid.
 * 3. **The section is not announced as a summary.** `accessibilityRole="summary"`
 *    sat on the container of the entire dish list, describing the group as a
 *    précis of itself; a heading and its content need no role above them.
 * 4. **The description is `mutedText`.** `muted` is a ramp step with no
 *    contrast promise, and this is a sentence a reader has to read.
 *
 * **Renders nothing without a `title`.**
 */
export declare function MenuSectionV4({ title, description, aside, children, emptyLabel, emptyDescription, emptyState, style, }: MenuSectionV4Props): React.ReactElement | null;
//# sourceMappingURL=MenuSectionV4.d.ts.map