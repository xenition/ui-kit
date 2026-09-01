import * as React from 'react';
import type { SleepStoryCardProps } from './SleepStoryCard';
export type SleepStoryCardV4Props = SleepStoryCardProps;
/**
 * SleepStoryCardV4 — the "calm" restyle of {@link SleepStoryCard}. Same props,
 * defaults, labels, a11y and behavior; only the surface changes: a clean neutral
 * row card with a gradient cover tile (category glyph in near-white ink) and a
 * round gradient play/pause button. `playing` swaps the glyph and its a11y label
 * (`aria-pressed`, state not color alone); `locked` and `loading` are preserved.
 * Token-only colors.
 */
export declare const SleepStoryCardV4: React.ForwardRefExoticComponent<SleepStoryCardProps & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SleepStoryCardV4.d.ts.map