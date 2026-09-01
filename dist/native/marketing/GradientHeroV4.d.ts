import * as React from 'react';
import type { GradientHeroProps } from './GradientHero';
/** Drop-in for {@link GradientHeroProps} — same props, the V4 "showcase" design. */
export type GradientHeroV4Props = GradientHeroProps;
/**
 * GradientHero — **V4** "showcase" design (native mirror of the web V4). The
 * bold, conversion-forward landing moment: a vibrant primary→accent brand
 * gradient ground (via the shared `expo-linear-gradient` wrapper — the
 * CTABannerV4 technique) carrying a soft eyebrow, an extra-bold tight-tracked
 * near-white headline, generous whitespace, and a call-to-action row. Honors
 * every prop of {@link GradientHeroProps} (`eyebrow`/`title`/`subtitle`/
 * `actions`/`media`/`align`); token-only colors via `useXenitionTheme()`
 * (`tokens.ramps.primary` near-white ink on the saturated ground), dark-mode
 * safe.
 */
export declare function GradientHeroV4({ eyebrow, title, subtitle, actions, media, align, style, }: GradientHeroV4Props): React.ReactElement;
//# sourceMappingURL=GradientHeroV4.d.ts.map