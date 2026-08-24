import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type ProgressTone = 'primary' | 'success' | 'warn' | 'danger';
export interface ProgressProps {
    /** Current value. */
    value: number;
    /** Maximum value (default 100). */
    max?: number;
    tone?: ProgressTone;
    /** Bar thickness. */
    size?: 'sm' | 'md';
    style?: StyleProp<ViewStyle>;
}
/**
 * Linear progress bar — the native mirror of the web `Progress`. A token-styled
 * track with a colored fill sized to `value/max` (clamped to [0, max]). The
 * fill color keys off the tone (`warn`→accent, since there is no warning slot in
 * the primitive token whitelist). The web `Progress` is bar-only — there is no
 * circular variant to simplify away. No literal colors.
 */
export declare function Progress({ value, max, tone, size, style, }: ProgressProps): React.ReactElement;
//# sourceMappingURL=Progress.d.ts.map