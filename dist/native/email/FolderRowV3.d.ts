import * as React from 'react';
import type { FolderRowProps } from './FolderRow';
/** Same public contract as {@link FolderRow} — a drop-in alternate design. */
export type FolderRowV3Props = FolderRowProps;
/**
 * FolderRow — design V3. A **compact, indented list line** for a deep folder
 * tree: a small leading glyph, the name, and a plain right-aligned count — no
 * pill, no fill, tight vertical rhythm. The `selected` state adds a leading
 * accent rail + bold primary label and reports `selected` to a11y (never
 * color-alone). Indents by `depth`. Same props as `FolderRow`. No literal colors.
 */
export declare function FolderRowV3({ name, glyph, count, selected, depth, onPress, style, }: FolderRowV3Props): React.ReactElement;
//# sourceMappingURL=FolderRowV3.d.ts.map