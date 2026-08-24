import * as React from 'react';
import type { FolderRowProps } from './FolderRow';
/** Same public contract as {@link FolderRow} — a drop-in alternate design. */
export type FolderRowV2Props = FolderRowProps;
/**
 * FolderRow — design V2. A **tile**: a large folder glyph on a soft tinted
 * chip, the name beneath, and the unread count as a corner `Badge`. The
 * `selected` state raises the tile (shadow + primary border) and reports
 * `selected` to a11y so it isn't color-alone. Same props as `FolderRow` — the
 * `depth` indent still applies. No literal colors.
 */
export declare function FolderRowV2({ name, glyph, count, selected, depth, onPress, style, }: FolderRowV2Props): React.ReactElement;
//# sourceMappingURL=FolderRowV2.d.ts.map