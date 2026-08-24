import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type DisclaimerTone } from './internal';
export type DisclaimerBannerVariant = 'soft' | 'solid' | 'outline';
export interface DisclaimerBannerProps {
    /** Severity — drives the glyph, default title, and token tint. */
    tone?: DisclaimerTone;
    /** Heading; defaults to the tone's label ("Legal notice", "Warning", …). */
    title?: string;
    /** Body copy (the disclaimer text). */
    message: string;
    /** Visual treatment. `soft` (default) tints; `solid` fills; `outline` rings. */
    variant?: DisclaimerBannerVariant;
    /** Optional dismiss affordance. */
    onDismiss?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A legal disclaimer / notice banner — "not legal advice", attorney-client
 * privilege, confidentiality, statute-of-limitations warnings, etc. Severity is
 * carried by a glyph + heading + token tint (never color alone), and it exposes
 * an `alert` a11y role so screen readers announce it. `solid` fills for critical
 * notices; `outline` for a lighter footprint. All colors are theme tokens — no
 * literals.
 */
export declare function DisclaimerBanner({ tone, title, message, variant, onDismiss, testID, style, }: DisclaimerBannerProps): React.ReactElement;
//# sourceMappingURL=DisclaimerBanner.d.ts.map