import * as React from 'react';
import { type StyleProp, type TextStyle } from 'react-native';
/** Token-ramp gradient recipes; mirrors the web `GradientText` ramps. */
export type GradientTextRamp = 'primary' | 'accent' | 'primary-accent' | 'accent-primary';
export interface GradientTextProps {
    /** Which theme ramp(s) drive the color (default `primary-accent`). */
    ramp?: GradientTextRamp;
    /**
     * Gradient angle in degrees. Accepted for prop parity with the web
     * `GradientText`; ignored on native (see note below).
     */
    angle?: number;
    style?: StyleProp<TextStyle>;
    children?: React.ReactNode;
}
/**
 * Ramp-driven emphasis text — the native mirror of the web `GradientText`.
 *
 * React Native has no `background-clip: text`, so true clipped-gradient text
 * requires a `MaskedView` + `expo-linear-gradient` composition. The kit does
 * **not** pull in `@react-native-masked-view/masked-view`, so native uses a
 * **tasteful solid-token fallback**: the text is painted with the ramp's mid
 * (500) step — the same hue the gradient centers on — so it reads as the
 * "energy word" and restyles from the seed alone. The `angle` prop is accepted
 * for parity but has no visual effect here. (`expo-linear-gradient` is used for
 * real gradient *surfaces* — e.g. the commerce cover placeholder.)
 */
export declare function GradientText({ ramp, angle: _angle, style, children, }: GradientTextProps): React.ReactElement;
//# sourceMappingURL=GradientText.d.ts.map