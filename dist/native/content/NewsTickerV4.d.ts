import * as React from 'react';
import type { ToneV4 } from './internal/reading-v4';
import type { NewsTickerProps } from './NewsTicker';
export interface NewsTickerV4Props extends NewsTickerProps {
    /** Announced while the headlines load. Default `'Loading headlines…'`. */
    loadingLabel?: string;
    /** The strip's accessible name. Default `'Latest headlines'`. */
    regionLabel?: string;
    /** Tone of the leading `label` chip. Default `'neutral'`. */
    labelTone?: ToneV4;
}
/**
 * **V4 news ticker** — same props as {@link NewsTicker} plus `loadingLabel`,
 * `regionLabel` and `labelTone`.
 *
 * ## Six changes
 *
 * 1. **The eyebrow stops being an error.** `label` is caller copy — the prop
 *    doc offers `'LIVE'` and `'BREAKING'` as examples — and it was painted in
 *    `danger` unconditionally, so a section name or a sponsor tag came out in
 *    the colour that means something has gone wrong. It defaults to `neutral`;
 *    a newsroom that genuinely wants red passes `labelTone="danger"`.
 * 2. **Loading draws the ticker's own skeleton.** The base collapsed to a
 *    single line of text and then reflowed to N headlines, and the line was
 *    hard-coded English two lines below a parameterised `emptyLabel`.
 * 3. **The strip is named on both twins.** This one had no name at all, so a
 *    reader met an unlabelled group of headlines.
 * 4. **A headline is the same control on both twins** — a button, where this
 *    twin said `link` — and it clears 44.
 * 5. **The separator dots are hidden from the reader**, where they were
 *    announced between every headline.
 * 6. **Press is a state layer**, not `opacity: 0.6`.
 */
export declare function NewsTickerV4({ items, label, onItemPress, variant, loading, emptyLabel, loadingLabel, regionLabel, labelTone, style, }: NewsTickerV4Props): React.ReactElement;
//# sourceMappingURL=NewsTickerV4.d.ts.map