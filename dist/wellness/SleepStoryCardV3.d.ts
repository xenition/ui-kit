import * as React from 'react';
import type { SleepStoryCardProps } from './SleepStoryCard';
/** Same public contract as {@link SleepStoryCard} — a drop-in alternate design. */
export type SleepStoryCardV3Props = SleepStoryCardProps;
/**
 * SleepStoryCard, redesigned (v3): a **dense story row**. A slot-tinted glyph tile,
 * the title over a category·narrator·duration line, and a compact play/pause (or
 * lock) on the right — hairline-bordered for a playlist. The opposite of v2's
 * media hero. Same props, token-only.
 */
export declare const SleepStoryCardV3: React.ForwardRefExoticComponent<SleepStoryCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SleepStoryCardV3.d.ts.map