import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface GenerativeCoverProps {
    /** Stable seed — same seed yields the same cover (product slug/title). */
    seed: string;
    /** Optional label rendered over the art (product initials fallback). */
    label?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Native cover-art placeholder drawn when a product has no image — the native
 * counterpart of the web `GenerativeCover`. A deterministic two-token gradient
 * (seeded from the product slug) via `expo-linear-gradient`, with the product
 * initials overlaid. Token-only: both gradient stops are compiled ramp steps,
 * so it restyles from the seed and works in light + dark.
 */
export declare function GenerativeCover({ seed, label, style, }: GenerativeCoverProps): React.ReactElement;
//# sourceMappingURL=GenerativeCover.d.ts.map