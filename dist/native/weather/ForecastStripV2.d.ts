import * as React from 'react';
import type { ForecastStripProps } from './ForecastStrip';
/** Drop-in for {@link ForecastStripProps} — same props, a different design. */
export type ForecastStripV2Props = ForecastStripProps;
/**
 * ForecastStrip — **large day cards** design (v2). A horizontal scroll of tall,
 * rounded day cards, each carrying the day label, a big condition glyph + text,
 * the high temperature, a token-tinted hi/lo range bar, the low, and an optional
 * precip chance. The selected day gets a thicker primary border, a soft tint,
 * and a bold label — never color alone. Renders a muted empty state when `days`
 * is empty. Same props as {@link ForecastStripProps}; token-only colors.
 */
export declare function ForecastStripV2({ days, unit, selectedIndex, onSelectDay, emptyLabel, style, }: ForecastStripV2Props): React.ReactElement;
//# sourceMappingURL=ForecastStripV2.d.ts.map