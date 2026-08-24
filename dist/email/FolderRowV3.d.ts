import * as React from 'react';
import type { FolderRowProps } from './FolderRow';
/** Same public contract as {@link FolderRow} — a drop-in alternate design. */
export type FolderRowV3Props = FolderRowProps;
/**
 * FolderRow — design **V3**. A **compact, indented list line** for a deep folder
 * tree: a leading accent rail, a small glyph, the name, and a plain right-aligned
 * count — no pill, no fill, tight vertical rhythm. The `selected` state lights the
 * rail + bolds the primary label and reports `aria-current` (never color-alone).
 * Indents by `depth`. Same props as `FolderRow`. No literal colors.
 */
export declare const FolderRowV3: React.ForwardRefExoticComponent<FolderRowProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=FolderRowV3.d.ts.map