import * as React from 'react';
import type { TimezoneRowProps } from './TimezoneRow';
export interface TimezoneRowV4Props extends TimezoneRowProps {
    /**
     * Derive the offset caption when none is passed. Default: the zone's current
     * short offset from `Intl`. The base required the host to restate what every
     * platform already knows, and showed nothing when they did not.
     */
    formatOffset?: (timezone: string) => string | undefined;
}
/**
 * **V4 timezone row** — the web twin of the native `TimezoneRowV4`, same props
 * as {@link TimezoneRow} plus `formatOffset`.
 *
 * ## Three changes
 *
 * 1. **The offset is derived when it is not given.**
 * 2. **It is a row from the shared row line**, with the shared hover layer.
 * 3. **An unknown zone degrades rather than throwing.**
 *
 * **Renders nothing without a `timezone`** (§4.5).
 */
export declare const TimezoneRowV4: React.ForwardRefExoticComponent<TimezoneRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TimezoneRowV4.d.ts.map