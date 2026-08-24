import * as React from 'react';
import type { InterestOption } from './types';
export interface InterestPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'title'> {
    /** Choosable topics. Empty renders the empty state. */
    options: InterestOption[];
    /** Currently selected ids (controlled). */
    selectedIds: string[];
    /** Fires with the full next selection set on each toggle. */
    onChange: (selectedIds: string[]) => void;
    /** Optional heading above the chips. */
    title?: string;
    /** Optional helper line (e.g. `'Pick at least 3'`). */
    helper?: string;
    /** Cap on selections; chips past the cap disable when unselected. */
    maxSelections?: number;
    /** Accessible name for the chip group. Default `'Interests'`. */
    groupLabel?: string;
}
/**
 * Multi-select interest chips — the "personalize your feed" onboarding step. A
 * wrap of toggleable chips where a selected chip fills with the primary token
 * and shows a check; selection state is announced per-chip (`aria-checked`) and
 * the running count is exposed on the group label plus a polite live region, so
 * screen-reader users hear their progress. Enforces an optional `maxSelections`
 * cap. Guards an empty option list with the {@link EmptyState}. No literal
 * colors.
 */
export declare const InterestPicker: React.ForwardRefExoticComponent<InterestPickerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=InterestPicker.d.ts.map