import * as React from 'react';
export interface SliderProps {
    value: number;
    min?: number;
    max?: number;
    step?: number;
    onChange: (value: number) => void;
    disabled?: boolean;
    className?: string;
}
/** Range slider bound to the theme tokens (accent = primary). */
export declare function Slider({ value, min, max, step, onChange, disabled, className, }: SliderProps): React.ReactElement;
//# sourceMappingURL=Slider.d.ts.map