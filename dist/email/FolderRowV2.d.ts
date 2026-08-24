import * as React from 'react';
import type { FolderRowProps } from './FolderRow';
/** Same public contract as {@link FolderRow} — a drop-in alternate design. */
export type FolderRowV2Props = FolderRowProps;
/**
 * FolderRow — design **V2**. A **tile**: a large folder glyph on a soft tinted
 * chip, the name beneath, and the unread count as a corner `Badge`. The
 * `selected` state raises the tile (shadow + primary border + primary label) and
 * reports `aria-current` so it isn't signalled by color alone. Lifts on hover.
 * The `depth` indent still applies. Same props as `FolderRow`. No literal colors.
 */
export declare const FolderRowV2: React.ForwardRefExoticComponent<FolderRowProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=FolderRowV2.d.ts.map