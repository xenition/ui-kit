import * as React from 'react';
import type { JobFilterBarProps } from './JobFilterBar';
export interface JobFilterBarV4Props extends JobFilterBarProps {
    /** Placeholder in the search field. Default `'Search jobs, companies, skills…'`. */
    searchPlaceholder?: string;
    /** Render the result count. Default `'3 results'` / `'1 result'`. */
    formatResultCount?: (n: number) => string;
    /** Said instead of a count when nothing matched. Default `'No matching jobs'`. */
    emptyLabel?: string;
}
/**
 * **V4 job filter bar** — same props as {@link JobFilterBar} plus
 * `searchPlaceholder`, `formatResultCount` and `emptyLabel`.
 *
 * ## Five changes
 *
 * 1. **"Clear" stops being a red alarm.** The base built it out of
 *    `SkillTag variant="missing"` — the variant that means *this skill is
 *    required and you do not have it* — so the one control on the bar that
 *    undoes a mistake rendered as a solid danger-red chip labelled "! Clear",
 *    the loudest thing on the screen. It is a quiet outline action now, and
 *    the chips no longer borrow `matched`/`missing` to express selection
 *    either: a filter being on is not a fact about your résumé.
 * 2. **The chips are tappable.** They were `SkillTag`s at `py-[3px]` around a
 *    12px label — about 20 CSS pixels tall — and they are the most-tapped
 *    control in the whole module. They clear 44 now, which is also what makes
 *    them look like the rest of the V4 line's chips.
 * 3. **`resultCount={0}` is finally announced.** The base tested
 *    `typeof resultCount === 'number'` and rendered `'0 results'` — true, but
 *    silently, in `text-muted` at the end of a row nobody is looking at, and
 *    with no live region, so a screen-reader user who narrowed a filter to
 *    nothing got no feedback at all. Zero now says `emptyLabel` in a polite
 *    live region: the count changes because of something the user just did,
 *    and it is the answer to what they did.
 * 4. **The counts are translatable and correctly plural.** `${n} result${n
 *    === 1 ? '' : 's'}` was hard-coded in a component with no formatter prop,
 *    as was the search placeholder.
 * 5. **The chips press with a state layer** against the fill they actually
 *    wear, rather than `hover:opacity-90`, and the count line takes
 *    `muted-text` rather than the `muted` fill slot.
 */
export declare const JobFilterBarV4: React.ForwardRefExoticComponent<JobFilterBarV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=JobFilterBarV4.d.ts.map