import * as React from 'react';
import type { TimezoneRowProps } from './TimezoneRow';
export interface TimezoneRowV4Props extends TimezoneRowProps {
    /**
     * Derive the offset caption when none is passed. Default: the zone's current
     * short offset from `Intl`, e.g. `'GMT+1'`.
     *
     * The base required the host to pass `offsetLabel` and showed nothing
     * without it — an offset every browser and phone already knows.
     */
    formatOffset?: (timezone: string) => string | undefined;
}
/**
 * **V4 timezone row** — same props as {@link TimezoneRow} plus
 * `formatOffset`.
 *
 * ## Three changes
 *
 * 1. **The offset is derived when it is not given.** Every platform ships an
 *    IANA database; the base made the host restate what `Intl` already knows,
 *    and showed nothing when they did not.
 * 2. **It is a row from the shared row line**, with the shared press fill —
 *    the base drew its own container and pressed with an opacity.
 * 3. **An unknown zone degrades rather than throwing.** `Intl` throws on an
 *    invalid IANA name, and a settings row is not the place to take the screen
 *    down.
 *
 * **Renders nothing without a `timezone`** (§4.5).
 */
export declare function TimezoneRowV4({ timezone, label, offsetLabel, title, variant, formatOffset, onPress, style, }: TimezoneRowV4Props): React.ReactElement | null;
//# sourceMappingURL=TimezoneRowV4.d.ts.map