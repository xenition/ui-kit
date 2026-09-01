import * as React from 'react';
import type { ForecastStripProps } from './ForecastStrip';
/** Drop-in for {@link ForecastStripProps} — same props, a different design. */
export type ForecastStripV4Props = ForecastStripProps;
/**
 * ForecastStrip — **tiled on a brand ground** design (v4), web parity of the
 * native `ForecastStripV4`. A `primary`-colored panel of soft day tiles
 * (horizontal scroll, or full-width rows under `variant='list'`): day label,
 * condition glyph + label, and high/low. The selected day inverts to a solid
 * `on-primary` tile with `primary` text — a filled chip plus a bold label, never
 * color alone. All colors come from `--xen-*` classes, no literals. Renders a
 * muted line when `days` is empty. Same props as {@link ForecastStripProps}.
 */
export declare const ForecastStripV4: React.ForwardRefExoticComponent<ForecastStripProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ForecastStripV4.d.ts.map