import * as React from 'react';
import type { NewsTickerProps } from './NewsTicker';
import { type ToneV4 } from './internal/reading-v4';
export interface NewsTickerV4Props extends NewsTickerProps {
    /** The busy name while headlines load. Default `'Loading headlines…'`. */
    loadingLabel?: string;
    /** The region's accessible name. Default `'Latest headlines'`. */
    regionLabel?: string;
    /**
     * The tone of the leading `label` chip. Default `'neutral'`.
     *
     * A caller who genuinely means an emergency passes `labelTone="danger"`.
     */
    labelTone?: ToneV4;
}
/**
 * **V4 news ticker** — the web twin of the native `NewsTickerV4`, same props as
 * {@link NewsTicker} plus `loadingLabel`, `regionLabel` and `labelTone`.
 *
 * ## Six changes
 *
 * 1. **The eyebrow stops being `danger`.** `label` is caller copy, documented
 *    as "`LIVE`" or "`BREAKING`" — so a section name, an editorial rubric or a
 *    sponsor tag came out in the colour that means *something has gone wrong*.
 *    It defaults to `neutral` now; red is a decision a caller makes.
 * 2. **Loading draws the ticker's skeleton.** The base parameterised
 *    `emptyLabel` and then hard-coded `'Loading headlines…'` two lines later,
 *    collapsing the strip to one text line that then reflowed to N headlines.
 *    The string survives as the busy region's name.
 * 3. **The region is named on both twins**, with the same role — native had no
 *    label at all.
 * 4. **A headline is the same control on both twins** (web said `button`,
 *    native said `link`) and clears 44.
 * 5. **The scroller is keyboard reachable.** A horizontally scrolling strip
 *    that only a pointer can move is unreachable content.
 * 6. **Press is the state layer**, not `hover:opacity-70`.
 */
export declare const NewsTickerV4: React.ForwardRefExoticComponent<NewsTickerV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=NewsTickerV4.d.ts.map