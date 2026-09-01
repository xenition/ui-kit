import * as React from 'react';
import type { SleepStoryCardProps } from './SleepStoryCard';
export type SleepStoryCardV4Props = SleepStoryCardProps;
/**
 * SleepStoryCardV4 — the "calm" restyle of {@link SleepStoryCard}. Same props,
 * defaults, labels, a11y and behavior; only the surface changes: a clean neutral
 * row card with a gradient cover tile (category glyph in near-white ink) and a
 * round gradient play/pause button. `playing` swaps the glyph and its a11y label;
 * `locked` and `loading` are preserved.
 */
export declare function SleepStoryCardV4({ title, category, narrator, durationMin, description, playing, locked, loading, onPlay, style, }: SleepStoryCardV4Props): React.ReactElement;
//# sourceMappingURL=SleepStoryCardV4.d.ts.map