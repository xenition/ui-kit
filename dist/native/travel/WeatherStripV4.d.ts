import * as React from 'react';
import type { WeatherStripProps } from './WeatherStrip';
/** Drop-in for {@link WeatherStripProps} — same props, the V4 "journey" design. */
export type WeatherStripV4Props = WeatherStripProps;
/**
 * WeatherStrip — **V4** "journey" design. The boarding-pass take on a multi-day
 * forecast: a horizontal strip of day tiles where the `highlightIndex` day is
 * lifted onto a brand-gradient fill with near-white ink (the signature V4 touch)
 * and announced as "today", while the other tiles stay clean surface with a
 * hairline edge and muted labels. Condition glyphs and high/low temperatures are
 * preserved. Renders an empty hint when there are no days. Same props/behavior as
 * {@link WeatherStripProps}; token-only colors via `useXenitionTheme()`.
 */
export declare function WeatherStripV4({ days, unit, highlightIndex, scrollEnabled, style, }: WeatherStripV4Props): React.ReactElement;
//# sourceMappingURL=WeatherStripV4.d.ts.map