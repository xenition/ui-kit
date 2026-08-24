import * as React from 'react';
import type { MenuSectionProps } from './MenuSection';
/** Drop-in for {@link MenuSection}: identical props, a distinct design. */
export type MenuSectionV3Props = MenuSectionProps;
/**
 * MenuSection, alternate design **V3** — a *minimal editorial* group. The title
 * is a compact heading followed by a hairline rule that runs to the edge, with
 * the `aside` slot tucked at the far right of that rule; the optional
 * description sits under it. Items follow, tightly stacked. The empty state is a
 * single quiet italic line, not a boxed panel. Line-based and understated — the
 * opposite of V2's contained banner. Same props as the base; token-only.
 */
export declare const MenuSectionV3: React.ForwardRefExoticComponent<MenuSectionProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=MenuSectionV3.d.ts.map