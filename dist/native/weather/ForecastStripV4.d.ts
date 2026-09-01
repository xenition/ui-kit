import * as React from 'react';
import type { ForecastStripProps } from './ForecastStrip';
/** Drop-in for {@link ForecastStripProps} — same props, a different design. */
export type ForecastStripV4Props = ForecastStripProps;
/**
 * ForecastStrip — **sky tiles** design (v4). A rounded gradient panel of soft
 * translucent day tiles (horizontal scroll, or full-width rows under
 * `variant='list'`): day label, condition glyph + label, and high/low. The
 * selected day inverts to a solid near-white tile with deep-brand text — a filled
 * chip plus a bold label, never color alone. Gradient, ink and tiles all derive
 * from the brand ramp; no literal colors. Renders a muted line when `days` is
 * empty. Same props as {@link ForecastStripProps}.
 */
export declare function ForecastStripV4({ days, unit, selectedIndex, onSelectDay, variant, emptyLabel, style, }: ForecastStripV4Props): React.ReactElement;
//# sourceMappingURL=ForecastStripV4.d.ts.map