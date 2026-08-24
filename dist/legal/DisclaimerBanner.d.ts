import * as React from 'react';
import { type DisclaimerTone } from './internal';
export type DisclaimerBannerVariant = 'soft' | 'solid' | 'outline';
export interface DisclaimerBannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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
}
/**
 * A legal disclaimer / notice banner — "not legal advice", attorney-client
 * privilege, confidentiality, statute-of-limitations warnings, etc. Severity is
 * carried by a glyph + heading + token tint (never color alone), and it exposes
 * `role="alert"` so screen readers announce it. `solid` fills for critical
 * notices; `outline` for a lighter footprint. All colors are `--xen-*` token
 * classes — no literals.
 */
export declare const DisclaimerBanner: React.ForwardRefExoticComponent<DisclaimerBannerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DisclaimerBanner.d.ts.map