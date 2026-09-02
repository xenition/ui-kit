import * as React from 'react';
import type { DisclaimerBannerProps } from './DisclaimerBanner';
/** Drop-in for {@link DisclaimerBannerProps} — same props, the V4 "chambers" design. */
export type DisclaimerBannerV4Props = DisclaimerBannerProps;
/**
 * DisclaimerBanner — **V4** "chambers" design (native twin of the web V4). The
 * severity is carried by a glyph in its own toned chip + a heading + a token tint
 * (never color alone), and it exposes an `alert` a11y role. `soft` (default)
 * rides a tinted well with a soft shadow; `solid` fills for critical notices;
 * `outline` rings for a lighter footprint. Reuses the base `variant`
 * (`soft` / `solid` / `outline`). Token-only colors via `useXenitionTheme()`.
 */
export declare function DisclaimerBannerV4({ tone, title, message, variant, onDismiss, testID, style, }: DisclaimerBannerV4Props): React.ReactElement;
//# sourceMappingURL=DisclaimerBannerV4.d.ts.map