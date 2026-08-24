import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface SliderProps {
    value: number;
    min?: number;
    max?: number;
    step?: number;
    /** Fires with the new value (web `onChange`, renamed for native). */
    onValueChange?: (value: number) => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * Range slider — the native mirror of the web `Slider`. RN has no
 * `<input type=range>`, so this is a token-styled track with a draggable thumb
 * driven by `PanResponder`, snapping to `step` within `[min, max]`. No literal
 * colors.
 */
export declare function Slider({ value, min, max, step, onValueChange, disabled, style, }: SliderProps): React.ReactElement;
//# sourceMappingURL=Slider.d.ts.map