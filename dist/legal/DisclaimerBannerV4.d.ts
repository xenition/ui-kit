import * as React from 'react';
import type { DisclaimerBannerProps } from './DisclaimerBanner';
/** Drop-in for {@link DisclaimerBannerProps} — same props, the V4 "chambers" design. */
export type DisclaimerBannerV4Props = DisclaimerBannerProps;
/**
 * DisclaimerBanner — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on a legal notice / disclaimer: the severity is
 * carried by a glyph in its own toned chip + a heading + a token tint (never
 * color alone), and it exposes `role="alert"`. `soft` (default) rides a tinted
 * well with a toned left rail; `solid` fills for critical notices; `outline`
 * rings for a lighter footprint. Reuses the base `variant`
 * (`soft` / `solid` / `outline`). All colors from `--xen-*` token classes
 * (no literals).
 */
export declare const DisclaimerBannerV4: React.ForwardRefExoticComponent<DisclaimerBannerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DisclaimerBannerV4.d.ts.map