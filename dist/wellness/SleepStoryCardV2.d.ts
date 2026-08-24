import * as React from 'react';
import type { SleepStoryCardProps } from './SleepStoryCard';
/** Same public contract as {@link SleepStoryCard} — a drop-in alternate design. */
export type SleepStoryCardV2Props = SleepStoryCardProps;
/**
 * SleepStoryCard, redesigned (v2): a **media-hero story card**. A tall slot-tinted
 * panel with the big category glyph and a floating play/pause control tops the
 * title, category·narrator·duration, and teaser. Elevated. Distinct from v1. Same
 * props, token-only.
 */
export declare const SleepStoryCardV2: React.ForwardRefExoticComponent<SleepStoryCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SleepStoryCardV2.d.ts.map