import * as React from 'react';
import type { SurveyChoice, ChoiceSelection } from './types';
export interface MultipleChoiceProps {
    /** The answer options. Empty renders the empty state. */
    options: SurveyChoice[];
    /**
     * Controlled selection. In `single` mode a string id (or `null`); in
     * `multiple` mode an array of ids.
     */
    value: string | string[] | null;
    /**
     * Fires with the next selection — a string id in `single` mode, an id array
     * in `multiple` mode.
     */
    onChange: (value: string | string[]) => void;
    /** `single` = radios, `multiple` = checkboxes. Default `'single'`. */
    selection?: ChoiceSelection;
    /** Accessible name for the option group. Default `'Answer options'`. */
    'aria-label'?: string;
    disabled?: boolean;
    className?: string;
}
/**
 * A choice list — the answer control for pick-one (`single`) or pick-many
 * (`multiple`) questions. Each option is a full-width clickable row with a
 * token-bound radio/checkbox indicator; the selected row fills its indicator
 * with the primary token and is announced via `aria-checked`, so state is never
 * conveyed by color alone. `single` exposes a `radiogroup` of `radio` rows,
 * `multiple` a group of `checkbox` rows. Empty options render a muted
 * {@link EmptyState}. No literal colors.
 */
export declare const MultipleChoice: React.ForwardRefExoticComponent<MultipleChoiceProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MultipleChoice.d.ts.map