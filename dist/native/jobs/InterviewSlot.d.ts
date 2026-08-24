import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { Interview } from './types';
export interface InterviewSlotProps {
    /** The interview (or proposed slot) to render. */
    interview: Interview;
    /** Marks this slot as the chosen one. */
    selected?: boolean;
    /** Disables selection (e.g. slot no longer available). */
    disabled?: boolean;
    /** Fired when a bookable slot is pressed. */
    onSelect?: (interview: Interview) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A selectable interview slot chip/card: date + time range, a mode marker
 * (on-site / video / phone — glyph + label, not color alone), and the
 * interviewer. Selected state is announced via `accessibilityState.selected` and
 * a token outline; disabled slots never fire `onSelect`. Tokens only.
 */
export declare function InterviewSlot({ interview, selected, disabled, onSelect, style, }: InterviewSlotProps): React.ReactElement;
//# sourceMappingURL=InterviewSlot.d.ts.map