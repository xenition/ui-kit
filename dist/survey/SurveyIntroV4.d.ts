import * as React from 'react';
import type { SurveyIntroProps } from './SurveyIntro';
/** Drop-in for {@link SurveyIntroProps} — same props, the V4 "focus" design. */
export type SurveyIntroV4Props = SurveyIntroProps;
/**
 * SurveyIntro — **V4** "clean form / focus" design (web parity of the native V4).
 * The start of a survey is a peak moment, so this variant leads with a brand
 * gradient hero band (`bg-gradient-to-br from-primary-500 to-primary-700`) carrying
 * near-white ink (`text-primary-50` / `text-primary-100`): an optional glyph mark,
 * the title, the purpose line, and any meta stats rendered as frosted glass tiles
 * (`bg-primary-50/15 border border-primary-50/30`). Below the band a big ≥44px
 * primary Start CTA sits in the thumb zone with an accessible name, and the
 * footnote is quiet muted fine print. `hero` centers the band and enlarges the
 * mark. Same props/behavior as {@link SurveyIntroProps}; all colors from `--xen-*`
 * token classes + gradient utilities (no literal colors), dark-mode safe.
 */
export declare const SurveyIntroV4: React.ForwardRefExoticComponent<SurveyIntroProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SurveyIntroV4.d.ts.map