import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface JobListV4Props {
    /** Heading above the list. Omitted by default. */
    title?: string;
    /** The rows — `JobCardV4`, `SavedJobRowV4`, `ApplicationRowV4`, … */
    children?: React.ReactNode;
    /** Draw placeholder cards instead of content. */
    loading?: boolean;
    /** How many placeholders a loading list draws. Default 3. */
    skeletonRows?: number;
    /** Render the list's own count. Default `'12 jobs'` / `'1 job'`. */
    formatCount?: (count: number) => string;
    /** Headline when nothing matched. Default `'No jobs found'`. */
    emptyLabel?: string;
    /** The next-step sentence under {@link JobListV4Props.emptyLabel}. */
    emptyDescription?: string;
    /** Announced while the placeholders are up. Default `'Loading jobs'`. */
    loadingLabel?: string;
    /** Test hook, matching the rest of the module. */
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 job list** — a new component. There is no base to extend, so the props
 * are plain `JobListV4Props`.
 *
 * ## Why it exists
 *
 * Every component in this module is written as one item out of a list, and the
 * module never had the list. So the three things a results screen owes its
 * user had nowhere to live:
 *
 * 1. **An empty state that says something.** A job search that matches nothing
 *    is the most common outcome of a filter, and it currently renders a blank
 *    region — indistinguishable from a request that failed. `JobFilterBarV4`
 *    can announce `resultCount={0}`, but a count in a corner is not an answer;
 *    the space where the jobs would be is where the reader is looking.
 * 2. **A loading state in the shape it is about to be.** Placeholder cards the
 *    size of the real ones, opaque and mixed against the card's own ground —
 *    never a centred spinner that collapses the layout and then jumps when the
 *    jobs arrive. `JobCardV4` has its own skeleton for a single card; this is
 *    the set of them, so the page does not reflow twice.
 * 3. **The count, drawn once and said once.** It is drawn beside the heading
 *    for the sighted reader and hidden from the screen reader there, because
 *    the list below already carries it as its accessible name.
 *
 * The rows are children rather than a `data`/`renderItem` pair on purpose: the
 * kit is presentational, and a list that owned its own virtualisation would be
 * making a data decision for the app.
 */
export declare function JobListV4({ title, children, loading, skeletonRows, formatCount, emptyLabel, emptyDescription, loadingLabel, testID, style, }: JobListV4Props): React.ReactElement;
//# sourceMappingURL=JobListV4.d.ts.map