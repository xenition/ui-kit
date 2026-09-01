import * as React from 'react';
import type { SurveyIntroProps } from './SurveyIntro';
/** Drop-in for {@link SurveyIntroProps} — same props, the V4 "focus" design. */
export type SurveyIntroV4Props = SurveyIntroProps;
/**
 * SurveyIntro — **V4** "clean form / focus" design. The start of a survey is a
 * peak moment, so this variant leads with a brand gradient hero band
 * (`focusGradient`) carrying near-white ink (`focusInk` / `focusInkSoft`): an
 * optional glyph mark, the title, the purpose line, and any meta stats rendered
 * as frosted glass tiles (`focusTile` / `focusBorder`). Below the band a big
 * ≥44px primary Start CTA sits in the thumb zone with an accessible name, and the
 * footnote is quiet muted fine print. `hero` centers the band and enlarges the
 * mark. Same props/behavior as {@link SurveyIntroProps}; token-only colors via
 * `useXenitionTheme()` + `focus*(tokens.ramps)` (no literals), dark-mode safe.
 */
export declare function SurveyIntroV4({ title, description, logoGlyph, meta, startLabel, onStart, footnote, variant, style, }: SurveyIntroV4Props): React.ReactElement;
//# sourceMappingURL=SurveyIntroV4.d.ts.map