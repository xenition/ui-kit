import * as React from 'react';
import type { ForecastStripProps } from './ForecastStrip';
/** Drop-in for {@link ForecastStripProps} — same props, a different design. */
export type ForecastStripV3Props = ForecastStripProps;
/**
 * ForecastStrip — **vertical list** design (v3). Each day is a full-width row:
 * the day label on the left, the condition glyph + short text in the middle, and
 * the high / low temperatures right-aligned; an optional precip chip sits under
 * the day label. The selected row is tinted and its label bolded — never color
 * alone. Rows are divided by hairline separators. Renders a muted empty state
 * when `days` is empty. Same props as {@link ForecastStripProps}; token-only
 * colors.
 */
export declare function ForecastStripV3({ days, unit, selectedIndex, onSelectDay, emptyLabel, style, }: ForecastStripV3Props): React.ReactElement;
//# sourceMappingURL=ForecastStripV3.d.ts.map