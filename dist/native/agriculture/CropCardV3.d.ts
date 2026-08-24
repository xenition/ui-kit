import * as React from 'react';
import type { CropCardProps } from './CropCard';
/** Drop-in alternate of {@link CropCardProps} — identical prop contract. */
export type CropCardV3Props = CropCardProps;
/**
 * CropCard — design variant **V3**: a **dense single line** — leading stage
 * glyph, name · variety, a stage word, a color-independent health mark, and the
 * maturity percentage flush right. No card chrome; separation comes from a
 * hairline underline. Same props as {@link CropCardProps}; only the layout
 * differs. Token-only.
 */
export declare function CropCardV3({ name, variety, icon, stage, health, progress, loading, onPress, style, }: CropCardV3Props): React.ReactElement;
//# sourceMappingURL=CropCardV3.d.ts.map