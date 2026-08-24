import * as React from 'react';
import type { LightControlProps } from './LightControl';
/** Alternate design (V3) — identical prop contract to {@link LightControlProps}. */
export type LightControlV3Props = LightControlProps;
/**
 * LightControl — alternate design **V3**: a compact single row with an inline
 * brightness bar. The bulb glyph + name lead, a thin {@link Progress} bar plus a
 * percentage read the current brightness in the row itself, and the power
 * {@link Switch} trails. A text `On`/`Off`/`Offline` status carries state (never
 * color-alone). Drop-in replacement for `LightControl` — same props — for dense
 * light lists; the color-temp control is intentionally dropped for compactness.
 * Brightness is clamped to `[0,100]` and the bar hides when the light is dark.
 */
export declare function LightControlV3({ name, on, brightness, offline, onToggle, style, }: LightControlV3Props): React.ReactElement;
//# sourceMappingURL=LightControlV3.d.ts.map