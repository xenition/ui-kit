import * as React from 'react';
import type { MenuSectionProps } from './MenuSection';
/** Drop-in for {@link MenuSection}: identical props, a distinct design. */
export type MenuSectionV2Props = MenuSectionProps;
/**
 * MenuSection, alternate design **V2** — a *panelled banner* group. The whole
 * section is wrapped in an elevated surface card; the heading sits in a soft
 * primary-tinted banner strip across the top (title, description, and the
 * `aside` slot as a right-hand chip), with the items grouped inside below. The
 * empty state is a soft-tinted inset panel rather than a dashed box. This reads
 * as a bold, contained category card — the opposite of the flat classic. Same
 * props as the classic.
 */
export declare function MenuSectionV2({ title, description, aside, children, emptyLabel, emptyState, style, }: MenuSectionV2Props): React.ReactElement;
//# sourceMappingURL=MenuSectionV2.d.ts.map