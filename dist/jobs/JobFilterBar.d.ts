import * as React from 'react';
import type { EmploymentType } from './types';
export interface JobFilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Which employment-type chips to show. Defaults to all four. */
    types?: readonly EmploymentType[];
    /** Currently active types. */
    active?: EmploymentType[];
    /** Fired when a type chip is toggled. */
    onToggleType?: (type: EmploymentType) => void;
    /** Search query (controlled); shows a search field when provided. */
    query?: string;
    /** Fired as the search query changes. */
    onQueryChange?: (query: string) => void;
    /** Fired when the "Clear" chip is pressed (shown when any filter is active). */
    onClear?: () => void;
    /** Optional result-count hint rendered to the right. */
    resultCount?: number;
}
/**
 * A filter bar for a job list: an optional search field plus a wrapping row of
 * employment-type chips (`SkillTag`s) that toggle on/off, and a "Clear" chip
 * once anything is active. Controlled — the app owns `active` and `query` and
 * reacts to the callbacks. Selected chips carry a token outline + a ✓ marker
 * (not color alone). Tokens only.
 */
export declare const JobFilterBar: React.ForwardRefExoticComponent<JobFilterBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=JobFilterBar.d.ts.map