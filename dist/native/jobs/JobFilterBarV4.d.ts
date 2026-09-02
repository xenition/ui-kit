import * as React from 'react';
import type { JobFilterBarProps } from './JobFilterBar';
export interface JobFilterBarV4Props extends JobFilterBarProps {
    /** Placeholder in the search field. Default `'Search jobs, companies, skills…'`. */
    searchPlaceholder?: string;
    /** Render the result count. Default `'12 results'` / `'1 result'`. */
    formatResultCount?: (count: number) => string;
    /** Said instead of a count when nothing matched. Default `'No matching jobs'`. */
    emptyLabel?: string;
}
/**
 * **V4 job filter bar** — same props as {@link JobFilterBar} plus
 * `searchPlaceholder`, `formatResultCount` and `emptyLabel`.
 *
 * ## Five changes
 *
 * 1. **The chips are not a tab list.** The base put
 *    `accessibilityRole="tablist"` on the `ScrollView` (and `role="tablist"` on
 *    web). These are **multi-select filters**: a tab list promises exactly one
 *    selected tab and a matching tab panel, so a reader announced "tab 2 of 4"
 *    for a control where two, three or none can be on at once, and looked for
 *    a panel that does not exist. The role is gone; each chip is a button that
 *    reports its own `selected` state, which is what a filter chip is.
 * 2. **"Clear" stopped being a red alarm.** The bar reused `SkillTag`'s
 *    `matched` and `missing` variants as selection state, so the clear
 *    affordance rendered as a solid danger-red chip labelled "! Clear" —
 *    the palette's strongest colour, meaning destruction, on the mildest
 *    action in the module. Clearing a filter is undoing a choice, so it is a
 *    plain outline chip. Selection is `primary`, the way every other V4 chip
 *    strip in the kit says it.
 * 3. **The chips are targets.** They were about 20 points tall — `paddingVertical:
 *    3` around a 12pt label — on the single most-tapped control in the module.
 *    They clear 44 now, from the same `minTap` the buttons and the nav line
 *    stand on.
 * 4. **`resultCount={0}` says something.** Zero is the one count that matters
 *    and it announced nothing at all, so a filter that eliminated every job
 *    looked identical to one still loading. It now draws `emptyLabel` in a
 *    polite live region, so the reader hears the outcome of the filter they
 *    just changed without being interrupted mid-word.
 * 5. **`muted` stopped inking the count**, and the search field is the V4 one —
 *    same height, same radius and same focus halo as every other field, with a
 *    real 44 clear button instead of a bare ✕ in 8 points of slop.
 */
export declare function JobFilterBarV4({ types, active, onToggleType, query, onQueryChange, onClear, resultCount, searchPlaceholder, formatResultCount, emptyLabel, style, }: JobFilterBarV4Props): React.ReactElement;
//# sourceMappingURL=JobFilterBarV4.d.ts.map