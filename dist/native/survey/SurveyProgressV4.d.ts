import * as React from 'react';
import type { SurveyProgressProps } from './SurveyProgress';
/** Drop-in for {@link SurveyProgressProps} — same props, the V4 "focus" design. */
export type SurveyProgressV4Props = SurveyProgressProps;
/**
 * SurveyProgress — **V4** "clean form / focus" design. Deliberately calm — NO
 * gradient — so it never competes with the question: a clean rounded progress bar
 * (track = soft-primary tint, fill = solid primary) under a legible "Step N of M"
 * line with a big primary percentage numeral. `steps` swaps the bar for a
 * segmented dot-per-question track; `fraction` shows just the caption. Exposes a
 * `progressbar` role with min/max/now so assistive tech can read completion.
 * `current` is clamped into `[0, total]`. Same props/behavior as
 * {@link SurveyProgressProps}; token-only colors via `useXenitionTheme()` (no
 * literals), dark-mode safe.
 */
export declare function SurveyProgressV4({ current, total, variant, showLabel, label, style, }: SurveyProgressV4Props): React.ReactElement;
//# sourceMappingURL=SurveyProgressV4.d.ts.map