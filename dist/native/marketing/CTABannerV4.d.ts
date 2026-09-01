import * as React from 'react';
import type { CTABannerProps } from './CTABanner';
/** Drop-in for {@link CTABannerProps} — same props, the V4 "showcase" design. */
export type CTABannerV4Props = CTABannerProps;
/**
 * CTABanner — **V4** "showcase" design (native mirror of the web V4). The bold,
 * conversion-forward closing band: a vibrant primary→accent brand gradient
 * ground (via the shared `expo-linear-gradient` wrapper) carrying a big
 * extra-bold near-white headline, a soft supporting line, and a centered
 * call-to-action. Same props/behavior as {@link CTABannerProps}; token-only
 * colors via `useXenitionTheme()` (`tokens.ramps.primary` near-white ink on the
 * saturated ground), dark-mode safe.
 */
export declare function CTABannerV4({ title, description, subtitle, action, style, }: CTABannerV4Props): React.ReactElement;
//# sourceMappingURL=CTABannerV4.d.ts.map