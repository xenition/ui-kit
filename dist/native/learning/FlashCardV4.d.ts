import * as React from 'react';
import type { FlashCardProps } from './FlashCard';
/** Drop-in for {@link FlashCardProps} — same props, the V4 "campus" design. */
export type FlashCardV4Props = FlashCardProps;
/**
 * FlashCard — **V4** "campus" design (native twin of the web V4). A tap-to-flip
 * study card on an elevated rounded surface with a soft shadow: shows the `front`
 * (prompt) and flips to the `back` (answer) on a soft-primary ground. The face
 * label pill + a "Tap to flip" hint keep the state legible without color. Works
 * controlled or uncontrolled. Token-only colors via `useXenitionTheme()`.
 */
export declare function FlashCardV4({ front, back, frontLabel, backLabel, flipped, defaultFlipped, onFlip, style }: FlashCardV4Props): React.ReactElement;
//# sourceMappingURL=FlashCardV4.d.ts.map