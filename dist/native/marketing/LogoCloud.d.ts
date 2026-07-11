import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface LogoCloudProps {
    /** Logo slots (strings are rendered as muted text; nodes rendered as-is). */
    logos: React.ReactNode[];
    /** Small line above the logos ("Trusted by…"). */
    label?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Row of partner/customer logos — the native mirror of the web `LogoCloud`. The
 * web version dims/desaturates until hover; native has no hover, so each slot is
 * rendered at a fixed reduced opacity (simplification). String logos render as
 * muted text; node logos are rendered as-is. Token-only.
 */
export declare function LogoCloud({ logos, label, style }: LogoCloudProps): React.ReactElement;
//# sourceMappingURL=LogoCloud.d.ts.map