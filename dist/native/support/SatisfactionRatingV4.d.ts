import * as React from 'react';
import type { SatisfactionRatingProps } from './SatisfactionRating';
/** Drop-in for {@link SatisfactionRatingProps} — same props, the V4 "console" design. */
export type SatisfactionRatingV4Props = SatisfactionRatingProps;
/**
 * SatisfactionRating — **V4** "calm console" design. A big, legible CSAT read: a
 * large numeral (`value / total`) paired with a row of glyphs — filled =
 * **primary** (`warn` for the low-score caution), empty = muted, emphasis by
 * size + opacity + the numeric a11y label (never color alone). Interactive
 * glyphs are ≥44px `radio` targets; read-only renders a static image. Same
 * props/behavior as {@link SatisfactionRatingProps}; token-only colors via
 * `useXenitionTheme()`.
 */
export declare function SatisfactionRatingV4({ value, max, variant, size, onRate, readOnly, label, style, }: SatisfactionRatingV4Props): React.ReactElement;
//# sourceMappingURL=SatisfactionRatingV4.d.ts.map