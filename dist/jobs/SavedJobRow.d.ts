import * as React from 'react';
import type { Job } from './types';
export interface SavedJobRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** The saved job to render. */
    job: Job;
    /** When it was saved (ISO-8601); shown as a relative age. */
    savedAt?: string;
    /** Fired when the row is pressed (open detail). `onPress` → `onClick`. */
    onClick?: (job: Job) => void;
    /** Fired when the bookmark toggle is pressed (unsave). */
    onRemove?: (job: Job) => void;
}
/**
 * A compact row for the "saved jobs" list: company avatar, title, type badge +
 * salary, saved age, and a filled bookmark that removes the job when pressed.
 * Data + callbacks only; tokens only.
 */
export declare const SavedJobRow: React.ForwardRefExoticComponent<SavedJobRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SavedJobRow.d.ts.map