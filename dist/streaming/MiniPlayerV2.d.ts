import * as React from 'react';
import type { MiniPlayerProps } from './MiniPlayer';
/** Same public contract as {@link MiniPlayer} — a drop-in alternate design. */
export type MiniPlayerV2Props = MiniPlayerProps;
/**
 * MiniPlayer, redesigned (v2): a **floating rounded card**. An inset shadowed bar
 * with rounded corners, a thin progress line across the top, artwork + title/
 * artist, and circular play/next controls — hovers above content. Distinct from
 * v1's docked bar. Same props, token-only.
 */
export declare const MiniPlayerV2: React.ForwardRefExoticComponent<MiniPlayerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MiniPlayerV2.d.ts.map