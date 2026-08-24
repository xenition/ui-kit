import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { InterestOption } from './types';
export interface InterestPickerProps {
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
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Multi-select interest chips — the "personalize your feed" onboarding step. A
 * wrap of toggleable chips where a selected chip fills with the primary token
 * and shows a check; selection state is announced per-chip (`selected`) and the
 * running count is exposed on the group so screen-reader users hear their
 * progress. Enforces an optional `maxSelections` cap. Guards an empty option
 * list. No literal colors.
 */
export declare function InterestPicker({ options, selectedIds, onChange, title, helper, maxSelections, accessibilityLabel, style, }: InterestPickerProps): React.ReactElement;
//# sourceMappingURL=InterestPicker.d.ts.map