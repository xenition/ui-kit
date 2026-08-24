import * as React from 'react';
export interface RangeSliderProps {
    /** Controlled `[low, high]` pair. */
    value: [number, number];
    min?: number;
    max?: number;
    step?: number;
    /** Fires with the new `[low, high]` pair (always low ≤ high). */
    onChange?: (value: [number, number]) => void;
    disabled?: boolean;
    className?: string;
}
/**
 * Two-thumb range slider — a two-handle extension of the themed `Slider`. A
 * token-styled rail carries a `primary` fill between two overlaid range thumbs;
 * values are kept ordered so `low ≤ high`. Web parity of the native
 * `RangeSlider`. No literal colors (kit lint rule).
 */
export declare function RangeSlider({ value, min, max, step, onChange, disabled, className, }: RangeSliderProps): React.ReactElement;
//# sourceMappingURL=RangeSlider.d.ts.map