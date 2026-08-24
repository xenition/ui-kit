import * as React from 'react';
import type { CropCardProps } from './CropCard';
/** Same public contract as {@link CropCard} — a drop-in alternate design. */
export type CropCardV2Props = CropCardProps;
/**
 * CropCard, redesigned (v2): a **hero planting card**. A big stage glyph sits in a
 * health-tinted disc; the name/variety, stage + health chips, a maturity bar, and
 * field/harvest hints follow. Elevated. Distinct from v1. Same props, token-only.
 */
export declare const CropCardV2: React.ForwardRefExoticComponent<CropCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CropCardV2.d.ts.map