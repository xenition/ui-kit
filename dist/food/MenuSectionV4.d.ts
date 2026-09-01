import * as React from 'react';
import type { MenuSectionProps } from './MenuSection';
export interface MenuSectionV4Props extends MenuSectionProps {
    /**
     * The sentence under the empty title. An empty category needs a next step —
     * "Nothing here yet" alone tells a user what they can already see.
     */
    emptyDescription?: string;
}
/**
 * **V4 menu section** — the web twin of the native `MenuSectionV4`, same props
 * as {@link MenuSection} plus `emptyDescription`.
 *
 * ## Three changes
 *
 * 1. **Both twins render the same empty state.** The "EmptyState is a
 *    primitive" change only ever landed on this side — native still hand-rolls
 *    a dashed box — so one twin's empty category was the kit's empty state and
 *    the other's was a dashed rectangle §11 argues against. Both take
 *    `EmptyStateV4` now, and `emptyDescription` gives it the second sentence a
 *    title on its own cannot carry.
 * 2. **The section is a real landmark.** A `<section>` with no accessible name
 *    is skipped by a reader's region list; `aria-labelledby` points it at its
 *    own heading, so a menu of eight categories is navigable as eight regions
 *    instead of one long run of dishes.
 * 3. **Tokens.** The supporting line was `text-muted` — a fill slot used as
 *    ink, with no contrast promise — where `mutedText` is the corrected one.
 */
export declare const MenuSectionV4: React.ForwardRefExoticComponent<MenuSectionV4Props & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=MenuSectionV4.d.ts.map