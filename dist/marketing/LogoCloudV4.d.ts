import * as React from 'react';
import type { LogoCloudProps } from './LogoCloud';
/** Drop-in for {@link LogoCloudProps} — same props, the V4 "showcase" design. */
export type LogoCloudV4Props = LogoCloudProps;
/**
 * LogoCloud — **V4** "showcase" design (web parity of the native V4). A tidy,
 * refined logo strip: an optional muted "Trusted by…" `label` above a soft,
 * evenly-spaced row of `children` logo slots rendered in a muted, desaturated
 * tone that lifts to full color on hover/focus. An optional continuous marquee
 * drift keeps a long strip alive; it is a decorative flourish, so it is dropped
 * under `prefers-reduced-motion: reduce` (the strip simply wraps and centers).
 * NOT a brand-gradient surface — clean and understated. Same props/behavior as
 * {@link LogoCloudProps}; every color is a `--xen-*` token (`text-muted`) — no
 * literals.
 */
export declare const LogoCloudV4: React.ForwardRefExoticComponent<LogoCloudProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LogoCloudV4.d.ts.map