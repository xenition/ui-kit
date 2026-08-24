import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
    accessibilityLabel?: string;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A choice list — the native answer control for pick-one (`single`) or
 * pick-many (`multiple`) questions. Each option is a full-width tappable row
 * with a token-bound radio/checkbox indicator; the selected row fills its
 * indicator with the primary token and is announced via `accessibilityState`
 * (`selected`/`checked`), so state is never conveyed by color alone. The group
 * carries the appropriate `radiogroup` (single) role. Empty options render a
 * muted empty state. No literal colors.
 */
export declare function MultipleChoice({ options, value, onChange, selection, accessibilityLabel, disabled, style, }: MultipleChoiceProps): React.ReactElement;
//# sourceMappingURL=MultipleChoice.d.ts.map