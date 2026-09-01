import * as React from 'react';
import type { PestAlertProps, PestSeverity } from './PestAlert';
export interface PestAlertV4Props extends PestAlertProps {
    /** Override the severity names — four English words lived inside the component. */
    severityLabels?: Partial<Record<PestSeverity, string>>;
    /** Label above the recommendation. Default `'Recommended action'`. */
    recommendationLabel?: string;
    /** Label above the affected area. Default `'Affected'`. */
    affectedLabel?: string;
}
/**
 * **V4 pest alert** — the web twin of the native `PestAlertV4`, same props as
 * {@link PestAlert} plus `severityLabels`, `recommendationLabel` and
 * `affectedLabel`.
 *
 * ## Four changes
 *
 * 1. **Severity reads without colour.** A tinted ground and a coloured glyph
 *    are both colour-only signals; V4 keeps them and adds the badge word and a
 *    leading rail, so severity survives greyscale and CVD.
 * 2. **The tint is a `color-mix()` over the semantic variables**, so it lands
 *    on the correct side of the page in dark mode instead of being a pale wash.
 * 3. **The glyph and headings take the contrast-corrected ink** (`*-text`)
 *    rather than the fill slots the base put on text.
 * 4. **The recommendation is labelled.** The base rendered it as a bare
 *    paragraph under the pest name, so the most actionable line on the card
 *    read as more description.
 *
 * **Renders nothing without a `pest`** (§4.5).
 */
export declare const PestAlertV4: React.ForwardRefExoticComponent<PestAlertV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PestAlertV4.d.ts.map