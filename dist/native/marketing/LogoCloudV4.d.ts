import * as React from 'react';
import type { LogoCloudProps } from './LogoCloud';
/** Drop-in for {@link LogoCloudProps} — same props, the V4 "showcase" design. */
export type LogoCloudV4Props = LogoCloudProps;
/**
 * LogoCloud — **V4** "showcase" design (native mirror of the web V4). A tidy,
 * refined logo strip: an optional muted "Trusted by…" `label` above a soft,
 * evenly-spaced wrapped row of `logos` in a muted tone (string logos render as
 * muted text; nodes render as-is). Native has no hover and no CSS marquee, so
 * the web's optional drift degrades to a calm static strip — the same visual
 * resting state the reduced-motion web path shows. NOT a brand-gradient
 * surface — clean and understated. Same props/behavior as
 * {@link LogoCloudProps}; token-only colors via `useXenitionTheme()`
 * (`colors.muted`), dark-mode safe.
 */
export declare function LogoCloudV4({ logos, label, style }: LogoCloudV4Props): React.ReactElement;
//# sourceMappingURL=LogoCloudV4.d.ts.map