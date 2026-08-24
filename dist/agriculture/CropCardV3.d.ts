import * as React from 'react';
import type { CropCardProps } from './CropCard';
/** Same public contract as {@link CropCard} — a drop-in alternate design. */
export type CropCardV3Props = CropCardProps;
/**
 * CropCard, redesigned (v3): a **dense planting line**. The stage glyph leads, the
 * name over a stage·field·harvest line with a thin maturity underline, and a
 * health dot + word trail — hairline-bordered for a plot list. The opposite of
 * v2's hero. Health is dot + word, never color alone. Same props, token-only.
 */
export declare const CropCardV3: React.ForwardRefExoticComponent<CropCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CropCardV3.d.ts.map