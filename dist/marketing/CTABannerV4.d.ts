import * as React from 'react';
import type { CTABannerProps } from './CTABanner';
/** Drop-in for {@link CTABannerProps} — same props, the V4 "showcase" design. */
export type CTABannerV4Props = CTABannerProps;
/**
 * CTABanner — **V4** "showcase" design (web parity of the native V4). The bold,
 * conversion-forward closing band: a vibrant primary→accent brand gradient
 * ground carrying a big extra-bold near-white headline, a soft supporting line,
 * and a centered call-to-action. The base's `AuroraBackground` is kept as a
 * subtle texture overlay so `variant`/`grain`/`pattern` still apply. Same
 * props/behavior as {@link CTABannerProps}; every color is a `--xen-*` token
 * (`from-primary-500`, `to-accent-500`, `text-primary-50`) — no literals.
 */
export declare const CTABannerV4: React.ForwardRefExoticComponent<CTABannerProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=CTABannerV4.d.ts.map