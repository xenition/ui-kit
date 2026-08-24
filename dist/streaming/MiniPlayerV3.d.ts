import * as React from 'react';
import type { MiniPlayerProps } from './MiniPlayer';
/** Same public contract as {@link MiniPlayer} — a drop-in alternate design. */
export type MiniPlayerV3Props = MiniPlayerProps;
/**
 * MiniPlayer, redesigned (v3): a **slim docked strip**. A very thin edge-to-edge
 * bar with a hairline progress line, a small artwork chip, a single title·artist
 * line, and a bare play glyph — minimal chrome for a persistent footer. The
 * opposite of v2's floating card. Same props, token-only.
 */
export declare const MiniPlayerV3: React.ForwardRefExoticComponent<MiniPlayerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MiniPlayerV3.d.ts.map