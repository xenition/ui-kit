import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type StatusDotTone = 'success' | 'warn' | 'danger' | 'primary' | 'accent';
export interface StatusDotProps {
    /** Semantic color slot for the dot (default `success` — "live"). */
    tone?: StatusDotTone;
    /** Emit the expanding echo pulse (default true; reduced motion disables it). */
    pulse?: boolean;
    /**
     * Accessible name (e.g. "Live"). When provided the dot is announced via an
     * `image` role; when omitted it is decorative.
     */
    label?: string;
    /** Dot diameter in px (default 8). */
    size?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * Pulsing semantic status dot — the native mirror of the web `StatusDot`. A
 * solid token-colored dot with an expanding, fading echo driven by `Animated`.
 * The echo is disabled under the OS "Reduce Motion" setting (the solid dot
 * still communicates state). No literal colors.
 */
export declare function StatusDot({ tone, pulse, label, size, style, }: StatusDotProps): React.ReactElement;
//# sourceMappingURL=StatusDot.d.ts.map