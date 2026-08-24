import * as React from 'react';
import type { LightControlProps } from './LightControl';
/** Alternate design (V2) — identical prop contract to {@link LightControlProps}. */
export type LightControlV2Props = LightControlProps;
/**
 * LightControl — alternate design **V2**: a card built around a circular
 * **brightness ring** (SVG). The ring fills to the current brightness in the
 * `warn` slot when lit (`muted` when off/offline) with the percentage large in
 * its center; below sits a warm→cool color-temp {@link Slider} (shown only when
 * `colorTemp` is provided). A header row keeps the bulb glyph, name, a text
 * `On`/`Off`/`Offline` status (never color-alone), and the power {@link Switch}.
 * Drop-in replacement for `LightControl` — same props. Ring circumference math is
 * guarded and brightness is clamped to `[0,100]`.
 */
export declare function LightControlV2({ name, on, brightness, colorTemp, offline, onToggle, onBrightnessChange, onColorTempChange, style, }: LightControlV2Props): React.ReactElement;
//# sourceMappingURL=LightControlV2.d.ts.map