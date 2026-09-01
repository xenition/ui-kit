import * as React from 'react';
import type { SatisfactionRatingProps } from './SatisfactionRating';
/** Drop-in for {@link SatisfactionRatingProps} — same props, the V4 "console" design. */
export type SatisfactionRatingV4Props = SatisfactionRatingProps;
/**
 * SatisfactionRating — **V4** "calm console" design (web parity of the native
 * V4). A big, legible CSAT read: a large numeral (`value / total`) paired with a
 * row of glyphs — filled = **primary** (`warn` for the low-score faces/thumbs
 * caution), empty = muted, emphasis by size + opacity + the numeric a11y label
 * (never color alone). Interactive glyphs are ≥44px `radio` buttons; read-only
 * renders a static `img`. Same props/behavior as {@link SatisfactionRatingProps};
 * all colors from `--xen-*` token classes (no literal hex).
 */
export declare const SatisfactionRatingV4: React.ForwardRefExoticComponent<SatisfactionRatingProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SatisfactionRatingV4.d.ts.map