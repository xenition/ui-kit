import * as React from 'react';
import type { CropCardProps } from './CropCard';
/** Drop-in alternate of {@link CropCardProps} — identical prop contract. */
export type CropCardV2Props = CropCardProps;
/**
 * CropCard — design variant **V2**: an elevated card led by a large tinted
 * **glyph tile**, with a segmented **maturity ring** dial (percentage centered)
 * and a color-independent health line (mark + text). Where V1 is a bordered row
 * with an inline progress bar, V2 is a floating, tile-and-dial hero. Same props
 * as {@link CropCardProps}; only the layout differs. Token-only.
 */
export declare function CropCardV2({ name, variety, icon, stage, health, progress, fieldLabel, harvestLabel, loading, onPress, style, }: CropCardV2Props): React.ReactElement;
//# sourceMappingURL=CropCardV2.d.ts.map