import * as React from 'react';
import type { ScreenTimeBarProps } from './ScreenTimeBar';
export interface ScreenTimeBarV4Props extends ScreenTimeBarProps {
    /** Note shown beside the reading when no limit is configured. Default `emptyLabel`. */
    noLimitLabel?: string;
    /** Precedes the overage. Default `'over by'`. */
    overLabel?: string;
    /** Follows the remaining time. Default `'left'`. */
    remainingLabel?: string;
    /** Format a duration. Default `'1h 30m'` for minutes, `'90 units'` otherwise. */
    formatDuration?: (minutes: number) => string;
}
/**
 * **V4 screen-time bar** — same props as {@link ScreenTimeBar} plus
 * `noLimitLabel`, `overLabel`, `remainingLabel` and `formatDuration`.
 *
 * ## Five changes
 *
 * 1. **`limit={0}` no longer throws the reading away.** The base returned early
 *    on any non-positive limit and told the parent "No screen-time limit set" —
 *    never that the child had been on the device for four hours. That is the
 *    one screen where the number matters most. "No limit set" is now a *note*
 *    beside the reading, not a replacement for it.
 * 2. **A broken reading is reported as broken.** `used={-30}` rendered
 *    "0 min / 2h — 2h left" as though a negative number out of a failed sync
 *    were sound data, and `used={NaN}` reached the screen as "NaNh NaNm" with a
 *    bar of width `"NaN%"`. `meterParts` never touches the measurement: it
 *    hands back the value as given, a `ratio` clamped **for drawing only**, and
 *    a `valid` flag. An unusable reading renders nothing rather than a
 *    confident nought.
 * 3. **The meter announces a range it is actually in.** `used={180}` against a
 *    120 limit announced `valuenow=180` against `valuemax=120` — "180 of 120".
 *    The bar is now a percentage of the limit, 0–100, and the overage is its
 *    own sentence.
 * 4. **A translated unit keeps its formatting.** The h/m split tested
 *    `unit !== 'min'` against the literal string, so a caller who passed a
 *    localised unit fell straight through to `${mins} ${unit}` and lost the
 *    split entirely. `formatDuration` is the hook that was missing.
 * 5. **Over the limit is `warn`, never `danger`.** This module draws children,
 *    and `danger` means the *system* has failed. A child who has had more
 *    screen time than a parent planned has not broken anything; the state is
 *    carried by a glyph, a word and the overage, so it survives greyscale too.
 *
 * **Renders nothing when the reading itself is unusable** — see change 2.
 */
export declare function ScreenTimeBarV4({ used, limit, unit, label, loading, emptyLabel, noLimitLabel, overLabel, remainingLabel, formatDuration, style, }: ScreenTimeBarV4Props): React.ReactElement | null;
//# sourceMappingURL=ScreenTimeBarV4.d.ts.map