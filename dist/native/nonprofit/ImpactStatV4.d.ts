import * as React from 'react';
import type { ImpactStatProps } from './ImpactStat';
/** Drop-in for {@link ImpactStatProps} — same props, the V4 "rally" design. */
export type ImpactStatV4Props = ImpactStatProps;
/**
 * ImpactStat — **V4** "rally" design. A single mission metric drawn with the
 * warm, elevated "rally" identity: a big legible value numeral, an optional
 * muted unit, a glyph chip in the tone color, a caption label, and a supporting
 * caption. Honors all three `variant`s — `plain` (no surface), `card` (an
 * elevated bordered `colors.card` surface with a soft shadow), and `tile` (a
 * filled soft-tone panel via `withAlpha`) — and all three `tone`s
 * (`primary | success | accent`), identical props/behavior to
 * {@link ImpactStatProps}; the glyph is decorative and the metric is announced
 * as a `summary`. Tone reads through the glyph + value color, never color
 * alone. Token-only colors via `useXenitionTheme()`.
 */
export declare function ImpactStatV4({ value, label, unit, glyph, caption, variant, tone, style, }: ImpactStatV4Props): React.ReactElement;
//# sourceMappingURL=ImpactStatV4.d.ts.map