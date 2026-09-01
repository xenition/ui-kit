import * as React from 'react';
import type { PrecipBarProps } from './PrecipBar';
/** Drop-in for {@link PrecipBarProps} — same props, a different design. */
export type PrecipBarV4Props = PrecipBarProps;
/**
 * PrecipBar — **elevated white card** design (v4). Precipitation-probability
 * bars: one token-filled column per period, its height proportional to the
 * chance (0–100). The fill uses a `primary` token on a soft `onSurface` track,
 * with a droplet glyph header, so the metric reads without color alone. Values
 * are guarded/clamped to 0–100 and optionally shown via `showValues`. Renders a
 * muted empty state when `slots` is empty. All colors/sizes come from the
 * compiled theme tokens via `useXenitionTheme()` — no literal colors, no chart
 * deps. Same props as {@link PrecipBarProps}.
 */
export declare function PrecipBarV4({ slots, height, showValues, emptyLabel, style, }: PrecipBarV4Props): React.ReactElement;
//# sourceMappingURL=PrecipBarV4.d.ts.map