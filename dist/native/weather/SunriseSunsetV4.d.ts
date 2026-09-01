import * as React from 'react';
import type { SunriseSunsetProps } from './SunriseSunset';
/** Drop-in for {@link SunriseSunsetProps} — same props, a different design. */
export type SunriseSunsetV4Props = SunriseSunsetProps;
/**
 * SunriseSunset — **elevated white card** design (v4). A polished card carrying a
 * static daylight arc: a dependency-free dome of token-tinted dots with the sun
 * marker positioned at `progress` along it. The arc highlight uses `accent`; the
 * track uses `border`/`withAlpha`. Sunrise and sunset are labelled with glyphs +
 * times below, so the info never relies on the arc alone. Renders a muted empty
 * state when both times are absent. All colors/sizes come from the compiled theme
 * tokens via `useXenitionTheme()` — no literal colors, no SVG/native deps. Same
 * props as {@link SunriseSunsetProps}.
 */
export declare function SunriseSunsetV4({ sunrise, sunset, progress, arcHeight, emptyLabel, style, }: SunriseSunsetV4Props): React.ReactElement;
//# sourceMappingURL=SunriseSunsetV4.d.ts.map