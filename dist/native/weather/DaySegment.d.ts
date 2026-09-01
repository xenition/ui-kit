import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface DaySegmentProps {
    /** Segment labels, e.g. `['Today', 'Tomorrow', 'Next 7 days']`. */
    options: string[];
    /** Index of the active segment. */
    selectedIndex: number;
    /** Called with the tapped index. */
    onSelect: (index: number) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * DaySegment — a segmented pill selector (Today / Tomorrow / Next 7 days). Sits
 * on the page ground (not the gradient): a bordered, fully-rounded track holding
 * equal-width pills; the active pill fills with `primary` and its label flips to
 * `onPrimary`, the rest stay muted. All colors/sizes come from the compiled theme
 * tokens — no literal color (the unselected pill simply omits its background).
 */
export declare function DaySegment({ options, selectedIndex, onSelect, style, }: DaySegmentProps): React.ReactElement;
//# sourceMappingURL=DaySegment.d.ts.map