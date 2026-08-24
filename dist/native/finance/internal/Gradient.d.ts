/**
 * Thin wrapper over the OPTIONAL `expo-linear-gradient` peer, local to the
 * finance module so `CreditCardView`'s gradient face has no cross-module
 * `internal/` reach. Every consumer is an Expo app (so the real native gradient
 * is present), but the dependency is loaded lazily and degrades to a **solid
 * token color** if absent — the kit never hard-requires a native module. Colors
 * passed in always originate from theme tokens.
 */
import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface GradientProps {
    /** Gradient stops — token colors (2+). */
    colors: readonly string[];
    start?: {
        x: number;
        y: number;
    };
    end?: {
        x: number;
        y: number;
    };
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
export declare function Gradient({ colors, start, end, style, children, }: GradientProps): React.ReactElement;
//# sourceMappingURL=Gradient.d.ts.map