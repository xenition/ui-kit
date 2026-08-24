import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface RangeSliderProps {
    /** Controlled `[low, high]` pair. */
    value: [number, number];
    min?: number;
    max?: number;
    step?: number;
    /** Fires with the new `[low, high]` pair (always low ≤ high). */
    onChange?: (value: [number, number]) => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * Two-thumb range slider — a two-handle extension of the native `Slider`. A
 * token-styled rail carries a `primary` fill between two draggable thumbs driven
 * by a single `PanResponder` that grabs whichever thumb is nearer the touch;
 * values snap to `step` in `[min, max]` and the pair is kept ordered. No literal
 * colors.
 */
export declare function RangeSlider({ value, min, max, step, onChange, disabled, style, }: RangeSliderProps): React.ReactElement;
//# sourceMappingURL=RangeSlider.d.ts.map