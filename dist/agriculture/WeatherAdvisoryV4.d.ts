import * as React from 'react';
import type { AdvisorySeverity, WeatherAdvisoryProps } from './WeatherAdvisory';
export interface WeatherAdvisoryV4Props extends WeatherAdvisoryProps {
    /** Override the severity names — four English words lived inside the component. */
    severityLabels?: Partial<Record<AdvisorySeverity, string>>;
}
/**
 * **V4 weather advisory** — the web twin of the native `WeatherAdvisoryV4`,
 * same props as {@link WeatherAdvisory} plus `severityLabels`.
 *
 * ## Four changes
 *
 * 1. **Severity reads without colour**, via the badge word beside the tint.
 * 2. **The tint is a `color-mix()` over the semantic variables**, so it lands
 *    correctly in dark mode.
 * 3. **The glyph takes the contrast-corrected ink**, not the fill slot.
 * 4. **`role="alert"` is on the severe end only.** The base announced every
 *    advisory as an alert including `info`, which trains a screen-reader user
 *    to ignore the ones that matter — an `info` advisory is a status, a
 *    `severe` one interrupts.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export declare const WeatherAdvisoryV4: React.ForwardRefExoticComponent<WeatherAdvisoryV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WeatherAdvisoryV4.d.ts.map